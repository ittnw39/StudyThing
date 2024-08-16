package Study_Match.StudyGroup.dto;


import lombok.Data;

import java.time.LocalDate;

@Data
public class StudyGoalDTO {
    private Long groupId; // StudyGroup ID
    private String task;  // 목표 내용
    private LocalDate dueDate; // 마감일
}