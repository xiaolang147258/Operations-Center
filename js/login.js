$(function() {
  //密码不可见
  $('.eye-close').click(function() {
    $(this).css({"display": 'none'})
    $('.password-wrap input').attr({type: 'password'})
  })
    $('.eye-open').css({"display": 'inline-block'})
  
  //密码可见
  $('.eye-open').click(function() {
    $(this).css({"display": 'none'})
    $('.eye-close').css({"display": 'inline-block'})
    $('.password-wrap input').attr({type: 'text'})
  })
	
	//退出登录
  $.ajax({type:"post",url:url_data+"/api/logout",dataType:'json',success:res=>{
  		  console.log(res,'退出登录');
  			if(res.code==200){
  				 localStorage.token = '';
  			}else if(res.code==407){
  				 var i = res.data.phone?res.data.phone[0]:res.data.password[0];
  				 alert(i);
  			}
  	 },error:(XMLHttpRequest,textStatus,errorThrown)=>{console.log(errorThrown);alert('网络错误');}
  });
	
	
  //用户登录
  $('.el-button--primary').click(function() {//执行登录事件
    var account = $('.account-wrap input').val(),
        password = $('.password-wrap input').val();
    if(!account) {$('.account-errow').css({display: 'block'})}
    if(!password) {$('.password-errow').css({display: 'block'})}
      
		if(account!=''&&password!=''){
			if(account.length==11){
				$.ajax({type:"post",url:url_data+"/api/login",data:{'phone':account,'password':password},dataType:'json',success:res=>{
					  console.log(res);
						if(res.code==200){
							 localStorage.token = res.data.token;
							 window.location.href = 'index.html'
						}else if(res.code==407){
							 var i = res.data.phone?res.data.phone[0]:res.data.password[0];
							 alert(i);
						}
				 },error:(XMLHttpRequest,textStatus,errorThrown)=>{console.log(errorThrown);alert('登录失败');}
			}); 
			}else{alert('账号必须输入11位数')};
		}else{ alert('账号或密码不能为空')}
  });

  //清空账号的同时，清空密码
  $(".account-wrap input").bind('input propertychange',function(){
    var account = $('.account-wrap input').val();
    if(!account) {
      $('.account-errow').css({display: 'block'})
      $('.password-wrap input').val('')
    } else {
      $('.account-errow').css({display: 'none'})
    }
  });

  //密码输入
  $(".password-wrap input").bind('input propertychange',function(){
    var password = $('.password-wrap input').val();
    if(!password) {
      $('.password-errow').css({display: 'block'})
    } else {
      $('.password-errow').css({display: 'none'})
    }
  });

  //账号输入框失去焦点时
  $(".account-wrap input").on('blur',function(){
    var account = $('.account-wrap input').val();
    if(!account) {
      $('.account-errow').css({display: 'block'})
    } else {
      $('.account-errow').css({display: 'none'})
    }
  });

  //密码输入框失去焦点时
  $(".password-wrap input").on('blur',function(){
    var password = $('.password-wrap input').val();
    if(!password) {
      $('.password-errow').css({display: 'block'})
    } else {
      $('.password-errow').css({display: 'none'})
    }
  });
})


//禁止浏览器前后翻页
jQuery(document).ready(function () {
                  if (window.history && window.history.pushState) {
                      $(window).on('popstate', function () {/// 当点击浏览器的 后退和前进按钮 时才会被触发，
                          window.history.pushState('forward', null, '');window.history.forward(1);
                      });
                  }
                  window.history.pushState('forward', null, '');  //在IE中必须得有这两行
                  window.history.forward(1);
 });


