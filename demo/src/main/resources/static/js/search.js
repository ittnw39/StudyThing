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
                courseName.textContent = `수업명: ${group.course.name}`;

                const currentMember = document.createElement('span');
                currentMember.id = 'current-member';
                currentMember.textContent = `현재 참여 인원: ${group.currentNumber}`;

                const limitedMember = document.createElement('span');
                limitedMember.id = 'limited-member';
                limitedMember.textContent = ` / ${group.recruitmentNumber}`;

                const groupDescription = document.createElement('span');
                groupDescription.id = 'group-description';
                groupDescription.textContent = `설명: ${group.groupDescription}`;

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
                courseName.textContent = `수업명: ${group.course.name}`;

                const currentMember = document.createElement('span');
                currentMember.id = 'current-member';
                currentMember.textContent = `현재 참여 인원: ${group.currentNumber}`;

                const limitedMember = document.createElement('span');
                limitedMember.id = 'limited-member';
                limitedMember.textContent = ` / ${group.recruitmentNumber}`;

                const groupDescription = document.createElement('span');
                groupDescription.id = 'group-description';
                groupDescription.textContent = `설명: ${group.groupDescription}`;

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
