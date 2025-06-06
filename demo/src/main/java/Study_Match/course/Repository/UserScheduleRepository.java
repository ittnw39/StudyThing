package Study_Match.course.Repository;

import Study_Match.course.Entity.UserSchedule;
import Study_Match.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserScheduleRepository extends JpaRepository<UserSchedule, Long> {
    Optional<UserSchedule> findByUser(User user);
    List<UserSchedule> findByUserId(Long userId);
}
