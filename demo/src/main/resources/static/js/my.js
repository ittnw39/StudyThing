const userId = localStorage.getItem('userId');

function link(url) {
    window.location.href = url;
}

function content() {
    window.location.href = "http://49.247.44.33/contact/?userId="+userId;
}

// 로그아웃 함수
function logout(){
    localStorage.clear();
    window.location.href = "http://localhost:8080";
}

//탈퇴 함수
function exit(){
    
}