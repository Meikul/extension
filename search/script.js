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


  (function() {
    var cx = '002621195891316906187:mmhftt9hrp0';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
