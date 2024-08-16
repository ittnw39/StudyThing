document.getElementById('return').addEventListener('click', function(event) {
    event.preventDefault();
    window.history.back();
});

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();

    var icon = document.getElementById('submiticon');
    icon.className = 'fa-solid fa-spinner fa-spin-pulse';

     // 폼 데이터 수집
        const studyGroupName = document.querySelector('input[type="text"]').value;
        const recruitmentNumber = document.querySelector('input[type="number"]').value;
        const groupDescription = document.querySelector('textarea').value;
        const courseId = document.getElementById('major-combobox').value;
        const leaderId = 1; // 실제 로그인한 사용자의 ID를 여기에 설정해야 합니다.

        const studyGroupData = {
            name: studyGroupName,
            course: { id: courseId },
            leader: { id: leaderId },
            recruitmentNumber: recruitmentNumber,
            currentNumber: 0, // 초기 값으로 설정
            groupDescription: groupDescription,
            recruitmentStatus: "OPEN", // 상태는 필요에 따라 설정
            creationDate: new Date()
        };

        try {
            const response = await fetch('/study/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studyGroupData)
            });

            if (response.ok) {
                const newStudyGroup = await response.json();
                console.log('스터디 그룹 생성 성공:', newStudyGroup);
                // 생성 성공 시 후속 조치 (예: 그룹 페이지로 리디렉션)
                window.location.href = `/study/${newStudyGroup.id}`;
            } else {
                console.error('스터디 그룹 생성 실패');
                icon.className = 'fa-solid fa-hammer';
                // 오류 메시지를 사용자에게 표시할 수 있음
            }
        } catch (error) {
            console.error('네트워크 에러:', error);
            icon.className = 'fa-solid fa-hammer';
        }
    });
});