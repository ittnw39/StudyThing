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
    private StudyGroup group;  // �׷�� �ٴ��� ����

    private String task;       // ��ǥ ����
    private LocalDate dueDate; // ������
    private boolean completed; // �Ϸ� ����

}
