package Study_Match.studyGroup.service;

import Study_Match.studyGroup.Entity.StudyGroup;
import Study_Match.studyGroup.Entity.UserStudyGroup;
import Study_Match.studyGroup.Repository.StudyGroupRepository;
import Study_Match.studyGroup.Repository.UserStudyGroupRepository;
import Study_Match.course.Entity.Course;
import Study_Match.course.Repository.CourseRepository;
import Study_Match.user.Entity.User;
import Study_Match.user.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final UserRepository userRepository;
    private final UserStudyGroupRepository userStudyGroupRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public StudyGroupService(StudyGroupRepository studyGroupRepository, UserStudyGroupRepository userStudyGroupRepository, CourseRepository courseRepository, UserRepository userRepository) {
        this.studyGroupRepository = studyGroupRepository;
        this.userStudyGroupRepository = userStudyGroupRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public StudyGroup createStudyGroupWithLeader(StudyGroup studyGroup, Long courseId, User leader) {

        // 스터디 그룹에 리더와 코스 설정
        studyGroup.setLeader(leader);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        studyGroup.setCourse(course);

        // 스터디 그룹 저장
        StudyGroup savedStudyGroup = studyGroupRepository.save(studyGroup);

        // UserStudyGroup 엔티티 생성 및 저장
        UserStudyGroup userStudyGroup = new UserStudyGroup();
        userStudyGroup.setUser(leader);
        userStudyGroup.setStudyGroup(savedStudyGroup);
        userStudyGroup.setLeader(true); // 리더 플래그 설정
        userStudyGroupRepository.save(userStudyGroup);

        return savedStudyGroup;
    }

    public List<StudyGroup> getAllStudyGroups() {
        List<StudyGroup> studyGroups = studyGroupRepository.findAll();
        updateGroupMemberCounts(studyGroups);
        return studyGroups;
    }

    public Optional<StudyGroup> getStudyGroupById(Long id) {
        Optional<StudyGroup> studyGroup = studyGroupRepository.findById(id);
        studyGroup.ifPresent(this::updateGroupMemberCount);
        return studyGroup;
    }

    public List<StudyGroup> searchStudyGroups(String name) {
        List<StudyGroup> studyGroups = studyGroupRepository.findByNameContaining(name);
        updateGroupMemberCounts(studyGroups);
        return studyGroups;
    }

    public List<StudyGroup> getStudyGroupsByCourseId(Long courseId) {
        List<StudyGroup> studyGroups = studyGroupRepository.findByCourseId(courseId);
        updateGroupMemberCounts(studyGroups);
        return studyGroups;
    }

    public List<StudyGroup> getStudyGroupsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 유저와 연결된 모든 그룹 ID를 가져옴
        List<Long> groupIds = userStudyGroupRepository.findGroupIdsByUser(user);

        // 그 그룹 ID들을 사용하여 StudyGroup들을 조회
        List<StudyGroup> studyGroups = studyGroupRepository.findAllById(groupIds);
        updateGroupMemberCounts(studyGroups);
        return studyGroups;
    }

    public List<StudyGroup> getStudyGroupsByLeaderId(Long leaderId) {
        List<StudyGroup> studyGroups = studyGroupRepository.findByLeaderId(leaderId);
        updateGroupMemberCounts(studyGroups);
        return studyGroups;
    }

    public Optional<StudyGroup> updateStudyGroup(Long id, StudyGroup studyGroupDetails) {
        return studyGroupRepository.findById(id).map(studyGroup -> {
            studyGroup.setName(studyGroupDetails.getName());
            studyGroup.setCourse(studyGroupDetails.getCourse());
            studyGroup.setLeader(studyGroupDetails.getLeader());
            studyGroup.setRecruitmentNumber(studyGroupDetails.getRecruitmentNumber());
            studyGroup.setCurrentNumber(studyGroupDetails.getCurrentNumber());
            studyGroup.setGroupDescription(studyGroupDetails.getGroupDescription());
            studyGroup.setRecruitmentStatus(studyGroupDetails.getRecruitmentStatus());

            updateGroupMemberCount(studyGroup);

            return studyGroupRepository.save(studyGroup);
        });
    }
    public void deleteStudyGroup(Long id) {
        studyGroupRepository.deleteById(id);
    }



    private void updateGroupMemberCount(StudyGroup studyGroup) {
        long memberCount = userStudyGroupRepository.countByStudyGroup(studyGroup);
        studyGroup.setCurrentNumber((int) memberCount);

        if (memberCount >= studyGroup.getRecruitmentNumber()) {
            studyGroup.setRecruitmentStatus("CLOSED");
        } else {
            studyGroup.setRecruitmentStatus("RECRUITING");
        }

        studyGroupRepository.save(studyGroup);
    }

    private void updateGroupMemberCounts(List<StudyGroup> studyGroups) {
        for (StudyGroup studyGroup : studyGroups) {
            updateGroupMemberCount(studyGroup);
        }
    }

    public List<User> getMembersByGroupId(Long groupId) {
        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        return userStudyGroupRepository.findUsersByStudyGroup(studyGroup);
    }

    // 과목명으로 스터디 그룹 검색
    public List<StudyGroup> searchStudyGroupsByCourseName(String courseName) {
        List<StudyGroup> studyGroups = studyGroupRepository.findByCourseNameContaining(courseName);
        updateGroupMemberCounts(studyGroups);
        return studyGroups;
    }
}
