



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取审核类型下拉数据
$.ajax({type:"get",url:url_data+"/api/auditTypes",dataType:'json',
headers:{'Authorization':'Bearer '+localStorage.token},
success:res=>{
		    		  // console.log(res.data);
		    			if(res.code==200){
								for(var i=0;i<res.data.length;i++){
									  $('#sh_lei').append(`<option index=`+res.data[i].id+`>`+res.data[i].name+`</option>`)  
								}
							}
		    	 },error:(XMLHttpRequest,textStatus,errorThrown)=>{console.log(errorThrown);alert('发生了错误！');}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取审核状态下拉数据
$.ajax({type:"get",url:url_data+"/api/auditStatus",dataType:'json',
headers:{'Authorization':'Bearer '+localStorage.token},
success:res=>{
		    		  // console.log(res.data);
		    			if(res.code==200){
								for(var i=0;i<res.data.length;i++){
									  $('#sh_zt').append(`<option index=`+res.data[i].id+`>`+res.data[i].name+`</option>`)  
								}
							}
		    	 },error:(XMLHttpRequest,textStatus,errorThrown)=>{console.log(errorThrown);alert('发生了错误！');}
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取所有来源下拉数据
// $.ajax({type:"get",url:url_data+"/api/auditStatus",dataType:'json',success:res=>{
// 		    		  // console.log(res.data);
// 		    			if(res.code==200){
// 								for(var i=0;i<res.data.length;i++){
// 									  $('#sh_ly').append(`<option index=`+res.data[i].id+`>`+res.data[i].name+`</option>`)  
// 								}
// 							}
// 		    	 },error:(XMLHttpRequest,textStatus,errorThrown)=>{console.log(errorThrown);alert('发生了错误！');}
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取城市区域街道
 var cs_id1 = '',qy_id1='',jd_id1 = '';
			$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'city',id:440}, 
			headers:{'Authorization':'Bearer '+localStorage.token},
				success: function(res){
						if(res.code==200){$('#cs').append(`<option>选择城市</option>`);for (var i = 0; i < res.data.length; i++) {$('#cs').append(`<option index=` + res.data[i].city_id + ` >` + res.data[i].city_name + `</option>`);}}
						cs_showImg(res.data[0].city_id,1);//获取区域数据
				 }
			});
	   function cs_showImg(id,nu){ //城市的option被点击//获取区域数据
			    var index = id?id:$("#cs").find("option:selected").attr("index");
				if(nu==1){}else{cs_id1 = $("#cs").find("option:selected").attr("index");}
				$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'region',id:index},
				headers:{'Authorization':'Bearer '+localStorage.token},
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
      		headers:{'Authorization':'Bearer '+localStorage.token},
					success: function(res){
      				if(res.code==200){$('#jd').empty();
					      $('#jd').append(`<option>选择街道</option>`);
      					  for (var i=0;i<res.data.length;i++){$('#jd').append(`<option index=` + res.data[i].street_id + ` >` + res.data[i].street_name + `</option>`)};
      				      num=0;
										 // nums=0;
						        git_act(1);
					     }
      		   }
      	  });
      };
	function jd_showImg(){jd_id1 = $("#jd").find("option:selected").attr("index");num=0; nums=0;
	     git_act(1);
	};
	
	function  xuan_fn(){
		   // initTable("#handle-message","#check-message ul.pagination",messageColums);
		   num=0;
		   git_act(1);
		
	};

	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取审核列表函数
function initPag(){//分页确定按钮被点击
		if($('#page_inp').val()){git_act(Number($('#page_inp').val()))}
	};
//分页初始化
function initPagination(el, pages){
  Page({
    num: pages,					//页码数
    startnum: 1,				//指定页码
    elem: $(el),		//指定的元素
    callback: function (n) {	//回调函数
         git_act(n);
    }
  });
};
var num = 0,nums=0;
function git_act(pages){
	  $.ajax({type:"GET",url:url_data+"/api/audits",dataType:'json',
		headers:{'Authorization':'Bearer '+localStorage.token},
		data:{
			audit_type:$('#sh_lei').find("option:selected").attr("index"),
			city_id:cs_id1,
			region_id:qy_id1,
			street_id:jd_id1,
			audit_status:$('#sh_zt').find("option:selected").attr("index"),
			audit_name:$('#inp_val').val()
		},success: function(res){
			  console.log(res,'审核列表')
	  	  if(res.code==200){
					 $('.pageTotal').html(res.meta.last_page);
					 $('.dataTotal').html(res.meta.to);
					 if(num==0){initPagination("#msgPage",res.meta.last_page);num=1};
					 if(res.meta.last_page==1){$('.pageJump').hide()}else{$('.pageJump').show()};//如果总页数为1就隐藏分页
					  var htmls = '';$('#tr_box').html('')
						for(var i=0;i<res.data.length;i++){
							  htmls+=`<tr class="no-reading">
								    	<td>`+res.data[i].created_at+`</td>
								       <td>`+res.data[i].city_name+`</td>
								      <td>`+res.data[i].region_name+`</td>
								      <td>`+res.data[i].street_name+`</td>
								      <td>`+res.data[i].audit_type_name+`</td>
								      <td>`+res.data[i].audit_status_name+`</td>
								      <td class="operation-wrap">
								        <div onclick='bian_ji(this,"审核")' index=`+res.data[i].audit_id+` type_s=`+res.data[i].audit_type_name+` class="detail-btn">审核</div>
												<div onclick='bian_ji(this,"详情")' index=`+res.data[i].audit_id+` type_s=`+res.data[i].audit_type_name+` class="detail-btn"><a href="check_detail.html">详情</a></div>
								      </td></tr>`;
						};$('#tr_box').append(htmls);
		      }else if(res.code==403){
						  window.location.href = 'login.html';
					}
	     }  
	  });
};

//审核被点击
function bian_ji(thiss,names){
	  localStorage.shen_name = names;
	  localStorage.audit_type_name = $(thiss).attr('type_s');//存储名字
		localStorage.audit_id = $(thiss).attr('index');//存储id
		window.location.href = 'check_detail.html';
}