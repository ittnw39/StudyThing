document.getElementById('return').addEventListener('click', function(event) {
    event.preventDefault();
    window.history.back();
});

document.getElementById('submit').addEventListener('click', async function(event) {
    event.preventDefault();

    // ���� �߰� ����
    const courseData = {
        name: "������", // ���� ������ ��ü�ؾ� ��
        classroom: "���ǽ�",
        professorName: "������",
        credits: 3,
        schedule: "������ 9:00-10:30",
        description: "���� ����"
    };

    try {
        const response = await fetch('/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok) {
            const newCourse = await response.json();
            console.log('���� ���� ����:', newCourse);
            // ���� �� �ļ� ó��
        } else {
            console.error('���� ���� ����');
        }
    } catch (error) {
        console.error('��Ʈ��ũ ����:', error);
    }
});

// ���� ���� ����
async function deleteCourse(courseId) {
    try {
        const response = await fetch(`/courses/${courseId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('���� ���� ����');
            // ���� �� �ļ� ó��
        } else {
            console.error('���� ���� ����');
        }
    } catch (error) {
        console.error('��Ʈ��ũ ����:', error);
    }
}

// ���� �߰� ��ư Ŭ�� �� �̺�Ʈ �ڵ鷯
document.querySelectorAll('#add').forEach(button => {
    button.addEventListener('click', async () => {
        const courseId = button.dataset.courseId;
        await addCourseToUserSchedule(courseId);
    });
});

// ���� ���� ��ư Ŭ�� �� �̺�Ʈ �ڵ鷯
document.querySelectorAll('#delete').forEach(button => {
    button.addEventListener('click', async () => {
        const courseId = button.dataset.courseId;
        await deleteCourse(courseId);
    });
});
