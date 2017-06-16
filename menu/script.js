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
  $(document).scroll(function(){
    var deptNav = $('.department-nav');
    if($(document).scrollTop()>172){
      if(deptNav.css('position')!=='fixed'){
        deptNav.css({'position': 'fixed', 'top':'0'});
      }
    }
    else if($(document).scrollTop()<172){
      if(deptNav.css('position')!=='static'){
        deptNav.css({'position': 'static'});
      }
    }
  });
});
