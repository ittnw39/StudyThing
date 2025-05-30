package Study_Match.file.service;

import Study_Match.studyGroup.Entity.StudyGroup;
import Study_Match.studyGroup.Repository.StudyGroupRepository;
import Study_Match.user.Repository.UserRepository;
import Study_Match.file.repository.FileRepository;
import Study_Match.file.dto.FileRequestDto;
import Study_Match.file.entity.File;
import Study_Match.user.Entity.User;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.io.OutputStream;
import java.util.*;
import java.util.stream.Collectors;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileService {

    private static final Logger logger = LoggerFactory.getLogger(FileService.class);

    private final AmazonS3 s3Client;
    private final FileRepository fileRepository;
    private final StudyGroupRepository studyGroupRepository;
    private final UserRepository userRepository;

    @Value("${file.upload.max-size}")

    private long maxFileSize;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Transactional
    public List<File> listFilesByStudyGroupId(Long studyGroupId) {
        StudyGroup studyGroup = studyGroupRepository.findById(studyGroupId)
                .orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));

        return fileRepository.findByStudyGroup(studyGroup);
    }

    @Transactional
    public List<File> listFilesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        return fileRepository.findByUser(user);
    }

    public String uploadFile(MultipartFile file, FileRequestDto fileRequestDto) {
        String key = UUID.randomUUID() + "_" + file.getOriginalFilename();

        StudyGroup studyGroup = studyGroupRepository.findById(fileRequestDto.getStudyGroupId())
                .orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));
        User user = userRepository.findById(fileRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        try {

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize()); // 파일의 크기를 설정합니다.
            PutObjectRequest request = new PutObjectRequest(bucketName, key, file.getInputStream(), metadata);
            request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크
            PutObjectResult result = s3Client.putObject(request);

            // S3에 업로드 후 메타데이터를 MySQL에 저장
            File fileEntity = new File();
            fileEntity.setFileName(file.getOriginalFilename());
            fileEntity.setFileKey(key);
            fileEntity.setUser(user);
            fileEntity.setStudyGroup(studyGroup);  // 그룹 엔티티를 설정
            fileEntity.setStorageUrl(s3Client.getUrl(bucketName, key).toString());
            fileEntity.setFileSize(file.getSize()); // 파일 크기 저장
            fileRepository.save(fileEntity);

            return key;
        } catch (AmazonServiceException e) {
            logger.error("uploadToAWS AmazonServiceException filePath={}, yyyymm={}, error={}", e.getMessage());
        } catch (SdkClientException e) {
            logger.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        } catch (Exception e) {
            logger.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        }

        return "";
    }

    public void deleteFile(String fileName) {
        try{
            logger.info("Attempting to delete file: {}", fileName);
            s3Client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
            logger.info("File deleted from S3: {}", fileName);
            fileRepository.deleteByStorageUrl(s3Client.getUrl(bucketName, fileName).toString());
        } catch (Exception e) {
        logger.error("Error deleting file from S3: {}", fileName, e);
        throw e;
    }

    }

    public boolean doesFileExist(String fileName) {
        return s3Client.doesObjectExist(bucketName, fileName);
    }

    public List<Map<String, String>> listFiles() {
        List<File> files = fileRepository.findAll();
        return files.stream()
                .map(file -> {
                    Map<String, String> fileMap = new HashMap<>();
                    fileMap.put("fileName", file.getFileName());
                    fileMap.put("fileKey", file.getFileKey());
                    return fileMap;
                })
                .collect(Collectors.toList());
    }


    public boolean downloadFile(String fileKey, String downloadFileName, HttpServletRequest request, HttpServletResponse response) throws BadRequestException {
        if (fileKey == null) {
            return false;
        }
        S3Object fullObject = null;
        try {
            fullObject = s3Client.getObject(bucketName, fileKey);
            if (fullObject == null) {
                return false;
            }
        } catch (AmazonS3Exception e) {
            throw new BadRequestException("다운로드 파일이 존재하지 않습니다.");
        }

        OutputStream os = null;
        FileInputStream fis = null;
        boolean success = false;
        try {
            S3ObjectInputStream objectInputStream = fullObject.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(objectInputStream);

            String fileName = null;
            if(downloadFileName != null) {

                fileName=  getEncodedFilename(request, downloadFileName);
            } else {
                fileName=  getEncodedFilename(request, fileKey);
            }

            response.setContentType("application/octet-stream;charset=UTF-8");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.setHeader( "Content-Disposition", "attachment; filename=\"" + fileName + "\";" );
            response.setHeader("Content-Length", String.valueOf(fullObject.getObjectMetadata().getContentLength()));
            response.setHeader("Set-Cookie", "fileDownload=true; path=/");
            FileCopyUtils.copy(bytes, response.getOutputStream());
            success = true;
        } catch (IOException e) {
            logger.debug(e.getMessage(), e);
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                logger.debug(e.getMessage(), e);
            }
            try {
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                logger.debug(e.getMessage(), e);
            }
        }
        return success;
    }


    private String getEncodedFilename(HttpServletRequest request, String displayFileName) throws UnsupportedEncodingException, UnsupportedEncodingException {
        String header = request.getHeader("User-Agent");

        String encodedFilename = null;
        if (header.indexOf("MSIE") > -1) {
            encodedFilename = URLEncoder.encode(displayFileName, "UTF-8").replaceAll("\\+", "%20");
        } else if (header.indexOf("Trident") > -1) {
            encodedFilename = URLEncoder.encode(displayFileName, "UTF-8").replaceAll("\\+", "%20");
        } else if (header.indexOf("Chrome") > -1) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < displayFileName.length(); i++) {
                char c = displayFileName.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        } else if (header.indexOf("Opera") > -1) {
            encodedFilename = "\"" + new String(displayFileName.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (header.indexOf("Safari") > -1) {
            encodedFilename = URLDecoder.decode("\"" + new String(displayFileName.getBytes("UTF-8"), "8859_1") + "\"", "UTF-8");
        } else {
            encodedFilename = URLDecoder.decode("\"" + new String(displayFileName.getBytes("UTF-8"), "8859_1") + "\"", "UTF-8");
        }
        return encodedFilename;

    }

    public URL generatePresignedUrl(String fileName, String contentType) {
        // 유효 기간 설정 (1일)
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60 * 24; // 1일
        expiration.setTime(expTimeMillis);

        // Content-Disposition 헤더 설정
        ResponseHeaderOverrides headerOverrides = new ResponseHeaderOverrides()
                .withContentDisposition("inline; filename=\"" + fileName + "\"")
                .withContentType(contentType);

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, fileName)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);

        return s3Client.generatePresignedUrl(generatePresignedUrlRequest);
    }

}
