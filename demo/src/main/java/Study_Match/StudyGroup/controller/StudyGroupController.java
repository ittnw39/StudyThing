package Study_Match.StudyGroup.controller;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.service.StudyGroupService;
import Study_Match.course.Entity.UserSchedule;
import Study_Match.user.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/study")
public class StudyGroupController {

    @Autowired
    private StudyGroupService studyGroupService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<StudyGroup> createStudyGroup(@RequestBody StudyGroup studyGroup) {
        StudyGroup newStudyGroup = studyGroupService.createStudyGroup(studyGroup);
        return ResponseEntity.ok(newStudyGroup);
    }

    @GetMapping
    public ResponseEntity<List<StudyGroup>> getAllStudyGroups() {
        List<StudyGroup> studyGroups = studyGroupService.getAllStudyGroups();
        return ResponseEntity.ok(studyGroups);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyGroup> getStudyGroupById(@PathVariable Long id) {
        StudyGroup studyGroup = studyGroupService.getStudyGroupById(id);
        if (studyGroup == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(studyGroup);
    }

    @GetMapping("/search")
    public ResponseEntity<List<StudyGroup>> searchStudyGroups(@RequestParam String name) {
        List<StudyGroup> studyGroups = studyGroupService.searchStudyGroups(name);
        return ResponseEntity.ok(studyGroups);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudyGroup> updateStudyGroup(@PathVariable Long id, @RequestBody StudyGroup studyGroupDetails) {
        StudyGroup updatedStudyGroup = studyGroupService.updateStudyGroup(id, studyGroupDetails);
        if (updatedStudyGroup == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedStudyGroup);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudyGroup(@PathVariable Long id) {
        studyGroupService.deleteStudyGroup(id);
        return ResponseEntity.noContent().build();
    }

    //과목명으로 그룹조회
    @GetMapping("/{courseId}")
    public ResponseEntity<List<StudyGroup>> getStudyGroupsByCourseId(@PathVariable Long userId, @PathVariable Long courseId) {
        List<StudyGroup> studyGroups = studyGroupService.getStudyGroupsByCourseId(courseId);
        return ResponseEntity.ok(studyGroups);
    }

    //사용자아이디로 그룹찾기
    @GetMapping("/{userId}")
    public ResponseEntity<List<StudyGroup>> getStudyGroupsByUserId(@PathVariable Long userId) {
        List<StudyGroup> studyGroups = studyGroupService.getStudyGroupsByUserId(userId);
        return ResponseEntity.ok(studyGroups);
    }
}