const userId = localStorage.getItem('userId');

function link(url) {
    window.location.href = url;
}

function contact() {
    window.location.href = "http://49.247.44.33/contact/?userId="+userId;
}

// 로그아웃 함수
function logout(){
    localStorage.clear();
    window.location.href = "http://localhost:8080";
}

//탈퇴 함수
function exit(){
    if (confirm("정말로 탈퇴하시겠습니까?")) {
            const userId = localStorage.getItem('userId');

            fetch(`/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    alert("회원 탈퇴가 완료되었습니다.");
                    localStorage.clear();
                    window.location.href = "http://localhost:8080";
                } else {
                    alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
                }
            })
            .catch(error => {
                console.error("회원 탈퇴 중 오류 발생:", error);
                alert("탈퇴 중 문제가 발생했습니다.");
            });
        }
}

window.addEventListener('load', async function() {
     const userId = localStorage.getItem('userId');

    try {
        const response = await fetch(`/users/${userId}`);
        if (response.ok) {
            const user = await response.json();
            document.getElementById("student_name").innerText = user.name;
            document.getElementById("student_num").innerText = user.studentNumber;
            document.getElementById("student_major").innerText = user.department;
            document.getElementById("register_date").innerText = new Date(user.registrationDate).toLocaleDateString();

        } else {
            console.error("사용자 정보를 불러오는 데 실패했습니다.");
        }
    } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
    }
});
