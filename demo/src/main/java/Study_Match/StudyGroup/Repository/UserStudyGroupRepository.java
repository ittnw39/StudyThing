package Study_Match.StudyGroup.Repository;

import Study_Match.StudyGroup.Entity.UserStudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserStudyGroupRepository extends JpaRepository<UserStudyGroup, Long> {

    List<UserStudyGroup> findByUserId(Long userId);
    List<UserStudyGroup> findByStudyGroupId(Long studyGroupId);
}