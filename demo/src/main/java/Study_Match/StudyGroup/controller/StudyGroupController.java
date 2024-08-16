package Study_Match.StudyGroup.controller;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.service.StudyGroupService;
import Study_Match.StudyGroup.service.UserStudyGroupService;
import Study_Match.user.Entity.User;
import Study_Match.user.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/study")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;
    private final UserService userService;
    private final UserStudyGroupService userStudyGroupService;

    @Autowired
    public StudyGroupController(StudyGroupService studyGroupService, UserService userService, UserStudyGroupService userStudyGroupService) {
        this.studyGroupService = studyGroupService;
        this.userService = userService;
        this.userStudyGroupService = userStudyGroupService;
    }

    @PostMapping("/create")
    public ResponseEntity<StudyGroup> createStudyGroup(@RequestBody StudyGroup studyGroup, @RequestParam Long leaderId) {
        if (studyGroup == null || leaderId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        User leader = userService.getUserById(leaderId);

        if (leader == null) {
            return ResponseEntity.badRequest().body(null);
        }

        StudyGroup newStudyGroup = studyGroupService.createStudyGroupWithLeader(studyGroup, leader);

        return ResponseEntity.ok(newStudyGroup);
    }

    @GetMapping
    public ResponseEntity<List<StudyGroup>> getAllStudyGroups() {
        List<StudyGroup> studyGroups = studyGroupService.getAllStudyGroups();
        return ResponseEntity.ok(studyGroups);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyGroup> getStudyGroupById(@PathVariable Long id) {
        return studyGroupService.getStudyGroupById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<StudyGroup>> searchStudyGroups(@RequestParam String name) {
        List<StudyGroup> studyGroups = studyGroupService.searchStudyGroups(name);
        return ResponseEntity.ok(studyGroups);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudyGroup> updateStudyGroup(@PathVariable Long id, @RequestBody StudyGroup studyGroupDetails) {
        return studyGroupService.updateStudyGroup(id, studyGroupDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudyGroup(@PathVariable Long id) {
        studyGroupService.deleteStudyGroup(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<StudyGroup>> getStudyGroupsByCourseId(@PathVariable Long courseId) {
        List<StudyGroup> studyGroups = studyGroupService.getStudyGroupsByCourseId(courseId);
        return ResponseEntity.ok(studyGroups);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<StudyGroup>> getStudyGroupsByUserId(@PathVariable Long userId) {
        List<StudyGroup> studyGroups = studyGroupService.getStudyGroupsByUserId(userId);
        return ResponseEntity.ok(studyGroups);
    }
}