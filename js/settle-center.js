$(function (){
  //初始化已结算DataTable
  initTable("#handle-settled")

  //初始化未结算DataTable
  initTable("#handle-unsettled")

  //初始化结算中DataTable
  initTable("#handle-settling")

  //已结算分页初始化
  initPagination("#settled-pagination", 12)

  //未结算分页初始化
  initPagination("#unsettled-pagination", 6)

  //结算中分页初始化
  initPagination("#settling-pagination", 20)

  //已结算查看详情弹窗
  $('#settled-modal').on('show.bs.modal', centerModals)

  //结算中查看详情弹窗
  $('#settled-modal').on('show.bs.modal', centerModals)

  //未结算考勤列表
  $('#unsettle-modal').on('show.bs.modal', centerModals)

  //提交结算列表
  $('#submit-modal').on('show.bs.modal', centerModals)

  $(window).on('resize', centerModals)

  //初始化已结算DataTable
  initTable("#settled-table")

  //初始化结算中DataTable
  initTable("#settling-table")

  //初始化未结算考勤列表
  initTable("#unsettle-table")

  //初始化修改考勤列表
  initTable("#modify-table")

  //初始化修改考勤列表
  initTable("#repair-table")

  //初始化结算列表
  initTable("#submit-table")

  //点击未结算考勤列表的修改考勤按钮
  $("#unsettle-modal .modify-btn").click(function() {
    // 手动打开或关闭模态框
    $('#unsettle-modal').modal('toggle')
    $('body').css({ 'overflow': 'hidden' })
  })

  //点击未结算考勤列表的补考勤按钮
  $("#unsettle-modal .repair-btn").click(function() {
    // 手动打开或关闭模态框
    $('#unsettle-modal').modal('toggle')
    $('body').css({ 'overflow': 'hidden' })
  })

  $('#modify-modal').on('hidden.bs.modal ', function(e) {
    $('body').css({ 'overflow': 'auto' })
  })

  //点击提交结算补考勤/修改考勤按钮
  $("#submit-modal .repair-btn").click(function() {
    // 手动打开或关闭模态框
    $('#submit-modal').modal('toggle')
    $('body').css({ 'overflow': 'hidden' })
  })

  //点击提交结算取消按钮
  $("#submit-modal .cancel-btn").click(function() {
    // 手动打开或关闭模态框
    $('#submit-modal').modal('toggle')
    $('body').css({ 'overflow': 'hidden' })
  })
})

function initTable(selector) {
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
    bLengthChange: false, //去掉每页显示多少条数据选择框方法
    "info": false //去掉底部文字
  });
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