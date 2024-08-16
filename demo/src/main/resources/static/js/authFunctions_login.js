//Login
import { pw_eyes_toggle } from "./modules/pw_eyes_toggle.js";

pw_eyes_toggle();

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login').addEventListener('submit', function (event) {
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
            document.getElementById('email-validation-error').textContent = "유효한 이메일을 입력해주세요.";
            document.getElementById('email-validation-error').style.display = 'block';
        } else {
            document.getElementById('email-validation-error').style.display = 'none';
        }

        const pw = document.getElementById('textbox-pw').value;
        const pw_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (pw === "") {
            validated = false;
            document.getElementById('pw-validation-error').textContent = "비밀번호를 입력해주세요.";
            document.getElementById('pw-validation-error').style.display = 'block';
        } else if (!pw_pattern.test(pw)) {
            validated = false;
            document.getElementById('pw-validation-error').textContent = "형식에 맞지않는 문자열은 사용할 수 없습니다.";
            document.getElementById('pw-validation-error').style.display = 'block';
        } else {
            document.getElementById('pw-validation-error').style.display = 'none';
        }

        if (!validated) {
            console.log('login submit blocked.');
            return;
        } else{
            const user = {
                email: email,
                password: pw
            };
    
            fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    alert('유효하지 않은 이메일이나 비밀번호입니다.');
                    throw new Error('로그인 실패');
                } else {
                    throw new Error('알 수 없는 에러가 발생하였습니다. 다시 시도하여 주십시오.');
                }
            })

            .then(data => {
                alert('로그인 성공');
                console.log('유저:', data);
                // 로그인 성공 시 사용자 정보를 로컬 스토리지에 저장
                localStorage.setItem('userId', data.id);
                localStorage.setItem('userName', data.name);
                window.location.href = '/index.html';
            })
            .catch(error => {
                console.error('<에러 메세지>:', error);
            });
        }

        document.getElementById('textbox-email').addEventListener('input', function () {
            document.getElementById('email-validation-error').style.display = 'none';
        });
        document.getElementById('textbox-pw').addEventListener('input', function () {
            document.getElementById('pw-validation-error').style.display = 'none';
        });
    });
});