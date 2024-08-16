document.querySelector('#search-bar button').addEventListener('click', async () => {
    const query = document.querySelector('#search-bar input').value;

    try {
        const response = await fetch(`/study/search?name=${encodeURIComponent(query)}`);
        if (response.ok) {
            const studyGroups = await response.json();
            const resultContainer = document.querySelector('.result');
            resultContainer.innerHTML = ''; // ���� ��� ����

            studyGroups.forEach(group => {
                const groupCard = document.createElement('div');
                groupCard.className = 'group-card';

                groupCard.innerHTML = `
                    <div class="group-card-header">
                        <span id="group-title">${group.name}</span>
                    </div>
                    <div class="group-card-body">
                        <span id="course-name">������: ${group.course.name}</span>,
                        <span id="current-member">���� ���� �ο�: ${group.currentNumber}</span> /
                        <span id="limited-member">${group.recruitmentNumber}</span>,
                        <span id="group-description">����: ${group.groupDescription}</span>
                    </div>
                `;

                groupCard.addEventListener('click', () => {
                    showJoinModal(group);
                });

                resultContainer.appendChild(groupCard);
            });
        } else {
            console.error('�˻� ����');
        }
    } catch (error) {
        console.error('��Ʈ��ũ ����:', error);
    }
});

async function loadAllStudyGroups() {
    try {
        const response = await fetch('/study');
        if (response.ok) {
            const studyGroups = await response.json();
            const resultContainer = document.querySelector('.result');
            resultContainer.innerHTML = ''; // ���� ��� ����

            studyGroups.forEach(group => {
                const groupCard = document.createElement('div');
                groupCard.className = 'group-card';

                groupCard.innerHTML = `
                    <div class="group-card-header">
                        <span id="group-title">${group.name}</span>
                    </div>
                    <div class="group-card-body">
                        <span id="course-name">������: ${group.course.name}</span>,
                        <span id="current-member">���� ���� �ο�: ${group.currentNumber}</span> /
                        <span id="limited-member">${group.recruitmentNumber}</span>,
                        <span id="group-description">����: ${group.groupDescription}</span>
                    </div>
                `;

                groupCard.addEventListener('click', () => {
                    showJoinModal(group);
                });

                resultContainer.appendChild(groupCard);
            });
        } else {
            console.error('�׷� ��� �������� ����');
        }
    } catch (error) {
        console.error('��Ʈ��ũ ����:', error);
    }
}

// ������ �ε� �� ��� ���͵� �׷��� �ε�
window.addEventListener('DOMContentLoaded', loadAllStudyGroups);
