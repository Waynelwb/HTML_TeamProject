var hasPrevious = true;

$(function(){
    checkCookie();
    if(!document.referrer){$("#back").css("display","none");hasPrevious=false;}
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
        popupMsg("登录成功  即将"+(hasPrevious?"返回":"前往首页"),"rgba(57, 192, 23, 0.9)");
        $("#login").css({"pointer-events":"none","cursor":"not-allowed","background-color":"rgb(70,70,70)"});
        Cookies.set("username",username,{expires:365})
        if(document.getElementById("autoLogin").checked){
            Cookies.set("loggedIn",true,{expires:365});
        }else{
            Cookies.set("loggedIn",true)
        }
        setTimeout(hasPrevious?"history.back(-1)":"self.location='index.html'",1200);
    }else if(username==""){
        popupMsg("请填写 用户名","rgba(240,0,0,0.8)");
    }else if(password==""){
        popupMsg("请设置 密码","rgba(240,0,0,0.8)");
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
    var loggedIn = Cookies.get("loggedIn");
    if (user !== undefined){
        if(loggedIn){
            // Logged in
            document.getElementById("loginBox").style.display="none";
            self.location="index.html";
        }else{
            //Has user name
            $("#user").attr("value",user);
        }
    } else {
        //Not logged in
    }
}