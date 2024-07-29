package Study_Match.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String password;
    private String email;
    private String studentNumber;
    private String department;
    private String major;
    private int grade;
    private Date registrationDate;

}
