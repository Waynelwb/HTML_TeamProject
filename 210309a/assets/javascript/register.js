var hasPrevious = true;
var userList = [];
var isTypingUser = false;
var passList = [];
var isTypingPass = false;
var emailList = [];
var isTypingEmail = false;

var userValid = false;
var passValid = false;
var emailValid = false;

var verifyTime = 500;

var timerUser;
var timerPass;
var timerEmail;

$(function(){
    checkCookie();
    if(!document.referrer){$("#back").css("display","none");hasPrevious=false;}
    $("body").css("height",window.innerHeight);
    $("#footerBox").css("position","absolute");

    if(document.getElementById("user").value){verifyUsername();}
    if(document.getElementById("pass").value){verifyPassword();}
    if(document.getElementById("email").value){verifyEmail();}

    setStrengthBar();

    $("#eye").mousedown(function(){
        toggleVisibility(true);
      });
      $("#eye").mouseup(function(){
        toggleVisibility(false);
      });

      $("#user").bind("input propertychange",function(){
        var username=document.getElementById("user").value;
        userValid = false;
        if(username){
            $("#verifyUser").css("display","block");
            $("#verifyUser img").attr("src","assets/images/hourglass.png");
            $("#verifyUser p").html("检测中");
            $("#verifyUser p").css("color","white");
            if(isTypingUser){
                userList.push("");
            }else{
                userList.length = 0;
                isTypingUser = true;
                timerUser = setTimeout("verifyUsername()",verifyTime);
            }
        }else{
            clearTimeout(timerUser);
            isTypingUser = false;
            $("#verifyUser").css("display","none");
        }
      });

      $("#pass").bind("input propertychange",function(){
        var password=document.getElementById("pass").value;
        passValid = false;
        if(password){
            $("#verifyPass").css("display","block");
            $("#verifyPass img").attr("src","assets/images/hourglass.png");
            $("#verifyPass p").html("检测中");
            $("#verifyPass p").css("color","white");
            if(isTypingPass){
                passList.push("");
            }else{
                passList.length = 0;
                isTypingPass = true;
                timerPass = setTimeout("verifyPassword()",verifyTime);
            }
        }else{
            setStrengthBar();
            clearTimeout(timerPass);
            isTypingPass = false;
            $("#verifyPass").css("display","none");
        }
      });

      $("#email").bind("input propertychange",function(){
        var email=document.getElementById("email").value;
        emailValid = false;
        if(email){
            $("#verifyEmail").css("display","block");
            $("#verifyEmail img").attr("src","assets/images/hourglass.png");
            $("#verifyEmail p").html("检测中");
            $("#verifyEmail p").css("color","white");
            if(isTypingEmail){
                emailList.push("");
            }else{
                emailList.length = 0;
                isTypingEmail = true;
                timerEmail = setTimeout("verifyEmail()",verifyTime);
            }
        }else{
            clearTimeout(timerEmail);
            isTypingEmail = false;
            $("#verifyEmail").css("display","none");
        }
      });
});

function verifyUsername(){
    if(userList.length > 0){
        userList.length = 0;
        timerUser = setTimeout("verifyUsername()",verifyTime);
    }else{
        isTypingUser = false;
        var username=document.getElementById("user").value;
        $("#verifyUser").css("display","block");
        $("#verifyUser img").attr("src","assets/images/tick.png");
        $("#verifyUser p").html("可以使用");
        $("#verifyUser p").css("color","rgb(62, 216, 26)");
        userValid = true;
    }
}

function verifyPassword(){
    if(passList.length > 0){
        passList.length = 0;
        timerPass = setTimeout("verifyPassword()",verifyTime);
    }else{
        isTypingPass = false;
        var password=document.getElementById("pass").value;
        $("#verifyPass p").css("color","rgb(240, 0, 0)");
        setStrengthBar(3,"rgb(210, 0, 0)");
        $("#verifyPass img").attr("src","assets/images/cross.png");
        if(password.length>=6){
            if(/\d/.test(password)){
                var t = 0;
                if(/[a-z]/.test(password)){
                    t++;
                }
                if(/[A-Z]/.test(password)){
                    t++;
                }
                if(/\W/.test(password)){
                    t*=10;
                }
                $("#verifyPass p").css("color","rgb(62, 216, 26)");
                $("#verifyPass img").attr("src","assets/images/tick.png");
                switch(t){
                    case 1:
                        $("#verifyPass p").html("强度适中");
                        $("#verifyPass p").css("color","rgb(251, 196, 41)");
                        $("#verifyPass img").attr("src","assets/images/med-tick.png");
                        setStrengthBar(1,"rgb(251, 196, 41)");
                        passValid=true;
                        break;
                    case 2:
                        $("#verifyPass p").html("强度较高");
                        setStrengthBar(2,"rgb(62, 200, 26)");
                        passValid=true;
                        break;
                    case 20:
                        $("#verifyPass p").html("强度极高");
                        setStrengthBar(3,"rgb(71, 220, 33)");
                        passValid=true;
                        break;
                    default:
                        $("#verifyPass p").css("color","rgb(240, 0, 0)");
                        $("#verifyPass img").attr("src","assets/images/cross.png");
                        $("#verifyPass p").html("未含字母");
                }
            }else{
                $("#verifyPass p").html("未含数字");
            }
        }else{
            $("#verifyPass p").html("长度过短");
        }
        $("#verifyPass").css("display","block");
    }
}

