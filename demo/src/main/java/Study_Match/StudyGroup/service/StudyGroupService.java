package Study_Match.StudyGroup.service;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.StudyGroup.Repository.StudyGroupRepository;
import Study_Match.StudyGroup.Repository.UserStudyGroupRepository;
import Study_Match.user.Entity.User;
import Study_Match.user.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final UserRepository userRepository;
    private final UserStudyGroupRepository userStudyGroupRepository;
    private final UserStudyGroupService userStudyGroupService;

    @Autowired
    public StudyGroupService(StudyGroupRepository studyGroupRepository, UserRepository userRepository, UserStudyGroupRepository userStudyGroupRepository, UserStudyGroupService userStudyGroupService) {
        this.studyGroupRepository = studyGroupRepository;
        this.userRepository = userRepository;
        this.userStudyGroupRepository = userStudyGroupRepository;
        this.userStudyGroupService = userStudyGroupService;
    }


    public StudyGroup createStudyGroup(StudyGroup studyGroup) {
        studyGroup.setCreationDate(new Date());
        studyGroup.setCurrentNumber(0);
        return studyGroupRepository.save(studyGroup);
    }

    public StudyGroup createStudyGroupWithLeader(StudyGroup studyGroup, User leader) {
        StudyGroup newStudyGroup = studyGroupRepository.save(studyGroup);

        if (newStudyGroup != null) {
            UserStudyGroup userStudyGroup = new UserStudyGroup();
            userStudyGroup.setUser(leader);
            userStudyGroup.setStudyGroup(newStudyGroup);
            userStudyGroupService.save(userStudyGroup);
        }

        return newStudyGroup;
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
        List<UserStudyGroup> userStudyGroups = userStudyGroupRepository.findByUserId(userId);
        return userStudyGroups.stream()
                .map(UserStudyGroup::getStudyGroup)
                .collect(Collectors.toList());
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
