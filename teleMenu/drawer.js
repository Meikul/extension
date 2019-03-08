$(document).ready(function () {
  $('.drawer').on('click',function () {
    $(this).toggleClass('show')
  })
  $('.fa-bars').on('click', function () {
    $('.drawer').toggleClass('show')
  })
})