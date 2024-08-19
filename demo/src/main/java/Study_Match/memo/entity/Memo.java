package Study_Match.memo.entity;

import Study_Match.studyGroup.Entity.StudyGroup;
import Study_Match.user.Entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "memo")
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-memo")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_group_id", nullable = false)
    @JsonBackReference("studyGroup-memo")
    private StudyGroup studyGroup;

    @Column(nullable = false, length = 255)
    private String content;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
