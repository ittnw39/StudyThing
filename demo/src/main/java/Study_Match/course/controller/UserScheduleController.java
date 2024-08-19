package Study_Match.course.controller;

import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.dto.UserScheduleDTO;
import Study_Match.course.service.UserScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user-schedule")
public class UserScheduleController {

    private final UserScheduleService userScheduleService;

    @Autowired
    public UserScheduleController(UserScheduleService userScheduleService) {
        this.userScheduleService = userScheduleService;
    }

    @PostMapping
    public ResponseEntity<UserSchedule> addCourseToUserSchedule(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        List<Long> courseIds = ((List<?>) payload.get("courseIds")).stream()
                .map(id -> Long.valueOf(id.toString()))
                .collect(Collectors.toList());

        UserSchedule newSchedule = userScheduleService.addCoursesToUserSchedule(userId, courseIds);
        return ResponseEntity.ok(newSchedule);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserScheduleDTO>> getUserScheduleByUserId(@PathVariable Long userId) {
        List<UserScheduleDTO> userSchedules = userScheduleService.getUserScheduleByUserId(userId);
        return ResponseEntity.ok(userSchedules);
    }
}