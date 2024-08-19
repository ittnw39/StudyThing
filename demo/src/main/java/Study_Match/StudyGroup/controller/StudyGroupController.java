package Study_Match.StudyGroup.controller;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.StudyGroup.Repository.UserStudyGroupRepository;
import Study_Match.user.dto.MemberDTO;
import Study_Match.StudyGroup.service.StudyGroupService;
import Study_Match.StudyGroup.service.UserStudyGroupService;
import Study_Match.user.Entity.User;
import Study_Match.user.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/study")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;
    private final UserService userService;
    private final UserStudyGroupService userStudyGroupService;
    private final UserStudyGroupRepository userStudyGroupRepository;

    @Autowired
    public StudyGroupController(StudyGroupService studyGroupService, UserService userService, UserStudyGroupService userStudyGroupService, UserStudyGroupRepository userStudyGroupRepository) {
        this.studyGroupService = studyGroupService;
        this.userService = userService;
        this.userStudyGroupService = userStudyGroupService;
        this.userStudyGroupRepository = userStudyGroupRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<StudyGroup> createStudyGroup(@RequestBody StudyGroup studyGroup, @RequestParam Long leaderId, @RequestParam Long courseId) {
        if (studyGroup == null || leaderId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        User leader = userService.getUserById(leaderId);

        if (leader == null) {
            return ResponseEntity.badRequest().body(null);
        }

        StudyGroup newStudyGroup = studyGroupService.createStudyGroupWithLeader(studyGroup, courseId, leader);

        return ResponseEntity.ok(newStudyGroup);
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinStudyGroup(@RequestParam Long userId, @RequestParam Long studyGroupId) {
        // ������ ���͵� �׷��� ��ȸ�մϴ�.
        User user = userService.getUserById(userId);
        StudyGroup studyGroup = studyGroupService.getStudyGroupById(studyGroupId).orElse(null);

        if (user == null || studyGroup == null) {
            return ResponseEntity.badRequest().body("Invalid user ID or study group ID.");
        }

        // ������ ���͵� �׷쿡 ���Խ�ŵ�ϴ�.
        userStudyGroupService.addUserToStudyGroup(user, studyGroup);

        return ResponseEntity.ok("User successfully joined the study group.");
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

    @GetMapping("/members/{groupId}")
    public ResponseEntity<List<MemberDTO>> getGroupMembers(@PathVariable Long groupId) {
        List<UserStudyGroup> members = userStudyGroupRepository.findByStudyGroupId(groupId);
        List<MemberDTO> memberDTOs = members.stream()
                .map(usg -> new MemberDTO(usg.getUser().getName(), usg.getUser().getMajor(), usg.isLeader()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(memberDTOs);
    }

}