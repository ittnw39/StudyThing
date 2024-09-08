//REGISTER
import { loadmajor } from "./modules/loadmajor.js";


loadmajor()
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error('학과 데이터 로드 에러 ->', error);
    });

//validation
document.addEventListener('DOMContentLoaded', function () {
    loadmajor();

    ///submit event
    document.getElementById('register').addEventListener('submit', function (event) {
        event.preventDefault();
        let validated = true;

        const email = document.getElementById('textbox-email').value;
        const email_pattern = /^[a-zA-Z0-9._-]+@mju.ac.kr$/;
        if (email === "") {
            validated = false;
            document.getElementById('email-validation-error').textContent = "이메일을 입력해주세요.";
            document.getElementById('email-validation-error').style.display = 'block';
        } else if (!email_pattern.test(email)) {
            validated = false;
            document.getElementById('email-validation-error').innerHTML = '명지대 학생 이메일로 수정해주세요.';
            document.getElementById('email-validation-error').style.display = 'block';
        } else {
            document.getElementById('email-validation-error').style.display = 'none';
        }

        const name = document.getElementById('textbox-name').value;
        if (name === "") {
            validated = false;
            document.getElementById('name-validation-error').textContent = "이름을 입력해주세요.";
            document.getElementById('name-validation-error').style.display = 'block';
        } else {
            document.getElementById('name-validation-error').style.display = 'none';
        }

        const studentID = document.getElementById('textbox-st-num').value;
        const studentID_Pattern = /^\d{8}$/;
        if (!studentID_Pattern.test(studentID)) {
            validated = false;
            document.getElementById('st-num-validation-error').textContent = "학번을 올바르게 입력해주세요.";
            document.getElementById('st-num-validation-error').style.display = 'block';
        }
        else {
            document.getElementById('st-num-validation-error').style.display = 'none';
        }

        const majorValue = document.getElementById('major-combobox').value;
        if (majorValue == 'null') {
            document.getElementById('major-validation-error').textContent = "학과를 입력해주세요.";
            document.getElementById('major-validation-error').style.display = 'block';
        } else {
            document.getElementById('major-validation-error').style.display = 'none';
        }

        if (!validated) {
            //이벤트 종료
            console.log('submit blocked.');
            return; 
        } else{

            //업데이트 패치
            const userId = localStorage.getItem('userId');

                    const updatedUser = {
                        name: document.getElementById('textbox-name').value,
                        email: document.getElementById('textbox-email').value,
                        password: document.getElementById('textbox-pw-raw').value,
                        studentNumber: document.getElementById('textbox-st-num').value,
                        department: document.getElementById('major-combobox').value,
                        // 필요시 다른 필드 추가
                    };

                    fetch(`/users/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUser),
                    })
                    .then(response => {
                        if (response.ok) {
                            // 성공적으로 업데이트 되면 마이페이지로 리다이렉트
                            window.location.href = "../my/index.html";
                        } else {
                            return response.json().then(errorData => {
                                // 서버로부터 받은 에러 메시지 처리
                                console.error('서버 에러:', errorData);
                                alert("회원 정보 업데이트에 실패했습니다.");
                            });
                        }
                    })
                    .catch(error => {
                        console.error('업데이트 요청 중 오류 발생:', error);
                        alert("업데이트 중 문제가 발생했습니다.");
                    });
        }
    });


    ['textbox-email', 'textbox-name', 'textbox-st-num', 'major-combobox'].forEach(function (id) {
        document.getElementById(id).addEventListener('input', function () {
            this.nextElementSibling.style.display = 'none';
        });
    });
});