package Study_Match.course.Entity;

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
@Table(name="course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @Column(nullable = false, name="course_name")
    private String name;

    private String classroom;

    @Column(nullable = false, name="professor_name")
    private String professorName;

    private Integer credits;

    private String schedule;

    @Column(nullable = false, name="lecture_time")
    private String lectureTime;

    @Column(nullable = false, name="course_description")
    private String description;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference("course-userScheduleCourses")
    private List<UserScheduleCourse> userScheduleCourses = new ArrayList<>();

}
