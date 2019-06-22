$(function () {
  //初始化datepicker
  $('.birth-picker').datepicker({
    format: 'mm-dd-yyyy'
  });
  //初始化职业照图片上传
  initUploader('photo-uploader', 'photo-list')

  //初始化合同图片上传
  initUploader('contract-uploader', 'contract-list')

  //初始化相关证书
  initUploader('certificate-uploader', 'certificate-list')

  //初始化证件照正面
  initUploader('front-uploader', 'front-list')

  //初始化证件照背面
  initUploader('back-uploader', 'back-list')

  //初始化教师资格证书
  initUploader('qualification-uploader', 'qualification-list')

  $(".btn-wrap .btn:first-child").click(function () {
    window.history.go(-1)
  })
})

function initUploader(picker, list) {
  var image = [], //服务器返回的图片地址
      uploader;

  //多文件上传，图片上传
  uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,

    duplicate: false, // 重复上传图片，true为可重复false为不可重复

    // 文件接收服务端地址
    server: api_list.imagesUpload,

    pick: "#" + picker,

    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false,

    fileNumLimit: 1,

    // 只允许选择图片文件。
    accept: {
      title: 'Images',
      extensions: 'jpg,jpeg,png',
      mimeTypes: 'image/*'
    }
  });

  //当有文件添加进来的时候
  uploader.on('fileQueued', function (file, type) {
    console.log('type', type)
    console.log('file', file)
    var $li = $(
      '<div id="' + file.id + '" class="file-item thumbnail img-ct">' +
      '<img>' +
      '<div class="webuploadDelbtn"><span>删除<span></div>' +
      '</div>'
    );
    var $img = $li.find('img');

    $delete = $li.find('.webuploadDelbtn span')
    console.log('lilili', $li)
    // 缩略图容器
    $("#" + list).append($li)
    //为图片删除条添加单击删除事件
    $delete.on('click', function () {
      //将图片移除上传序列
      uploader.removeFile(file, true);
      //将图片从缩略图容器删除
      var $li = $('#' + file.id);
      $li.off().remove();
      $('#' + picker + ' #filePicker').children().css('display', '');
      if ($('#' + picker + ' #filePicker').attr('class') === 'qyfc_upload webuploader-container') {
        $('#' + picker + ' #filePicker').css('background', 'url("p_w_picpaths/chooseImg_qyfc.png") 0 0 no-repeat');
      } else {
        $('#' + picker + ' #filePicker').css('background', 'url("p_w_picpaths/chooseImg_grzp.png") 0 0 no-repeat');
      }
    });
    uploader.makeThumb(file, function (error, src) {
      if (error) {
        $li.text('预览错误');
      } else {
        $img.attr('src', src);
      }
    }, 163, 123);
  });

  var $list = $("#" + picker + " .uploader-list");
  $list.on("click", ".webuploadDelbtn", function () {
    console.log('deeeee')
    var $ele = $(this);
    var id = $ele.parent().attr("id");
    var file = uploader.getFile(id);
    uploader.removeFile(file, true);
  });

  uploader.on('uploadSuccess', function (file, response) {
    console.log('上传成功', $('#' + list).children().length)
    console.log('successsss', file)
    console.log('response', response)
    image.push(href + response.img_link)

  });

  uploader.on('uploadError', function (file) {
    console.log('上传失败')
  });

  uploader.on('error', function (handler, file) {
    if (handler == "Q_EXCEED_NUM_LIMIT") {
      $("." + list + ' .warning').css({ 'display': 'block' })
    }
  });
}