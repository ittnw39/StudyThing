package Study_Match;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
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
}
