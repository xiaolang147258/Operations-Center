$(function() {
  $('.poster-wrap img').click(function() {
    var url = $(this).attr('src');
    $(".overlay img").attr('src', url)
    $(".overlay").css({ display: 'block' })
  })

  $(".overlay").click(function() {
    $(".overlay").css({ display: 'none' })
  })

  $(".overlay .model").click(function(e) {
    e.stopPropagation()
  })

  $(".btn-wrap .btn:first-child").click(function() {
    window.history.go(-1)
  })
})