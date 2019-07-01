
//获取课程分类
var ke_id = '';
$.ajax({type: "GET",url: url_data+"/api/courseCategories",dataType: 'json',
headers:{'Authorization':'Bearer '+localStorage.token},
success:res=>{
		    console.log(res.data,'课程门类');
			if(res.code==200){
				for(var i=0;i<res.data.length;i++){
					 $('#ke_box').append(` <option id=`+res.data[i].id+` >`+res.data[i].name+`</option> `);
				}	
			}
	   }
});
function select_click(){
	 ke_id=$('#ke_box').find("option:selected").attr("id");
	 num=0;
	 git_act(1);
};

//分页确定按钮被点击
function initPag(){
	if($('#page_inp').val()){git_act(Number($('#page_inp').val()))}
};
//分页初始化、、控制跳转第几页
function initPagination(el, pages) {
	  Page({
	    num: pages,					//页码数
	    startnum: 1,				//指定页码
	    elem: $(el),		//指定的元素
	    callback: function (n) {//回调函数
	             console.log(n)//点击的页数
				 git_act(n)
	    }
	  });
};
//获取课程列表数据
var num = 0;
function git_act(pages){
	$.ajax({type:"GET",url: url_data+"/api/courses?category_id="+ke_id+'&page='+pages,dataType:'json',
	headers:{'Authorization':'Bearer '+localStorage.token},
	success:res=>{
			    console.log(res,'课程列表数据');
				if(res.code==200){
					$('.pageTotal').html(res.meta.last_page);
					$('.dataTotal').html(res.meta.to);
					if(num==0){initPagination("#msgPage",res.meta.last_page);num=1};
					if(res.meta.last_page==1){$('.pageJump').hide()}else{$('.pageJump').show()};//如果总页数为1就隐藏分页按钮
					$('#tr_box').empty();
					for(var i=0;i<res.data.length;i++){
						 $('#tr_box').append(` 
						     <tr>
						     	<td>`+res.data[i].city_name+`</td>
						     	<td>`+res.data[i].region_name+`</td>
						     	<td>`+res.data[i].street_name+`</td>
						     	<td>`+res.data[i].name+`</td>
						     	<td>`+res.data[i].revised_name+`</td>
						     	<td>`+res.data[i].category_name+`</td>
						     	<td>所属单位</td>
						     	<td>课程目标</td>
						     	<td>`+res.data[i].min_grade+'—'+res.data[i].max_grade+`</td>
						     	<td>`+res.data[i].min_students+'—'+res.data[i].max_students+`</td>
						       <td class="operation-wrap">
						         <a index_id=`+res.data[i].course_id+` class="edit-btn assing-teacher-btn bian_click">编辑</a>
						       </td>
						     </tr>`);//<a index_id=`+res.data[i].course_id+` onclick='dell(this)' href="javascript:void(0)" class="assing-teacher-btn">删除</a>
					}			   
			  }else if(res.code==403){
				   window.location.href = '../login.html'
			  }else{
				  alert('暂时没有该信息！');
		       }
		},error:(XMLHttpRequest,textStatus,errorThrown)=>{//报错
                    // 错误信息   
                    console.log(errorThrown);
					alert('暂时没有该信息！');
                }
	});
};git_act(1);

function dell(i){//删除函数
		 console.log($(i).attr('index_id'));
		 var msg = "确定要删除吗？\n\n请确认！"; 
		 if (confirm(msg)==true){
		    $.ajax({type:"delete",url:url_data+"/api/courses/"+$(i).attr('index_id'),dataType: 'json',
			headers:{'Authorization':'Bearer '+localStorage.token},
			success: res=>{
		    		  console.log(res)
		    			if(res.code==200){
							num=0;
		    				git_act(1);//更新数据
		    			}
		    	 },error:(XMLHttpRequest,textStatus,errorThrown)=>{console.log(errorThrown);alert('发生了错误！');}
		    });
		 }else{return false;} 
};