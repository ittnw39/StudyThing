package Study_Match.memo.repository;

import Study_Match.memo.entity.Memo;
import Study_Match.studyGroup.Entity.StudyGroup;
import Study_Match.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    List<Memo> findByStudyGroupId(Long studyGroupId);
}