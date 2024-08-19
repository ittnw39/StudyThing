package Study_Match.course.Entity;

import Study_Match.user.Entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="user_schedule")
public class UserSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-userSchedule")
    private User user;

    @OneToMany(mappedBy = "userSchedule", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("userSchedule-courses")
    private List<UserScheduleCourse> userScheduleCourses = new ArrayList<>();
}