function verifyEmail(){
    if(emailList.length > 0){
        emailList.length = 0;
        timerEmail = setTimeout("verifyEmail()",verifyTime);
    }else{
        var email=document.getElementById("email").value;
        let checkEmail = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        isTypingEmail = false;
        $("#verifyEmail").css("display","block");
        if(checkEmail.test(email)){
            $("#verifyEmail img").attr("src","assets/images/tick.png");
            $("#verifyEmail p").html("可以使用");
            $("#verifyEmail p").css("color","rgb(62, 216, 26)");
            emailValid = true;
        }else{
            $("#verifyEmail img").attr("src","assets/images/cross.png");
            $("#verifyEmail p").html("格式错误");
            $("#verifyEmail p").css("color","rgb(240, 0, 0)");
        }
    }
}

function checkValidity(){
    var username=document.getElementById("user").value;
    var password=document.getElementById("pass").value;
    var email=document.getElementById("email").value;
    var protocolAgreed=document.getElementById("agreeProtocol").checked;
    if(userValid&&passValid&&emailValid&&protocolAgreed){
        popupMsg("注册成功  即将"+(hasPrevious?"返回":"前往首页"),"rgba(57, 192, 23, 0.9)");
        $("#register").css({"pointer-events":"none","cursor":"not-allowed","background-color":"rgb(70,70,70)"});
        Cookies.set("username",username,{expires:365})
        if(document.getElementById("autoLogin").checked){
            Cookies.set("loggedIn",true,{expires:365});
        }else{
            Cookies.set("loggedIn",true)
        }
        setTimeout(hasPrevious?"history.back(-1)":"self.location='index.html'",1200);
    }else if(username==""){
        popupMsg("请填写 <strong>用户名</strong>","rgba(240,0,0,0.8)");
    }else if(password==""){
        popupMsg("请设置 <strong>密码</strong>","rgba(240,0,0,0.8)");
    }else if(email==""){
        popupMsg("请填写 <strong>邮箱</strong>","rgba(240,0,0,0.8)");
    }else if(!protocolAgreed){
        popupMsg("请同意 <strong>协议</strong>","rgba(240,0,0,0.8)");
    }else{
        popupMsg("您的 <strong>" + (userValid?"":"用户名 ") + (passValid?"":"密码 ") + (emailValid?"":"邮箱 ") + "</strong>尚未验证","rgba(240,0,0,0.8)");
    }
}

function showProtocol(){
    $("#protocol").html("其实没有什么协议，单纯做个样子嗷<br><br>下面这些东西纯属凑数<br><br>用户在使用中应遵守以下法律法规：<br>中华人民共和国保守国家秘密法》；<br>《中华人民共和国著作权法》；<br>《中华人民共和国计算机信息系统安全保护条例》；<br>《计算机软件保护条例》；<br>《网络信息内容生态治理规定》；<br>《信息网络传播权保护条例》；<br>《中华人民共和国网络安全法》；<br>其他法律、法规、规章、条例等具有法律效力的规范。");
    $("#protocolBox").css({"display":"block","height":"120px"});
    $("#protocolBox").stop(true).animate({
        "height": $(".registerBox:first").outerHeight(true),
        "opacity": 1
    },100);
    $(".registerBox:first").stop(true).animate({"opacity": 0},100);
    setTimeout("$('.registerBox:first').css({'display':'none'});",700);
}

function hideProtocol(){
    $(".registerBox:first").css("display","block");
    $("#protocolBox").stop(true).animate({
        "height": "120px",
        "opacity": 0
    },100);
    $(".registerBox:first").stop(true).animate({"opacity": 1},100);
    setTimeout("$('#protocolBox').css({'display':'none'});",700);
}

function toggleVisibility(visible){
    if(visible){
        $("#pass").attr("type","text");
    }else{
        $("#pass").attr("type","password");
    }
}

function setStrengthBar(sections, color){
    sections = sections || 0;
    var barCSS = "linear-gradient(to right, " + (color || "rgb(120, 120, 120)") + " 31%, rgba(0, 0, 0, 0) 31%, rgba(0, 0, 0, 0) 34.5%, ";
    barCSS += (-- sections <= 0 ? "rgb(120, 120, 120) 34.5%, rgb(120, 120, 120) 65.5%, rgba(0, 0, 0, 0) 65.5%, rgba(0, 0, 0, 0) 69%, " : (color + " 34.5%, " + color + " 65.5%, rgba(0, 0, 0, 0) 65.5%, rgba(0, 0, 0, 0) 69%, "));
    barCSS += (-- sections <= 0 ? "rgb(120, 120, 120)" : color) + " 69%";
    $("#strengthBar").css({"background-image":barCSS,"opacity":(sections==-2?"0.6":"1")});
}

function checkCookie(){
    var loggedIn = Cookies.get("loggedIn");
    if(loggedIn){
        // Logged in
        document.getElementById("registerBox").style.display="none";
        self.location="index.html";
    }
}