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

if(localStorage.shen_name=='审核'){
	$('.textbox').show();$('.btn-wrap').show();
}else if(localStorage.shen_name=='详情'){
	$('.textbox').hide();$('.btn-wrap').hide();
};

let names = localStorage.audit_type_name;
var hou_urls = names=='机构审核'?'auditInstitutions':(names=='课程审核'?'auditCourses':'auditTeachers');
if(names=='机构审核'){
	jg_act();
	$('#jg_boxs').show();$('#kc_boxs').hide();$('#js_boxs').hide();
}else if(names=='课程审核'){
	kc_act();
	$('#jg_boxs').hide();$('#kc_boxs').show();$('#js_boxs').hide();
}else if(names=='教师审核'){
	js_act();
	$('#jg_boxs').hide();$('#kc_boxs').hide();$('#js_boxs').show();
}

//获取机构审核详情////////////////////////////////////////////////////////////////////////////////////////////////////////////
function jg_act(){
	$.ajax({type:"GET",url: url_data+"/api/"+hou_urls+'/'+localStorage.audit_id,dataType:'json',
	headers:{'Authorization':'Bearer '+localStorage.token},
	success:function(res){
						console.log(res.data);
      			if(res.code==200){
							  let res_data = res.data;
					      $('.p1s').eq(0).html(res_data.city_name+'-'+res_data.region_name+'-'+res_data.street_name);
								$('.p1s').eq(1).html(res_data.street_name);
								$('.p1s').eq(2).html('机构审核');
								$('.p1s').eq(3).html(res_data.name);
								$('.p1s').eq(4).html(res_data.address);
								$('.p1s').eq(5).html(res_data.legal_name);
								$('.p1s').eq(6).html(res_data.contact_name);
								$('.p1s').eq(7).html(res_data.contact_phone);
								$('.p1s').eq(8).html(res_data.credit_code);
								$('.p1s').eq(9).html(res_data.business_scope);
								$('.p1s').eq(10).html(res_data.educate_permit);
								$('.p1s').eq(11).html(res_data.website);
								
								var img_box = res.data.audit_institution_attachment[0];
								if(img_box.business_license){$('.ji_img').eq(0).attr('src',img_box.business_license)};
								if(img_box.idcard_back){$('.ji_img').eq(3).attr('src',img_box.idcard_back)};
								if(img_box.idcard_front){$('.ji_img').eq(2).attr('src',img_box.idcard_front)};
								if(img_box.office_img){$('.ji_img').eq(1).attr('src',img_box.office_img)};
					 }
             }
      });
};
//获取教师审核详情////////////////////////////////////////////////////////////////////////////////////////////////////////////
function js_act(){
	$.ajax({type:"GET",url: url_data+"/api/"+hou_urls+'/'+localStorage.audit_id,dataType:'json',
	headers:{'Authorization':'Bearer '+localStorage.token},
	success:function(res){
				console.log(res);
      			if(res.code==200){
					var res_data = res.data.teacher;
					$('.js_p').eq(0).html(res_data.city_name+'-'+res_data.region_name+'-'+res_data.street_name);
					$('.js_p').eq(1).html(res_data.source_type_id==1?'机构':'学校');
					$('.js_p').eq(2).html('教师审核');
					$('.js_p').eq(3).html(res_data.source_name);
					$('.js_p').eq(4).html(res_data.name);
					let xueli= res_data.edu_degree_type_id==1?'研究生学历':(res_data.edu_degree_type_id==2?'本科学历':(res_data.edu_degree_type_id==3?'专升本学历':'专科学理论'))
					$('.js_p').eq(5).html(xueli);
					$('.js_p').eq(6).html(res_data.gender==1?'男':'女');
					$('.js_p').eq(7).html(res_data.phone);
					$('.js_p').eq(8).html(res_data.birthday);
					$('.js_p').eq(9).html(res_data.full_category);
					let idc = res_data.idcard_type==1?'身份证':(res_data.idcard_type==2?'护照':'港澳通行证/回乡证')
					$('.js_p').eq(10).html(idc);	
					$('.js_p').eq(11).html(res_data.idcard_number);
					let url_box = res.data.attachment;
					for(var i=0;i<url_box.length;i++){
						if(url_box[i].id==6){$('.img_or').eq(0).attr('src',url_box[i].url)};
						if(url_box[i].id==7){$('.img_or').eq(1).attr('src',url_box[i].url)};
						if(url_box[i].id==8){$('.img_or').eq(2).attr('src',url_box[i].url)};
						if(url_box[i].id==1){$('.img_or').eq(3).attr('src',url_box[i].url)};
					}
				}
           }
      });
};
//获取课程审核详情////////////////////////////////////////////////////////////////////////////////////////////////////////////
function kc_act(){
	$.ajax({type:"GET",url: url_data+"/api/"+hou_urls+'/'+localStorage.audit_id,dataType:'json',
	headers:{'Authorization':'Bearer '+localStorage.token},
	success:function(res){
				console.log(res);
      			if(res.code==200){
					       
				}
            }
      });
};

//审核函数////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sh_pass(un_pass){
	   if(un_pass=='unpass'){
			  if($('#content').val()){}else{
					  alert('审核不通过必须填写备注理由！');
					  return false;
				}
		 };
	   $.ajax({type:"put",url: url_data+"/api/"+hou_urls+'/'+localStorage.audit_id,
						headers:{'Authorization':'Bearer '+localStorage.token},
		       data:{'checked':un_pass,'reason':$('#content').val()},dataType:'json',success:function(res){
	   					console.log(res);
	       			if(res.code==200){
	   				                alert('审核完成');
									window.location.href = 'check_center.html';
	   				  }else if(res.code ==403){
								    window.location.href = 'login.html'; 
							}
	        }
	   });   
};
