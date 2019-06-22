$(function() {
  //密码不可见
  $('.eye-close').click(function() {
    $(this).css({"display": 'none'})
    $('.eye-open').css({"display": 'inline-block'})
    $('.password-wrap input').attr({type: 'password'})
  })
  
  //密码可见
  $('.eye-open').click(function() {
    $(this).css({"display": 'none'})
    $('.eye-close').css({"display": 'inline-block'})
    $('.password-wrap input').attr({type: 'text'})
  })

  //用户登录
  $('.el-button--primary').click(function() {
    var account = $('.account-wrap input').val(),
        password = $('.password-wrap input').val();
    
    if(!account) {
      $('.account-errow').css({display: 'block'})
    }

    if(!password) {
      $('.password-errow').css({display: 'block'})
    }

    if(password && account) {
      window.location.href = 'index.html'
    }
  })

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