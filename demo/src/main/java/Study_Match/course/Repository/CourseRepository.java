package Study_Match.course.Repository;

import Study_Match.course.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByNameContainingIgnoreCase(String name);

    List<Course> findByProfessorNameContainingIgnoreCase(String professorName);
}
