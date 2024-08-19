package Study_Match.course.service;

import Study_Match.course.Entity.Course;
import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.Entity.UserScheduleCourse;
import Study_Match.course.Entity.UserScheduleCourseId;
import Study_Match.course.Repository.CourseRepository;
import Study_Match.course.Repository.UserScheduleRepository;
import Study_Match.course.dto.CourseDTO;
import Study_Match.course.dto.UserScheduleDTO;
import Study_Match.user.Entity.User;
import Study_Match.user.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public UserSchedule addCoursesToUserSchedule(Long userId, List<Long> courseIds) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSchedule userSchedule = userScheduleRepository.findByUser(user).orElse(null);
        if (userSchedule == null) {
            userSchedule = new UserSchedule();
            userSchedule.setUser(user);
            userSchedule = userScheduleRepository.save(userSchedule); // 여기에서 ID 생성
        }

        for (Long courseId : courseIds) {
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            UserScheduleCourseId userScheduleCourseId = new UserScheduleCourseId(userSchedule.getId(), course.getId());
            UserScheduleCourse userScheduleCourse = new UserScheduleCourse();
            userScheduleCourse.setId(userScheduleCourseId);
            userScheduleCourse.setUserSchedule(userSchedule);
            userScheduleCourse.setCourse(course);

            userSchedule.getUserScheduleCourses().add(userScheduleCourse);
        }

        return userScheduleRepository.save(userSchedule); // 최종적으로 한 번만 저장
    }

    public boolean deleteUserSchedule(Long id) {
        if (userScheduleRepository.existsById(id)) {
            userScheduleRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public List<UserScheduleDTO> getUserScheduleByUserId(Long userId) {
        List<UserSchedule> userSchedules = userScheduleRepository.findByUserId(userId);

        return userSchedules.stream().map(userSchedule -> {
            List<CourseDTO> courseDTOs = userSchedule.getUserScheduleCourses().stream()
                    .map(userScheduleCourse -> {
                        Course course = userScheduleCourse.getCourse();
                        return new CourseDTO(course.getId(), course.getName(), course.getClassroom(),
                                course.getProfessorName(), course.getCredits(), course.getLectureTime(),
                                course.getSchedule(), course.getDescription());
                    })
                    .collect(Collectors.toList());

            return new UserScheduleDTO(userSchedule.getId(), userSchedule.getUser().getId(), courseDTOs);
        }).collect(Collectors.toList());
    }
}
