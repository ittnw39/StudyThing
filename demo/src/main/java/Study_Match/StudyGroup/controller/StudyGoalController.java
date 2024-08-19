package Study_Match.StudyGroup.controller;

import Study_Match.StudyGroup.Entity.StudyGoal;
import Study_Match.StudyGroup.dto.StudyGoalDTO;
import Study_Match.StudyGroup.service.StudyGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/study-goals")
public class StudyGoalController {

    private final StudyGoalService studyGoalService;

    @Autowired
    public StudyGoalController(StudyGoalService studyGoalService) {
        this.studyGoalService = studyGoalService;
    }
    @PostMapping
    public ResponseEntity<StudyGoal> createStudyGoal(@RequestBody StudyGoalDTO studyGoalDTO) {
        if (studyGoalDTO == null) {
            return ResponseEntity.badRequest().build();
        }

        StudyGoal newGoal = studyGoalService.addGoal(studyGoalDTO);
        return ResponseEntity.ok(newGoal);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<List<StudyGoal>> getStudyGoalsByGroupId(@PathVariable Long groupId) {
        List<StudyGoal> goals = studyGoalService.getGoalsByGroupId(groupId);
        return ResponseEntity.ok(goals); // 목표가 없으면 빈 리스트 반환
    }

    @PutMapping("/{goalId}/completion")
    public ResponseEntity<StudyGoal> updateGoalCompletion(@PathVariable Long goalId, @RequestBody Map<String, Boolean> updateData) {
        if (updateData == null || !updateData.containsKey("completed")) {
            return ResponseEntity.badRequest().build();
        }

        StudyGoal updatedGoal = studyGoalService.updateGoalCompletion(goalId, updateData.get("completed"));
        if (updatedGoal == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedGoal);
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long goalId) {
        boolean deleted = studyGoalService.deleteGoal(goalId);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}

