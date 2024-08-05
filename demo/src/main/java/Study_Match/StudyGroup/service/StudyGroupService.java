package Study_Match.StudyGroup.service;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.StudyGroup.Repository.StudyGroupRepository;
import Study_Match.StudyGroup.Repository.UserStudyGroupRepository;
import Study_Match.user.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudyGroupService {

    @Autowired
    private StudyGroupRepository studyGroupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStudyGroupRepository userStudyGroupRepository;

    public StudyGroup createStudyGroup(StudyGroup studyGroup) {
        studyGroup.setCreationDate(new Date());
        studyGroup.setCurrentNumber(0);
        return studyGroupRepository.save(studyGroup);
    }

    public List<StudyGroup> getAllStudyGroups() {
        return studyGroupRepository.findAll();
    }

    public StudyGroup getStudyGroupById(Long id) {
        return studyGroupRepository.findById(id).orElse(null);
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

    public StudyGroup updateStudyGroup(Long id, StudyGroup studyGroupDetails) {
        StudyGroup studyGroup = studyGroupRepository.findById(id).orElse(null);
        if (studyGroup != null) {
            studyGroup.setName(studyGroupDetails.getName());
            studyGroup.setCourse(studyGroupDetails.getCourse());
            studyGroup.setLeader(studyGroupDetails.getLeader());
            studyGroup.setRecruitmentNumber(studyGroupDetails.getRecruitmentNumber());
            studyGroup.setCurrentNumber(studyGroupDetails.getCurrentNumber());
            studyGroup.setGroupDescription(studyGroupDetails.getGroupDescription());
            studyGroup.setRecruitmentStatus(studyGroupDetails.getRecruitmentStatus());
            return studyGroupRepository.save(studyGroup);
        }
        return null;
    }

    public void deleteStudyGroup(Long id) {
        studyGroupRepository.deleteById(id);
    }
}
