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

    // JPQL ������ ����� ������ ���� �׷� ID�� �������� �޼��� ����
    @Query("SELECT usg.studyGroup.id FROM UserStudyGroup usg WHERE usg.user = :user")
    List<Long> findGroupIdsByUser(@Param("user") User user);

    boolean existsByUserAndStudyGroup(User user, StudyGroup studyGroup);

    long countByStudyGroup(StudyGroup studyGroup);

    List<User> findUsersByStudyGroup(StudyGroup studyGroup);
}