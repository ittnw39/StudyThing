document.addEventListener('DOMContentLoaded', function () {
    let isInitialized = false; // 중복 초기화를 방지하기 위한 플래그

    // 로컬 스토리지에서 사용자 ID 가져오기
    const userId = parseInt(localStorage.getItem('userId'), 10);
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
        if (!isInitialized && selectedGroupId) {
            study_tab(selectedGroupId);
            cloud_tab(selectedGroupId);
            member_tab(selectedGroupId);
            loadMessages(selectedGroupId);
            isInitialized = true; // 한 번만 초기화되도록 설정
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

        if (group_div) {
            // 그룹 카드가 클릭된 경우에만 실행
            const title = group_div.querySelector(".group-title")?.textContent || "No Title";
            const description = group_div.querySelector(".group-description")?.textContent || "No Description";

            bottomsheet_title.textContent = title;
            bottomsheet_desc.textContent = description;

            bottomsheet.style.transform = `translateY(0)`;

            selectedGroupId = group_div.dataset.groupId; // 그룹 ID 저장

            initializer();
        } else if (event.target.closest('.group-function-nav li')) {
            // 탭 클릭 시에는 이미 선택된 그룹이 있을 때만 동작
            if (!selectedGroupId) {
                console.warn("그룹이 선택되지 않았습니다.");
                return;
            }
            // 여기서 필요한 기능 수행, 예: 스터디 탭을 로드하거나 하는 작업
            initializer(); // 필요한 초기화 작업을 여기에 추가
        } else if (!event.target.closest('.add_goals') && !event.target.closest('.function-tab')) {
            // 목표 추가 영역이나 다른 기능 영역에서 발생한 클릭이 아닌 경우에만 경고 표시
            console.warn("group_div가 null입니다. 클릭한 요소가 .group-card 내부에 없을 수 있습니다.");
        }
    });


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


    document.querySelector('.add_goals button[type="submit"]').addEventListener('click', async function () {
        const goalTextInput = document.querySelector('.goals_text_input');
        const dueDateInput = document.querySelector('.goals_due_input');

        if (!goalTextInput || !dueDateInput) {
            console.error('필수 입력 요소를 찾을 수 없습니다.');
            return;
        }

        const goalText = goalTextInput.value.trim();
        const dueDate = dueDateInput.value;

        if (!goalText || !dueDate) {
            alert('목표 내용과 마감일을 입력해주세요.');
            return;
        }

        const studyGoalDTO = {
            task: goalText,
            dueDate: dueDate,
            groupId: selectedGroupId // 현재 선택된 그룹의 ID를 사용
        };

        try {
            const response = await fetch('/study-goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studyGoalDTO)
            });

            if (!response.ok) {
                throw new Error('Failed to add study goal');
            }

            const newGoal = await response.json();
            load_study_goal([newGoal], true); // 새로 추가한 목표를 기존 목표에 추가
            goalTextInput.value = ''; // 입력 필드 초기화
            dueDateInput.value = '';  // 입력 필드 초기화
        } catch (error) {
            console.error('Error adding study goal:', error);
        }
    });

    async function study_tab(groupId) {
        try {
            console.log(`Fetching goals for groupId: ${groupId}`);
            const response = await fetch(`/study-goals/${groupId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 404) {
                // 404 Not Found인 경우 빈 목표 목록으로 처리
                console.warn('No goals found for this group.');
                load_study_goal([], false); // 빈 배열을 전달하여 화면을 초기화
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch study goals');
            }

            const goals = await response.json();
            load_study_goal(goals, true); // 목표 목록을 추가
        } catch (error) {
            console.error('Error fetching study goals:', error);
        }
    }

    let allGoals = []; // 모든 목표를 저장할 배열

    function load_study_goal(goals, append = false) {
        const studyGoalsDiv = document.querySelector('.study_goals');

        if (!append) {
            // append가 false이면 기존 목표를 지우고 새로 고침
            studyGoalsDiv.innerHTML = '';
            allGoals = []; // 기존 목표 리스트 초기화
        }

        // 새로 전달된 목표를 전체 목표 리스트에 추가
        allGoals = allGoals.concat(goals);

        if (allGoals.length === 0) {
            // 목표가 없는 경우 메시지 표시
            studyGoalsDiv.innerHTML = '<p>현재 이 그룹에 목표가 없습니다.</p>';
            updateProgressStatus(0, 0);
            return;
        }

        allGoals.forEach(goal => {
            // 이미 추가된 목표를 다시 추가하지 않기 위해 DOM을 검사
            if (document.querySelector(`.goal[data-goal-id="${goal.id}"]`)) {
                return;
            }
            const goalDiv = document.createElement('div');
            goalDiv.className = 'goal';
            goalDiv.dataset.goalId = goal.id;

            const goalContentDiv = document.createElement('div');
            goalContentDiv.className = 'goal_content';

            const goalText = document.createElement('span');
            goalText.className = 'goal_text';
            goalText.style.width = '100%';
            goalText.style.height = 'auto';
            goalText.textContent = goal.task;

            if (goal.completed) {
                goalText.classList.add('strikethrough');
            }

            const hr = document.createElement('hr');

            const goalDue = document.createElement('span');
            goalDue.className = 'goal_due';
            goalDue.textContent = `마감일 : ${goal.dueDate}`;

            goalContentDiv.appendChild(goalText);
            goalContentDiv.appendChild(hr);
            goalContentDiv.appendChild(goalDue);

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

            // 삭제 버튼 추가 여기욤
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete_goal_button';
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'; //휴지통 아이콘으로 넣을게용
            deleteButton.style.marginLeft = '5px';//넵
            deleteButton.addEventListener('click', async function () {
                try {
                    const response = await fetch(`/study-goals/${goal.id}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete goal');
                    }

                    // 삭제된 목표를 화면에서 제거
                    goalDiv.remove();
                    updateProgressStatus(); // 삭제 후 진행도 업데이트

                    // 전체 목표 리스트에서도 해당 목표 제거
                    allGoals = allGoals.filter(g => g.id !== goal.id);
                } catch (error) {
                    console.error('Error deleting goal:', error);
                }
            });


            goalDiv.appendChild(goalContentDiv);
            goalDiv.appendChild(goalCheckLabel);
            goalDiv.appendChild(deleteButton); // 삭제 버튼을 목표 항목에 추가

            studyGoalsDiv.appendChild(goalDiv);

            checkbox.addEventListener('change', async function () {
                const completed = this.checked;

                try {
                    const response = await fetch(`/study-goals/${goal.id}/completion`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ completed })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update goal completion');
                    }

                    goalText.classList.toggle('strikethrough', completed);
                    // 체크박스 상태 변경 후 진행도 업데이트
                    updateProgressStatus();
                } catch (error) {
                    console.error('Error updating goal completion:', error);
                }
            });
        });

        // 초기 로드 시 진행도 업데이트
        updateProgressStatus();
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

    function updateProgressStatus() {
        const goals = document.querySelectorAll('.goal');
        const totalItems = goals.length;
        const checkedItems = document.querySelectorAll('.goal_checkbox:checked').length;

        const statusElement = document.querySelector('.study-progress-status');
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');

        if (!statusElement || !progressBar || !progressText) {
            console.error("Progress status elements not found.");
            return;
        }

        const progressPercentage = (totalItems > 0) ? (checkedItems / totalItems) * 100 : 0;

        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${Math.round(progressPercentage)}%`;
        statusElement.textContent = `현재 목표 ${totalItems} 중 ${checkedItems} 완료`;
    }


    async function cloud_tab(groupId) {
        try {
            const response = await fetch(`/files/group/${groupId}`); // 그룹별 파일 가져오기
            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }
            const files = await response.json();
            load_files(files);
        } catch (error) {
            console.error('Error fetching files:', error);
        }

        function load_files(files) {
            const fileList = document.querySelector('.file_directory');
            fileList.innerHTML = '<span style="width: 100%; height: 20px; font-size: 20px;">저장소</span>';

            files.forEach(file => {
                const fileCard = document.createElement('div');
                fileCard.className = 'file_card';

                const fileInfo = document.createElement('div');
                fileInfo.className = 'file_info';

                const fileLink = document.createElement('a');
                fileLink.className = 'file_name_link';
                fileLink.href = `/files/download/${file.fileKey}`;
                fileLink.download = file.fileName;
                fileLink.textContent = file.fileName;
                fileLink.style.textDecoration = 'none';
                fileLink.style.color = 'black';

                const fileSize = document.createElement('span');
                fileSize.className = 'file_size';
                fileSize.textContent = `${(file.fileSize / 1024).toFixed(2)} MB`; // MB 단위로 파일 크기 표시

                fileInfo.appendChild(fileLink);
                fileInfo.appendChild(fileSize);

                // 파일 삭제 버튼 추가
                if (parseInt(file.userId, 10) === userId) { // 로그인한 사용자가 업로더인 경우에만 삭제 버튼 추가
                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'file-delete-button';
                    deleteButton.textContent = '삭제';
                    deleteButton.addEventListener('click', async function () {
                        try {
                            const response = await fetch(`/files/delete/${file.fileKey}`, {
                                method: 'DELETE'
                            });
                            if (!response.ok) {
                                throw new Error('Failed to delete file');
                            }
                            fileList.removeChild(fileCard);
                        } catch (error) {
                            console.error('Error deleting file:', error);
                        }
                    });
                    fileInfo.appendChild(deleteButton);
                }

                fileCard.appendChild(fileInfo);
                fileList.appendChild(fileCard);
            });
        }

        // 파일 업로드 이벤트 리스너를 등록하기 전에, 이전에 등록된 이벤트 리스너가 없는지 확인합니다.
        const fileUploadInput = document.querySelector('.file_upload_input');
        console.log(fileUploadInput);

        // 기존 이벤트 리스너 제거
        if (fileUploadInput) {
            fileUploadInput.removeEventListener('change', handleFileUpload);
            fileUploadInput.addEventListener('change', handleFileUpload);
        } else {
            console.error('file_upload_input element not found');
        }

        async function handleFileUpload(event) {
            const fileInput = event.target;
            const file = fileInput.files[0];
            const errorMessage = document.querySelector('.file-error-message');

            if (file) {
                const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'pdf', 'txt', 'csv', 'zip', 'rar'];
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (!allowedExtensions.includes(fileExtension)) {
                    errorMessage.textContent = '허용되지 않는 파일 형식입니다.';
                    fileInput.value = ''; // 선택된 파일 초기화
                    return;
                }

                const formData = new FormData();
                formData.append('file', file);
                formData.append('studyGroupId', selectedGroupId); // 현재 선택된 그룹의 ID 사용
                formData.append('userId', userId); // 현재 로그인한 사용자의 ID 추가

                try {
                    await fetch('/files/upload', {
                        method: 'POST',
                        body: formData
                    });
                    errorMessage.textContent = ''; // 오류 메시지 지우기
                    load_files(await fetchFiles(selectedGroupId)); // 파일 목록 새로 고침
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        }

        async function fetchFiles(groupId) {
            const response = await fetch(`/files/group/${groupId}`);
            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed to fetch files');
                return [];
            }
        }
    }

    async function member_tab(groupId) {
        try {
            const response = await fetch(`/study/members/${groupId}`); // 그룹별 멤버 가져오기
            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }
            const members = await response.json();
            load_members(members);
        } catch (error) {
            console.error('Error fetching members:', error);
        }

        function load_members(members) {
            const memberListDiv = document.querySelector('.member-list');


            if (!memberListDiv) {
                console.error("member-list 요소를 찾을 수 없습니다.");
                return; // 요소가 존재하지 않으면 함수를 종료합니다.
            }

            memberListDiv.innerHTML = ''; // 기존 멤버 목록 초기화

            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = 'member-card';

                const memberName = document.createElement('span');
                memberName.className = 'member-id';
                memberName.style.fontSize = '20px';
                memberName.style.marginLeft = '10px';
                memberName.textContent = member.name;

                // 리더인 경우 별표 아이콘 추가
                if (member.leader) {
                    const starIcon = document.createElement('i');
                    starIcon.className = 'fa-solid fa-star';
                    starIcon.style.color = 'gold';
                    memberName.appendChild(starIcon);
                }

                const memberMajor = document.createElement('span');
                memberMajor.className = 'member-major';
                memberMajor.style.marginRight = '15px';
                memberMajor.textContent = member.major ? member.major : "전공 미정"; // major가 null이면 기본값을 표시

                memberCard.appendChild(memberName);
                memberCard.appendChild(memberMajor);

                memberListDiv.appendChild(memberCard);
            });
        }
    }

    // 메시지 전송
    document.getElementById('send-btn').addEventListener('click', async function () {
        const messageContent = document.getElementById('msg-input').value.trim();
        if (messageContent) {
            await sendMessage(messageContent);
            document.getElementById('msg-input').value = ''; // 입력 필드 초기화
        }
    });

    async function sendMessage(content) {
        try {
            const response = await fetch(`/memos/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    userId: userId,
                    studyGroupId: selectedGroupId,
                    content: content
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            loadMessages(selectedGroupId);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }


    // 메시지 로드 및 UI 업데이트
    async function loadMessages(groupId) {
        const messagesDiv = document.querySelector('.message');
        if (!messagesDiv) {
            console.error('message 요소를 찾을 수 없습니다.');
            return;
        }
        try {
            const response = await fetch(`/memos/group/${groupId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const messages = await response.json();
            messagesDiv.innerHTML = '';

            messages.forEach(message => {
                const messageWrapper = document.createElement('div');
                messageWrapper.className = 'message-wrapper';

                const messageBg = document.createElement('div');
                messageBg.className = 'message-bg';
                messageBg.style.backgroundColor = '#f1f0f0';  // 기본 배경색
                messageBg.style.borderRadius = '10px';
                messageBg.style.padding = '10px';
                messageBg.style.maxWidth = '60%';
                messageBg.style.wordWrap = 'break-word';

                const userIdSpan = document.createElement('span');
                userIdSpan.className = 'user-id';
                userIdSpan.textContent = message.userName;

                const messageSpan = document.createElement('span');
                messageSpan.className = 'msg';
                messageSpan.textContent = message.content;

                if (message.userId === userId) {
                    // 내 메시지 (오른쪽 정렬)
                    messageWrapper.style.display = 'flex';
                    messageWrapper.style.justifyContent = 'flex-end';
                    messageBg.style.backgroundColor = '#dcf8c6';  // 내 메시지 배경색

                    const editButton = document.createElement('button');
                    editButton.textContent = '수정';
                    editButton.style.marginLeft = '5px';
                    editButton.onclick = () => {
                        const newContent = prompt('메시지를 수정하세요', message.content);
                        if (newContent) {
                            updateMemo(message.id, newContent);
                        }
                    };

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = '삭제';
                    deleteButton.style.marginLeft = '5px';
                    deleteButton.onclick = () => {
                        if (confirm('정말로 삭제하시겠습니까?')) {
                            deleteMemo(message.id);
                        }
                    };

                    messageBg.appendChild(editButton);
                    messageBg.appendChild(deleteButton);
                } else {
                    // 상대방 메시지 (왼쪽 정렬)
                    messageWrapper.style.display = 'flex';
                    messageWrapper.style.justifyContent = 'flex-start';
                }

                messageBg.appendChild(userIdSpan);
                messageBg.appendChild(document.createElement('br'));
                messageBg.appendChild(messageSpan);
                messageWrapper.appendChild(messageBg);
                messagesDiv.appendChild(messageWrapper);
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }
    async function updateMemo(memoId, content) {
        try {
            const response = await fetch(`/memos/update/${memoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    userId: userId,
                    content: content
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update message');
            }

            loadMessages(selectedGroupId);
        } catch (error) {
            console.error('Error updating message:', error);
        }
    }

    async function deleteMemo(memoId) {
        try {
            const response = await fetch(`/memos/delete/${memoId}?userId=${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }

            loadMessages(selectedGroupId);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
});