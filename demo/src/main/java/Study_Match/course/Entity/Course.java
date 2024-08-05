package Study_Match.course.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name="course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(nullable = false)
    private String courseName;

    private String classroom;
    private String professorName;
    private Integer credits;
    private String schedule;
    private String courseDescription;

    @OneToMany(mappedBy = "course")
    private List<UserSchedule> userSchedules;

}
