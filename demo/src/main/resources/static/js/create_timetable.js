document.getElementById('return').addEventListener('click', function (event) {
    event.preventDefault();
    window.history.back();
});


// 검색 기능 구현
document.querySelector('#search-bar button').addEventListener('click', async function (event) {
    event.preventDefault();

    const query = document.querySelector('#search-bar input').value.trim();
    const searchType = document.querySelector('#search-type').value; // 선택한 검색 기준 가져오기

    try {
        const response = await fetch(`/courses/search?query=${encodeURIComponent(query)}&type=${searchType}`);
        if (response.ok) {
            const courses = await response.json();
            renderSearchResults(courses);
        } else {
            console.error('Failed to fetch search results');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});

// 검색 결과 렌더링 함수
function renderSearchResults(courses) {
    const resultsContainer = document.querySelector('.result');
    resultsContainer.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        const courseCardHeader = document.createElement('div');
        courseCardHeader.className = 'course-card-header';

        const courseName = document.createElement('span');
        courseName.className = 'course-name';
        courseName.style.fontSize = '18px';
        courseName.textContent = course.name;

        const addButton = document.createElement('button');
        addButton.className = 'add';
        addButton.dataset.courseId = course.id;
        addButton.textContent = '추가';

        courseCardHeader.appendChild(courseName);
        courseCardHeader.appendChild(addButton);

        const courseCardBody = document.createElement('div');
        courseCardBody.className = 'course-card-body';

        const courseDescription = document.createElement('span');
        courseDescription.innerHTML = `
            ${course.id || '미정'} |
            ${course.classroom || '미정'} | 
            ${course.professorName || '미정'} | 
            ${course.credits || '미정'}학점 | 
            ${course.schedule || '미정'} | 
            ${course.lectureTime || '미정'}시간 <br>
            ${course.courseDescription || ' '}
        `;

        courseCardBody.appendChild(courseDescription);


        courseCard.appendChild(courseCardHeader);
        courseCard.appendChild(courseCardBody);

        resultsContainer.appendChild(courseCard);

        addButton.addEventListener('click', async () => {
            await addCourseToCurrentList(course);
        });
    });
}


// 현재 목록에 과목 추가하는 함수
async function addCourseToCurrentList(course) {
    const currentListContainer = document.querySelector('.current-add');

    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.dataset.courseId = course.id;
    courseCard.innerHTML = `
        <div id="course-card-header">
            <span class="course-name" style="font-size: 18px;">${course.name}</span>
            <button class="delete">삭제</button>
        </div>
       <div class="course-card-body">
        <span>ID: ${course.id || '미정'} | 강의실: ${course.classroom || '미정'} | 교수명: ${course.professorName || '미정'} | 학점: ${course.credits || '미정'}학점 | 시간표: ${course.schedule || '미정'} | 강의시간: ${course.lectureTime || '미정'}시간 <br>
        설명: ${course.description || ' '}</span>
       </div>
    `;
    currentListContainer.appendChild(courseCard);

    // 삭제 버튼에 이벤트 리스너 추가
    courseCard.querySelector('.delete').addEventListener('click', () => {
        courseCard.remove(); // 현재 목록에서 과목 제거
    });
}

// 저장 버튼 클릭 이벤트 리스너
document.getElementById('submit').addEventListener('click', async function (event) {
    event.preventDefault();

    const userId = localStorage.getItem('userId'); // 사용자의 ID를 로컬 스토리지에서 가져옴
    if (!userId) {
        console.error('User ID is missing');
        return;
    }
    const currentListContainer = document.querySelector('.current-add');
    const courseCards = currentListContainer.querySelectorAll('.course-card');

    const userScheduleRequests = Array.from(courseCards).map(courseCard => {
        const courseId = courseCard.dataset.courseId;
        if (!courseId) {
            console.error('Course ID is missing or undefined');
            return;
        }
        console.log(`Adding course with ID: ${courseId} for user ID: ${userId}`);
        return addCourseToUserSchedule(userId, courseId);
    });

    try {
        await Promise.all(userScheduleRequests);
        console.log('시간표 저장 성공');
        // 저장이 성공하면 다른 페이지로 이동하거나, 사용자에게 성공 메시지를 표시할 수 있음
        alert('시간표가 성공적으로 저장되었습니다.');
        window.location.href = '/timetable/index.html'; // 저장 후 이동할 페이지로 리디렉션
    } catch (error) {
        console.error('시간표 저장 실패:', error);
    }
});

// 과목을 사용자 시간표에 추가하는 함수
async function addCourseToUserSchedule(userId, courseId) {

    const response = await fetch(`/user-schedule?userId=${userId}&courseId=${courseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('사용자 시간표에 과목 추가 실패');
    }
}