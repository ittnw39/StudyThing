//REGISTER
import { pw_eyes_toggle } from "./modules/pw_eyes_toggle.js";
import { loadmajor } from "./modules/loadmajor.js";

loadmajor()
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error('학과 데이터 로드 에러 ->', error);
    });

pw_eyes_toggle();

//validation
document.addEventListener('DOMContentLoaded', function () {
    loadmajor();

    /*비밀번호 일치 검증*/
    let pw_checked = false;
    let pw_status = 0;

    document.querySelector('#re-password-box input').addEventListener('change', function (){
        document.getElementById('ns-pw-match-error').style.display = 'none';
        document.querySelector('#password-box input').style.border = '1px solid #ccc';
        var pw_raw = document.querySelector('#password-box input').value;
        if (this.value == pw_raw) {
            if(!pw_raw == "")
            {
                pw_status = 1;
                this.style.border = '1px solid green';
                document.getElementById('pw-validation-checked-error').style.display = 'none';
                pw_checked = true;
            }
            else{
                this.style.border = '1px solid #ccc';
            }
        } else if(pw_raw == ""){ //이경우 입력값 삭제
            pw_status = 3;
            this.style.border = '1px solid #ccc';
            this.value = '';
            console.log('비밀번호 확인란은 비밀번호 입력란 보다 먼저 입력될 수 없습니다.')
        } else {
            pw_status = 2;
            pw_checked = false;
            this.style.border = '1px solid red';
            document.getElementById('ns-pw-match-error').style.display = 'block';
        } 
    });

    /*#re-password-box input입력후 #password-box input 변화에 대한 반응*/
    document.querySelector('#password-box input').addEventListener('change', function (){
        var pw_re = document.querySelector('#re-password-box input');

        //검증이 완료되었는데 pw_raw를 변경할 경우
        if(pw_status == '1')
        {
            pw_re.value = '';
            pw_re.style.border = '1px solid #ccc';
            pw_checked = false;
        } else if(pw_status == '3'){
            pw_status = 0;
        } else if(pw_status == '2'){ 
            if(pw_re.value == this.value){//비밀번호가 일치하지 않지만 raw값을 변경시켜 일치시키려는 경우
                pw_status = 1;
                pw_re.style.border = '1px solid green';
                pw_checked = true;
                document.getElementById('ns-pw-match-error').style.display = 'none';
            } else{ //그냥 raw값을 더 많이 변화시킨다면
                pw_re.value = '';
                pw_re.style.border = '1px solid #ccc';
                document.getElementById('ns-pw-match-error').style.display = 'none';
                pw_checked = false;
            }
        }
    });

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
            document.getElementById('email-validation-error').innerHTML = '명지대 학생 이메일로 가입해주세요.<br><a href="https://www.mju.ac.kr/bbs/mjukr/522/190907/artclView.do">이메일 만들러 가기</a>';
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

        const pw_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const pw = document.getElementById('textbox-pw-raw').value;
        if (pw === "") {
            validated = false;
            document.getElementById('pw-validation-checked-error').textContent = "비밀번호를 입력해주세요.";
            document.getElementById('pw-validation-checked-error').style.display = 'block';
        } else if (!pw_pattern.test(pw)) {
            validated = false;
            document.getElementById('pw-validation-checked-error').textContent = "비밀번호는 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.";
            document.getElementById('pw-validation-checked-error').style.display = 'block';
        } else if (!pw_checked) {
            validated = false;
            document.getElementById('pw-validation-checked-error').textContent = "비밀번호 확인을 해주세요.";
            document.getElementById('pw-validation-checked-error').style.display = 'block';
        } else {
            document.getElementById('pw-validation-checked-error').style.display = 'none';
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
        } else{//fetch
            const userDTO = {
                email: email,
                name: name,
                password: pw,
                studentNumber: studentID,
                department: majorValue
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
        }
    });


    ['textbox-email', 'textbox-name', 'textbox-st-num', 'major-combobox'].forEach(function (id) {
        document.getElementById(id).addEventListener('input', function () {
            this.nextElementSibling.style.display = 'none';
        });
    });
    document.getElementById('textbox-pw-raw').addEventListener('input', function () {
        document.getElementById('pw-validation-checked-error').style.display = 'none';
    });
});