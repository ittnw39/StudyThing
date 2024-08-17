package Study_Match.StudyGroup.service;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.StudyGroup.Repository.StudyGroupRepository;
import Study_Match.StudyGroup.Repository.UserStudyGroupRepository;
import Study_Match.course.Entity.Course;
import Study_Match.course.Repository.CourseRepository;
import Study_Match.user.Entity.User;
import Study_Match.user.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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


    public StudyGroup createStudyGroup(StudyGroup studyGroup) {
        studyGroup.setCreationDate(new Date());
        studyGroup.setCurrentNumber(0);
        return studyGroupRepository.save(studyGroup);
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
        userStudyGroupRepository.save(userStudyGroup);

        return savedStudyGroup;
    }

    public List<StudyGroup> getAllStudyGroups() {
        return studyGroupRepository.findAll();
    }

    public Optional<StudyGroup> getStudyGroupById(Long id) {
        return studyGroupRepository.findById(id);
    }
    public List<StudyGroup> searchStudyGroups(String name) {
        return studyGroupRepository.findByNameContaining(name);
    }

    public List<StudyGroup> getStudyGroupsByCourseId(Long courseId) {
        return studyGroupRepository.findByCourseId(courseId);
    }

    public List<StudyGroup> getStudyGroupsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 유저와 연결된 모든 그룹 ID를 가져옵니다.
        List<Long> groupIds = userStudyGroupRepository.findGroupIdsByUser(user);

        // 그 그룹 ID들을 사용하여 StudyGroup들을 조회합니다.
        return studyGroupRepository.findAllById(groupIds);
    }

    public List<StudyGroup> getStudyGroupsByLeaderId(Long leaderId) {
        return studyGroupRepository.findByLeaderId(leaderId);
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
            return studyGroupRepository.save(studyGroup);
        });
    }
    public void deleteStudyGroup(Long id) {
        studyGroupRepository.deleteById(id);
    }
}
