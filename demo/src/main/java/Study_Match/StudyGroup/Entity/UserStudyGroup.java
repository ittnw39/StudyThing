package Study_Match.StudyGroup.Entity;

import Study_Match.user.Entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="user_study_group")
public class UserStudyGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-studyGroup")
    private User user;

    @ManyToOne
    @JoinColumn(name = "study_group_id", nullable = false)
    @JsonBackReference("studyGroup-userStudyGroup")
    private StudyGroup studyGroup;
}
