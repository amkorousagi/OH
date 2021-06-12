function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
jQuery(document).ready(function ($) {
    if (document.cookie) {
        console.log('로그인상태');
        const logout = document.getElementById('login');
        logout.textContent = '로그아웃';
        logout.setAttribute('href', '/');
        logout.setAttribute('onclick', 'logout()');

        const mypage = document.getElementById('register');
        mypage.textContent = '내정보';
        mypage.setAttribute('href', '/mypage');
    }
    console.log("my token is ", document.cookie)
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
});