package Study_Match.file.entity;

import Study_Match.StudyGroup.Entity.StudyGroup;
import Study_Match.user.Entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "file")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // 추가
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_group_id", nullable = true)
    @JsonIgnore // 직렬화에서 제외
    private StudyGroup studyGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnore // 직렬화에서 제외
    private User user;  // 유저 필드 추가

    private String fileName;
    private String fileKey;
    private String storageUrl;

    @Column(updatable = false)
    private LocalDateTime uploadedAt = LocalDateTime.now();
}
