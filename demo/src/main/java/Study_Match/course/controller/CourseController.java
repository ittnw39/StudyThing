package Study_Match.course.controller;

import Study_Match.course.Entity.Course;
import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCourses(@RequestParam("query") String query, @RequestParam(value = "type", defaultValue = "name") String type) {
        try {
            if ("id".equals(type)) {
                Long id = Long.parseLong(query);
                Course course = courseService.getCourseById(id);
                return ResponseEntity.ok(course);
            } else if ("professor".equals(type)) {
                List<Course> courses = courseService.searchByProfessorName(query);
                return ResponseEntity.ok(courses);
            } else {
                List<Course> courses = courseService.searchByName(query);
                return ResponseEntity.ok(courses);
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid course ID format");
        }
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course newCourse = courseService.saveCourse(course);
        return ResponseEntity.ok(newCourse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(course);
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Course updatedCourse = courseService.updateCourse(id, courseDetails);
        if (updatedCourse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserSchedule>> getCoursesByUserId(@PathVariable Long userId) {
        List<UserSchedule> userSchedules = courseService.getCoursesByUserId(userId);
        if (userSchedules == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userSchedules);
    }
}
