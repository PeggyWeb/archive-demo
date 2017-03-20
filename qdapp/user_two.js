$(function() {
	$('#collapseFour').collapse({
		toggle : false
	});
	$('#collapseFive').collapse({
		toggle : false
	});
	$('#collapseTwo').collapse('hide');
	$('#collapseThree').collapse('hide');
	$('#collapseOne').collapse('show');
	var d=new Date();
	var year = d.getFullYear()+"-";
	var month= d.getMonth()+1 +"-";
	var day=d.getDate()+"";
	var logintime=year+month+day;
	$(".logintime").text("登陆时间"+logintime);
	// 用户信息修改
	function hideform(x) {
		var formindex=x;
		for (var i = 1; i < 4; i++) {
			$("#form"+i).hide();
		}
		$("#form"+formindex).show();
	}
	hideform(1);
	$(".personal").children().click(function(){
		var index = $(".personal").children().index(this)+1;
		hideform(index);
	});
	var update_user="updateuser",update_pwd="updatepwd",update_cert="updatecert";
	$("#email").change(function() {
		var email = $("#email").val(),name="email";
		var email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if (email_reg.test(email)) {
			hassuccess(name,update_user);
		} else {
			haserror(name,update_user);
		}
	});
	$("#phone").change(function() {
		var phone = $("#phone").val(),name="phone";
		var phone_reg = /[0-9]*[1-9][0-9]*$/;//正整数

		if (phone_reg.test(phone)) {
			hassuccess(name,update_user);
		} else {
			haserror(name,update_user);
		}
	});
	$("#zipcode").change(function() {
		var zipcode = $("#zipcode").val(),name="zipcode";
		var zipcode_reg = /[1-9]{1}(\d+){5}/;
		if (zipcode_reg.test(zipcode)) {
			hassuccess(name,update_user);
		} else {
			haserror(name,update_user);
		}
	});
	$("#profession").change(function() {
		var name="profession";
		if (profession != "" && profession != undefined) {
			hassuccess(name,update_user);
		} else {
			haserror(name,update_user);
		}

	});
	$("#address").change(function() {
		var address = $("#address").val(),name="address";
		if (address != "" && address != undefined) {
			hassuccess(name,update_user);
		} else {
			haserror(name,update_user);
		}
	});
	$("#selflabel").change(function() {
		var selflabel = $("#selflabel").val(),name="selflabel";
		if (selflabel != "" && address != undefined) {
			hassuccess(name,update_user);
		} else {
			haserror(name,update_user);
		}
	});

	$("#ypassword").change(function() {
		var ypassword = $("#ypassword").val(),name="ypassword";
		var password_reg = /[a-zA-Z0-9]{6,20}$/;
		if (password_reg.test(ypassword)) {
			if(typeof(Storage)!="undefined"){
				if(sessionStorage.loginuser_name){//从session中获取用户，如果不存在则提示用户未登录并跳转到登录页面
					var username=sessionStorage.loginuser_name;
					var userinfo=localStorage.getItem(username);
					var user=JSON.parse(userinfo);
					if(user.password==ypassword){
						hassuccess(name,update_pwd);
					}
					else{
						haserror(name,update_pwd);
						layer.msg('原密码错误',{icon:0,time:600});
					}
				}else{
					layer.msg("请先登录");
				}
			}else{
				layer.msg('请更换浏览器',{icon:0,time:700});
			}
		} else {
			haserror(name,update_pwd);
		}
	});
	$("#npassword").change(function() {  //新密码
		var ypassword = $("#ypassword").val(),name="ypassword";
		//var username_reg = /[a-zA-Z][a-zA-Z0-9]{2,15}$/;
		var npassword = $("#npassword").val();
		var password_reg = /[a-zA-Z0-9]{6,20}$/;
		if (npassword != "" && npassword != undefined) {
			if (password_reg.test(npassword)) {
				hassuccess(name,update_pwd);
			} else {
				haserror(name,update_pwd);
			}
			if (npassword == ypassword) {
				haserror(name,update_pwd);
			}
		}
	});
	$("#cpa").change(function() {//确认新密码
		var npassword = $("#npassword").val(),name="npassword";
		var cpa = $("#cpa").val();
		var password_reg = /[a-zA-Z0-9]{6,20}$/;
		if (password_reg.test(cpa)) {
			if(cpa == npassword){
				hassuccess(name,update_pwd);
			}else{
				haserror(name,update_pwd);
			}
		} else {
			haserror(name,update_pwd);
		}
	});
	$("#ycert_no").change(function() {
		var ycert_no = $("#ycert_no").val(),name="ycert_no";

		if (ycert_no != "" && ycert_no != undefined) {
			hassuccess(name,update_cert);
		} else {
			haserror(name,update_cert);
		}
	});
	$("#ncert_no").change(function() {
		var ncert_no = $("#ncert_no").val(),name="ncert_no";
		if (ncert_no != "" && ncert_no != undefined) {
			hassuccess(name,update_cert);
		} else {
			haserror(name,update_cert);
		}
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
});
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	  var msViewportStyle = document.createElement('style');
	  msViewportStyle.appendChild(
	    document.createTextNode(
	      '@-ms-viewport{width:auto!important}'
	    )
	  );
	  document.querySelector('head').appendChild(msViewportStyle);
	}
$(function () {
	var nua = navigator.userAgent;
	var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
	$(".rlist").children().addClass("slist");
	var changec=document.getElementById("changec");
	var changel=document.getElementById("changel");

	$("#changel").click(function(){
		changel.className="btn-list-open";
		changec.className="btn-card-off";
		$(".rlist").children().removeClass("scard");
		$(".rlist").children().addClass("slist");
	});
	$("#changec").click(function(){
		changec.className="btn-card-open";
		changel.className="btn-list-off";

		$(".rlist").children().removeClass("slist");
		$(".rlist").children().addClass("scard");
	});
});
		