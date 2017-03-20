var sum = 5;//定义页面显示档案数量
$(function() {
	$(":radio").iCheck({
		radioClass: 'iradio_flat-blue',
		increaseArea: '20%'
	});
	var stage=$(".findstage").children();
	console.log(stage.length);
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
	$(".findstage").find("input").on('ifChecked',function(event){
		var index=$(".findstage").find("input").index(this);
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
	// 回到顶部按钮
	$(document).scroll(function() {
		if($(window).scrollTop() <=400) {
			$("#amdee").addClass("hide");
		} else if($(window).scrollTop() > 400) {
			$("#amdee").removeClass("hide");
		}

	});
	$(".find input").focus(function(){
		$(".find").css("opacity","0.7");
	});
	$(".find input").focusout(function(){
		$(".find").css("opacity","0.4");
	})
	
	var timer=null,newsindex=1;
	// 最新新闻
	$(".province").hide();
	$(".province:nth-of-type(1)").show();
	$(".province-news a:first").css("box-shadow","0 2px 0 #3498db");
	$(".province-news").children().mouseover(function(){
		$(".province").hide();
		var i=$(this).index()+1;
		shownew(i);
		clearInterval(timer);
	});
	$(".province-news").children().mouseout(function(){
		timer=setInterval(autoplay,2000);
	})
	if(timer){
		clearInterval(timer);
		time=null;
	}
	timer=setInterval(autoplay,2000);
	function autoplay(){
		newsindex++;
		if(newsindex>3){
			newsindex=1;
		}
		shownew(newsindex);
	}
	function shownew(curindex){
	$(".province-news a").css("box-shadow","0 0 0 transparent");
	$(".province-news>a").eq(curindex-1).css("box-shadow","0 2px 0 #3498db");
	$(".province").hide();
	$(".province:nth-of-type("+curindex+")").show();
	newsindex=curindex;
}
});


function findym(){
	var type =  document.getElementById("tran").value;
	var key = document.getElementById("keywork").value;
	window.location = "find.html?type="+type+"&key="+key;
}
function getnews(){
	$.ajax({
		url : "IndexServlet?action=getnews",
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus) {
			if (data.success) {
				$('#newsbody').empty();
				var a = null;
				var b = null;

				for(var i = 0 ;i<data.msg.length;i++){
					for(var j = i+1 ;j<data.msg.length;j++){
						if(Date(data.msg[j].create_time) > Date(data.msg[i].create_time)){
							a = data.msg[i];
							data.msg[i] = data.msg[j];
							data.msg[j] = a;
							b = data.cond[i];
							data.cond[i] = data.cond[j];
							data.cond[j] = b;
						}
					}
				}
				for(var i = 0 ;i < sum;i++){
					var li = $('<a href="./detail.html?id='+data.msg[i].id+'&cond='+data.cond[i]+'"><span class="title-number">'+data.msg[i].name+'</span><span class="news-text">'+data.msg[i].notions+'</span></a>');
					$('#newsbody').append(li);
				}
			} else {
				
			}
		},
		error : function(XMLHttpRequest, textStatus) {
			console.log("请求IndexServlet出错");
		}
	});
}
function historyday(){
	$.ajax({
		url : "IndexServlet?action=historyday",
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus) {
			if (data.success) {
				var s = data.msg;
				var obj = JSON.parse(s);
				$('#historydaybody').empty();
				var li1 = '<div class="history history-l">';
				var li2 = '<div class="history history-r">';
				for(var i = 0 ;i < obj.result.length;i++){
					if(i%2 != "1" && i+7>=obj.result.length){
						li1 = li1+'<p><a href="#">公元'+obj.result[i].year+'年'+obj.today+'--'+obj.result[i].title+'</a></p>';
						
					}else if(i%2 != "0" && i+7>=obj.result.length){
						li2 = li2+'<p><a href="#">公元'+obj.result[i].year+'年'+obj.today+'--'+obj.result[i].title+'</a></p>';
					}
				}
				li1 = li1+'</div>';
				li2 = li2+'</div>';
				var li = $(li1 +li2);
				$('#historydaybody').append(li);
			} else {
				
			}
		},
		error : function(XMLHttpRequest, textStatus) {
			console.log("请求IndexServlet出错");
		}
	});
}
function getmax(){
	$.ajax({
		url : "IndexServlet?action=getmax",
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus) {
			if (data.success) {
				$('#maxbody').empty();
				var a = null;
				for(var i = 0 ;i<data.result.length;i++){
					for(var j = i+1 ;j<data.result.length;j++){
						if(i>=sum){
							break;
						}
						if(data.result[i].count < data.result[j].count){
							a = data.result[i];
							data.result[i] = data.result[j];
							data.result[j] = a;
						}
					}
				}
				
				for(var i = 0 ;i < sum;i++){
					var li = $('<a href="./detail.html?id='+data.result[i].msg.id+'&cond='+data.result[i].cond+'"><span class="title-number">'+data.result[i].msg.name+'</span><span class="news-text">'+data.result[i].msg.notions+'</span></a>');
					$('#maxbody').append(li);
				}
				
			} else {
				
			}
		},
		error : function(XMLHttpRequest, textStatus) {
			console.log("请求IndexServlet出错");
		}
	});
}

function getrecommend(){
	$.ajax({
		url : "IndexServlet?action=getrecommend",
		contentType : "application/json",
		dataType : "json",
		success : function(data, textStatus) {
			if (data.success) {
				$('#recommendbody').empty();
				var li1 = "";
				for(var i = 0 ;i < 8;i++){
					if(i<data.result.length){
						li1 = li1 + '<p class="for-younews col-xs-12 col-sm-5"><span class="for-time"><b>'+(i+1)+'</b>'+data.msg[i].create_time+'</span><a href="./detail.html?id='+data.result[i].archive_id+'&cond='+data.result[i].archive_type+'"><b>'+data.msg[i].name+'</b>'+data.msg[i].notions+'</a></p>';
						
					}
				}
				var li = $(li1);
				$('#recommendbody').append(li);
			} else {
				
			}
		},
		error : function(XMLHttpRequest, textStatus) {
			console.log("请求IndexServlet出错");
		}
	});
}