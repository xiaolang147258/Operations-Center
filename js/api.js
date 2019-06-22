/**
 * Created by andy on 2019/6/13/2019
 */

var href = 'http://' + 'jingmen-mp.cieo.com.cn'; //后台地址，不是前台地址

$.extend({
  AjaxRestful: function (url, type, data, callback) {
    $.ajax({
      url: url,
      data: data,
      type: type,
      headers: {
      },
      dataType: "json",
      success: callback,
    })
  }

});

var base_host = 'http://' + 'jingmen-mp.cieo.com.cn';
var base_key = '';
var api_list = {
  //图片上传
  imagesUpload: base_host + '/api/uploads',//POST   images|
};


// 请求前判断参数是否为空
function isBlank(data) {
  for (var key in data) {
    if (data[key] == '') {
      delete data[key]
    }
  }

  return data
}

// 判断信用平价页请求参数是否为空
function isEvaluateBlank(data) {
  for (var key in data) {
    if (data[key] == '' && data[key] != '0' && key != 'class_time') {
      delete data[key]
    }
  }

  return data
}

// 获取其他页面传递过来的参数
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}