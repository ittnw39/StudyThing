package Study_Match.course.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserScheduleDTO {
    private Long id;
    private Long userId;
    private List<CourseDTO> courses; // 이 부분 추가
}
