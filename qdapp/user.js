$(function() {
	getuser();
	user();
	var ub="userbody";
	var urlname=location.href;
	var name=urlname.substring(urlname.indexOf("#")+1);
	if(name>0){
		shownow(name);
	}else{
		shownow(ub);
	}
	$(".rlist").children().addClass("slist");
	// 回到顶部按钮滚动条>500时才显示
	$(document).scroll(function() {
		if($(window).scrollTop() <500) {
			$("#amdee").addClass("hide");
		} else{
			$("#amdee").removeClass("hide");
		}
	});
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
	})
	var toggle = $('#ss_toggle');
	var menu = $('#ss_menu');
	var rot;
	$('#ss_toggle').on('click', function (ev) {
		rot = parseInt($(this).data('rot')) - 180;
		menu.css('transform', 'rotate(' + rot + 'deg)');
		menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
		if (rot / 180 % 2 == 0) {
			toggle.parent().addClass('ss_active');
			toggle.addClass('close');
		} else {
			toggle.parent().removeClass('ss_active');
			toggle.removeClass('close');
		}
		$(this).data('rot', rot);
	});
	menu.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
		if (rot / 180 % 2 == 0) {
			$('#ss_menu div i').addClass('ss_animate');
		} else {
			$('#ss_menu div i').removeClass('ss_animate');
		}
	});
	$("")
})
//退出登录
function loginout(){
	sessionStorage.clear();
	window.open("login.html","_self");
}
// 获取用户信息
function getuser() {
	// console.info("getuser 1");
	// 从session获取用户名，然后从localStorage中搜索用户信息，再进行显示
	if(typeof(Storage)!=="undefined"){
		if(sessionStorage.loginuser_name){//从session中获取用户，如果不存在则提示用户未登录并跳转到登录页面
			var username=sessionStorage.loginuser_name;
			var userinfo=localStorage.getItem(username);
			var userfunction="<li><a href='user.html' title='用户中心'><span class='glyphicon glyphicon-user'></span>"+sessionStorage.loginuser_name+
			"</a></li><li class='active'><a href='#' onclick='loginout()'>退出</a></li>";
			$("#loginfunction").html(userfunction);
			var user=JSON.parse(userinfo);
			if (user.sex == 0) {
				$("#img").attr("src", './image/male.png');
				$("#sex option[value='0']").attr("selected", "selected");
			} else if (user.sex == 1) {
				$("#img").attr("src", './image/female.png');
				$("#sex option[value='1']").attr("selected", "selected");
			}
			$("#email").attr("value", user.email);
			$('#email').attr("readonly", "readonly");
			$("#profession").attr("value", user.profession);
			$('#profession').attr("readonly", "readonly");
			$("#phone").attr("value", user.phone);
			$('#phone').attr("readonly", "readonly");
			$("#address").attr("value", user.address);
			$('#address').attr("readonly", "readonly");
			$("#zipcode").attr("value", user.zipcode);
			$('#zipcode').attr("readonly", "readonly");
			$("#selflabel").attr("value", user.selflabel);
			$('#selflabel').attr("readonly", "readonly");
			$('#update').attr("type", "button");
			$('#updateuser').attr("type", "hidden");
			$('#back').attr("type", "hidden");
		}else{
			layer.msg('请您登陆',{icon:0,shade:0.3,time:1000});
				window.open("login.html","_self");
			
		}
	}else{
		layer.msg("请切换到高版本的浏览器",{icon:3,shade:0.05,time:2000});
			window.open("error.html","_self");
		
	}
}
//监听按钮updatepwd更新用户密码
$('#updatepwd').click(function() {
	var ypassword = $('#ypassword').val();
	var npassword = $('#npassword').val();
	var cpa = $('#cpa').val();
	if (!checkupdatepwd(ypassword, npassword, cpa)) {
		layer.msg('请输入正确格式',{icon: 2,shade: 0.01});
		return;
	}
	if (npassword == cpa && ypassword != npassword) {
		if(sessionStorage.loginuser_name){//从session中获取用户，如果不存在则提示用户未登录并跳转到登录页面
			var username=sessionStorage.loginuser_name;
			var userinfo=localStorage.getItem(username);
			var user=JSON.parse(userinfo);
			user.user_pwd=cpa;
			localStorage.setItem(username,JSON.stringify(user));
			layer.msg('修改成功',{
				  icon: 1
				  ,shade: 0.01
				});
				getuser();
		} else {
			layer.msg("请先登录");
		}
	}
	

});
function shownow(showname){
		var id=showname;
		$("#"+id).show();
		$("#"+id).siblings().hide();
	}
