///编辑添加课程js文件

//城市初始化//获取城市数据
	var cs_id1 = '',qy_id1='',jd_id1 = '';
			$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'city',id:440}, 
			    headers:{'Authorization':'Bearer '+localStorage.token},
				success: function(res){
						if(res.code==200){for (var i = 0; i < res.data.length; i++) {$('#cs').append(`<option index=` + res.data[i].city_id + ` >` + res.data[i].city_name + `</option>`);}}
						cs_id1 = res.data[0].city_id;cs_showImg(res.data[0].city_id);//获取区域数据
				 }
			});
	   function cs_showImg(id){ //城市的option被点击//获取区域数据
			    var index = id?id:$("#cs").find("option:selected").attr("index");
				$.ajax({type: "GET",url: url_data+"/api/regions",dataType: 'json',data: {type:'region',id:index},
				    headers:{'Authorization':'Bearer '+localStorage.token},
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
		    headers:{'Authorization':'Bearer '+localStorage.token},
      		success: function(res){
      				if(res.code==200){$('#jd').empty();
      					  for (var i = 0; i < res.data.length; i++) {$('#jd').append(`<option index=` + res.data[i].street_id + ` >` + res.data[i].street_name + `</option>`); };
      					  jd_id1 = res.data[0].street_id;
      				}
      		   }
      	  });
      }
	function jd_showImg(){jd_id1 = $("#jd").find("option:selected").attr("index");};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//获取课程特色标签
$.ajax({type: "GET",url: url_data+"/api/tags",dataType: 'json',
headers:{'Authorization':'Bearer '+localStorage.token},
success:res=>{
		    console.log(res.data,'课程特色');
			if(res.code==200){
				for(var i=0;i<res.data.length;i++){
					 $('#dabtn').append(`<button id=`+res.data[i].id+` type_s=`+res.data[i].type+` num='false' onclick='btn_tabfn(this)' class="btn btn-info float-button-light">`+res.data[i].name+`</button>`);
				}	
			}
	    }
});
var tab_box = [];//被选中的课程标签 容器
function btn_tabfn(i){//课程标签被点击函数
	console.log($(i).attr('num'));
	if($(i).attr('num')=='true'){//如果为真就执行删除标签函数 #5bc0de
		$(i).css({background:'#5bc0de'});
		$(i).attr('num','false');
		for(var j=0;j<tab_box.length;j++){
			if(tab_box[j]==$(i).attr('id')){
				tab_box.splice(j,1);
			}
		}
		console.log(tab_box)
		
	}else{//编辑状态  判断为假执行添加标签函数
		// $.ajax({type: "post",url: url_data+"/api/courseTags",data:{tag_id:$(i).attr('id')},dataType: 'json',success:res=>{
		// 		    console.log(res);
		// 			if(res.code==200){
		// 				// $(i).css()
		// 				
		// 			}
		// 	    },
	  // });
	   $(i).css({background:'red'});
	   tab_box.push($(i).attr('id'));
	   $(i).attr('num','true');
	   console.log(tab_box)
	}
};
var url1='',url2='',url3='';//存储上传之后的图片url地址
$('#chooseImage').on('change',function(){//第1张封面图上传图片
    $('.gif_img').eq(0).show();
    var formData = new FormData();var filesa = $("#chooseImage")[0].files[0];formData.append("images",filesa);
    $.ajax({ type:"post",url:url_data+"/api/uploads",data:formData,processData:false,contentType:false,
	headers:{'Authorization':'Bearer '+localStorage.token},
	success:res=>{
    		    console.log(res,'上传图片');
    			if(res.code==200){
					$('.gif_img').eq(0).hide();url1 = res.data.image;
					
					var reader = new FileReader();//这是核心,读取操作就是由它完成.
					reader.readAsDataURL(filesa);//读取文件的内容,也可以读取文件的URL
					reader.onload = function () {//当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
						$('#imgs').attr('src',this.result);
						$('#imgs').show();$('.inp_box').hide();$('.ax').show()
					}
					 
    			}
    	    },error:function(data){console.log(data);alert('上传失败，请检查网络再尝试一次！'); $('.gif_img').eq(0).hide();}
      }); 
});
 $('.ax').on('click',function(file){//点击重新上传i
	url1='';$('#imgs').attr('src','');$('#imgs').hide();$('.inp_box').show();$('#bal').css('height','120px');$('.ax').hide()
});

