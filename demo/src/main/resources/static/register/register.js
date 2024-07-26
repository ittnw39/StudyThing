document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("register");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("pw").value;
        const studentNumber = document.getElementById("studentNumber").value;
        const department = document.getElementById("combobox").value;

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 필수 필드 확인
        if (!email || !name || !password || !confirmPassword || !studentNumber || !department) {
            alert("모든 필드를 채워주세요.");
            return;
        }

        // 프론트엔드에서 비밀번호 유효성 검사
        if (!validatePassword(password)) {
            alert("비밀번호는 최소 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.");
            return;
        }

        const userDTO = {
            email: email,
            name: name,
            password: password,
            studentNumber: studentNumber,
            department: department
        };

        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDTO)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .then(data => {
            // 회원가입 성공 처리
            alert('회원가입 성공');
            console.log('새 사용자:', data);
            // 필요에 따라 리디렉션 또는 UI 업데이트
            window.location.href = '/login/index.html';
        })
        .catch(error => {
            console.error('오류:', error);
            alert('오류가 발생했습니다: ' + error.message);
        });
    });
     // 비밀번호 유효성 검사 함수
        function validatePassword(password) {
            if (password == null || password.length < 8) {
                return false;
            }
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasDigit = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const hasKorean = /[가-힣]/.test(password);

            return hasUppercase && hasLowercase && hasDigit && hasSpecialChar && !hasKorean;
        }
});
