document.getElementById('return').addEventListener('click', function (event) {
    event.preventDefault();
    window.history.back();
});

document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();

    var icon = document.getElementById('submiticon');
    icon.className = 'fa-solid fa-spinner fa-spin-pulse';

    // �� ������ ����
    const studyGroupName = document.querySelector('input[type="text"]').value;
    const recruitmentNumber = document.querySelector('input[type="number"]').value;
    const groupDescription = document.querySelector('textarea').value;
    const courseId = document.getElementById('major-combobox').value;
    const leaderId = 1; // ���� �α����� ������� ID�� ���⿡ �����ؾ� �մϴ�.

    const studyGroupData = {
        name: studyGroupName,
        course: { id: courseId },
        leader: { id: leaderId },
        recruitmentNumber: recruitmentNumber,
        currentNumber: 0, // �ʱ� ������ ����
        groupDescription: groupDescription,
        recruitmentStatus: "OPEN", // ���´� �ʿ信 ���� ����
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
            console.log('���͵� �׷� ���� ����:', newStudyGroup);
            // ���� ���� �� �ļ� ��ġ (��: �׷� �������� ���𷺼�)
            window.location.href = `/study/${newStudyGroup.id}`;
        } else {
            console.error('���͵� �׷� ���� ����');
            icon.className = 'fa-solid fa-hammer';
            // ���� �޽����� ����ڿ��� ǥ���� �� ����
        }
    } catch (error) {
        console.error('��Ʈ��ũ ����:', error);
        icon.className = 'fa-solid fa-hammer';
    }
});