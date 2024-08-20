let lastScrollTop = 0;
const create_div = document.getElementById("create-icon-top");
const opacityDelta = 0.5;
let currentOpacity = 1;

window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        currentOpacity = Math.max(0, currentOpacity - opacityDelta);
    } else {
        currentOpacity = Math.min(1, currentOpacity + opacityDelta);
    }

    create_div.style.opacity = currentOpacity;

    if (currentOpacity === 0) {
        create_div.style.pointerEvents = 'none';
    } else {
        create_div.style.pointerEvents = 'auto';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// 페이지 로드 시 모든 그룹 로드
window.addEventListener('DOMContentLoaded', loadAllStudyGroups);

// 전체 그룹을 로드하는 함수
async function loadAllStudyGroups() {
    try {
        const response = await fetch('/study');
        if (response.ok) {
            const studyGroups = await response.json();
            displayStudyGroups(studyGroups);
        } else {
            console.error('Failed to load study groups');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// 그룹을 필터링하고 표시하는 함수
function displayStudyGroups(studyGroups) {
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = ''; // 기존 결과 삭제

    const recruitmentStatusFilter = document.getElementById('recurit-detail').value;

    studyGroups.forEach(group => {
        if (!recruitmentStatusFilter || group.recruitmentStatus === recruitmentStatusFilter) {
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

// 검색 버튼 클릭 이벤트
document.querySelector('#search-bar button').addEventListener('click', async () => {
    const query = document.querySelector('#search-bar input').value;
    const searchOption = document.getElementById('search-option').value;

    let searchUrl;
    if (searchOption === 'groupName') {
        searchUrl = `/study/search?name=${encodeURIComponent(query)}`;
    } else if (searchOption === 'courseName') {
        searchUrl = `/study/course/search?name=${encodeURIComponent(query)}`;
    }

    try {
        const response = await fetch(searchUrl);
        if (response.ok) {
            const studyGroups = await response.json();
            displayStudyGroups(studyGroups);
        } else {
            console.error('Search failed');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});

// 모집 상태 필터링
document.getElementById('recurit-detail').addEventListener('change', () => {
    loadAllStudyGroups();
});

// 가입 모달창 이벤트
const join_modal = document.getElementById("join-alert-box");
const join_group_title = join_modal.querySelector("#join-group-title");
const joinButton = document.getElementById('join');

let handleJoinClick = null;

document.body.addEventListener('click', (event) => {
    const group_div = event.target.closest('.group-card');

    if (group_div) {
        const title = group_div.querySelector("#group-title").textContent;
        join_modal.style.display = "block";
        join_group_title.textContent = title;
        join_modal.dataset.groupId = group_div.dataset.groupId;

        if (handleJoinClick) {
            joinButton.removeEventListener('click', handleJoinClick);
        }

        handleJoinClick = async (event) => {
            const button = event.target;
            button.disabled = true;

            try {
                const userId = localStorage.getItem('userId');
                const groupId = join_modal.dataset.groupId;

                const response = await fetch(`/study/join?userId=${userId}&studyGroupId=${groupId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

                if (response.ok) {
                    const resultText = await response.text();
                    if (resultText.includes('already joined')) {
                        alert('이미 가입된 그룹입니다.');
                    } else {
                        alert('그룹 가입 성공!');
                    }
                    join_modal.style.display = 'none';
                } else {
                    alert('그룹 가입 실패');
                }
            } catch (error) {
                console.error('네트워크 에러:', error);
            } finally {
                button.disabled = false;
            }
        };

        joinButton.addEventListener('click', handleJoinClick);

        window.onclick = (event) => {
            if (event.target == join_modal) {
                join_modal.style.display = "none";
            }
        };
    }
});