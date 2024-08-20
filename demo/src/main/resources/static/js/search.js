document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로드 시 모든 스터디 그룹을 로드
    loadAllStudyGroups();

    // 모집 상태 필터링
    document.getElementById('recruit-detail').addEventListener('change', loadAllStudyGroups);

    // 검색 버튼 클릭 시 검색 수행
    document.querySelector('#search-bar button').addEventListener('click', async () => {
        const query = document.querySelector('#search-bar input').value;
        const searchOption = document.querySelector('#search-option').value; // 선택된 검색 옵션 가져오기

        try {
            let searchUrl;
            if (searchOption === 'groupName') {
                searchUrl = `/study/search?name=${encodeURIComponent(query)}`;
            } else if (searchOption === 'courseName') {
                searchUrl = `/study/course/search?name=${encodeURIComponent(query)}`;
            }

            const response = await fetch(searchUrl);
            if (response.ok) {
                const studyGroups = await response.json();
                filterAndDisplayGroups(studyGroups);
            } else {
                console.error('Search failed');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    });
});

// 페이지 로드 시 모든 스터디 그룹을 로드
window.addEventListener('DOMContentLoaded', loadAllStudyGroups);

// 전체 그룹을 로드하는 함수
async function loadAllStudyGroups() {
    try {
        const response = await fetch('/study');
        if (response.ok) {
            const studyGroups = await response.json();
            filterAndDisplayGroups(studyGroups);
        } else {
            console.error('Failed to load study groups');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// 모집 상태 필터링
document.getElementById('recurit-detail').addEventListener('change', loadAllStudyGroups);


// 그룹 결과를 필터링하여 표시하는 함수
function filterAndDisplayGroups(groups) {
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = '';

    const recruitmentStatusFilter = document.getElementById('recruit-detail').value;

    const statusMapping = {
        "모집중": "RECRUITING",
        "모집마감": "CLOSED",
        "default": "default"  // 기본 옵션은 모든 그룹을 보여줌
    };

    const recruitmentStatus = statusMapping[recruitmentStatusFilter] || "default";


    groups.forEach(group => {
        if (recruitmentStatusFilter === "default" || group.recruitmentStatus === recruitmentStatus) {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.dataset.groupId = group.id;
            groupCard.dataset.recruitmentStatus = group.recruitmentStatus;

            const groupCardHeader = document.createElement('div');
            groupCardHeader.className = 'group-card-header';

            const groupTitle = document.createElement('span');
            groupTitle.id = 'group-title';
            groupTitle.textContent = group.name;

            groupCardHeader.appendChild(groupTitle);
            groupCard.appendChild(groupCardHeader);

            const groupCardBody = document.createElement('div');
            groupCardBody.className = 'group-card-body';

            const courseName = document.createElement('span');
            courseName.id = 'course-name';
            courseName.textContent = `Course: ${group.course.name}`;

            const currentMember = document.createElement('span');
            currentMember.id = 'current-member';
            currentMember.textContent = `Members: ${group.currentNumber}`;

            const limitedMember = document.createElement('span');
            limitedMember.id = 'limited-member';
            limitedMember.textContent = ` / ${group.recruitmentNumber}`;

            const groupDescription = document.createElement('span');
            groupDescription.id = 'group-description';
            groupDescription.textContent = `Description: ${group.groupDescription}`;

            groupCardBody.appendChild(courseName);
            groupCardBody.appendChild(document.createTextNode(', '));
            groupCardBody.appendChild(currentMember);
            groupCardBody.appendChild(limitedMember);
            groupCardBody.appendChild(document.createTextNode(', '));
            groupCardBody.appendChild(groupDescription);

            groupCard.appendChild(groupCardBody);

            resultContainer.appendChild(groupCard);
        }
    });
}
