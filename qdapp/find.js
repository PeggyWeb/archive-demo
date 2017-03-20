$(function(){
	// 检查用户
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
	$(":radio").iCheck({
		radioClass: 'iradio_flat-blue',
		increaseArea: '20%'
	});
	$(":checkbox").iCheck({
		checkboxClass: 'icheckbox_flat-blue',
		increaseArea: '20%'

	});
	// 退出登录
	function loginout(){
		sessionStorage.clear();
		window.open("login.html","_self");
	}
	var stage=$(".findstage").children();
	var filter=$(".filter");
	filter.hide();
	$(".findstage").find("input").on('ifChecked',function(event){
		var index=$(".findstage").find("input").index(this);
		filter[index].style.display="block";
		if(index == 0){
			var textval = document.getElementById("tran");
			textval.value = "file";
			console.log(textval.value);
		}else if(index == 1){
			var textval = document.getElementById("tran");
			textval.value = "material";
			console.log(textval.value);
		}else if(index == 2){
			var textval = document.getElementById("tran");
			textval.value = "multimedia";
			console.log(textval.value);
		}
	});
	 $(".findstage").find("input").on('ifUnchecked',function(event){
	 	var index=$(".findstage").find("input").index(this);
		filter[index].style.display="none";
	 });
	$('.form_date').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });

});

$(function () { 
	$('#collapseFour').collapse({
	toggle: false
});
	$('#collapseFive').collapse({
	toggle: false
	});
	$('#collapseTwo').collapse('hide');
	$('#collapseThree').collapse('hide');
	$('#collapseOne').collapse('show');
	$(document).scroll(function() {
		if($(window).scrollTop() == 0) {
			$("#amdee").addClass("hide");
		} else if($(window).scrollTop() > 100) {
			$("#amdee").removeClass("hide");
		}
	});
	var thisURL = document.URL;    
	var  a =thisURL.split('?')[1]; 
	if(a != null&& a != ""){
		var  b =a.split('&')[0];  
		var  c =a.split('&')[1];  
		var type = b.split("=")[1];
		var key = decodeURI(c.split("=")[1]);
		$(".keywork").val(key);
		var tran =  document.getElementById("tran");
		var keywork =  document.getElementById("keywork");
	
		tran.value = type;
		if(type == "file"){
			$("input[type='radio']:first").iCheck('check');
			
		}else if(type == "material"){
			$("#material").iCheck('check');
			
		}else if(type == "multimedia"){
			$("#multimedia").iCheck('check');
			
		}
		
		keywork.value = key;
	}
});
