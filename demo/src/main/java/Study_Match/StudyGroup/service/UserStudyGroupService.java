package Study_Match.StudyGroup.service;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.StudyGroup.Repository.UserStudyGroupRepository;
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
        // �̹� �ش� ������ ���͵� �׷쿡 ���ԵǾ� �ִ��� Ȯ���մϴ�.
        if (userStudyGroupRepository.existsByUserAndStudyGroup(user, studyGroup)) {
            throw new RuntimeException("User is already a member of this study group.");
        }

        // ������ ���͵� �׷��� �����ϴ� ��ƼƼ�� �����ϰ� �����մϴ�.
        UserStudyGroup userStudyGroup = new UserStudyGroup();
        userStudyGroup.setUser(user);
        userStudyGroup.setStudyGroup(studyGroup);
        userStudyGroupRepository.save(userStudyGroup);
    }
}
