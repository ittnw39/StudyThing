package Study_Match.studyGroup.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class StudyGroupDTO {
    private Long id;
    private String name;
    private Long courseId;
    private Long leaderId;
    private Integer recruitmentNumber;
    private Integer currentNumber;
    private String groupDescription;
    private String recruitmentStatus;
    private String creationDate;
}
