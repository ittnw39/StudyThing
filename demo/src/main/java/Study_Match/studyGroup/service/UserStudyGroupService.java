package Study_Match.studyGroup.service;

import Study_Match.studyGroup.Entity.StudyGroup;
import Study_Match.studyGroup.Entity.UserStudyGroup;
import Study_Match.studyGroup.Repository.UserStudyGroupRepository;
import Study_Match.user.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStudyGroupService {
    @Autowired
    private UserStudyGroupRepository userStudyGroupRepository;

    public void save(UserStudyGroup userStudyGroup) {
        userStudyGroupRepository.save(userStudyGroup);
    }

    public void addUserToStudyGroup(User user, StudyGroup studyGroup) {
        // 이미 해당 유저가 스터디 그룹에 가입되어 있는지 확인합니다.
        if (userStudyGroupRepository.existsByUserAndStudyGroup(user, studyGroup)) {
            throw new RuntimeException("User is already a member of this study group.");
        }

        // 유저와 스터디 그룹을 연결하는 엔티티를 생성하고 저장합니다.
        UserStudyGroup userStudyGroup = new UserStudyGroup();
        userStudyGroup.setUser(user);
        userStudyGroup.setStudyGroup(studyGroup);
        userStudyGroupRepository.save(userStudyGroup);
    }

    public boolean isUserInStudyGroup(User user, StudyGroup studyGroup) {
        return userStudyGroupRepository.existsByUserAndStudyGroup(user, studyGroup);
    }
}
