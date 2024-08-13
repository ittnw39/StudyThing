let lastScrollTop = 0;

const create_div = document.getElementById("create-icon-top")

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

//그룹 가입여부 모달창
const group_divs = document.querySelectorAll('.group-card')
const join_modal = document.getElementById("join-alert-box");
const join_group_title = join_modal.querySelector("#join-group-title");

group_divs.forEach(group_div => {
    group_div.onclick = () => {
        const title = group_div.querySelector("#group-title").textContent;
        join_modal.style.display = "block";
        join_group_title.textContent = title;
    }
    
    window.onclick = (event) => {
        if (event.target == join_modal) {
            join_modal.style.display = "none";
        }
    }
})