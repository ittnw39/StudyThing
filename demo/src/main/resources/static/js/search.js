document.addEventListener('DOMContentLoaded', function () {
    // 검색 버튼 이벤트 리스너 설정
    const searchButton = document.querySelector('#search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', async () => {
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
    }

     // 모집 중 필터링 체크박스 이벤트 리스너 설정
     const recruitingCheckbox = document.getElementById('recruiting-checkbox');
     if (recruitingCheckbox) {
         recruitingCheckbox.addEventListener('change', loadAllStudyGroups);
     }

    // 페이지 로드 시 모든 스터디 그룹을 로드
    loadAllStudyGroups();
});

// 그룹 결과를 필터링하여 표시하는 함수
function filterAndDisplayGroups(groups) {
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = '';

    const recruitingOnly = document.getElementById('recruiting-checkbox').checked; // 체크박스 상태 확인

    groups.forEach(group => {
        // 모집 상태가 "모집중"일 때만 표시하거나, 필터링이 필요 없는 경우
        if (!recruitingOnly || (recruitingOnly && group.recruitmentStatus === "RECRUITING")) {
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
            courseName.textContent = `${group.course.name} | `;

            const currentMember = document.createElement('span');
            currentMember.id = 'current-member';
            currentMember.textContent = `현재 인원: ${group.currentNumber}`;

            const limitedMember = document.createElement('span');
            limitedMember.id = 'limited-member';
            limitedMember.textContent = ` / ${group.recruitmentNumber} | `;

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
        }
    });
}

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
