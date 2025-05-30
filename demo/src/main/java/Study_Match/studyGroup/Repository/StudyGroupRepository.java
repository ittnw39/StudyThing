package Study_Match.studyGroup.Repository;

import Study_Match.studyGroup.Entity.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyGroupRepository extends JpaRepository<StudyGroup, Long> {
    List<StudyGroup> findByNameContaining(String name);
    List<StudyGroup> findByCourseId(Long courseId);
    List<StudyGroup> findByLeaderId(Long leaderId);
    // 과목명으로 스터디 그룹 검색
    List<StudyGroup> findByCourseNameContaining(String courseName);
}
