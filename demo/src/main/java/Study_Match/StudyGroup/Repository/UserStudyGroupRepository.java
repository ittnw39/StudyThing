package Study_Match.StudyGroup.Repository;

import Study_Match.StudyGroup.Entity.UserStudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStudyGroupRepository extends JpaRepository<UserStudyGroup, Long> {
}