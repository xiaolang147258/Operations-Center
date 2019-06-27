//师资库管理js文件






//城市初始化//获取城市数据
	var cs_id1 = '',qy_id1='',jd_id1 = '';
			$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'city',id:440}, 
				success: function(res){
						if(res.code==200){for (var i = 0; i < res.data.length; i++) {$('#cs').append(`<option index=` + res.data[i].city_id + ` >` + res.data[i].city_name + `</option>`);}}
						cs_id1 = res.data[0].city_id; cs_showImg(res.data[0].city_id);//获取区域数据
				 }
			});
	   function cs_showImg(id){ //城市的option被点击//获取区域数据
			    var index = id?id:$("#cs").find("option:selected").attr("index");
				$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'region',id:index},
					success: function(res){
							if(res.code==200){$('#qy').empty();$('#jd').empty();
								  for (var i = 0; i < res.data.length; i++) {$('#qy').append(`<option index=` + res.data[i].region_id + ` >` + res.data[i].region_name + `</option>`);}
								  qy_id1 = res.data[0].region_id;qy_showImg(res.data[0].region_id);//获取街道数据
							}
					   }
				});
			};
      function qy_showImg(id){ //区域的option被点击//获取城市数据
      	var index = id?id:$("#qy").find("option:selected").attr("index");
      	$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'street',id:index},
      		success: function(res){
      				if(res.code==200){$('#jd').empty();
      					  for (var i = 0; i < res.data.length; i++) {$('#jd').append(`<option index=` + res.data[i].street_id + ` >` + res.data[i].street_name + `</option>`); };
      					  jd_id1 = res.data[0].street_id;
      				}
      		   }
      	  });
      }
	function jd_showImg(){jd_id1 = $("#jd").find("option:selected").attr("index");};
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取学历
var xue_li_id = '';//学历id
$.ajax({type: "GET",url: url_data+"/api/teacherEduDegrees",dataType: 'json',success: function(res){
      				if(res.code==200){
      					  for (var i = 0; i < res.data.length; i++) {
							  $('#xue').append(`<option index=` + res.data[i].id + ` >` + res.data[i].name + `</option>`); 
						  };
      					  xue_li_id = res.data[0].id;
      				}
      		   }
  });
