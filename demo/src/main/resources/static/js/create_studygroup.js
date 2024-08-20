document.getElementById('return').addEventListener('click', function (event) {
    event.preventDefault();
    window.history.back();
});

document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId'); // 유저 ID는 로컬 스토리지에서
    const selectElement = document.getElementById('major-combobox');

    // 유저의 시간표 데이터를 가져오는 함수
    async function fetchUserSchedule() {
        try {
            const response = await fetch(`/user-schedule/${userId}`);
            if (!response.ok) {
                throw new Error('시간표 데이터를 불러오지 못했습니다.');
            }
            const courses = await response.json();
            populateCourseOptions(courses);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    }

    // 시간표 데이터로 select 요소를 채우는 함수
    function populateCourseOptions(courses) {
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.courseId; // courseId는 UserScheduleDTO에 포함된 과목의 ID여야 함
            option.textContent = `${course.courseName} (${course.courseCode})`; // UserScheduleDTO에 포함된 과목명과 코드
            selectElement.appendChild(option);
        });
    }

    // 페이지 로드 시 시간표 데이터를 불러옴
    fetchUserSchedule();
});


document.getElementById('submit').addEventListener('click', async function (event) {
    event.preventDefault();

    var icon = document.getElementById('submiticon');
    icon.className = 'fa-solid fa-spinner fa-spin-pulse';

    const studyGroupName = document.querySelector('input[type="text"]').value;
    const recruitmentNumber = document.querySelector('input[type="number"]').value;
    const groupDescription = document.querySelector('textarea').value;
    const courseId = document.getElementById('major-combobox').value;
    const userId = localStorage.getItem('userId');

    if (!selectedCourseId || !groupName || !recruitmentNumber) {
        alert('모든 필드를 채워주세요.');
        return;
    }

    const studyGroupData = {
        name: studyGroupName,
        course: { id: courseId },
        leader: { id: userId },
        recruitmentNumber: recruitmentNumber,
        currentNumber: 1,
        groupDescription: groupDescription,
        recruitmentStatus: "RECRUITING",
        creationDate: new Date()
    };

    try {
        const response = await fetch('/study/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studyGroupData)
        });

        if (response.ok) {
            const newStudyGroup = await response.json();
            console.log('스터디 그룹이 생성되었습니다.:', newStudyGroup);
            window.location.href = '/search/index.html'; // 그룹 생성 후 리다이렉트
        } else {
            console.error('스터디 그룹 생성에 실패했습니다.');
            icon.className = 'fa-solid fa-hammer';
        }
    } catch (error) {
        console.error('스터디 그룹 생성에 실패했습니다.:', error);
        icon.className = 'fa-solid fa-hammer';
    }
});

