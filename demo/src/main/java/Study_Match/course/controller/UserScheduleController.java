package Study_Match.course.controller;

import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.service.UserScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-schedule")
public class UserScheduleController {

    private final UserScheduleService userScheduleService;

    @Autowired
    public UserScheduleController(UserScheduleService userScheduleService) {
        this.userScheduleService = userScheduleService;
    }

    @PostMapping
    public ResponseEntity<UserSchedule> addCourseToUserSchedule(@RequestParam Long userId, @RequestParam Long courseId) {
        UserSchedule newSchedule = userScheduleService.addCourseToUserSchedule(userId, courseId);
        return ResponseEntity.ok(newSchedule);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserSchedule>> getUserScheduleByUserId(@PathVariable Long userId) {
        List<UserSchedule> userSchedules = userScheduleService.getUserScheduleByUserId(userId);
        return ResponseEntity.ok(userSchedules);
    }
}