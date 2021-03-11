$(function(){
    nav();
    $("#navBar").css("height",$(".navButton").outerHeight(true));
    $("#navBarBox").css("height",$(".navButton").outerHeight(true));
});

    function nav() {
        var $aCur = $("#currentFocus"),
        $bar = $("#barIndicator"),
        $targetEle = $(".navButton"),
        $navBox = $("#navBarBox");
        $bar.css("background-color","rgba(250,0,0,0.9)");
        refresh();
        
        $(window).resize(function(){refresh();});
        
        function refresh(){
            curOuterWidth = $aCur.outerWidth(true);
            curWidth = $aCur.width() - 14;
            curPosition = $aCur.position().left + (curOuterWidth - curWidth) / 2;
            $bar.css({"left":curPosition,"width":curWidth,"top":($targetEle.outerHeight(true)-$targetEle.children().outerHeight(true)/2-2)+"px"});
        }
        
        $targetEle.mouseenter(function () {
            child = $(this).children();
            hoverOuterWidth = child.outerWidth(true);
            hoverWidth = child.width() - 16;
            hoverPosition = child.position().left + (hoverOuterWidth - hoverWidth) / 2;
            if (child.attr("id") === $aCur.attr("id")) { 
                $bar.css("background-color","rgba(220,0,0,0.9)");
            } else {
                $bar.css("background-color","rgba(240,240,240,0.9)");
            };
            $bar.stop(true).animate({
                "left":hoverPosition,
                "width":hoverWidth
            },100);
        });

        $navBox.mouseleave(function () {
            $bar.css("background-color","rgba(250,0,0,0.9)");
            $bar.stop(true).animate({
                "left":curPosition,
                "width":curWidth
            },100);
        });
    }

function checkCookie(){
    var user = Cookies.get("username");
    var loggedIn = Cookies.get("loggedIn");
    if ((user !== undefined) && loggedIn){
        // Logged in
        document.getElementById("loginRegButton").style.display="none";
        document.getElementById("myAccountBox").innerHTML=user;
    } else {
        //Not logged in
        document.getElementById("myAccountBox").style.display="none";
    }
}