var currentMsg = 0;

function popupMsg(message, color, fontColor, xPos, yPos){
    var msgBox = $("<div class='msgBox' id='msg" + ++ currentMsg + "' style='background-color:" + (color || "rgba(100,100,100,0.9)") + ";opacity:0;top:" + (yPos - 20 || 0) + "px;left:" + (xPos == undefined ? "50%;transform:translate(-50%,0)" : xPos + "px") + "'><p class='msgPrompt' id='prompt" + currentMsg + "' style='color:" + (fontColor || "white") + "'>" + message + "</p></div>");
    $("body").append(msgBox);
    $("#msg" + currentMsg).stop(true).animate({
        "opacity": 1,
        "top": ( yPos || 20 ) + "px"
    },80);
    $("#prompt" + currentMsg).stop(true).animate({"font-size": "17px"},105);
    setTimeout("$('#msg" + currentMsg + "').stop(true).animate({'opacity': 0,'top': '" + ( yPos - 20 || 0 ) + "px'},80);$('#prompt" + currentMsg + "').stop(true).animate({'font-size': '10px'},105);setTimeout('$(\"#msg" + currentMsg + "\").remove();',1000);",2000);
}