package Study_Match.file.repository;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.file.entity.File;
import Study_Match.user.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {

    @Transactional
    void deleteByStorageUrl(String storageUrl);

    boolean existsByStorageUrl(String storageUrl);

    @Transactional
    List<File> findByStudyGroup(StudyGroup studyGroup);

    @Transactional
    List<File> findByUser(User user);

}
