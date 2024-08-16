(function () {
    const modify_icon = document.getElementById('modify-timetable');
    const timetableContainer = document.querySelector('.timetable-container');

    // ���� �α��ε� ������� ID�� �����;� �մϴ�. (��: localStorage, cookie, �Ǵ� ���� ����)
    const userId = 1; // ���� ������� ID�� ��ü�ؾ� �մϴ�.

    // �ð�ǥ �����͸� �鿣�忡�� ��������
    async function loadTimetable() {
        try {
            const response = await fetch(`/courses/user/${userId}`);
            if (response.ok) {
                const userSchedules = await response.json();
                renderTimetable(userSchedules);
            } else {
                console.error('Failed to load timetable data.');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    // �ð�ǥ �����͸� HTML�� �������ϴ� �Լ�
    function renderTimetable(userSchedules) {
        const timetable = document.getElementById('timetable');

        // ���� �ð�ǥ ����
        timetable.querySelectorAll('.course-block').forEach(block => block.remove());

        userSchedules.forEach(schedule => {
            const block = document.createElement('div');
            block.className = 'course-block';
            block.innerHTML = `
                <span class="course-name">${schedule.course.name}</span><br>
                <span class="course-time">${schedule.dayOfWeek} ${schedule.startTime} - ${schedule.endTime}</span><br>
                <span class="course-classroom">${schedule.course.classroom}</span>
            `;
            block.style.gridColumn = getDayColumn(schedule.dayOfWeek);
            block.style.gridRow = getTimeRow(schedule.startTime, schedule.endTime);
            timetable.appendChild(block);
        });
    }

    // ������ �׸��� �÷� ��ȣ�� ��ȯ�ϴ� �Լ�
    function getDayColumn(dayOfWeek) {
        const days = ['��', 'ȭ', '��', '��', '��'];
        return days.indexOf(dayOfWeek) + 2; // '��'�� 2�� �÷����� ����
    }

    // �ð��� �׸��� �� ��ȣ�� ��ȯ�ϴ� �Լ�
    function getTimeRow(startTime, endTime) {
        const startHour = parseInt(startTime.split(':')[0], 10);
        const endHour = parseInt(endTime.split(':')[0], 10);
        return `${startHour - 8 + 1} / span ${endHour - startHour}`; // 8�ú��� �����Ѵٰ� ����
    }

    // ������ �ε� �� �ð�ǥ �ҷ�����
    document.addEventListener('DOMContentLoaded', loadTimetable);

    // �ð�ǥ ���� ������ Ŭ�� �� �̺�Ʈ
    modify_icon.addEventListener("click", () => {
        window.location.href = "/timetable/create_timetable.html";
    });
})();
