$(function () {
  //多文件上传，图片上传
  var licUploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,

    duplicate: false, // 重复上传图片，true为可重复false为不可重复

    // 文件接收服务端地址
    server: api_list.imagesUpload,

    pick: '#picker',

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

  var image = [];//服务器返回的图片地址

  licUploader.on('fileQueued', function (file, type) {
    console.log('type', type)
    console.log('file', file)
    var $li = $(
      '<div id="' + file.id + '" class="file-item thumbnail img-ct">' +
      '<img>' +
      '<div class="webuploadDelbtn"><span>删除<span></div>' +
      '</div>'
    ),
      $img = $li.find('img');
    $delete = $li.find('.webuploadDelbtn span')
    var $list = $('.uploader-list'); // $list为容器jQuery实例
    $list.append($li)
    //为图片删除条添加单击删除事件
    $delete.on('click', function () {
      //将图片移除上传序列
      licUploader.removeFile(file, true);
      //将图片从缩略图容器删除
      var $li = $('#' + file.id);
      $li.off().remove();
      $('#filePicker').children().css('display', '');
      if ($('#filePicker').attr('class') === 'qyfc_upload webuploader-container') {
        $('#filePicker').css('background', 'url("p_w_picpaths/chooseImg_qyfc.png") 0 0 no-repeat');
      } else {
        $('#filePicker').css('background', 'url("p_w_picpaths/chooseImg_grzp.png") 0 0 no-repeat');
      }
    });
    licUploader.makeThumb(file, function (error, src) {
      if (error) {
        $li.text('预览错误');
      } else {
        $img.attr('src', src);
      }
    }, 163, 123);
  });

  var $list = $("#thelist");
  $list.on("click", ".webuploadDelbtn", function () {
    console.log('deeeee')
    var $ele = $(this);
    var id = $ele.parent().attr("id");
    var file = uploader.getFile(id);
    uploader.removeFile(file, true);
  });

  licUploader.on('uploadSuccess', function (file, response) {
    console.log('上传成功', $('#fileList').children().length)
    console.log('successsss', file)
    console.log('response', response)
    image.push(href + response.img_link)

  });

  licUploader.on('uploadError', function (file) {
    console.log('上传失败')
  });

  licUploader.on('error', function (handler, file) {
    if (handler == "Q_EXCEED_NUM_LIMIT") {
      $('.fill-content .warning').css({ 'display': 'block' })
    }
  });

  


  //初始化富文本编辑器
  KindEditor.ready(function (K) {
    window.editor = K.create('#outline-editor');
  });

  KindEditor.ready(function (K) {
    window.editor = K.create('#introduce-editor');
  });

  $(".btn-wrap .btn:first-child").click(function() {
    window.history.go(-1)
  })
})