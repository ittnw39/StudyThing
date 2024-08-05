package Study_Match.course.controller;

import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserSchedule>> getCoursesByUserId(@PathVariable Long userId) {
        List<UserSchedule> userSchedules = courseService.getCoursesByUserId(userId);
        if (userSchedules == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userSchedules);
    }
}
