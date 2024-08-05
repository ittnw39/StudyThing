package Study_Match.course.service;

import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.Repository.UserScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private UserScheduleRepository userScheduleRepository;

    public List<UserSchedule> getCoursesByUserId(Long userId) {
        return userScheduleRepository.findByUserId(userId);
    }
}
