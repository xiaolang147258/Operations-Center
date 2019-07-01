$(function (){
  //初始化待处理消息DataTable
  var messageColums = [{
      data: "select"
    }, {
      data: "time"
    }, {
      data: "from"
    }, {
      data: "content"
    }, {
      data: "type"
    }, {
      data: "operation"
    }
  ];
  initTable("#handle-message", "#check-message ul.pagination", messageColums)

  //初始化待处理消息DataTable
  var listColums = [{
      data: "select"
    }, {
      data: "time"
    }, {
      data: "from"
    }, {
      data: "status"
    }, {
      data: "operation"
    }
  ];
  initTable("#handle-list", "#check-list ul.pagination", listColums)

  //tab切换
  $('.background-tab .message-tab').click(function (){
    $('.breadcrumb li.active').html("待处理消息")
  })
  $('.background-tab .list-tab').click(function (){
    $('.breadcrumb li.active').html("待审核列表")
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
  $('.modal').on('show.bs.modal', centerModals)
  $(window).on('resize', centerModals)
  $('.detail-btn').parent().addClass('operation-wrap')
  console.log(111, $('.detail-btn').parent())

  //待处理消息分页初始化
  // initPagination("#msgPage", 12)

  //待审核列表分页初始化
  // initPagination("#listPage", 6)

  $("tbody tr td input").click(function(e) {
    e.stopPropagation()
    console.log('gggg')
  })
})

function appendSkipPage(selector, parentNode) {
  var table = $(selector).dataTable();   
  var template =$("");
  template.find("a").click(function () {
      var pn = template.find("input").val();
      if (pn > 0) {
          --pn;
      } else {
          pn = 0;
      }
      table.fnPageChange(pn);
  });
  $(parentNode).append(template);
}

function initTable(selector, parentNode, columns) {
  $(selector).DataTable({
    paging: false, //表格分页,默认是true
    searching : false, //去掉搜索框
    ordering : false, // 排序功能，若为false，则所有列全部不可用
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
    columnDefs: [{
      //为每一行数据添加一个checkbox
      'targets': 0,
      'searchable':false,
      'orderable':false,
      'className': 'dt-body-center',
      'render': function (data, type, row){
         return false
      }}],
    "drawCallback": function() {
      appendSkipPage(selector, parentNode)
    },
    bLengthChange: false, //去掉每页显示多少条数据选择框方法
    "info": false //去掉底部文字
  });
}

//分页初始化
// function initPagination(el, pages) {
//   Page({
//     num: pages,					//页码数
//     startnum: 1,				//指定页码
//     elem: $(el),		//指定的元素
//     callback: function(n){	//回调函数
//       
//     }
//   });
// }

//获取所有来源下拉数据
var ly_id = '';
$.ajax({type:"get",url:url_data+"/api/messageSourceTypes",dataType:'json',
headers:{'Authorization':'Bearer '+localStorage.token},
success:res=>{
					console.log(res,'所有来源下拉数据');
					if(res.code==200){
					   for(var i=0;i<res.data.length;i++){
						   $('#syly').append(`<option index-id=`+res.data[i].id+`>`+res.data[i].name+`</option>`)
					   }
			   }
		}
 });
function ly_fn(){
	ly_id = $('#syly').find("option:selected").attr("index-id");
	num=0;
	git_act(1);
};
//获取所有类型下拉数据
var lx_id = '';
$.ajax({type:"get",url:url_data+"/api/auditTypes",dataType:'json',
headers:{'Authorization':'Bearer '+localStorage.token},
success:res=>{
					console.log(res,'所有类型下拉数据');
					if(res.code==200){
					   for(var i=0;i<res.data.length;i++){
						   $('#sylx').append(`<option index-id=`+res.data[i].id+`>`+res.data[i].name+`</option>`)
					   }
			   }
		}
 });
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function initPag(){//分页确定按钮被点击
	if($('#page_inp').val()){git_act(Number($('#page_inp').val()))}
};
//分页初始化
function initPagination(el, pages) {
  Page({
    num: pages,					//页码数
    startnum: 1,				//指定页码
    elem: $(el),		//指定的元素
    callback: function(n){	//回调函数
        git_act(n);
    }
  });
}

function sou_fn(){
	num = 0;
	git_act(1)
}; 
//获取消息列表函数
var num = 0;
function git_act(pages){
	$.ajax({type:"GET",url:url_data+"/api/messages",dataType:'json',
	headers:{'Authorization':'Bearer '+localStorage.token},
		 data:{
			page:pages,
			src_type:ly_id,
			dest_type:lx_id,
			dest_name:$('#inp_val').val()
		 },success:res=>{
		 	console.log(res,'消息列表');
			if(res.code==200){
					    $('#xiao_tr_box').empty();$('.pageTotal').html(res.meta.last_page);
					    $('.dataTotal').html(res.meta.per_page);
					    if(num==0){initPagination("#msgPage",res.meta.last_page);num=1};
					    if(res.meta.last_page==1){$('.pageJump').hide()}else{$('.pageJump').show()};//如果总页数为1就隐藏分页按钮
		 				for(var i=0;i<res.data.length;i++){
		 					 $('#xiao_tr_box').append(`
								     <tr class="no-reading">
								         <td><input id=`+res.data[i].message_id+` class='boxa' onclick='chebox_c(this)' class='msgCheck' type="checkbox"></td>
								         <td>`+res.data[i].updated_at+`</td>
								         <td>`+res.data[i].src_name+`</td>
								         <td>`+res.data[i].message+`</td>
								         <td>`+res.data[i].dest_name+`</td>
								         <td class="operation-wrap">
								             <div onclick='che_masg(this)' id=`+res.data[i].message_id+` class="detail-btn">查看详情</div>
								             <div onclick='dell(this)' id=`+res.data[i].message_id+` class="delete-btn">删除</div>
								         </td>
								     </tr>`);
		 				 }
					  }else if(res.code==403){
						  window.location.href = 'login.html'
					  }
		 	   }
	   });
		 top_num();
};
function ly_fn(){
	ly_id = $('#syly').find("option:selected").attr("index-id");
	num=0;
	git_act(1);
};
function lx_fn(){
	lx_id = $('#sylx').find("option:selected").attr("index-id");
	num=0;
	git_act(1);
}
var chebox_id=[];//存储选中的id
function chebox_c(i){
	if($(i).prop('checked')){//选中
	    chebox_id.push($(i).attr('id'));
	  } else {//取消
	     for(var j=0;j<chebox_id.length;j++){
			 if(chebox_id[j]==$(i).attr('id')){
				 chebox_id.splice(j,1)
			 }
		 };
		 $('#msgCheckAll').prop('checked', false);
	  };
	  console.log(chebox_id);
};
function chebox_all(){//全选
	if($('#msgCheckAll').prop('checked')){//选中
	    $('.boxa').prop('checked', true);//修改设置为不选中状态
		chebox_id=[];
		for(var i=0;i<$('.boxa').length;i++){
			chebox_id.push($('.boxa').eq(i).attr('id'));
		}
	  }else{//取消
	     $('.boxa').prop('checked', false);//修改设置为不选中状态
	     chebox_id = [];
	  };
	  console.log(chebox_id);
};
//批量删除与批量已读
function all_del_du(type){
	let val = type=='read'?'已读':'删除'
	var msg = "确定要批量"+val+"吗？\n\n请确认！";
	if (confirm(msg)==true){
	  $.ajax({type:"patch",url:url_data+"/api/messages",data:{'type':type,'ids':chebox_id},dataType:'json',
	  headers:{'Authorization':'Bearer '+localStorage.token},
	  success:res=>{
					if(res.code==200){
						   alert('操作成功！');
						   num=0;git_act(1);
						   chebox_id=[];
				     }
			  }
	  });
	}else{return false;}
};
function dell(i){//删除函数
	var msg = "确定要删除吗？\n\n请确认！";
	if (confirm(msg)==true){
	   $.ajax({type:"delete",url:url_data+"/api/messages/"+$(i).attr('id'),dataType: 'json',
	   headers:{'Authorization':'Bearer '+localStorage.token},
	   success:res=>{
					if(res.code==200){
						console.log(res,'删除结果');
						num=0;
						git_act(1);//更新教师列表
					}
			  }
		});
	}else{return false;}
};
function che_masg(i){//查看详情
	 localStorage.id = $(i).attr('id');
	 window.location.href = 'infor_detail.html';//跳转至消息详情
};
git_act(1);
//////////////////审核////////////////////////////////////////////////////////////////////////////////////////////

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
      					  for (var i = 0; i < res.data.length; i++) {$('#jd').append(`<option index=` + res.data[i].street_id + ` >` + res.data[i].street_name + `</option>`); };
      				      num=0;
						        git_act2(1);
					}
      		   }
      	  });
      }
	function jd_showImg(){jd_id1 = $("#jd").find("option:selected").attr("index");num=0;
	     git_act2(1);
	};
	
	function  xuan_fn(){
		   num=0;
		   git_act2(1);
	};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取审核列表函数
function initPag2(){//分页确定按钮被点击
		if($('#page_inp2').val()){git_act2(Number($('#page_inp2').val()))}
	};
//分页初始化
function initPagination(el, pages){
  Page({
    num: pages,					//页码数
    startnum: 1,				//指定页码
    elem: $(el),		//指定的元素
    callback: function (n) {	//回调函数
         git_act2(n);
    }
  });
};
var num = 0,nums=0;
function git_act2(pages){
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
					  var htmls = '';$('#sh_tr_box').html('')
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
						};$('#sh_tr_box').append(htmls);
						if(nums==0){
							  nums=1;
							  // initTable("#handle-message","#check-message ul.pagination",messageColums);
							};
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

function top_num(){
	$.ajax({type: "GET",url: url_data+"/api/works",dataType:'json',
		headers:{'Authorization':'Bearer '+localStorage.token},
		success: function(res){
				if(res.code==200){
					   $('.list-tab a').html('待审核列表'+'('+res.message.audit_count+')');
						 $('.message-tab a').html('待处理消息'+'('+res.message.message_count+')');
				}
		   }
	  });
}
