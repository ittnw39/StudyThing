package Study_Match.course.controller;

import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.service.UserScheduleService;
import Study_Match.course.Entity.Course;
import Study_Match.user.Entity.User;
import Study_Match.user.Service.UserService;
import Study_Match.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-schedule")
public class UserScheduleController {

    private final UserScheduleService userScheduleService;
    private final CourseService courseService;
    private final UserService userService;

    @Autowired
    public UserScheduleController(UserScheduleService userScheduleService, CourseService courseService, UserService userService) {
        this.userScheduleService = userScheduleService;
        this.courseService = courseService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserSchedule> addCourseToSchedule(@RequestParam Long userId, @RequestParam Long courseId, @RequestBody UserSchedule scheduleDetails) {
        User user = userService.getUserById(userId);
        Course course = courseService.getCourseById(courseId);

        if (user == null || course == null) {
            return ResponseEntity.badRequest().build();
        }

        scheduleDetails.setUser(user);
        scheduleDetails.setCourse(course);

        UserSchedule newSchedule = userScheduleService.addUserSchedule(scheduleDetails);
        return ResponseEntity.ok(newSchedule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeCourseFromSchedule(@PathVariable Long id) {
        boolean deleted = userScheduleService.deleteUserSchedule(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserSchedule>> getUserSchedule(@PathVariable Long userId) {
        List<UserSchedule> userSchedules = userScheduleService.getSchedulesByUserId(userId);
        if (userSchedules == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userSchedules);
    }
}