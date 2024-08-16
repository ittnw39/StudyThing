document.querySelector('#search-bar button').addEventListener('click', async () => {
    const query = document.querySelector('#search-bar input').value;

    try {
        const response = await fetch(`/study/search?name=${encodeURIComponent(query)}`);
        if (response.ok) {
            const studyGroups = await response.json();
            const resultContainer = document.querySelector('.result');
            resultContainer.innerHTML = ''; // 기존 결과 삭제

            studyGroups.forEach(group => {
                const groupCard = document.createElement('div');
                groupCard.className = 'group-card';

                groupCard.innerHTML = `
                    <div class="group-card-header">
                        <span id="group-title">${group.name}</span>
                    </div>
                    <div class="group-card-body">
                        <span id="course-name">수업명: ${group.course.name}</span>,
                        <span id="current-member">현재 참여 인원: ${group.currentNumber}</span> /
                        <span id="limited-member">${group.recruitmentNumber}</span>,
                        <span id="group-description">설명: ${group.groupDescription}</span>
                    </div>
                `;

                groupCard.addEventListener('click', () => {
                    showJoinModal(group);
                });

                resultContainer.appendChild(groupCard);
            });
        } else {
            console.error('검색 실패');
        }
    } catch (error) {
        console.error('네트워크 에러:', error);
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

                groupCard.innerHTML = `
                    <div class="group-card-header">
                        <span id="group-title">${group.name}</span>
                    </div>
                    <div class="group-card-body">
                        <span id="course-name">수업명: ${group.course.name}</span>,
                        <span id="current-member">현재 참여 인원: ${group.currentNumber}</span> /
                        <span id="limited-member">${group.recruitmentNumber}</span>,
                        <span id="group-description">설명: ${group.groupDescription}</span>
                    </div>
                `;

                groupCard.addEventListener('click', () => {
                    showJoinModal(group);
                });

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
