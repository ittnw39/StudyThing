package Study_Match.StudyGroup.Repository;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserStudyGroupRepository extends JpaRepository<UserStudyGroup, Long> {

    List<UserStudyGroup> findByUser(User user);
    List<UserStudyGroup> findByStudyGroupId(Long studyGroupId);

    // JPQL 쿼리를 사용해 유저가 속한 그룹 ID를 가져오는 메서드 정의
    @Query("SELECT usg.studyGroup.id FROM UserStudyGroup usg WHERE usg.user = :user")
    List<Long> findGroupIdsByUser(@Param("user") User user);

    boolean existsByUserAndStudyGroup(User user, StudyGroup studyGroup);

    long countByStudyGroup(StudyGroup studyGroup);

    List<User> findUsersByStudyGroup(StudyGroup studyGroup);
}