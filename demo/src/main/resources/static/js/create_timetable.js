document.getElementById('return').addEventListener('click', function (event) {
    event.preventDefault();
    window.history.back();
});

// 검색 기능 구현
document.getElementById('search-bar button').addEventListener('click', async function(event) {
    event.preventDefault();
    const query = document.querySelector('#search-bar input').value;

    try {
        const response = await fetch(`/courses/search?query=${encodeURIComponent(query)}`);
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
        courseCard.innerHTML = `
            <div id="course-card-header">
                <span id="course-name" style="font-size: 18px;">${course.name}</span>
                <button id="add" data-course-id="${course.id}">추가</button>
            </div>
            <div id="course-card-body">
                <span>${course.description}</span>
            </div>
        `;
        resultsContainer.appendChild(courseCard);

        // 과목 추가 버튼에 이벤트 리스너 추가
        courseCard.querySelector('#add').addEventListener('click', async () => {
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
            <span id="course-name" style="font-size: 18px;">${course.name}</span>
            <button id="delete">삭제</button>
        </div>
        <div id="course-card-body">
            <span>${course.description}</span>
        </div>
    `;
    currentListContainer.appendChild(courseCard);

    // 삭제 버튼에 이벤트 리스너 추가
    courseCard.querySelector('#delete').addEventListener('click', () => {
        courseCard.remove(); // 현재 목록에서 과목 제거
    });
}

// 저장 버튼 클릭 이벤트 리스너
document.getElementById('submit').addEventListener('click', async function(event) {
    event.preventDefault();

    const userId = localStorage.getItem('userId'); // 사용자의 ID를 로컬 스토리지에서 가져옴
    const currentListContainer = document.querySelector('.current-add');
    const courseCards = currentListContainer.querySelectorAll('.course-card');

    const userScheduleRequests = Array.from(courseCards).map(courseCard => {
        const courseId = courseCard.dataset.courseId;
        return addCourseToUserSchedule(userId, courseId);
    });

    try {
        await Promise.all(userScheduleRequests);
        console.log('시간표 저장 성공');
        // 저장이 성공하면 다른 페이지로 이동하거나, 사용자에게 성공 메시지를 표시할 수 있음
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


// 시간표에서 과목을 삭제하는 함수
async function deleteCourseFromUserSchedule(userScheduleId) {
    try {
        const response = await fetch(`/user-schedule/${userScheduleId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('시간표에서 과목 삭제 성공');
            // 시간표에서 해당 과목을 제거
            document.querySelector(`[data-user-schedule-id="${userScheduleId}"]`).remove();
        } else {
            console.error('시간표에서 과목 삭제 실패');
        }
    } catch (error) {
        console.error('네트워크 오류:', error);
    }
}


// 과목 삭제 버튼 클릭 시 이벤트 리스너
document.querySelectorAll('#delete').forEach(button => {
    button.addEventListener('click', function() {
        const courseId = this.closest('.course-card').dataset.courseId;
        deleteCourseFromCurrentList(courseId);
    });
});

// 현재 목록에서 과목 삭제 함수
function deleteCourseFromCurrentList(courseId) {
    const courseCard = document.querySelector(`.course-card[data-course-id="${courseId}"]`);
    if (courseCard) {
        courseCard.remove(); // 현재 목록에서 과목 제거
    }
}