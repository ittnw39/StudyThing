package Study_Match.StudyGroup.service;

import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.StudyGroup.Repository.UserStudyGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStudyGroupService {
    @Autowired
    private UserStudyGroupRepository userStudyGroupRepository;

    public void save(UserStudyGroup userStudyGroup) {
        userStudyGroupRepository.save(userStudyGroup);
    }
}
