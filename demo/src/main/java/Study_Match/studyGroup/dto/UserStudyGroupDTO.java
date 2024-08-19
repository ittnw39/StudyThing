package Study_Match.studyGroup.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserStudyGroupDTO {
    private Long id;
    private Long userId;
    private Long groupId;
}
