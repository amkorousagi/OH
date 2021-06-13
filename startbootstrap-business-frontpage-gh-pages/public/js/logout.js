function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}
jQuery(document).ready(async function ($) {
  if (document.cookie) {
    console.log("로그인상태")
    const logout = document.getElementById("login")
    logout.textContent = "로그아웃"
    logout.setAttribute("href", "/")
    logout.setAttribute("onclick", "logout()")
    console.log("token", localStorage.getItem("token"))
    const mypage = document.getElementById("register")
    $.ajax({
      type: "GET",
      url: "13.209.22.172:3001/user",
      accepts: "application/json",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log(data)
        mypage.textContent = data.user.UserId
        mypage.setAttribute("href", "/mypage")
      },
      error: function (a, b, c) {
        console.log(a)
        console.log(b)
        console.log(c)
      },
      beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader(
          "Authorization",
          "bearer " + localStorage.getItem("token")
        )
      },
    })
    
  }
  console.log("my token is ", document.cookie)
})
