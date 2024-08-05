package Study_Match.user.Entity;

import Study_Match.StudyGroup.Entity.UserStudyGroup;
import Study_Match.course.Entity.UserSchedule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Table(name="user")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "student_number", nullable = false)
    private String studentNumber;

    @Column(nullable = false)
    private String department;

    private String major;

    private int grade;

    private Date registrationDate;

    @OneToMany(mappedBy = "user")
    private List<UserStudyGroup> userStudyGroups;

    @OneToMany(mappedBy = "user")
    private List<UserSchedule> userSchedules;

}
