package Study_Match.course.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {

    private Long id;
    private String name;
    private String classroom;
    private String professorName;
    private Integer credits;
    private String schedule;
    private String description;

}
