document.addEventListener('DOMContentLoaded', function () {

    function initializer() {
        study_tab();
        cloud_tab();
    }

    //바텀시트 show event
    const bottomsheet = document.getElementById('gbt');
    const group_divs = document.querySelectorAll('.group-card');

    group_divs.forEach(group_div => {
        group_div.onclick = () => {
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

    //study_tab
    function study_tab() {

        //전역변수로 goals 일단 지정
        let goals = [
            { "목표": "룰루랄라", "due": "2028-04-01", "check": "1" },
            { "목표": "다 끝내기!", "due": "2024-08-15", "check": "0" },
            { "목표": "룰루랄라", "due": "2024-09-01", "check": "1" },
            { "목표": "다 끝내기!", "due": "2024-10-15", "check": "0" },
            { "목표": "목표", "due": "2024-11-01", "check": "0" },
            { "목표": "룰루랄라", "due": "2028-04-01", "check": "1" },
            { "목표": "다 끝내기!", "due": "2024-08-15", "check": "0" },
            { "목표": "룰루랄라", "due": "2024-09-01", "check": "1" },
            { "목표": "다 끝내기!", "due": "2024-10-15", "check": "0" },
            { "목표": "목표", "due": "2024-11-01", "check": "0" }
        ];
        const totalItems = goals.length;
        const checkedItems = goals.filter(item => item.check === "1").length;

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

        load_study_goal(goals);
        function load_study_goal(goals) {
            const studyGoalsDiv = document.querySelector('.study_goals');

            //html동적 load
            goals.forEach(goal => {
                //content
                const goalDiv = document.createElement('div');
                goalDiv.className = 'goal';

                const goalContentDiv = document.createElement('div');
                goalContentDiv.className = 'goal_content';

                const goalText = document.createElement('span');
                goalText.id = 'goal_text';
                goalText.style.width = '100%';
                goalText.style.height = 'auto';
                goalText.textContent = goal.목표;

                // 체크박스 상태에 따라 줄 긋기
                if (goal.check === '1') {
                    goalText.classList.add('strikethrough');
                }

                const hr = document.createElement('hr');

                const goalDue = document.createElement('span');
                goalDue.id = 'goal_due';
                goalDue.textContent = `마감일 : ${goal.due}`;

                goalContentDiv.appendChild(goalText);
                goalContentDiv.appendChild(hr);
                goalContentDiv.appendChild(goalDue);

                //checkbox
                const goalCheckLabel = document.createElement('label');
                goalCheckLabel.className = 'goal_check';

                const checkbox = document.createElement('input');
                checkbox.className = 'goal_checkbox';
                checkbox.type = 'checkbox';
                checkbox.checked = goal.check === '1';

                const checkmarkSpan = document.createElement('span');
                checkmarkSpan.className = 'checkmark';

                goalCheckLabel.appendChild(checkbox);
                goalCheckLabel.appendChild(checkmarkSpan);

                goalDiv.appendChild(goalContentDiv);
                goalDiv.appendChild(goalCheckLabel);

                studyGoalsDiv.appendChild(goalDiv);
            });

            goal_check_eventlistener(totalItems, checkedItems);
            updateProgressStatus(totalItems, checkedItems);
        }

        function goal_check_eventlistener(totalItems, checkedItems) {
            document.querySelectorAll('.goal_checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const goalText = this.closest('.goal').querySelector('#goal_text');

                    if (this.checked) {
                        checkedItems++;
                        updateProgressStatus(totalItems, checkedItems);
                        goalText.classList.add('strikethrough');
                    } else {
                        checkedItems--;
                        updateProgressStatus(totalItems, checkedItems);
                        goalText.classList.remove('strikethrough');
                    }
                });
            });
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

        //완료된 작업 삭제
        document.getElementById('delete_goal').addEventListener('click', function () {

        });
    }

    function cloud_tab() {
        let files = [
            { "name": "webshell.php", "size": "20", "link": "" },
            { "name": "ddl_injector.exe", "size": "40", "link": "" },
            { "name": "rat_builder.exe", "size": "58", "link": "" },
            { "name": "sql_injector.exe", "size": "102", "link": "" }
        ];

        load_files(files);

        function load_files(files) {
            const fileList = document.getElementById('file_directory');
            fileList.innerHTML = '<span style="width: 100%; height: 20px; font-size: 20px;">저장소</span>';

            files.forEach(file => {
                const fileCard = document.createElement('div');
                fileCard.className = 'file_card';

                const fileInfo = document.createElement('div');
                fileInfo.className = 'file_info';

                const fileLink = document.createElement('a');
                fileLink.className = 'file_name_link';
                fileLink.href = file.link;
                fileLink.download = file.name;
                fileLink.style.textDecoration = 'none'; 
                fileLink.style.color = 'black'; 

                const fileName = document.createElement('span');
                fileName.className = 'file_name';
                fileName.textContent = file.name;

                fileLink.appendChild(fileName);

                fileInfo.appendChild(fileLink);

                const fileSize = document.createElement('span');
                fileSize.className = 'file_size';
                fileSize.textContent = file.size + 'MB';
                fileInfo.appendChild(fileSize);

                const deleteButton = document.createElement('button');
                deleteButton.className = 'file-delete-button';
                deleteButton.textContent = '삭제';
                deleteButton.addEventListener('click', function () {
                    //원격 저장소 파일 지우는 함수 추가
                    fileList.removeChild(fileCard);
                });
                fileInfo.appendChild(deleteButton);

                fileCard.appendChild(fileInfo);
                fileList.appendChild(fileCard);
            })
        }

        //파일 업로드 버튼 이벤트 감지
        document.getElementById('file_upload').addEventListener('change', function (event) {
            const fileInput = event.target;
            const file = fileInput.files[0];
            const errorMessage = document.getElementById('file-error-message');

            if (file) {
                const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'pdf', 'txt', 'csv', 'zip', 'rar'];
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (allowedExtensions.indexOf(fileExtension) === -1) {
                    errorMessage.textContent = '허용되지 않는 파일 형식입니다.';
                    fileInput.value = ''; // 선택된 파일 초기화
                    return;
                } else {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const fileContent = event.target.result;
                        if (/<?php|<?xml/.test(fileContent)) {
                            fileInput.value = '';
                            errorMessage.textContent = 'php문법이 포함된 파일은 업로드할 수 없습니다.';
                            return;
                        } else {
                            errorMessage.textContent = ''; // 오류 메시지 지우기
                            upload_file(file);
                        }
                    }

                    reader.readAsText(file);
                }
            }
        });

        function upload_file(file) {
            const file_size = (file.size / 1024).toFixed(2) + ' KB';
            console.log(file_size);
        }
    }
});