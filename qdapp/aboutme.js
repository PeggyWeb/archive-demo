$(function() {
	if(typeof(Storage)!=="undefined"){
		if(sessionStorage.loginuser_name){
			var userfunction="<li><a href='user.html' title='用户中心'><span class='glyphicon glyphicon-user'></span>"+sessionStorage.loginuser_name+
			"</a></li><li class='active'><a href='#' onclick='loginout()'>退出</a></li>";
			$("#loginfunction").html(userfunction);
		}
	}else{
		layer.msg("请切换到高版本的浏览器",{time:800});
		window.open("error.html","_self");
	}
	$(document).scroll(function() {
		if($(window).scrollTop() == 0) {
			$("#amdee").addClass("hide");
		} else if($(window).scrollTop() > 100) {
			$("#amdee").removeClass("hide");
		}
	});
	$(".section").hide();
	$(".section:first").show();
	$(".navigationTwo").children().click(function(){
		var index=$(".navigationTwo").children().index(this);console.log(index);
		index+=2;
		$(".section").hide();
		$(".section:nth-of-type("+index+")").show();
	});
	$(".answer").hide();
	$(".answer:first").show();
	$(".question_navigation li:first").css({"border-bottom":"3px solid rgb(34,167,240)","color":"rgb(34,167,240)"});
	$(".question_navigation").children().click(function(){
		var index=$(".question_navigation").children().index(this);
		$(".answer").hide();
		$(".question_navigation li").css({"border":"0px","color":"#555"});
		$(this).css({"border-bottom":"3px solid #69f","color":"rgb(34,167,240)"});
		index += 2;
		console.log(index);
		$(".answer:nth-of-type("+index+")").show();
	});
	//退出登录
function loginout(){
	sessionStorage.clear();
	window.open("login.html","_self");
}
})
