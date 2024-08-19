let lastScrollTop = 0;

const create_div = document.getElementById("create-icon-top");

const opacityDelta = 0.5;

// 현재 투명도
let currentOpacity = 1;


window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        currentOpacity = Math.max(0, currentOpacity - opacityDelta);
    } else {
        currentOpacity = Math.min(1, currentOpacity + opacityDelta);
    }


    create_div.style.opacity = currentOpacity;

    // 완전히 투명해지면 pointer-events 비활성화
    if (currentOpacity === 0) {
        create_div.style.pointerEvents = 'none';
    } else {
        create_div.style.pointerEvents = 'auto';
    }

    // 현재 스크롤 위치를 저장
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

//검색 모달 관련 요소
const search_modal = document.getElementById("search-rule-modal");
const search_modal_button = document.getElementById("search-rule-button");
const search_close_button = document.getElementsByClassName("exit")[0];

search_modal_button.onclick = () => {
    search_modal.style.display = "block";
}

search_close_button.onclick = () => {
    search_modal.style.display = "none";
}

// 모달 외부 클릭시 모달 닫기
window.onclick = (event) => {
    if (event.target == search_modal) {
        search_modal.style.display = "none";
    }
}

//가입 모달창 이벤트
const join_modal = document.getElementById("join-alert-box");
const join_group_title = join_modal.querySelector("#join-group-title");
const joinButton = document.getElementById('join');

let handleJoinClick = null;

document.body.addEventListener('click', (event) => {
    const group_div = event.target.closest('.group-card');

    if (group_div) {
        const title = group_div.querySelector("#group-title").textContent;
        /*모달에 정보이전*/
        join_modal.style.display = "block";
        join_group_title.textContent = title;
        join_modal.dataset.groupId = group_div.dataset.groupId;

        /*이벤트 리스너 중첩 에러 방지*/

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
                    alert('그룹 가입 성공!');
                    join_modal.style.display = 'none';
                } else {
                    alert('그룹 가입 실패');
                }
            } catch (error) {
                console.error('네트워크 에러:', error);
            } finally {
                button.disabled = false; // 버튼 활성화
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