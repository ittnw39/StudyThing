package Study_Match.StudyGroup.Entity;

import Study_Match.course.Entity.Course;
import Study_Match.user.Entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "study_group")
public class StudyGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "leader_id", nullable = false)
    private User leader;

    private int recruitmentNumber;

    private int currentNumber;

    private String groupDescription;

    private String recruitmentStatus;

    private Date creationDate;

    @OneToMany(mappedBy = "studyGroup")
    private List<UserStudyGroup> userStudyGroups;
}
