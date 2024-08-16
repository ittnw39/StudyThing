package Study_Match.StudyGroup.Repository;

import Study_Match.StudyGroup.Entity.StudyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyGoalRepository extends JpaRepository<StudyGoal, Long> {
    StudyGoal save(StudyGoal goal);

    List<StudyGoal> findByGroupId(Long groupId);

    void deleteById(Long goalId);
}
