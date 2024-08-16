document.getElementById('return').addEventListener('click', function(event) {
    event.preventDefault();
    window.history.back();
});

document.getElementById('submit').addEventListener('click', async function(event) {
    event.preventDefault();

    // 수업 추가 예시
    const courseData = {
        name: "수업명", // 실제 값으로 대체해야 함
        classroom: "강의실",
        professorName: "교수명",
        credits: 3,
        schedule: "월요일 9:00-10:30",
        description: "수업 설명"
    };

    try {
        const response = await fetch('/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok) {
            const newCourse = await response.json();
            console.log('수업 생성 성공:', newCourse);
            // 성공 시 후속 처리
        } else {
            console.error('수업 생성 실패');
        }
    } catch (error) {
        console.error('네트워크 에러:', error);
    }
});

// 수업 삭제 예시
async function deleteCourse(courseId) {
    try {
        const response = await fetch(`/courses/${courseId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('수업 삭제 성공');
            // 성공 시 후속 처리
        } else {
            console.error('수업 삭제 실패');
        }
    } catch (error) {
        console.error('네트워크 에러:', error);
    }
}

// 수업 추가 버튼 클릭 시 이벤트 핸들러
document.querySelectorAll('#add').forEach(button => {
    button.addEventListener('click', async () => {
        const courseId = button.dataset.courseId;
        await addCourseToUserSchedule(courseId);
    });
});

// 수업 삭제 버튼 클릭 시 이벤트 핸들러
document.querySelectorAll('#delete').forEach(button => {
    button.addEventListener('click', async () => {
        const courseId = button.dataset.courseId;
        await deleteCourse(courseId);
    });
});
