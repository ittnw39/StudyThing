package Study_Match.course.service;

import Study_Match.course.Entity.Course;
import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.Repository.CourseRepository;
import Study_Match.course.Repository.UserScheduleRepository;
import Study_Match.user.Entity.User;
import Study_Match.user.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserScheduleService {

    private final UserScheduleRepository userScheduleRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public UserScheduleService(UserScheduleRepository userScheduleRepository, UserRepository userRepository, CourseRepository courseRepository) {
        this.userScheduleRepository = userScheduleRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public UserSchedule addCourseToUserSchedule(Long userId, Long courseId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        UserSchedule userSchedule = new UserSchedule();
        userSchedule.setUser(user);
        userSchedule.setCourse(course);

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

    public List<UserSchedule> getUserScheduleByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return userScheduleRepository.findByUser(user);
    }
}
