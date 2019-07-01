$(function() {
  $('#primary-modal').on('show.bs.modal', centerModals)
  $(window).on('resize', centerModals)
})

//模态框垂直居中
function centerModals(){
  $('.modal').each(function (i){
    var $clone = $(this).clone().css('display', 'block').appendTo('body');
    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
    top = top > 0 ? top : 0;
    $clone.remove();
    $(this).find('.modal-content').css("margin-top", top);
  })
}

$('.modal-body').prepend(`
    <label>旧密码</label>
    <div class="form-group">
        <input class="form-control" value="" placeholder="请输入旧密码">
    </div>
`);


$('.modal-footer').on('click','.btn-primary',()=>{//修改按钮被点击
	  $.ajax({type:"post",url:url_data+"/api/resetPassword",
		headers:{'Authorization':'Bearer '+localStorage.token},
		data:{
			'original_password':$('.modal-body input').eq(0).val(),
		  'password':$('.modal-body input').eq(1).val(),
			'password_confirmation':$('.modal-body input').eq(2).val()
		},
		dataType:'json',success:res=>{
	  			console.log(res);if(res.code==200){
	  				 alert('修改成功');
	  				 window.location.href = 'index.html'
	  			}else if(res.code==407){
	  				 var i = res.data.phone?res.data.phone[0]:res.data.password[0];
	  				 alert(i);
	  			}
	  	 },error:(XMLHttpRequest,textStatus,errorThrown)=>{console.log(errorThrown);alert('修改失败');}
	  });  
})

