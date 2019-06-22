$(function (){
  //初始化消息列表DataTable
  var messageColums = [{
      data: "select"
    }, {
      data: "school"
    },{
      data: "course"
    },{
      data: "teacher"
    },{
      data: "time"
    }, {
      data: "number"
    }, {
      data: "totalNum"
    }, {
      data: "actualNum"
    }, {
      data: "operation"
    }
  ];
  initTable("#handle-message", "#check-message ul.pagination", messageColums)

  $('.detail-btn').parent().addClass('operation-wrap')
  console.log(111, $('.detail-btn').parent())

  //待处理消息分页初始化
  initPagination("#msgPage", 12)

  //timepicker初始化
  $("#yearPicker").datetimepicker({
    format: 'yyyy',
    startView: 4,
    minView: 4,
  });

  $("#monthPicker").datetimepicker({
    format: 'yyyy',
    startView: 4,
    minView: 4,
  });
  
})

function appendSkipPage(selector, parentNode) {
  var table = $(selector).dataTable();   
  var template =
      $("<li class='paginate_button active'>" +
          "   <div class='input-group' style='margin-left:3px;'>" +
          "       <span class='input-group-addon' style='padding:6px 12x;background-color:#fff;font-size: 12px;'>前往</span>" +
          "       <input type='text' class='form-control' style='text-align:center;padding: 8px 4px;height:34px;width:40px;' />" +
          "       <span class='input-group-addon active' style='padding:6px 12px;'><a href='javascript:void(0)'> 页 </a></span>" +
          "   </div>" +
          "</li>");

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
         return '<input class="checkbox_select" type="checkbox" data-status="'+ row.status + '"name="id[]" value="' + $('<div/>').text(row.id).html() + '">';
      }}],
    // "aoColumnDefs": [ { "bSortable": false, "aTargets": index }],
    // "aaSorting": [[0, "asc"]],
    "drawCallback": function() {
      appendSkipPage(selector, parentNode)
    },
    bLengthChange: false, //去掉每页显示多少条数据选择框方法
    "info": false //去掉底部文字
  });

  //全选
  $(document.body).click(function(){
    if($('#msgCheckAll').prop('checked')){//获取是否选中 并判断
      $("tbody tr td input").each(function() {
        $(this).prop('checked', true);//修改设置为选中状态
      })
    } else {
      $("tbody tr td input").each(function() {
        $(this).prop('checked', false);//修改设置为不选中状态
      })
    }
  })

  $("tbody tr td input").click(function(e) {
    e.stopPropagation()
    console.log('gggg')
  })
}

//分页初始化
function initPagination(el, pages) {
  Page({
    num: pages,					//页码数
    startnum: 1,				//指定页码
    elem: $(el),		//指定的元素
    callback: function(n){	//回调函数
      
    }
  });
}