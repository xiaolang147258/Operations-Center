//师资库管理js文件

//城市初始化//获取城市数据
	var cs_id1 = '',qy_id1='',jd_id1 = '';
			$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'city',id:440}, 
				success: function(res){
						if(res.code==200){for (var i = 0; i < res.data.length; i++) {$('#cs').append(`<option index=` + res.data[i].city_id + ` >` + res.data[i].city_name + `</option>`);}}
						cs_id1 = res.data[0].city_id;cs_showImg(res.data[0].city_id);//获取区域数据
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
}
yue_fn(0);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//教师来源下拉数据初始化
var ly_id = '';
function ly_fn(){
	var url = $('#lysa').find("option:selected").html()=='机构'?'institutions':'schools';
	if($('#lysa').find("option:selected").html()=='机构'){
		     $('#js_show').hide()
		}else if($('#lysa').find("option:selected").html()=='学校'){
			 $('#js_show').show()
		};
	$.ajax({type:"GET",url:url_data+"/api/"+url,dataType:'json',success:res=>{
		  console.log(res)
	      				if(res.code==200){
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
				                <input onchange='ke_lei(this)' id=` + res.data[i].id + ` type="checkbox"><i class="helper"></i>` + res.data[i].name + `
				            </label>
				        </div>`;
			 }else{ html_left += `
				        <div class="checkbox">
				            <label>
				                <input onchange='ke_lei(this)' id=` + res.data[i].id + ` type="checkbox"><i class="helper"></i>` + res.data[i].name + `
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
	attachments[3] = url_0;attachments[0]=url_1;
	attachments[1]=url_2;attachments[4]=url_3;
	attachments[2]=url_4;
$.ajax({type:"post",url:url_data+"/api/teachers",
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
		Bank_card:$('#yin_kid_s').val(),//银行卡号，后台没有这个字段,暂定这个
		teacher_cert:'2364276428764823',//教师资格证卡号，前端没有这个
		attachment:attachments,
		category:ke_id_box,
		
	},dataType:'json',success:res=>{
		  console.log(res);
	      if(res.code==200){
			 alert('教师添加成功！');
			 location.href = 'Teacher_database_management.html';
	      }else if(res.code==407){
			  alert('请完善信息后再提交！')
		  }
	    }
	 });
};


















