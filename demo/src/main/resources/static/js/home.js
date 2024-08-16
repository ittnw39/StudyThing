document.addEventListener('DOMContentLoaded', function () {

    //바텀시트 show event
    const bottomsheet = document.getElementById('gbt');
    const group_divs = document.querySelectorAll('.group-card');

    group_divs.forEach(group_div => {
        group_div.onclick = () => {
            bottomsheet.style.transform = `translateY(0)`;
        }
    })


    //바텀시트 hide event
    const body = document.querySelector('body');
    let startY;
    let startTranslateY;
    let currentTranslateY = 0;

    bottomsheet.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startTranslateY = currentTranslateY;
        bottomsheet.style.transition = 'none';
        console.log(startTranslateY, currentTranslateY);
    });

    bottomsheet.addEventListener('touchmove', (e) => {
        const deltaY = e.touches[0].clientY - startY;
        currentTranslateY = Math.max(startTranslateY + deltaY, 0);
        bottomsheet.style.transform = `translateY(${currentTranslateY}px)`;
        body.style.overflow = 'hidden'; //내릴때 body고정
    });

    bottomsheet.addEventListener('touchend', () => {
        bottomsheet.style.transition = 'transform 0.3s ease-out';
        if (currentTranslateY > window.innerHeight * 0.2) {
            bottomsheet.style.transform = 'translateY(100%)';
            body.style.overflow = 'auto';
            startTranslateY = 0;
            currentTranslateY = 0;
        } else {
            bottomsheet.style.transform = 'translateY(0)';
            currentTranslateY = 0;
        }
    });

    //그룹 바텀시트 네비바
    const nav = document.querySelector('.group-function-nav');
    const indicator = document.getElementById('gfn-indicator');
    const items = nav.querySelectorAll('li');
    const functionTabs = document.querySelectorAll('.function-tab > div');

    function setIndicator(element) {
        indicator.style.left = `${element.offsetLeft}px`;
        indicator.style.width = `${element.offsetWidth}px`;
    }

    function showTab(index) {
        functionTabs.forEach((tab, i) => {
            if (i === index) {
                tab.style.display = 'block';
            } else {
                tab.style.display = 'none';
            }
        });
    }

    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            setIndicator(item);
            showTab(index);
        });

        if (index === 0) {
            item.classList.add('active');
            setIndicator(item);
            showTab(index);
        }
    });
});

group_divs.forEach(group_div => {
    group_div.onclick = async () => {
        const groupId = group_div.dataset.groupId; // 그룹 ID를 데이터 속성에서 가져옴
        try {
            const response = await fetch(`/api/groups/${groupId}`);
            if (response.ok) {
                const groupDetails = await response.json();
                document.querySelector('.group-title').textContent = groupDetails.name;
                document.querySelector('.group-description').textContent = groupDetails.description;
                // 추가로 필요한 데이터를 바텀 시트에 표시
            } else {
                console.error('그룹 정보를 불러오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('네트워크 에러:', error);
        }

        bottomsheet.style.transform = `translateY(0)`;
    }
});
