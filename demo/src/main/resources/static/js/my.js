function link(url) {
    window.location.href = url;
}

// 로그아웃 함수
function logout(){
    localStorage.clear();
    window.location.href = "http://localhost:8080";
}

//탈퇴 함수
function exit(){
    
}