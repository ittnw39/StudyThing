package Study_Match.studyGroup.Entity;

import Study_Match.course.Entity.Course;
import Study_Match.memo.entity.Memo;
import Study_Match.user.Entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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

    @Column(nullable = false)
    private String recruitmentStatus = "RECRUITING";

    private Date creationDate;

    @OneToMany(mappedBy = "studyGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference("user-studyGroup") // 순환 참조를 막기 위해 사용
    private List<UserStudyGroup> userStudyGroups;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("studyGroup-studyGoal")
    private List<StudyGoal> goals = new ArrayList<>();  // 그룹에 속한 목표 리스트

    @OneToMany(mappedBy = "studyGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("studyGroup-memo")
    private List<Memo> memos;
}
