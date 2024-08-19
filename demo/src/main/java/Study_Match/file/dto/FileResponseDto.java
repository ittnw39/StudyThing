package Study_Match.file.dto;

import Study_Match.file.entity.File;
import lombok.Data;

@Data
public class FileResponseDto {
    private Long id;
    private String fileName;
    private String fileKey;
    private String storageUrl;
    private long fileSize;
    private Long userId; // userId �߰�

    public FileResponseDto(File file) {
        this.id = file.getId();
        this.fileName = file.getFileName();
        this.fileKey = file.getFileKey();
        this.storageUrl = file.getStorageUrl();
        this.fileSize = file.getFileSize();
        this.userId = file.getUser().getId(); // User ��ƼƼ�� ID�� DTO�� �߰�
    }
}
