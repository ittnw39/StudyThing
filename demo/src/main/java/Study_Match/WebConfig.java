package Study_Match;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/users/login")
                .allowedOrigins("http://localhost:8080") // 프론트엔드 URL로 변경
                .allowedMethods("POST")
                .allowCredentials(true);
    }

//    @Override
//    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addRedirectViewController("/timetable/index.html", "/timetable/");
//        registry.addRedirectViewController("/search/index.html", "/search/");
//        registry.addRedirectViewController("/my/index.html", "/my/");
//    }
}
