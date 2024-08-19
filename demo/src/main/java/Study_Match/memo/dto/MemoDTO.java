package Study_Match.memo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemoDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long studyGroupId;
    private String content;
    private LocalDateTime createdAt;

}
