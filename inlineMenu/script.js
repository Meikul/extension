var blurred = false;
window.onblur = function() { blurred = true; };
window.onfocus = function() { blurred && (location.reload()); };

$(document).ready(function(){
  $('.dropdown').on('click',function(elem){
    const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
    angle.toggleClass('up-angle');
  });
  $('.dropdown').focusout('click',function(elem){
    const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
    angle.removeClass('up-angle');
  });
  $(window).scroll(function(){
    console.log('scroll');
  })

});
