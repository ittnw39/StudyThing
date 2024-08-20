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

        // ���͵� �׷쿡 ������ �ڽ� ����
        studyGroup.setLeader(leader);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        studyGroup.setCourse(course);

        // ���͵� �׷� ����
        StudyGroup savedStudyGroup = studyGroupRepository.save(studyGroup);

        // UserStudyGroup ��ƼƼ ���� �� ����
        UserStudyGroup userStudyGroup = new UserStudyGroup();
        userStudyGroup.setUser(leader);
        userStudyGroup.setStudyGroup(savedStudyGroup);
        userStudyGroup.setLeader(true); // ���� �÷��� ����
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

        // ������ ����� ��� �׷� ID�� ������
        List<Long> groupIds = userStudyGroupRepository.findGroupIdsByUser(user);

        // �� �׷� ID���� ����Ͽ� StudyGroup���� ��ȸ
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

    // ��������� ���͵� �׷� �˻�
    public List<StudyGroup> searchStudyGroupsByCourseName(String courseName) {
        List<StudyGroup> studyGroups = studyGroupRepository.findByCourseNameContaining(courseName);
        updateGroupMemberCounts(studyGroups);
        return studyGroups;
    }
}
