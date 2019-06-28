$(function() {
  $('.poster-wrap img').click(function() {
    var url = $(this).attr('src');
    $(".overlay img").attr('src', url)
    $(".overlay").css({ display: 'block' })
  })

  $(".overlay").click(function() {
    $(".overlay").css({ display: 'none' })
  })

  $(".overlay .model").click(function(e) {
    e.stopPropagation()
  })

  $(".btn-wrap .btn:first-child").click(function() {
    window.history.go(-1)
  })
});

let names = localStorage.audit_type_name;
var hou_urls = names=='机构审核'?'auditInstitutions':(names=='课程审核'?'auditCourses':'auditTeachers');

//获取详情
$.ajax({type:"GET",url: url_data+"/api/"+hou_urls+'/'+localStorage.audit_id,dataType:'json',success:function(res){
						console.log(res);
      			if(res.code==200){
					       
					  }
       }
});



