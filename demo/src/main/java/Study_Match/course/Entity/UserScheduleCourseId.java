package Study_Match.course.Entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserScheduleCourseId implements Serializable {

    private Long userScheduleId;
    private Long courseId;

    // Getters and setters (if not using Lombok)
}
