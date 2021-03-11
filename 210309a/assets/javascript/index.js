$(function(){
    checkCookie();
    $("body").css("height",window.innerHeight);
    $("#footerBox").css("position","absolute")
    $("#eye").mousedown(function(){
        toggleVisibility(true);
      });
      $("#eye").mouseup(function(){
        toggleVisibility(false);
      });
});

function checkValidity(){
    var username=document.getElementById("user").value;
    var password=document.getElementById("pass").value;
    if(username!==""&&password!==""){
        alert("创建成功 "+username);
        Cookies.set("username",username,{expires:365})
        if(document.getElementById("autoLogin").checked){
            Cookies.set("autoLogin",true,{expires:365});
        }else{
            Cookies.set("autoLogin",true)
        }
    }else if(username==""){
        alert("请填写用户名");
    }else if(password==""){
        alert("请设置密码");
    }
}

function toggleVisibility(visible){
    if(visible){
        $("#pass").attr("type","text");
    }else{
        $("#pass").attr("type","password");
    }
}

function checkCookie(){
    var user = Cookies.get("username");
    var autoLogin = Cookies.get("autoLogin");
    if ((user !== undefined) && autoLogin){
        // Logged in
        document.getElementById("loginBox").style.display="none"
    } else {
        //Not logged in
        Cookies.set("username","guest");
        Cookies.set("autoLogin",true);
    }
}