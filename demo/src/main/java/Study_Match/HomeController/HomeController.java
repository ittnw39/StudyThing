package Study_Match.HomeController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String showLoginPage() {
        return "login/index";
    }

    @GetMapping("/register")
    public String showRegisterPage() {
        return "register/index";
    }

    @GetMapping("/findmyacc")
    public String showFindMyAccountPage() {
        // 비밀번호 찾기 페이지 경로를 추가
        return "findmyacc/index";
    }
}
