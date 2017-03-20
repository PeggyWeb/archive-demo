// JavaScript Document
var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;

function delayer(){
 window.location = "user.html";
}
$(function() {
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
	$(":checkbox").iCheck({checkboxClass: 'icheckbox_flat-blue',increaseArea: '20%'
				});
	//提示信息插件
	$("[data-toggle='tooltip']").tooltip();	
	// 触发下一页按钮时，再次检查数据合法性
	
	$("#next_one").click(function() {
			var username = $("#username").val(),password = $("#password").val(), cpa = $("#cpa").val();
			var username_reg = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
			var password_reg = /[a-zA-Z0-9]{6,20}$/;
			var flag = true;
			if (username == ""&& username == undefined&& password == ""&& password == undefined&& cpa == ""&& cpa == undefined) {
				flag = false;
			} else if (username_reg.test(username)&& password_reg.test(password)&& password_reg.test(cpa)&& cpa == password) {
				flag = true;
			} else {
				$("#next_one").addClass("disabled");
				$("#next_one").prop("disabled",true);
				layer.msg('您的用户名或密码有误，请重新输入',{icon:2,time:700});
				flag = false;
			}
			if (flag) {
				$("#next_one").removeClass("disabled");
				$("#next_one").removeProp("disabled",true);
			} else {
				$("#next_one").addClass("disabled");
				$("#next_one").prop("disabled",true);

				$("#username").focus();
			}
		});
	});
	var nextbutton="next_one",nextbutton2="next_two",submitbutton="submit";
	//检查用户
	$("#username").blur(function(){
		var username = $("#username").val(),name="username";
		var username_reg = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
		if (username_reg.test(username)) {
			if(typeof(Storage)!=="undefined"){
				 
				if(localStorage.getItem(username)>0){
				console.log("该用户名已存在");
				}else{
				console.log("用户名合法");
				console.log(localStorage.getItem(username));
				hassuccess(name,nextbutton);
				}
			}else{
				console.log("请使用高版本的浏览器");
			}
		}else {
			haserror(name,nextbutton);
		}
		
	})
	// 密码验证
	$("#password").blur(function(){
		var password = $("#password").val(),name="password";
		var password_reg = /[a-zA-Z0-9]{5,20}$/;
		if(password != "" && password != undefined) {
			if (password_reg.test(password)) {
				hassuccess(name,nextbutton);
			} else {
				haserror(name,nextbutton);
				layer.msg("密码格式错误，请重新输入",{icon:2,shade:0.05,time:700});
			}
		}else{
			haserror(name,nextbutton);
		}
	})
	//确认输入密码方法
	$("#cpa").blur(function(){
		var cpa = $("#cpa").val(),password = $("#password").val(),name="cpa";
		var password_reg = /[a-zA-Z0-9]{5,20}$/;
		if (cpa&&password_reg.test(cpa)&&cpa==password) {
			hassuccess(name,nextbutton);
		}else{
			haserror(name,nextbutton);
			layer.msg("确认密码错误，请重新确认密码",{icon:2,shade:0.05,time:700});
		}
	});
	//证件号码验证
	$("#cid").blur(function() {
		var cid = $("#cid").val(),name="cid";
		var reg = /[a-zA-Z0-9]{5,20}$/;
		if (cid != "" && cid != undefined) {
			hassuccess(name,submitbutton);
		} else {
			haserror(name,submitbutton);
		}

	});
	// 姓名验证
	$("#name").blur(function() {
		var name=$("#name").val(),truename="name";
		if (name != "" && name != undefined) {
			hassuccess(truename,submitbutton);
		} else {
			haserror(truename,submitbutton);
		}
	});
	// 电话验证
	$("#tel").blur(function() {
		var phone_reg = /[0-9]*[1-9][0-9]*$/;//正整数
		var tel=$("#tel").val(),name="tel";
		if (phone_reg.test(tel)) {
			hassuccess(name,submitbutton);
		} else {
			haserror(name,submitbutton);
		}
	});
	// 地址验证
	$("#address").blur(function() {
		var address = $("#address").val(),name="address";
		if (address != "" && address != undefined) {
			hassuccess(name,submitbutton);
		} else {
			haserror(name,submitbutton);
		}
	});
	// email验证
	$("#email").blur(function() {
		var email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		var email = $("#email").val(),name="email";
		if (email_reg.test(email)) {
			hassuccess(name,submitbutton);
		} else {
			haserror(name,submitbutton);
		}
	// 页面切换代码开始
	// 切换下一页
	$('.next').click(function() {
		if (animating){
	            	return false;
	    }
	    animating = true;
	    current_fs = $(this).parents("fieldset");
	    next_fs = $(this).parents("fieldset").next();
	    $('#progress li').eq($('fieldset').index(next_fs)).addClass('active');
	    next_fs.show();
	    current_fs.animate({ opacity: 0 }, {
	        step: function (now, mx) {
	            scale = 1 - (1 - now) * 0.2;
	            opacity = 1 - now;
	            current_fs.css({ 'transform': 'scale(' + scale + ')' });
	            next_fs.css({
	                'left': left,
	                'opacity': opacity
	            });
	        },
	        duration: 500,
	        complete: function () {
	            current_fs.hide();
	            animating = false;
	        },
	        easing: 'easeInExpo'
	    });
	});
	// 回到上一页
	$('.previous').click(function(){
		 if (animating){
	            return false;
		 }
		animating = true;
		current_fs = $(this).parents("fieldset");
		previous_fs = $(this).parents("fieldset").prev();
		$('#progress li').eq($('fieldset').index(current_fs)).removeClass('active');
		previous_fs.show();
		current_fs.animate({ opacity: 0 }, {
		    step: function (now, mx) {
		        scale = 0.8 + (1 - now) * 0.2;
		        opacity = 1 - now;
		        current_fs.css({ 'left': left });
		        previous_fs.css({
		            'transform': 'scale(' + scale + ')',
		            'opacity': opacity
		        });
		    },
		    duration: 500,
		    complete: function () {
		        current_fs.hide();
		        animating = false;
		    },
		    easing: 'easeOutCubic'
		});
	});
	//页面切换代码结束
	// 提交注册信息，写到localstorage去
	$("#submit").click(function() {
		//注册信息tuser对象里
		var tuser={
			user : ($('#username').val()),
			user_pwd : ($('#password').val()),
			real_name : encodeURIComponent($('#name').val()),
			profession : encodeURIComponent($('#profession').val()),
			cert_type : encodeURIComponent($('#cert_type option:selected').val()),
			cert_no : ($('#cid').val()),
			phone : ($('#tel').val()),
			email : ($('#email').val()),
			sex : encodeURIComponent($('#sex').val()),
			address : encodeURIComponent($('#address').val()),
			selflabel : encodeURIComponent($('#selflabel').val())
		};
		var adduser = JSON.stringify(tuser);//转为json储存
		if(typeof(Storage)!=="undefined"){
			if(localStorage.getItem(tuser.user)){
				console.log("已存在用户");
			}
			else{
				localStorage.setItem(tuser.user,adduser);
				window.load("login.html","_self");
			}
		}else{
			alert("您当前的浏览器太旧了，请使用高版本的浏览器");
		}
	});
	// 给输入框添加错误样式并禁用下一步按钮
	
});
function haserror(errorname,buttonid){
		var adderror="#"+errorname,cbutton="#"+buttonid;
		$(cbutton).attr({"disabled":"true"});
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

