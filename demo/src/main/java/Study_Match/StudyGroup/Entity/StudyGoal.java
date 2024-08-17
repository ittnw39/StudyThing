package Study_Match.StudyGroup.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "study_goal")
public class StudyGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    @JsonBackReference("studyGroup-studyGoal")
    private StudyGroup group;  // 그룹과 다대일 관계

    private String task;       // 목표 내용
    private LocalDate dueDate; // 마감일
    private boolean completed; // 완료 여부

}