function checkupdatepwd(ypassword, npassword, cpa) {
	// console.info("0");
	var password_reg = /[a-zA-Z0-9]{6,20}$/;
	var flag = true;
	if (ypassword == "" && ypassword == undefined && npassword == ""
			&& npassword == undefined && cpa == "" && cpa == undefined) {
		// console.info("1");
		flag = false;
	} else if (password_reg.test(ypassword) && password_reg.test(npassword)
			&& password_reg.test(cpa) && cpa == npassword
			&& ypassword != npassword) {
		// console.info("2");
		flag = true;
	} else {
		// console.info("3");
		flag = false;
	}
	return flag;
}
// 更新用户证件按钮
$('#updatecert').click(function() {
	var ycert_type = $('#ycert_type option:selected').val();
	var ycert_no = $('#ycert_no').val();
	var ncert_type = $('#ncert_type').val();
	var ncert_no = $('#ncert_no').val();
	if(sessionStorage.loginuser_name){//从session中获取用户，如果不存在则提示用户未登录并跳转到登录页面
		var username=sessionStorage.loginuser_name;
		var userinfo=localStorage.getItem(username);
		var user=JSON.parse(userinfo);
		if(ycert_type==user.cert_type&&ycert_no==user.cert_no){
			user.cert_type=ncert_type;user.cert_no=ncert_no;
			localStorage.setItem(username,JSON.stringify(user));
			layer.msg('修改成功',{icon: 800,shade: 0.01});
			getuser();
		}else{
			layer.msg('与原证件信息不符合');
		}
	}

});
//更新用户信息按钮
$('#updateuser').click(
	function() {
		var email = $('#email').val();
		var sex = $('#sex option:selected').val();
		var profession = $('#profession').val();
		var phone = $('#phone').val();
		var address = $('#address').val();
		var zipcode = $('#zipcode').val();
		var selflabel = $('#selflabel').val();
		if (!checkupdateuser(email,phone,address, zipcode)) {
			layer.msg('请输入正确格式',{
				  icon: 2
				  ,shade: 0.01
				});
			return;
		}else{
			if(sessionStorage.loginuser_name){//从session中获取用户，如果不存在则提示用户未登录并跳转到登录页面
				var username=sessionStorage.loginuser_name;
				var userinfo=localStorage.getItem(username);
				var user=JSON.parse(userinfo);
				user.email=email;user.sex=sex;user.profession=profession;user.phone=phone;user.address=address;user.zipcode=zipcode;user.selflabel=selflabel;
				localStorage.setItem(username,JSON.stringify(user));
				layer.msg('修改成功',{icon: 1,shade: 0.01});
				getuser();
			}
		}
		
});
function checkupdateuser(email,phone, address, zipcode) {
	var email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var zipcode_reg = /[1-9]{1}(\d+){5}/;
	var phone_reg = /[0-9]*[1-9][0-9]*$/;// 正整数
	var flag = true;
	if (email == "" && email == undefined && phone == "" && phone == undefined
			&& address == "" && address == undefined && zipcode == ""
			&& zipcodee == undefined && selflabel == ""
			&& selflabel == undefined) {
		flag = false;
	} else if (email_reg.test(email) && zipcode_reg.test(zipcode)
			&& phone_reg.test(phone) && address != "" && address != undefined ) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}

$('#update').click(function() {
	$('#email').removeAttr("readonly");
	$('#profession').removeAttr("readonly");
	$('#phone').removeAttr("readonly");
	$('#address').removeAttr("readonly");
	$('#zipcode').removeAttr("readonly");
	$('#selflabel').removeAttr("readonly");
	$('#sex').removeAttr("disabled");
	$('#update').attr("type", "hidden");
	$('#updateuser').attr("type", "button");
	$('#back').attr("type", "button");
	$("#email").parent().removeClass("has-success");
	$("#email").parent().removeClass("has-error");
});
$('#back').click(function() {
	$('#email').attr("readonly", "readonly");
	$('#profession').attr("readonly", "readonly");
	$('#phone').attr("readonly", "readonly");
	$('#address').attr("readonly", "readonly");
	$('#zipcode').attr("readonly", "readonly");
	$('#selflabel').attr("readonly", "readonly");
	$('#update').attr("type", "button");
	$('#updateuser').attr("type", "hidden");
	$('#back').attr("type", "hidden");
	
	var index = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
	setTimeout('delayer()', 200);
});
function delayer(){
	window.location.reload();
}
function user(){
	var ub="userbody";
	shownow(ub);
}
function history(){
	var vs="historybody";
	shownow(vs);
	// visithistory();
}
function rdhistory(){
	var rd="rdhistorybody";
	shownow(rd);
	
}
function systemnews(){
	var sn="systemnewsbody";
	shownow(sn);
	
}
/**
 *浏览历史
 */
	
function visithistory(){

	var currentPage = document.getElementById("currentPage");
}


function pagination(action) {
	var currentPage = $("#currentPage").val();
	var totalPages = $("#totalPages").val();
	if (action == "first") {
		$('#currentPage').val(1);
		console.log("当前页码："+currentPage);
		console.log("总页码："+totalPages);
	}else if (action == "prev") {
		console.log("当前页码："+currentPage);
		console.log("总页码："+totalPages);
		currentPage = parseInt(currentPage) - 1;
		if (currentPage == 0)
			$("#currentPage").val(1);
		else
			$("#currentPage").val(currentPage);
	}else if (action == "next") {
		console.log("当前页码："+currentPage);
		console.log("总页码："+totalPages);
		currentPage = parseInt(currentPage) + 1;
		if (currentPage == parseInt(totalPages) + 1)
			$("#currentPage").val(totalPages);
		else
			$("#currentPage").val(currentPage);
	}else if (action == "last") {
		console.log("当前页码："+currentPage);
		console.log("总页码："+totalPages);
		$("#currentPage").val(totalPages);
	}else{
		$("#currentPage").val(action); 
	}
	visithistory();
}
