package Study_Match.studyGroup.Repository;

import Study_Match.studyGroup.Entity.StudyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyGoalRepository extends JpaRepository<StudyGoal, Long> {
    StudyGoal save(StudyGoal goal);

    List<StudyGoal> findByGroupId(Long groupId);

    void deleteById(Long goalId);
}
