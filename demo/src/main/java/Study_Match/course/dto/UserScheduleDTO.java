package Study_Match.course.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserScheduleDTO {
    private Long id;
    private Long userId;
    private Long courseId;
}