function xue_click(){xue_li_id = $('#xue').find("option:selected").attr("index")};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//性别选择
var sex_id = '男';//性别
function sex(){
	sex_id = $('#sex').find("option:selected").html();
	console.log(sex_id);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//出生年月日初始化
//年
var current = new Date();
var cur_year = current.getFullYear();
for(var i=cur_year;i>1930;i--){
      $('#nian').append(`<option index=`+i+`>`+i+'年'+`</option>`);
}
//月
for(var i=1;i<=12;i++){
      $('#yue').append(`<option index=`+i+`>`+i+'月'+`</option>`);
};
//日
var ri_box=[31,29,31,30,31,30,31,31,30,31,30,31];
function yue_fn(j){//当月份被点击
    var m =j;
	$('#ri').html('')
	let n = m==0?m:Number($('#yue').find("option:selected").attr("index"))-1;
	for(var i=1;i<=ri_box[n];i++){
		$('#ri').append(`<option index=`+i+`>`+i+'日'+`</option>`); 
	}
};

yue_fn(0);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//教师来源下拉数据初始化
var ly_id = '';
function ly_fn(){
	var url = $('#lysa').find("option:selected").html()=='机构'?'institutions':'schools';
	if($('#lysa').find("option:selected").html()=='机构'){
		     $('#js_show').hide();
			 $('.img_box').eq(1).show();
			 $('.img_box').eq(2).show();
			 $('.img_box').eq(4).show();
			 $('.img_box').eq(3).hide();
			 $('.img_box').eq(0).hide();
			 
		}else if($('#lysa').find("option:selected").html()=='学校'){
			 $('#js_show').show();
			 $('.img_box').eq(4).show();
			 $('.img_box').eq(0).show();
			 $('.img_box').eq(3).show();
			 $('.img_box').eq(1).hide();
			 $('.img_box').eq(2).hide();
			 
		};
	$.ajax({type:"GET",url:url_data+"/api/"+url,dataType:'json',success:res=>{
		  console.log(res)
	      				if(res.code==200){
							ly_id = res.data
							  $('#xue_name').html('');
	      					  for (var i = 0; i < res.data.length; i++) {
								  $('#xue_name').append(`<option index=` + res.data[i].institution_id + ` >` + res.data[i].name + `</option>`); 
							  };
	      				}
	      		  }
	     });
};
ly_fn();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//开户行地区赛选初始化
var shuju = [];
 $.ajax({type:"get",dataType:"json",url:"../assets/json/Province_and_city_selection.json",success:res=>{
          // console.log(res);
		  shuju = res;
          for(var i=0;i<res.length;i++){
			  $('#yin_sheng').append(`<option code=` + i + `>` + res[i].name + `</option>`)
		  };sheng_fn(0);
      }
    });
function sheng_fn(j){
   let i = j==0?j:$('#yin_sheng').find("option:selected").attr('code');$('#yin_shi').html('');
   for(var k=0;k<shuju[i].childs.length;k++){
	   $('#yin_shi').append(`<option>` + shuju[i].childs[k].name + `</option>`)
   }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//证件类型
var zheng_id = 1;
function zheng_fn(i){
	zheng_id = i;
	console.log(zheng_id)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取授课门类
var ke_id_box = [];//课程门类 集合；
$.ajax({type:"get",dataType:"json",url:url_data+"/api/courseCategories",success:res=>{
	     var html_left = '',html_right = '';
          // console.log(res.data,'课程门类')
          for(var i=0;i<res.data.length;i++){
			 if(i%2==0){
				  html_right += `
				        <div class="checkbox">
				            <label >
				                <input onchange='ke_lei(this)' id=` + res.data[i].id + ` type="checkbox"><i class="helper"></i><a>` + res.data[i].name + `</a>
				            </label>
				        </div>`;
			 }else{ html_left += `
				        <div class="checkbox">
				            <label>
				                <input onchange='ke_lei(this)' id=` + res.data[i].id + ` type="checkbox"><i class="helper"></i><a>` + res.data[i].name + `</a>
				            </label>
				        </div>`;
			   }
		  };$('#men_left').html(html_left);$('#men_right').html(html_right);
      }
});
function ke_lei(this_s){//课程门类选项被点击 
	if($(this_s).prop('checked')){
		ke_id_box.push($(this_s).attr('id'));
	}else{
		for(var i=0;i<ke_id_box.length;i++){
			if(ke_id_box[i]==$(this_s).attr('id')){
				ke_id_box.splice(i,1)
			}
		}};console.log(ke_id_box);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//提交按钮被点击
function git_act(){//增加课程函数
	var ids = $('#lysa').find("option:selected").html(),source_type_id_s = ids=='学校'?2:1;
	var source_id_s = $('#xue_name').find("option:selected").attr('index');
    var attachments=[];
	attachments['7']=url_0;
	attachments['1']=url_1;
	attachments['2']=url_2;
	attachments['8']=url_3;
	attachments['6']=url_4;
	
	var type_s = localStorage.terid==0?'post':'put';
	var urls = localStorage.terid==0?'':'/'+localStorage.terid;
	
$.ajax({type:type_s,url:url_data+"/api/teachers"+urls,
	data:{
		name:$('#name_s').val(),
		source_type_id:source_type_id_s,
		source_id:source_id_s,
		role_type_id:1,//暂时定位1
		gender:$('#sex').find("option:selected").html()=='男'?1:2,
		phone:$('#iphone_s').val(),
		birthday:$('#nian').find("option:selected").attr('index')+'/'+$('#yue').find("option:selected").attr('index')+'/'+$('#ri').find("option:selected").attr('index'),
		origin_country:'中国',
		origin_province:'440',
		origin_city:cs_id1,
		origin_region:qy_id1,
		origin_street:jd_id1,
		idcard_type:zheng_id,
		idcard_number:$('#exid_s').val(),
		edu_degree_type_id:xue_li_id,
		bank_account:$('#yin_kid_s').val(),//银行卡号
		attachment:attachments,
		category:ke_id_box,
		bank_province:$('#yin_sheng').find("option:selected").html(),
		bank_city:$('#yin_shi').find("option:selected").html(),
	},dataType:'json',success:res=>{
		  console.log(res);
	      if(res.code==200){
			 alert('成功！');
			 location.href = 'Teacher_database_management.html';
	      }else if(res.code==407){
			  alert('请完善信息后再提交！')
		  }
	    }
	 });
};

//判断为添加或者编辑
if(localStorage.terid==0){}else{//获取详细信息并赋值
	$.ajax({type:"GET",url:url_data+"/api/teachers/"+localStorage.terid,dataType:'json',success:res=>{
		                console.log(res.data,'详情数据');
	      				if(res.code==200){//执行赋值
						    var teacher = res.data.teacher;//教师详细信息
							var category = res.data.category;
							var attachment = res.data.attachment;
							$('#name_s').val(teacher.name);
							// $('#cs').prepend(`<option index=` + teacher.city_id + ` >` + teacher.city_name + `</option>`);
							$('#qy').prepend(`<option index=` + teacher.region_id + ` >` + teacher.region_name + `</option>`);
							$('#jd').prepend(`<option index=` + teacher.street_id + ` >` + teacher.street_name + `</option>`);
							$("#cs").val(teacher.city_name);$("#qy").val(teacher.region_name);$("#jd").val(teacher.street_name);
							cs_id1 = teacher.city_id;qy_id1=teacher.region_id;jd_id1=teacher.street_id; 
							 
							$("#xue").val(teacher.edu_degree);
							xue_li_id = teacher.edu_degree_type_id
							
							$("#sex").val(teacher.gender_name);
							$("#iphone_s").val(teacher.phone);
							
							let birthday = teacher.birthday.split('/');
							$("#nian").val(birthday[0]+'年');
							$("#yue").val(parseInt(Number(birthday[1]))+'月');       
							$("#ri").val(parseInt(Number(birthday[2]))+'日');
							
							let source_type_id = teacher.source_type_id==1?'机构':'学校';
							
							$("#lysa").val(source_type_id);
							for(var i=0;i<ly_id.length;i++){
								if(ly_id[i].institution_id == teacher.institution_id){
									$("#xue_name").val(ly_id[i].name);
								}
							};
							if($('#lysa').find("option:selected").html()=='机构'){
								     $('#js_show').hide();
									 $('.img_box').eq(1).show();
									 $('.img_box').eq(2).show();
									 $('.img_box').eq(4).show();
									 $('.img_box').eq(3).hide();
									 $('.img_box').eq(0).hide();
									 
								}else if($('#lysa').find("option:selected").html()=='学校'){
									 $('#js_show').show();
									 $('.img_box').eq(4).show();
									 $('.img_box').eq(0).show();
									 $('.img_box').eq(3).show();
									 $('.img_box').eq(1).hide();
									 $('.img_box').eq(2).hide();
									 
									 $('#yin_sheng').val(teacher.bank_province);
									 $('#yin_shi').val(teacher.bank_city);
								};
							
							$('#yin_kid_s').val(teacher.bank_account);
							
							if(teacher.idcard_type==1){
								$('.radio-button label input').eq(0).attr('checked','checked');
								$('.radio-button label input').eq(0).siblings().attr('checked','');
							}else if(teacher.idcard_type==2){
								$('.radio-button label input').eq(1).attr('checked','checked');
								$('.radio-button label input').eq(1).siblings().attr('checked','');
							}else{
								$('.radio-button label input').eq(2).attr('checked','checked');
								$('.radio-button label input').eq(2).siblings().attr('checked','');
							};
							
							$('#exid_s').val(teacher.idcard_number);
							
							ke_id_box = category;
							let full_category = teacher.full_category.split(' ');
							console.log(full_category);
							
							
							for(var i=0;i<full_category.length;i++){
								for(var j=0;j<full_category.length;j++){
									if($('#dabtn label a').eq(j).html()==full_category[i]){
									      $('#dabtn label input').eq(i).prop('checked', true);
								    }
								}
							};
							
							
							url_0 = attachment[1].url;
							url_1 = attachment[3].url;
							url_2 = attachment[4].url;
							url_3 = attachment[2].url;
							url_4 = attachment[0].url;
							
			$('#url_img5').attr('src',url_0);$('#imgsa5').show();$('#zi5').hide();$('.jia5').hide();
			$('#url_img3').attr('src',url_1);$('#imgsa3').show();$('#zi3').hide();$('.jia3').hide();
			$('#url_img2').attr('src',url_2);$('#imgsa2').show();$('#zi2').hide();$('.jia2').hide();
			$('#url_img4').attr('src',url_3);$('#imgsa4').show();$('#zi4').hide();$('.jia4').hide();
			$('#url_img').attr('src',url_4);$('#imgsa').show();$('#zi').hide();$('.jia').hide();
							
	      				}
	      		  }
	     });
}
	
















