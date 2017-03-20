$(function(){
	if(typeof(Storage)!=="undefined"){
		if(sessionStorage.loginuser_name){
			var userfunction="<li><a href='user.html' title='用户中心'><span class='glyphicon glyphicon-user'></span>"+sessionStorage.loginuser_name+
			"</a></li><li class='active'><a href='#' onclick='loginout()'>退出</a></li>";
			$("#loginfunction").html(userfunction);
		}
	}else{
		layer.msg("请切换到高版本的浏览器",{time:800});
		window.open("error.html","_self");
	}//退出登录
	function loginout(){
		sessionStorage.clear();
		window.open("login.html","_self");
	}
	$(":checkbox").iCheck({
		checkboxClass: 'icheckbox_flat-blue',
		increaseArea: '20%'

	});
	$("#choice").on('ifChecked', function(event){
	  $(":checkbox").iCheck('check');
	});
	$("#choice").on('ifUnchecked', function(event){
	  $(":checkbox").iCheck('uncheck');
	});
});