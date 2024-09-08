import { pw_eyes_toggle } from "./modules/pw_eyes_toggle.js";

pw_eyes_toggle();

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('password-update').addEventListener('submit', function (e) {
        e.preventDefault();
        const now_pw = document.getElementById('crnt-pw');
        const new_pw = document.getElementById('textbox-pw-raw');
        const re_new_pw = document.getElementById('textbox-pw-re');
        const isvalidate = pw_checked();

        function pw_checked() {
            const pw_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

            if (now_pw.value.trim() === "") { //입력 확인
                error_message("현재 비밀번호가 입력되지 않았습니다.");
                return false;
            }

            if (new_pw.value.trim() === "") { //입력 확인
                error_message("새 비밀번호가 입력되지 않았습니다.");
                return false;
            } else if (!pw_pattern.test(new_pw.value.trim())) { //규칙 확인
                error_message("새 비밀번호가 규칙에 맞지 않습니다.");
                return false;
            } else if (new_pw.value.trim() === now_pw.value.trim()) { //현재 비밀번호 사용 금지
                error_message("새 비밀번호가 현재 비밀번호와 같을 수 없습니다.");
                return false;
            }

            if (re_new_pw.value.trim() === "") { //입력확인
                error_message("비밀번호 확인이 입력되지 않았습니다.");
                return false;
            } else if (re_new_pw.value.trim() !== new_pw.value.trim()) { //비밀번호 일치 검증
                error_message("비밀번호 확인이 일치하지 않습니다.");
                return false;
            }

            return true;
        }

        if (!isvalidate) {
            console.log('Aborted.');
            [now_pw, new_pw, re_new_pw].forEach(function (set_input) {
                set_input.value = "";  
            });
            return;
        } else {
            // Fetch
            success();
            [now_pw, new_pw, re_new_pw].forEach(function (set_input) {
                set_input.value = "";  
            });
        }
    });

    const err_box = document.getElementById('error-box');
    function error_message(error_msg) {
        const err_content_span = document.querySelector('.error-content');
        err_box.style.display = "block";
        err_content_span.textContent = error_msg;
    }

    const error_box_close = document.getElementById('error-box-close');
    error_box_close.addEventListener('click', function () {
        err_box.style.display = "none";
    });

    const success_box = document.getElementById('success-box');
    function success() {
        err_box.style.display = "none";
        success_box.style.display = "block";
    }
});
