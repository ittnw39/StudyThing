document.querySelector('#search-bar button').addEventListener('click', async () => {
    const query = document.querySelector('#search-bar input').value;
    const searchOption = document.querySelector('#search-option').value; // 선택된 검색 옵션 가져오기
    const recruitingOnly = document.querySelector('#recruiting-only-checkbox').checked;


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
            filterAndDisplayGroups(studyGroups, recruitingOnly);
        } else {
            console.error('Search failed');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});

// 체크박스 상태 변경 시 검색 결과를 다시 필터링
document.querySelector('#recruiting-only-checkbox').addEventListener('change', () => {
    const recruitingOnly = document.querySelector('#recruiting-only-checkbox').checked;
    const currentResults = document.querySelectorAll('.group-card');

    // 현재 표시된 그룹들을 필터링
    currentResults.forEach(groupCard => {
        const recruitmentStatus = groupCard.dataset.recruitmentStatus;
        if (recruitingOnly && recruitmentStatus !== 'RECRUITING') {
            groupCard.style.display = 'none';
        } else {
            groupCard.style.display = 'block';
        }
    });
});

// 그룹 결과를 필터링하여 표시하는 함수
function filterAndDisplayGroups(groups, recruitingOnly) {
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = ''; // Clear previous results

    groups.forEach(group => {
        if (!recruitingOnly || group.recruitmentStatus === 'RECRUITING') {
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

// 페이지 로드 시 모든 스터디 그룹을 로드
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/study');
        if (response.ok) {
            const studyGroups = await response.json();
            const recruitingOnly = document.querySelector('#recruiting-only-checkbox').checked;
            filterAndDisplayGroups(studyGroups, recruitingOnly);
        } else {
            console.error('Failed to load study groups');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});

async function loadAllStudyGroups() {
    try {
        const response = await fetch('/study');
        if (response.ok) {
            const studyGroups = await response.json();
            const resultContainer = document.querySelector('.result');
            resultContainer.innerHTML = ''; // 기존 결과 삭제

            studyGroups.forEach(group => {
                const groupCard = document.createElement('div');
                groupCard.className = 'group-card';
                groupCard.dataset.groupId = group.id;

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
                courseName.textContent = `${group.course.name}`;

                const currentMember = document.createElement('span');
                currentMember.id = 'current-member';
                currentMember.textContent = `${group.currentNumber}`;

                const limitedMember = document.createElement('span');
                limitedMember.id = 'limited-member';
                limitedMember.textContent = ` / ${group.recruitmentNumber}`;

                const groupDescription = document.createElement('span');
                groupDescription.id = 'group-description';
                groupDescription.textContent = `${group.groupDescription}`;

                groupCardBody.appendChild(courseName);
                groupCardBody.appendChild(document.createTextNode(', '));
                groupCardBody.appendChild(currentMember);
                groupCardBody.appendChild(limitedMember);
                groupCardBody.appendChild(document.createTextNode(', '));
                groupCardBody.appendChild(groupDescription);

                groupCard.appendChild(groupCardBody);

                resultContainer.appendChild(groupCard);
            });
        } else {
            console.error('그룹 목록 가져오기 실패');
        }
    } catch (error) {
        console.error('네트워크 에러:', error);
    }
}

// 페이지 로드 시 모든 스터디 그룹을 로드
window.addEventListener('DOMContentLoaded', loadAllStudyGroups);
