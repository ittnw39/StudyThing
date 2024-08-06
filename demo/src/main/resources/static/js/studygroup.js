let lastScrollTop = 0;

const create_div = document.getElementById("create-icon-top")

const opacityDelta = 0.1;

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

//모달 관련 요소
const modal = document.getElementById("search-rule-modal");
const modal_button = document.getElementById("search-rule-button");
const close_button = document.getElementsByClassName("exit")[0];

modal_button.onclick = () => {
    modal.style.display = "block";
}

close_button.onclick = () => {
    modal.style.display = "none";
}

// 모달 외부 클릭시 모달 닫기
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}