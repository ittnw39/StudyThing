package Study_Match.course.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_schedule_courses")
public class UserScheduleCourse {

    @EmbeddedId
    private UserScheduleCourseId id;

    @ManyToOne
    @MapsId("userScheduleId")
    @JoinColumn(name = "user_schedule_id", nullable = false)
    @JsonBackReference("userSchedule-courses")
    private UserSchedule userSchedule;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id", nullable = false)
    @JsonBackReference("course-userScheduleCourses")
    private Course course;
}
