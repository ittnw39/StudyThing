package Study_Match.user.Service;

import org.springframework.stereotype.Service;

@Service
public class UserValidationService {

    public boolean validatePassword(String password) {
        // 비밀번호가 null이 아닌지 확인
        if (password == null) {
            return false;
        }
        // 유효성 검사 로직: 특수문자, 영문, 숫자 포함 및 한글 제외
        boolean hasUppercase = !password.equals(password.toLowerCase());
        boolean hasLowercase = !password.equals(password.toUpperCase());
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecialChar = password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*");
        boolean hasKorean = password.matches(".*[가-힣].*");

        return hasUppercase && hasLowercase && hasDigit && hasSpecialChar && !hasKorean;
    }

    public boolean validateEmail(String email) {
        // 이메일 유효성 검사 로직 (간단한 예)
        return email != null && email.contains("@");
    }

}
