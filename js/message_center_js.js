//消息中心

 var messageColums = [{data: "select"},{data: "time"},
     {
      data: "from"
    }, {
      data: "content"
    }, {
      data: "type"
    }, {
      data: "operation"
    }
  ];
  
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
			dest_name:$('#inp_val').val(),
			is_read:0,
			dest_type:3
		 },success:res=>{
		 	console.log(res,'消息列表');
			if(res.code==200){
					    $('#tr_box').empty();$('.pageTotal').html(res.meta.last_page);
					    $('.dataTotal').html(res.meta.to);
					    if(num==0){initPagination("#msgPage",res.meta.last_page);num=1};
					    if(res.meta.last_page==1){$('.pageJump').hide()}else{$('.pageJump').show()};//如果总页数为1就隐藏分页按钮
		 				for(var i=0;i<res.data.length;i++){
		 					 $('#tr_box').append(`
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
};
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
function lx_fn(){
	lx_id = $('#sylx').find("option:selected").attr("index-id");
	num=0;
	git_act(1);
}

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
}


git_act(1);