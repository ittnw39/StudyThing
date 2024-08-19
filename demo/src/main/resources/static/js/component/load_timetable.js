(function () {
    const timetable = document.getElementById('timetable');
    const timetableContainer = document.querySelector('.timetable-container');
    const days = ['월', '화', '수', '목', '금'];
    const startHour = 9;
    const endHour = 18;
    const colors = [
        "#E57373", "#EF9A9A", "#FFCDD2", // Red
        "#F06292", "#F48FB1", "#F8BBD0", // Pink
        "#AB47BC", "#CE93D8", "#E1BEE7", // Purple
        "#5C6BC0", "#9FA8DA", "#C5CAE9", // Indigo
        "#64B5F6", "#90CAF9", "#BBDEFB", // Blue
        "#4FC3F7", "#81D4FA", "#B3E5FC", // Light Blue
        "#4DD0E1", "#80DEEA", "#B2EBF2", // Cyan
        "#4DB6AC", "#80CBC4", "#B2DFDB", // Teal
        "#81C784", "#A5D6A7", "#C8E6C9", // Green
        "#AED581", "#C5E1A5", "#DCE775", // Light Green
        "#D4E157", "#E6EE9C", "#F0F4C3", // Lime
        "#FFF176", "#FFEB3B", "#FFF9C4", // Yellow
        "#FFB74D", "#FFCC80", "#FFE0B2", // Orange
        "#FF7043", "#FF8A65", "#FFAB91", // Deep Orange
    ];

    //9시~18시 grid 생성(한줄씩)
    for (let hour = startHour; hour < endHour; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time';
        timeSlot.textContent = `${hour}`;
        timetable.appendChild(timeSlot);

        for (let day = 0; day < 5; day++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.time = `${hour}`;
            cell.dataset.day = days[day];
            timetable.appendChild(cell);
        }
    }

    const courseColors = {};

    // 수업명에 따른 색상을 가져오는 함수
    function getColorForCourse(courseName) {
        if (!courseColors[courseName]) {
            // 사용 가능한 색상 중에서 랜덤 색상 선택
            const availableColors = colors.filter(color => !Object.values(courseColors).includes(color));
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            courseColors[courseName] = availableColors[randomIndex];
        }
        return courseColors[courseName];
    }

    function timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    //수업 분 구하는 함수 spliTime -> calculateDuration
    function splitTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return { hours, minutes };
    }
    function calculateDuration(startTime, endTime) {
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        return endMinutes - startMinutes;
    }

    //셀 위치구하기
    function getCellPosition(cell) {
        const rect = cell.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        const width = rect.width;
        return { top, left, width };
    }

    // 새로운 div를 생성하고 스타일을 설정하는 함수
    function createOverlayDiv(cell, startTime, durationMinutes, color, courseName, classroom) {
        // 셀의 위치와 크기 정보를 얻기
        const { top, left, width } = getCellPosition(cell);

        // 시작 시간의 분을 계산
        const { minutes: startMinutes } = splitTime(startTime);

        const overlayTop = top + (startMinutes);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.style.position = 'absolute';
        overlay.style.top = `${overlayTop}px`;
        overlay.style.left = `${left - 0.25}px`; //오차 0.25px
        overlay.style.width = `${width}px`;
        overlay.style.height = `${durationMinutes}px`; //1시간에 60px
        overlay.style.backgroundColor = color;
        overlay.style.zIndex = '100';

        // 내부 콘텐츠를 설정
        const content = document.createElement('div');
        content.style.position = 'absolute';
        content.style.top = '0';
        content.style.left = '0';
        content.style.width = '100%';
        content.style.padding = '5px';
        content.style.fontSize = '12px';
        content.style.whiteSpace = 'nowrap'; 
        content.style.overflow = 'hidden'; 
        content.style.textOverflow = 'ellipsis'; 

        content.innerHTML = `<strong>${courseName}</strong><br>(${classroom})`;

        // 오버레이에 콘텐츠 추가
        overlay.appendChild(content);


        return overlay;
    }

    // 수업 스케줄 데이터를 기반으로 셀을 찾고 오버레이를 생성하는 함수
    function applyScheduleOverlay(course) {
        const { schedule, course_name, classroom} = course;
        const color = getColorForCourse(course_name);

        // 스케줄을 요일과 시간으로 나누기
        const parsedSchedules = schedule.split(' ').filter(Boolean);

        parsedSchedules.forEach((entry, index) => {
            if (index % 2 === 0) {
                const day = entry;
                const timeRange = parsedSchedules[index + 1];

                if (timeRange && timeRange.includes('~')) {
                    const [startTime, endTime] = timeRange.split('~');
                    const duration = calculateDuration(startTime, endTime);

                    // 셀을 찾고 오버레이 추가
                    const cell = document.querySelector(`.cell[data-time="${splitTime(startTime).hours}"][data-day="${day}"]`);
                    if (cell) {
                        // 오버레이 생성
                        const overlay = createOverlayDiv(cell, startTime, duration, color, course_name, classroom);

                        // 문서에 새 div 추가
                        document.body.appendChild(overlay);
                    }
                }
            }
        });
    }

    // const courses = [
    //     {
    //         "course_id": "5640",
    //         "course_name": "추리의기법과문제해결",
    //         "credits": "3",
    //         "lecture_time": "3",
    //         "professor_name": "김준성",
    //         "course_description": "",
    //         "schedule": "화 15:00~16:15 목 15:00~16:15",
    //         "classroom": [
    //             "S1954"
    //         ]
    //     },
    // ];



    // //현재시간 선 그리기
    // courses.forEach(course => {
    //     applyScheduleOverlay(course);
    // });

    function drawCurrentTimeLine() {
        const existingLine = document.querySelector('.current-time-line');
        if (existingLine) {
            existingLine.remove();
        }

        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        const timeSlots = document.querySelectorAll('.time');
        
        let topPosition = 0;
        let found = false;
        
        timeSlots.forEach(slot => {
            const slotTime = parseInt(slot.textContent, 10);
    
            if (slotTime === currentHours) {
                const cell = document.querySelector(`.cell[data-time="${currentHours}"][data-day="월"]`); // 월요일의 첫 셀을 예시로 사용
                if (cell) {
                    const { top } = getCellPosition(cell);
                    topPosition = top + (currentMinutes);
                    found = true;
                }
            }
        });
    
        if (!found) {
            return;
        }
    
        
        const line = document.createElement('div');
        line.classList.add('current-time-line');
        line.style.position = 'absolute';
        line.style.top = `${topPosition}px`; 
        line.style.left = '8%'; 
        line.style.width = '90%'; 
        line.style.height = '2px'; 
        line.style.backgroundColor = 'red'; 
        line.style.zIndex = '100 - 1'; 
    
        document.body.appendChild(line);
    }

    document.addEventListener('DOMContentLoaded', () => {
        drawCurrentTimeLine();
        setInterval(drawCurrentTimeLine, 30000);
    });


document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 사용자 ID를 가져옴

    if (!userId) {
        // 사용자 ID가 없으면 로그인 페이지로 리디렉션
        window.location.href = '/login/index.html';
        return;
    }

    try {
        // 서버에서 유저의 시간표 데이터를 가져옴
        const response = await fetch(`/user-schedule/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user schedule');
        }
        const userSchedules = await response.json();
        
        // 모든 과목들을 담을 리스트
        const courses = [];

        // 각 UserScheduleDTO에서 courses 리스트를 꺼내와 변환 후 courses 리스트에 추가
        userSchedules.forEach(userSchedule => {
            userSchedule.courses.forEach(course => {
                courses.push({
                    course_id: course.id,
                    course_name: course.name,
                    credits: course.credits,
                    lecture_time: course.lectureTime,
                    professor_name: course.professorName,
                    course_description: course.description,
                    schedule: course.schedule,
                    classroom: course.classroom
                });
            });
        });

        // 변환된 courses 리스트로 시간표에 과목 추가
        courses.forEach(course => {
            applyScheduleOverlay(course);
        });
        drawCurrentTimeLine(); // 현재 시간 라인 그리기
        setInterval(drawCurrentTimeLine, 30000); // 30초마다 현재 시간 라인 갱신

    } catch (error) {
        console.error('Error loading timetable:', error);
    }
});

})();