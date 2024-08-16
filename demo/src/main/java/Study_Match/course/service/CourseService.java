package Study_Match.course.service;

import Study_Match.course.Entity.Course;
import Study_Match.course.Entity.UserSchedule;
import Study_Match.course.Repository.CourseRepository;
import Study_Match.course.Repository.UserScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserScheduleRepository userScheduleRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository, UserScheduleRepository userScheduleRepository) {
        this.courseRepository = courseRepository;
        this.userScheduleRepository = userScheduleRepository;
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course updateCourse(Long id, Course courseDetails) {
        return courseRepository.findById(id).map(course -> {
            course.setName(courseDetails.getName());
            course.setClassroom(courseDetails.getClassroom());
            course.setProfessorName(courseDetails.getProfessorName());
            course.setCredits(courseDetails.getCredits());
            course.setSchedule(courseDetails.getSchedule());
            course.setDescription(courseDetails.getDescription());
            return courseRepository.save(course);
        }).orElse(null);
    }

    public boolean deleteCourse(Long id) {
        return courseRepository.findById(id).map(course -> {
            courseRepository.delete(course);
            return true;
        }).orElse(false);
    }

    public List<UserSchedule> getCoursesByUserId(Long userId) {
        return userScheduleRepository.findByUserId(userId);
    }


    // 강좌 이름을 기준으로 검색
    public List<Course> searchByName(String name) {
        return courseRepository.findByNameContainingIgnoreCase(name);
    }
}
