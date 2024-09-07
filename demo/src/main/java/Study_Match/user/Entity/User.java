package Study_Match.user.Entity;

import Study_Match.memo.entity.Memo;
import Study_Match.studyGroup.Entity.UserStudyGroup;
import Study_Match.course.Entity.UserSchedule;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column(nullable = true)
    private String department;

    private int grade;

    @Column(nullable = false)
    private Date registrationDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-studyGroup")
    private List<UserStudyGroup> userStudyGroups;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-memo")
    private List<Memo> memos;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-userSchedule")
    private UserSchedule userSchedule;

    private boolean isLeader;

}
