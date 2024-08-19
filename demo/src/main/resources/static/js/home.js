document.addEventListener('DOMContentLoaded', function () {

    // 로컬 스토리지에서 사용자 ID 가져오기
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    let selectedGroupId = null; // 선택된 그룹 ID를 저장할 변수

    if (!userId) {
        // 만약 사용자 ID가 없다면 로그인 페이지로 리디렉션
        window.location.href = '/login/index.html';
        return;
    }

    // 사용자 그룹 정보 불러오기
    fetchUserGroups(userId);

    function initializer() {
        if (selectedGroupId) {
            study_tab(selectedGroupId);
            cloud_tab(selectedGroupId);
        }
    }
    // 유저의 그룹을 불러오는 함수
    async function fetchUserGroups(userId) {
        try {
            const response = await fetch(`/study/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const groups = await response.json();
            renderUserGroups(groups);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    function renderUserGroups(groups) {
        const contentBody = document.querySelector('.content-body');
        contentBody.innerHTML = ''; // 기존 내용을 초기화

        if (groups.length === 0) {
            contentBody.innerHTML = '<p>가입한 그룹이 없습니다.</p>';
            return;
        }

        groups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.dataset.groupId = group.id; // 그룹 아이디를 데이터 속성으로 추가

            const groupCardHeader = document.createElement('div');
            groupCardHeader.className = 'group-card-header';

            const groupTitle = document.createElement('span');
            groupTitle.className = 'group-title';
            groupTitle.textContent = group.name;

            groupCardHeader.appendChild(groupTitle);
            groupCard.appendChild(groupCardHeader);

            const groupCardBody = document.createElement('div');
            groupCardBody.className = 'group-card-body';

            const courseName = document.createElement('span');
            courseName.className = 'course-name';
            courseName.textContent = `수업명 : ${group.course.name},`;

            const currentMember = document.createElement('span');
            currentMember.className = 'current-member';
            currentMember.textContent = `현재 참여 인원 : ${group.currentNumber}`;

            const limitedMember = document.createElement('span');
            limitedMember.className = 'limited-member';
            limitedMember.textContent = ` / ${group.recruitmentNumber},`;

            const groupDescription = document.createElement('span');
            groupDescription.className = 'group-description';
            groupDescription.textContent = `설명 : ${group.groupDescription}`;

            groupCardBody.appendChild(courseName);
            groupCardBody.appendChild(document.createTextNode(' '));
            groupCardBody.appendChild(currentMember);
            groupCardBody.appendChild(limitedMember);
            groupCardBody.appendChild(document.createTextNode(' '));
            groupCardBody.appendChild(groupDescription);

            groupCard.appendChild(groupCardBody);

            contentBody.appendChild(groupCard);
        });
    }


    //바텀시트 show event
    const bottomsheet = document.getElementById('gbt');
    const bottomsheet_header = document.querySelector('.groupsheet-header');
    const bottomsheet_title = bottomsheet_header.querySelector('.group-title');
    const bottomsheet_desc = bottomsheet_header.querySelector('.group-description');

    //const group_divs = document.querySelectorAll('.group-card');

    //group_divs.forEach(group_div => {
    //    group_div.onclick = () => {
    //        const title = group_div.querySelector("#group-title").textContent;
    //        const description = group_div.querySelector("#group-description").textContent;
    //       bottomsheet_title.textContent = title;
    //        bottomsheet_desc.textContent = description;
    //        bottomsheet.style.transform = `translateY(0)`;
    //        initializer();
    //    }
    //})

    document.body.addEventListener('click', (event) => {
        const group_div = event.target.closest('.group-card');
        const title = group_div.querySelector(".group-title").textContent;
        const description = group_div.querySelector(".group-description").textContent;

        if (group_div) {
            const title = group_div.querySelector(".group-title").textContent;
            const description = group_div.querySelector(".group-description").textContent;

            bottomsheet_title.textContent = title;
            bottomsheet_desc.textContent = description;

            bottomsheet.style.transform = `translateY(0)`;

            initializer();
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

    //바텀시트 기능 script
    /*그룹 나가기 evnet*/
    const exit_button = document.getElementById('group_exit');

    exit_button.addEventListener('click', (event) => {
        event.preventDefault();
    })

    // study_tab
    async function study_tab() {

        try {
            const response = await fetch(`/study-goals/${groupId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch study goals');
            }
            const goals = await response.json();
            load_study_goal(goals);
        } catch (error) {
            console.error('Error fetching study goals:', error);
        }
    }


    //        //전역변수로 goals 일단 지정
    //        let goals = [
    //            { "목표": "룰루랄라", "due": "2028-04-01", "check": "1" },
    //            { "목표": "다 끝내기!", "due": "2024-08-15", "check": "0" },
    //            { "목표": "룰루랄라", "due": "2024-09-01", "check": "1" },
    //            { "목표": "다 끝내기!", "due": "2024-10-15", "check": "0" },
    //            { "목표": "목표", "due": "2024-11-01", "check": "0" },
    //            { "목표": "룰루랄라", "due": "2028-04-01", "check": "1" },
    //            { "목표": "다 끝내기!", "due": "2024-08-15", "check": "0" },
    //            { "목표": "룰루랄라", "due": "2024-09-01", "check": "1" },
    //            { "목표": "다 끝내기!", "due": "2024-10-15", "check": "0" },
    //            { "목표": "목표", "due": "2024-11-01", "check": "0" }
    //        ];
    //        const totalItems = goals.length;
    //        const checkedItems = goals.filter(item => item.check === "1").length;

    /*데이터 불러온다면 추가될 코드?
    async function initialize() {
        try {
            const response = await fetch('https://example.com/api/goals');
            goals = await response.json();
            load_study_goal(goals);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    }*/

    function load_study_goal(goals) {
        const studyGoalsDiv = document.querySelector('.study_goals');
        studyGoalsDiv.innerHTML = '';

        //html동적 load
        goals.forEach(goal => {
            //content
            const goalDiv = document.createElement('div');
            goalDiv.className = 'goal';
            goalDiv.dataset.goalId = goal.id; // goalId 설정

            const goalContentDiv = document.createElement('div');
            goalContentDiv.className = 'goal_content';

            const goalText = document.createElement('span');
            goalText.id = 'goal_text';
            goalText.style.width = '100%';
            goalText.style.height = 'auto';
            goalText.textContent = goal.task;

            // 체크박스 상태에 따라 줄 긋기
            if (goal.check === '1') {
                goalText.classList.add('strikethrough');
            }

            const hr = document.createElement('hr');

            const goalDue = document.createElement('span');
            goalDue.id = 'goal_due';
            goalDue.textContent = `마감일 : ${goal.dueDate}`;

            goalContentDiv.appendChild(goalText);
            goalContentDiv.appendChild(hr);
            goalContentDiv.appendChild(goalDue);

            //checkbox
            const goalCheckLabel = document.createElement('label');
            goalCheckLabel.className = 'goal_check';

            const checkbox = document.createElement('input');
            checkbox.className = 'goal_checkbox';
            checkbox.type = 'checkbox';
            checkbox.checked = goal.completed;

            const checkmarkSpan = document.createElement('span');
            checkmarkSpan.className = 'checkmark';

            goalCheckLabel.appendChild(checkbox);
            goalCheckLabel.appendChild(checkmarkSpan);

            goalDiv.appendChild(goalContentDiv);
            goalDiv.appendChild(goalCheckLabel);

            studyGoalsDiv.appendChild(goalDiv);

            checkbox.addEventListener('change', async function () {
                const completed = this.checked;
                try {
                    await fetch(`/study-goals/${goal.id}/completion`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ completed })
                    });
                    goalText.classList.toggle('strikethrough', completed);
                } catch (error) {
                    console.error('Error updating goal completion:', error);
                }
            });
        });

        const totalItems = goals.length;
        const checkedItems = goals.filter(item => item.completed).length;
        updateProgressStatus(totalItems, checkedItems);
    }

    //목표 분석 탭 수정
    function updateProgressStatus(totalItems, checkedItems) {
        const statusElement = document.getElementById('study_progress_status');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const progress_percentage = (checkedItems / totalItems) * 100;
        progressBar.style.width = `${progress_percentage}%`;
        progressText.textContent = `${Math.round(progress_percentage)}%`;
        statusElement.textContent = `현재 목표 ${totalItems} 에서 ${checkedItems} 완료`;
    }

    document.getElementById('delete_goal').addEventListener('click', async function () {
        const checkedGoals = document.querySelectorAll('.goal_checkbox:checked');
        for (let checkbox of checkedGoals) {
            const goalDiv = checkbox.closest('.goal');
            const goalId = goalDiv.dataset.goalId;
            try {
                await fetch(`/study-goals/${goalId}`, {
                    method: 'DELETE'
                });
                studyGoalsDiv.removeChild(goalDiv);
            } catch (error) {
                console.error('Error deleting goal:', error);
            }
        }
    });
}

    //async function cloud_tab() {
    //    try {
    //        const response = await fetch(`/files/group/${groupId}`); // 그룹별 파일 가져오기
    //        if (!response.ok) {
    //            throw new Error('Failed to fetch files');
    //        }
    //        const files = await response.json();
    //        load_files(files);
    //    } catch (error) {
    //        console.error('Error fetching files:', error);
    //    }
    //
    //
    //    function load_files(files) {
    //        const fileList = document.getElementById('file_directory');
    //        fileList.innerHTML = '<span style="width: 100%; height: 20px; font-size: 20px;">저장소</span>';
    //
    //        files.forEach(file => {
    //            const fileCard = document.createElement('div');
    //            fileCard.className = 'file_card';
    //
    //            const fileInfo = document.createElement('div');
    //            fileInfo.className = 'file_info';
    //
    //            const fileLink = document.createElement('a');
    //            fileLink.className = 'file_name_link';
    //            fileLink.href = file.link;
    //            fileLink.download = file.name;
    //            fileLink.style.textDecoration = 'none';
    //            fileLink.style.color = 'black';
    //
    //            const fileName = document.createElement('span');
    //            fileName.className = 'file_name';
    //            fileName.textContent = file.name;
    //
    //            fileLink.appendChild(fileName);
    //
    //            fileInfo.appendChild(fileLink);
    //
    //            const fileSize = document.createElement('span');
    //            fileSize.className = 'file_size';
    //            fileSize.textContent = file.size + 'MB';
    //            fileInfo.appendChild(fileSize);
    //
    //            const deleteButton = document.createElement('button');
    //            deleteButton.className = 'file-delete-button';
    //            deleteButton.textContent = '삭제';
    //            deleteButton.addEventListener('click', async function () {
    //                try {
    //                    await fetch(`/files/${file.id}`, {
    //                        method: 'DELETE'
    //                    });
    //                    fileList.removeChild(fileCard);
    //                } catch (error) {
    //                    console.error('Error deleting file:', error);
    //                }
    //            });
    //            fileInfo.appendChild(deleteButton);
    //
    //            fileCard.appendChild(fileInfo);
    //            fileList.appendChild(fileCard);
    //        })
    //    }
    //
    //    //파일 업로드 버튼 이벤트 감지
    //    document.getElementById('file_upload').addEventListener('change', async function (event) {
    //        const fileInput = event.target;
    //        const file = fileInput.files[0];
    //        const errorMessage = document.getElementById('file-error-message');
    //
    //        if (file) {
    //            const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'pdf', 'txt', 'csv', 'zip', 'rar'];
    //            const fileExtension = file.name.split('.').pop().toLowerCase();
    //
    //            if (allowedExtensions.indexOf(fileExtension) === -1) {
    //                errorMessage.textContent = '허용되지 않는 파일 형식입니다.';
    //                fileInput.value = ''; // 선택된 파일 초기화
    //                return;
    //            } else {
    //                const formData = new FormData();
    //                formData.append('file', file);
    //                formData.append('groupId', groupId);
    //
    //                try {
    //                    await fetch('/files/upload', {
    //                        method: 'POST',
    //                        body: formData
    //                    });
    //                    errorMessage.textContent = ''; // 오류 메시지 지우기
    //                    load_files(await fetchFiles(groupId)); // 파일 목록 새로 고침
    //                } catch (error) {
    //                    console.error('Error uploading file:', error);
    //                }
    //            }
    //        }
    //    });
    //
    //    async function fetchFiles(groupId) {
    //        const response = await fetch(`/files/group/${groupId}`);
    //        if (response.ok) {
    //            return await response.json();
    //        } else {
    //            console.error('Failed to fetch files');
    //            return [];
    //        }
    //    }
);