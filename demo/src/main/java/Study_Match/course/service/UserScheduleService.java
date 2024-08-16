package Study_Match.course.service;

import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.Repository.UserScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserScheduleService {
    private final UserScheduleRepository userScheduleRepository;

    @Autowired
    public UserScheduleService(UserScheduleRepository userScheduleRepository) {
        this.userScheduleRepository = userScheduleRepository;
    }

    public UserSchedule addUserSchedule(UserSchedule userSchedule) {
        return userScheduleRepository.save(userSchedule);
    }

    public boolean deleteUserSchedule(Long id) {
        if (userScheduleRepository.existsById(id)) {
            userScheduleRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public List<UserSchedule> getSchedulesByUserId(Long userId) {
        return userScheduleRepository.findByUserId(userId);
    }
}
