package Study_Match.course.Repository;

import Study_Match.course.Entity.UserSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserScheduleRepository extends JpaRepository<UserSchedule, Long> {
    List<UserSchedule> findByUserId(Long userId);
}
