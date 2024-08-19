package Study_Match.studyGroup.service;

import Study_Match.studyGroup.Entity.StudyGoal;
import Study_Match.studyGroup.Entity.StudyGroup;
import Study_Match.studyGroup.Repository.StudyGoalRepository;
import Study_Match.studyGroup.Repository.StudyGroupRepository;
import Study_Match.studyGroup.dto.StudyGoalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StudyGoalService {

    @Autowired
    private StudyGoalRepository studyGoalRepository;

    @Autowired
    private StudyGroupRepository studyGroupRepository;

    public StudyGoal addGoal(StudyGoalDTO studyGoalDTO) {
        StudyGroup group = studyGroupRepository.findById(studyGoalDTO.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        StudyGoal goal = new StudyGoal();
        goal.setGroup(group);
        goal.setTask(studyGoalDTO.getTask());
        goal.setDueDate(studyGoalDTO.getDueDate());
        goal.setCompleted(false); // 기본적으로 미완료 상태로 생성

        return studyGoalRepository.save(goal);
    }

    public List<StudyGoal> getGoalsByGroupId(Long groupId) {
        return studyGoalRepository.findByGroupId(groupId);
    }

    public StudyGoal updateGoalCompletion(Long goalId, boolean completed) {
        StudyGoal goal = studyGoalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        goal.setCompleted(completed);
        return studyGoalRepository.save(goal);
    }

    public boolean deleteGoal(Long goalId) {
        if (!studyGoalRepository.existsById(goalId)) {
            return false; // Goal이 존재하지 않는 경우 false 반환
        }
        studyGoalRepository.deleteById(goalId);
        return true; // 삭제 성공 시 true 반환
    }
}
