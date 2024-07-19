package Study_Match.course.Repository;

import Study_Match.course.Entity.UserSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserScheduleRepository extends JpaRepository<UserSchedule, Long> {
}
