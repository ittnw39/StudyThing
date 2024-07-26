//[LOGIN&REGISTER]
//PASSWORD EYES TOGGLE
$(document).ready(function() {
    $("#password-box i").on('click', function() {
        var $input = $('#password-box input');
        var Active = $input.toggleClass('active').hasClass('active');

        $(this).attr('class', Active ? "fa-regular fa-eye-slash" : "fa-regular fa-eye");
        $input.attr('type', Active ? 'text' : 'password');
    });
});

$(document).ready(function() { /*re-password box*/
    $("#re-password-box i").on('click', function() {
        var $input = $('#re-password-box input');
        var isActive = $input.toggleClass('active').hasClass('active');

        $(this).attr('class', isActive ? "fa-regular fa-eye-slash" : "fa-regular fa-eye");
        $input.attr('type', isActive ? 'text' : 'password');
    });
});

///login-validation
$(document).ready(function() {
    ///email박스의 경우 register-validation과 공통적인 함수를 사용할 수 있지만 편의성을 위해 분리(추후에 공통 요소 합칠때 고려)
    $('#login').on('submit', function(event) {
        let validated = true;

        const email = $('#textbox-email').val();
        const email_pattern = /^[a-zA-Z0-9._-]+@mju.ac.kr$/;
        if (email === ""){  
            validated = false;
            $('#email-validation-error').text("이메일을 입력해주세요.");
            $('#email-validation-error').show();
        }else if( !email_pattern.test(email)){ 
            validated = false;
            $('#email-validation-error').text("유효한 이메일을 입력해주세요.");
            $('#email-validation-error').show();
        }else{
            $('#email-validation-error').hide();
        }
        
        const pw = $('#textbox-pw').val();
        const pw_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (pw === ""){
            validated = false;
            $('#pw-validation-error').text("비밀번호를 입력해주세요.");
            $('#pw-validation-error').show();
        }else if(!pw_pattern.test(pw)){
            validated = false;
            $('#pw-validation-error').text("형식에 맞지않는 문자열은 사용할 수 없습니다.");
            $('#pw-validation-error').show();
        }else{
            $('#pw-validation-error').hide();
        }

        if(!validated) {
            event.preventDefault();
            console.log('login submit blocked.');
        }

        $('#textbox-email').on('input', function() {
            $('#email-validation-error').hide();
        });
        $('#textbox-pw').on('input', function() {
            $('#pw-validation-error').hide();
        });
    });
});

///register-validation
$(document).ready(function() {
    /*비밀번호 일치 검증*/
    let pw_checked = false;

    $('#re-password-box input').on('change', function() {
        $('#ns-pw-match-error').hide();
        $('#password-box input').css('border','1px solid #ccc');
        var pw_raw = $('#password-box input').val();
        if($('#re-password-box input').val() == pw_raw){
            $(this).css('border','1px solid green');
            $('#pw-validation-checked-error').hide();
            pw_checked = true;
        }else{
            pw_checked = false;
            $(this).css('border','1px solid red');
            $('#ns-pw-match-error').show();
        }
    });

    ///submit event
    $('#register').on('submit', function(event) {
        let validated = true;  
        
        const email = $('#textbox-email').val();
        const email_pattern = /^[a-zA-Z0-9._-]+@mju.ac.kr$/;
        if (email === ""){  
            validated = false;
            $('#email-validation-error').text("이메일을 입력해주세요.");
            $('#email-validation-error').show();
        }else if( !email_pattern.test(email)){ 
            validated = false;
            $('#email-validation-error').html('명지대 학생 이메일로 가입해주세요.<br><a href="https://www.mju.ac.kr/bbs/mjukr/522/190907/artclView.do">이메일만들러가기</a>');
            $('#email-validation-error').show();
        }else{
            $('#email-validation-error').hide();
        }

        const name = $('#textbox-name').val();
        if (name === ""){ 
            validated = false;
            $('#name-validation-error').text("이름을 입력해주세요.");
            $('#name-validation-error').show();
        }else{
            $('#name-validation-error').hide();
        }

        const pw_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const pw = $('#textbox-pw-raw').val();
        if (pw === ""){
            validated = false;
            $('#pw-validation-checked-error').text("비밀번호를 입력해주세요.");
            $('#pw-validation-checked-error').show();
        }else if(!pw_pattern.test(pw)){
            validated = false;
            $('#pw-validation-checked-error').text("비밀번호는 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            $('#pw-validation-checked-error').show();
        }else if(!pw_checked){
            validated = false;
            $('#pw-validation-checked-error').text("비밀번호 확인을 해주세요.");
            $('#pw-validation-checked-error').show();
        }else{
            $('#pw-validation-checked-error').hide();
        }

        const studentID = $('#textbox-st-num').val();
        const studentID_Pattern = /^\d{8}$/;
        if(!studentID_Pattern.test(studentID))
        {
            validated = false;
            $('#st-num-validation-error').text("학번을 올바르게 입력해주세요.");
            $('#st-num-validation-error').show();
        }
        else{
            $('#st-num-validation-error').hide();
        }

        const majorValue = $('#major-combobox').val();
        console.log(majorValue);
        if(majorValue == 'null'){
            $('#major-validation-error').text("학과를 입력해주세요.");
            $('#major-validation-error').show();
        }else{
            $('#major-validation-error').hide();
        }

        if(!validated) {
            event.preventDefault();
            console.log('submit blocked.');
        }
    });

    /*입력 시 에러메세지 초기화*/
    $('#textbox-email, #textbox-name, #textbox-st-num, #major-combobox').on('input', function() {
        $(this).next('.validation-error').hide();
    });
    $('#textbox-pw-raw').on('input', function() {
        $('#pw-validation-checked-error').hide();
    });
});