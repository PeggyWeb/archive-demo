
$(function(){
	$("#drag").drag();
	$(":checkbox").iCheck({
		checkboxClass : 'icheckbox_flat-blue',
		increaseArea : '20%',
	});
	if(typeof(Storage)!=="undefined"){
		if(sessionStorage.loginuser_name){
			var userfunction="<li><a href='user.html' title='用户中心'><span class='glyphicon glyphicon-user'></span>"+sessionStorage.loginuser_name+
			"</a></li><li class='active' id='loginout'><span class='glyphicon glyphicon-log-in'></span>退出</li>";
			$("#loginfunction").html(userfunction);
			layer.confirm('您已登录是否退出登录',{
				btn:['不了，谢谢','是的']//按钮
			},function(){
				window.open("index.html","_self");
			},function(){
				sessionStorage.clear();
			});
		}
	}
	$("[data-toggle='tooltip']").tooltip();
	var reg1 = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
	var reg2 = /[a-zA-Z0-9]{5,20}$/;
	$("#username").blur(function(){
		var user_name = $("#username").val(),name="username",submit="submit";
		if(reg1.test(user_name)){
			if(localStorage.getItem(user_name)){
			hassuccess(name,submit);
			}else{
				layer.msg("您的用户名不存在，请重新输入");
			}
		}else{
			haserror(name,submit);
		}
	});
	$('#submit').click(function() {
	var tuser = {
		user_name : ($('#username').val()),
		user_pwd : ($('#password').val())
	};
	
	if(typeof(Storage)!=="undefined"){
		if(localStorage.getItem(tuser.user_name)){
			var userinfo=localStorage.getItem(tuser.user_name);
			var loginuser=JSON.parse(userinfo);
			if(tuser.user_pwd==loginuser.user_pwd){
				// session保存用户名loginuser_name
				sessionStorage.loginuser_name=tuser.user_name;
				console.log(sessionStorage.loginuser_name);
				window.open("index.html","_self");
			}else{
				layer.msg("您的密码错误请重新填写");
			}
		}
		else{
			layer.msg("您的用户名不存在，请重新输入");
		}
	}else{
		alert("您当前的浏览器太旧了，请使用高版本的浏览器");
	}
});
	$("#password").change(function(){
		var user_name = $("#username").val(),password = $("#password").val(),name="password",submit="submit";
			if(reg2.test(password)){
				if(localStorage.getItem(user_name)){
					var userinfo=localStorage.getItem(user_name);
					var loginuser=JSON.parse(userinfo);
					if(password==loginuser.user_pwd){
						hassuccess(name,submit);
					}else{
						layer.msg("您的密码错误请重新填写");
					}
				}else{
					layer.msg("您的用户名不存在，请重新输入");
				}
			}else{
				haserror(name,submit);
			}
	});
	//记住用户按钮，保存在cookie里，过期时间1分钟
	$("#rem").on("ifChecked",function(){
		var loguser={
			username:($("#username").val()),
			password:($("#password").val())
		}
		var d = new Date();
		d.setTime(d.getTime()+(24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		//var usercookie=getCookie(louser.username);
		var stringuser=JSON.stringify(loguser);
		if(reg1.test(loguser.username)&&reg2.test(loguser.password)){
			$("#submit").removeAttr("disabled");
		//document.cookie="ruser="+stringuser+";"+expires;
			if(typeof(Storage)!=="undefined"){
				if (localStorage.remuser){
				}else{
					localStorage.remuser=stringuser;
				}
			}
			else{
				layer.msg("请您更换新的浏览器");
			}
		}else{
			$("#submit").attr({"disabled":"true"});
			layer.msg("请您检查您的用户名或密码",{icon:2,shade:0.07,time:700});
		}
		
	});
});
// 给输入框添加错误样式并禁用提交按钮
function haserror(errorname,buttonid){
	var adderror="#"+errorname,cbutton="#"+buttonid;
	if($(cbutton).attr("disabled")){

	}else{
		$(cbutton).attr({"disabled":"true"});
	}
	
	$(adderror).parent().removeClass("has-success");
	$(adderror).parent().addClass("has-error");
	layer.msg("请输入正确格式",{icon:2,shade:0.05,time:700})
}
// 给输入框添加成功样式并启用下一步按钮
function hassuccess(successname,buttonid){
	var addsuccess="#"+successname,dcbutton="#"+buttonid;
	$(addsuccess).parent().removeClass("has-error");
	$(addsuccess).parent().addClass("has-success");
	$(dcbutton).removeAttr("disabled");
}
