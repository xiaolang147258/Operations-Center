
  //初始化消息列表DataTable
  var messageColums = [{
    data: "select"
  }, {
    data: "time"
  }, {
    data: "type"
  }, {
    data: "from"
  }, {
    data: "status"
  }, {
    data: "operation"
  }
  ];
  
  //待处理消息分页初始化
  // initPagination("#msgPage", 12)

  //时间区间初始化，选完开始时间自动弹出结束时间选择框


function initTable(selector, parentNode, columns) {
  $(selector).DataTable({
    paging: false, //表格分页,默认是true
    searching: false, //去掉搜索框
    ordering: false, // 排序功能，若为false，则所有列全部不可用
    "language": {
      "sProcessing": "处理中...",
      "sLengthMenu": "显示 _MENU_ 项结果",
      "sZeroRecords": "没有匹配结果",
      "sInfo": "显示第 _START_ 至 第 _END_ 项结果，共 _TOTAL_ 项",
      "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
      "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
      "sInfoPostFix": "",
      "sSearch": "搜索：",
      "sUrl": "",
      "sEmptyTable": "表中数据为空",
      "sLoadingRecords": "载入中...",
      "sInfoThousands": ","
    },
    columns: columns,
   
    "drawCallback": function () {
      appendSkipPage(selector, parentNode)
    },
    bLengthChange: false, //去掉每页显示多少条数据选择框方法
    "info": false //去掉底部文字
  });

}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取审核类型下拉数据
$.ajax({type:"get",url:url_data+"/api/auditTypes",dataType:'json',success:res=>{
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
$.ajax({type:"get",url:url_data+"/api/auditStatus",dataType:'json',success:res=>{
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
	function jd_showImg(){jd_id1 = $("#jd").find("option:selected").attr("index");num=0;
	     git_act(1);
	};
	

	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取审核列表函数
function initPag(){//分页确定按钮被点击
		if($('#page_inp').val()){git_act(Number($('#page_inp').val()))}
	};
//分页初始化
function initPagination(el, pages) {
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
		data:{
			audit_type:$('#sh_lei').find("option:selected").attr("index"),
			city_id:cs_id1,
			region_id:qy_id1,
			street_id:jd_id1,
			audit_status:$('#sh_lei').find("option:selected").attr("index"),
			audit_name:$('#inp_val').val()
		},success: function(res){
			  console.log(res,'审核列表')
	  	  if(res.code==200){
					 $('.pageTotal').html(res.meta.current_page);
					 $('.dataTotal').html(res.meta.to);
					 if(num==0){initPagination("#msgPage",res.meta.current_page);num=1};
					 if(res.meta.current_page==1){$('.pageJump').hide()}else{$('.pageJump').show()};//如果总页数为1就隐藏分页
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
								        <div onclick='bian_ji(this)' index=`+res.data[i].audit_id+` type_s=`+res.data[i].audit_type_name+` class="detail-btn">审核</div>
												<div index=`+res.data[i].audit_id+` type_s=`+res.data[i].audit_type_name+` class="detail-btn"><a href="check_detail.html">详情</a></div>
								      </td></tr>`;
						};$('#tr_box').append(htmls);
						if(nums==0){
							  nums=1;
							  initTable("#handle-message","#check-message ul.pagination",messageColums);
							};
		      }
	     }  
	  });
};

//审核被点击
function bian_ji(thiss){
	  localStorage.audit_type_name = $(thiss).attr('type_s');//存储名字
		localStorage.audit_id = $(thiss).attr('index');//存储id
		window.location.href = 'check_detail.html';
}