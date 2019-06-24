//师资库管理js文件

function initPag(){//分页确定按钮被点击
		if($('#page_inp').val()){git_act(Number($('#page_inp').val()))}
	};
function initPagination(el, pages) {//分页初始化、、控制跳转第几页
	  Page({num: pages,	startnum: 1,elem: $(el),callback: function (n) {console.log(n);git_act(n)}});
	} ; 	  

function dell(i){//删除函数
  var msg = "确定要删除吗？\n\n请确认！"; 
  if (confirm(msg)==true){ 
     $.ajax({type:"delete",url: url_data+"/api/teachers/"+$(i).attr('id'),dataType: 'json',success:res=>{
				if(res.code==200){
					console.log(res,'删除结果');
					git_act(1);//更新教师列表
				}
		  }
	});
  }else{return false;} 
}

var num = 0;
function git_act(pages){//获取教师列表数据
  $.ajax({type:"GET",url:url_data+"/api/teachers",dataType:'json',
	 data:{
		source_type_id:js_ly_id,
		city_id:cs_id1,
		region_id:qy_id1,
		street_id:jd_id1,
		name:$('#names').val(),
		iphone:$('#iphones').val(),
		page:pages
	 },success:res=>{
	 		    console.log(res,'教师列表');
	 			if(res.code==200){$('#tr_box').empty();
				    $('.pageTotal').html(res.meta.current_page);
				    $('.dataTotal').html(res.meta.to);
				    if(num==0){initPagination("#msgPage",res.meta.current_page);num=1};
				    if(res.meta.current_page==1){$('.pageJump').hide()}else{$('.pageJump').show()};//如果总页数为1就隐藏分页按钮
	 				for(var i=0;i<res.data.length;i++){
	 					 $('#tr_box').append(`
						      <tr>
						      	<td>1</td>
						      	<td>`+res.data[i].name+`</td>
						      	<td>本科</td>
						      	<td>男</td>
						      	<td>13632451664</td>
						      	<td>体育与健康课程</td>
						      	<td>32</td>
						      	<td>机构新东方培训</td>
						      	<td>广州</td>
						      	<td>番禺</td>
						      	<td>市桥</td>
						      	<td class="operation-wrap">
						      		<a id=`+res.data[i].teacher_id+` class="edit-btn assing-teacher-btn bian_click">编辑</a>
						      	    <a id=`+res.data[i].teacher_id+` onclick='dell(this)' href="javascript:void(0)" class="assing-teacher-btn">删除</a>
						      	</td>
						      </tr>`);
	 				   }	
	 			 }
	 	   }
	 });
 };


//获取教师来源下拉数据
var js_ly_id = '';//教师来源id
$.ajax({type: "GET",url: url_data+"/api/teacherSourceTypes",dataType: 'json',success:res=>{
		    // console.log(res.data,'教师来源');
			if(res.code==200){
				for(var i=0;i<res.data.length;i++){
					 $('#js_ly').append(`<option id=`+res.data[i].id+`>`+res.data[i].name+`</option>`);
				};
			}
	    }
});
function js_lyfn(){
	  js_ly_id = $('#js_ly').find("option:selected").attr("id");num=0;git_act(1);
 };
	 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//城市筛选选初始化、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
       var cs_id1 = '',qy_id1='',jd_id1 = '';
			$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'city',id:440}, 
				success: function(res){
						if(res.code==200){$('#cs').append(`<option>选择城市</option>`);for (var i = 0; i < res.data.length; i++) {$('#cs').append(`<option index=` + res.data[i].city_id + ` >` + res.data[i].city_name + `</option>`);}}
						cs_showImg(res.data[0].city_id,1);//获取区域数据
				 }
			});
	   function cs_showImg(id,nu){ //城市的option被点击//获取区域数据
			    var index = id?id:$("#cs").find("option:selected").attr("index");
				if(nu==1){}else{cs_id1 = $("#cs").find("option:selected").attr("index");}
				$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'region',id:index},
					success: function(res){
							if(res.code==200){$('#qy').empty();$('#jd').empty();
							      $('#qy').append(`<option>选择区域</option>`);
								  for (var i = 0; i < res.data.length; i++) {$('#qy').append(`<option index=` + res.data[i].region_id + ` >` + res.data[i].region_name + `</option>`);}
								  qy_showImg(res.data[0].region_id,nu);//获取街道数据
							}
					   }
				});
			};
      function qy_showImg(id,nu){ //区域的option被点击//获取城市数据
      	var index = id?id:$("#qy").find("option:selected").attr("index");
		if(nu==1){}else{qy_id1 = $("#qy").find("option:selected").attr("index");}
      	$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'street',id:index},
      		success: function(res){
      				if(res.code==200){$('#jd').empty();
					      $('#jd').append(`<option>选择街道</option>`);
      					  for (var i = 0; i < res.data.length; i++) {$('#jd').append(`<option index=` + res.data[i].street_id + ` >` + res.data[i].street_name + `</option>`); };
      				      num=0;
						  git_act(1);
					}
      		   }
      	  });
      }
	function jd_showImg(){jd_id1 = $("#jd").find("option:selected").attr("index");num=0;git_act(1);};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// git_act(1);