//、、、、、、、、、、、、、、、、,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
$('#chooseImage2').on('change',function(){//第2张封面图上传图片
      $('.gif_img').eq(1).show();var formData = new FormData();var filesa = $("#chooseImage2")[0].files[0];formData.append("images",filesa);
      $.ajax({ type:"post",url:url_data+"/api/uploads",data:formData,processData:false,contentType:false,
	  headers:{'Authorization':'Bearer '+localStorage.token},
	  success:res=>{
      	console.log(res,'上传图片');if(res.code==200){
            $('.gif_img').eq(1).hide();url2 = res.data.image;
		    var reader = new FileReader();//这是核心,读取操作就是由它完成.
            reader.readAsDataURL(filesa);//读取文件的内容,也可以读取文件的URL
            reader.onload = function () {//当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
				$('#imgs2').attr('src',this.result);$('#imgs2').show();$('.inp_box2').hide();$('.ax2').show();
              }
		   }
		},error:function(data){console.log(data);alert('上传失败，请检查网络再尝试一次！'); $('.gif_img').eq(1).hide();}
	 });
});
 $('.ax2').on('click',function(file){//点击重新上传
	url2 = '';$('#imgs2').attr('src','');$('#imgs2').hide();$('.inp_box2').show();$('#bal2').css('height','120px');$('.ax2').hide()
});
//、、、、、、、、、、、、、、、、
$('#chooseImage3').on('change',function(){//第3张封面图上传图片
  $('.gif_img').eq(2).show();var formData = new FormData();var filesa = $("#chooseImage3")[0].files[0];formData.append("images",filesa);
  $.ajax({ type:"post",url:url_data+"/api/uploads",data:formData,processData:false,contentType:false,
  headers:{'Authorization':'Bearer '+localStorage.token},
  success:res=>{
  	   console.log(res,'上传图片');if(res.code==200){
  		 $('.gif_img').eq(2).hide();url3 = res.data.image;   
		 var reader = new FileReader();//这是核心,读取操作就是由它完成.
            reader.readAsDataURL(filesa);//读取文件的内容,也可以读取文件的URL
            reader.onload = function () {//当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
				$('#imgs3').attr('src',this.result);$('#imgs3').show();$('.inp_box3').hide();$('.ax3').show()
            }
		  }
	   },error:function(data){console.log(data);alert('上传失败，请检查网络再尝试一次！'); $('.gif_img').eq(2).hide();}
    }); 	
});
 $('.ax3').on('click',function(file){//点击重新上传
	url3 = '';$('#imgs3').attr('src','');$('#imgs3').hide();$('.inp_box3').show();$('#bal3').css('height','120px');$('.ax3').hide()
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取所属类型下拉数据
var ly_id = '';
function ly_fn(){
	var url = $('#lysa').find("option:selected").html()=='机构'?'institutions':'schools';
	$.ajax({type:"GET",url:url_data+"/api/"+url,dataType:'json',
	headers:{'Authorization':'Bearer '+localStorage.token},
	success:res=>{
		  // console.log(res)
	      				if(res.code==200){
							ly_id = res.data
							  $('#xue_name').html(''); var htmls = '';
	      					  for (var i = 0; i < res.data.length; i++) {
								  htmls+=`<option index=` + res.data[i].institution_id + ` >` + res.data[i].name + `</option>`
							  };$('#xue_name').append(htmls); 
	      				}
	      		  }
	     });
};ly_fn();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取课程门类下拉数据
$.ajax({type:"GET",url:url_data+"/api/courseCategories",dataType:'json',
headers:{'Authorization':'Bearer '+localStorage.token},
success:res=>{
		  // console.log(res.data)
	      				if(res.code==200){
							   var htmls = '';
	      					  for (var i = 0; i < res.data.length; i++) {
								  htmls+=`<option index=` + res.data[i].id + ` >` + res.data[i].name + `</option>`
							  };$('#men_lei').append(htmls); 
	      				}
	      		  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//年级初始化
var htmls = '';
 for(var i=1;i<=9;i++){htmls+=`<option id=`+i+`>`+i+`年级</option>`};
 $('#nian_row').html(htmls);$('#nian_to').html(htmls);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//上传 excel文件
function git_excel(files){
	var formData = new FormData();formData.append("excel",files); 
	 $.ajax({ type:"post",url:url_data+"/api/uploads",data:formData,processData:false,contentType:false,
	 headers:{'Authorization':'Bearer '+localStorage.token},
	 success:res=>{
		   // console.log(res,'上传文件');
		   if(res.code==200){
			      excel_url =  res.data.excel; 
				  console.log(excel_url);
			  }
		   },error:function(data){console.log(data);alert('上传失败，请检查网络再尝试一次！');}
	  }); 
	
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//读取 excel文件  
var xlsxworker = '../assets/excel/js-xlsx/xlsxworker.js';
var excel_unit = '';//传递的内容
var excel_url = ''//源文件url由后台返回
function initUploadExcel() {
function handleFile(e) {
git_excel(e.target.files[0]);
do_file(e.target.files, function (data) {
var excelObj = resolving_new(data).unit;
excel_unit = excelObj;
// console.log(excel_unit);
var tableStr = '',
rowStr = '';
for (var i = 0; i < excelObj.length; i++) {
for (var j = 0; j < excelObj[i].class.length; j++) {
if (j == 0) {
rowStr += '<td>' +
excelObj[i].class[j].season +
'</td>' +
'<td>' +
excelObj[i].class[j].title +
'</td>' +
'<td>' +
excelObj[i].class[j].content +
'</td>'

tableStr += '<tr>' +
'<td rowspan="' + excelObj[i].class.length + '">' +
excelObj[i].unit +
'</td>' +
'<td rowspan="' + excelObj[i].class.length + '">' +
excelObj[i].title +
'</td>' +
'<td rowspan="' + excelObj[i].class.length + '">' +
excelObj[i].content +
'</td>' +
rowStr +
'</tr>'

} else {
rowStr += '<tr>' +
'<td>' +
excelObj[i].class[j].season +
'</td>' +
'<td>' +
excelObj[i].class[j].title +
'</td>' +
'<td>' +
excelObj[i].class[j].content +
'</td>' +
'</tr>'
tableStr += rowStr
}
rowStr = ''
}
}
$('.course-table tbody').append(tableStr)
$('.course-table').css({ 'display':'block' })
})
}
xlf.addEventListener('change', handleFile, false)
};initUploadExcel();


 
 
//提交
function git_act(){
	console.log(editor.txt.html());//富文本编辑框的内容
	let img_box = [];img_box[0]=url1;img_box[1]=url2;img_box[2]=url3;
	var postData = {
                city_id:cs_id1,//暂定这个字段，早上与后台定
                region_id:qy_id1,
                street_id:jd_id1,
                source_type:$('#lysa').find("option:selected").html()=='机构'?1:2,
                source_id:$('#xue_name').find("option:selected").attr("index"),
                name:$('#names1').val(),
                revised_name:$('#names2').val(),
                category_id:$('#men_lei').find("option:selected").attr("index"),//课程分类id
                min_grade:$('#nian_row').find("option:selected").attr("id"),
                max_grade:$('#nian_to').find("option:selected").attr("id"),
                min_students:$('#ren_unm_a').val(),
                max_students:$('#ren_unm_b').val(),
                title:$('#mu_biao').val(),//课程目标暂定这个字段，早上与后台定
                cover_img1:img_box,
                course_tags:tab_box,
                
                outline_url:excel_url,//课程大纲暂定这个字段，早上与后台定
                outline:excel_unit,
                
                intro:editor.txt.html()
          };
 $.ajax({
	 type:"post",
	 url:url_data+"/api/courses",
	 data:postData,
	 headers:{'Authorization':'Bearer '+localStorage.token},
	 dataType:'json',success:res=>{
		       console.log(res)
			   if(res.code==200){
				      
				  }
			   },error:data=>{console.log(data);alert('操作失败，请检查网络！');}
	 }); 
};	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	





