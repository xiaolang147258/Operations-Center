///编辑添加课程js文件

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//获取课程特色标签
$.ajax({type: "GET",url: url_data+"/api/tags",dataType: 'json',success:res=>{
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
    $.ajax({ type:"post",url:url_data+"/api/uploads",data:formData,processData:false,contentType:false,success:res=>{
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
      $.ajax({ type:"post",url:url_data+"/api/uploads",data:formData,processData:false,contentType:false,success:res=>{
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
  $.ajax({ type:"post",url:url_data+"/api/uploads",data:formData,processData:false,contentType:false,success:res=>{
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




