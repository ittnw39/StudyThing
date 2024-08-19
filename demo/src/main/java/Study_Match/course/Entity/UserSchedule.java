package Study_Match.course.Entity;

import Study_Match.user.Entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="user_schedule")
public class UserSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-userSchedule")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonManagedReference("course-userSchedule")
    private Course course;
}
