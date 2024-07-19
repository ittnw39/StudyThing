package Study_Match.user.Service;

import Study_Match.user.Entity.User;
import Study_Match.user.Repository.UserRepository;
import Study_Match.user.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserValidationService userValidationService;

    public User login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(password)) {
            return optionalUser.get();
        } else {
            return null;
        }
    }

    public User register(UserDTO userDTO) throws Exception {

        // 유효성 검사
        if (!userValidationService.validateEmail(userDTO.getEmail())) {
            throw new Exception("유효하지 않은 이메일 주소입니다.");
        }
        if (!userValidationService.validatePassword(userDTO.getPassword())) {
            throw new Exception("비밀번호는 최소 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.");
        }

        // 이메일 중복 검사
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new Exception("이미 가입된 이메일입니다");
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setMajor(userDTO.getMajor());
        user.setGrade(userDTO.getGrade());
        user.setRegistrationDate(userDTO.getRegistrationDate());
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {
            existingUser.setName(userDetails.getName());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setPassword(userDetails.getPassword());
            existingUser.setMajor(userDetails.getMajor());
            existingUser.setGrade(userDetails.getGrade());
            existingUser.setRegistrationDate(userDetails.getRegistrationDate());
            return userRepository.save(existingUser);
        } else {
            return null; // 또는 예외를 던질 수 있습니다.
        }
    }

}
