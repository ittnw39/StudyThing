(function () {
    const modify_icon = document.getElementById('modify-timetable');
    const timetableContainer = document.querySelector('.timetable-container');

    // 현재 로그인된 사용자의 ID를 가져옴
    const userId = localStorage.getItem('userId'); // 실제 사용자의 ID로 대체해야 합니다.

    // 시간표 데이터를 백엔드에서 가져오기
    async function loadTimetable() {
        try {
            const response = await fetch(`/user-schedule/user/${userId}`);
            if (response.ok) {
                const userSchedules = await response.json();
                renderTimetable(userSchedules);
            } else {
                console.error('Failed to load timetable data.');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }
    // 시간표 데이터를 HTML로 렌더링하는 함수
    function renderTimetable(userSchedules) {
        const timetable = document.getElementById('timetable');

        // 기존 시간표 비우기
        timetable.querySelectorAll('.course-block').forEach(block => block.remove());

        userSchedules.forEach(schedule => {
            const block = document.createElement('div');
            block.className = 'course-block';
            block.innerHTML = `
            <span class="course-name">${schedule.course.name}</span><br>
            <span class="course-time">${schedule.dayOfWeek} ${schedule.startTime} - ${schedule.endTime}</span><br>
            <span class="course-classroom">${schedule.course.classroom}</span>
        `;
            block.style.gridColumn = getDayColumn(schedule.dayOfWeek);
            block.style.gridRow = getTimeRow(schedule.startTime, schedule.endTime);
            timetable.appendChild(block);
        });
    }

    // 요일을 그리드 컬럼 번호로 변환하는 함수
    function getDayColumn(dayOfWeek) {
        const days = ['월', '화', '수', '목', '금'];
        return days.indexOf(dayOfWeek) + 2; // '월'이 2번 컬럼부터 시작
    }

    // 시간을 그리드 행 번호로 변환하는 함수
    function getTimeRow(startTime, endTime) {
        const startHour = parseInt(startTime.split(':')[0], 10);
        const endHour = parseInt(endTime.split(':')[0], 10);
        return `${startHour - 8 + 1} / span ${endHour - startHour}`; // 8시부터 시작한다고 가정
    }

    // 페이지 로드 시 시간표 불러오기
    document.addEventListener('DOMContentLoaded', loadTimetable);

    // 시간표 수정 아이콘 클릭 시 이벤트
    modify_icon.addEventListener("click", () => {
        window.location.href = "/timetable/create_timetable.html";
    });

    // 과목 추가 버튼 클릭 이벤트 예시
    document.getElementById('add-course-btn').addEventListener('click', async () => {
        const courseId = document.getElementById('course-select').value;
        const dayOfWeek = document.getElementById('day-of-week').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        const scheduleDetails = { dayOfWeek, startTime, endTime };
        const response = await fetch(`/user-schedule?userId=${userId}&courseId=${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleDetails),
        });

        if (response.ok) {
            loadTimetable(); // 시간표 새로고침
        } else {
            console.error('Failed to add course to timetable.');
        }
    });

})();
