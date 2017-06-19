var blurred = false;
window.onblur = function() { blurred = true; };
window.onfocus = function() { blurred && (location.reload()); };

$(document).ready(function(){


  function isShort(){
    return window.innerHeight<636;
  }

  // makes yamm dropdown not close when you click somthing in it
  $(document).on('click', '.dropdown-menu', function(e) {
    e.stopPropagation();
  });


  // turns dropdown angles
  $(document).on('click', '.dropdown', function(elem){
    const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
    angle.toggleClass('up-angle');
  });
  $('.dropdown').on('click',function(elem){
    const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
    angle.toggleClass('up-angle');
  });
  $('.dropdown').focusout('click',function(elem){
    const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
    angle.removeClass('up-angle');
  });


  // Makes department nav bar stick to top of screen when scrolling.
  var lastScroll = 0;

  // >172, >221, 0, -50


  $(document).scroll(function(){
    var deptNav = $('.department-nav');
    var scrollTop = $(document).scrollTop();
    var deptTop = deptNav.position().top;
    if(!isShort()){
      if(scrollTop>172){
        if(deptNav.css('position')!=='fixed'){
          deptNav.css({'position': 'fixed', 'top':'0'});
        }
      }
      else {
        if(deptNav.css('position')!=='static'){
          deptNav.css({'position': 'static'});
        }
      }
    } else {
      if(scrollTop>270){
        if(deptNav.css('position')!=='fixed'){
          deptNav.css({'position': 'fixed', 'top':'-50px'});
        }
        if(scrollTop > lastScroll && deptTop == 0){ // scrolling down and bar is out
          deptNav.animate({top:'-50px'}, 300);
        } else if(scrollTop < lastScroll && deptTop == -50){ // scrolling up and bar is hidden
          deptNav.animate({top:'0'}, 300);
        }
      }
      else if(scrollTop<172){
        if(deptNav.css('position')!=='static'){
          deptNav.css({'position': 'static'});
        }
      }
    }
    lastScroll = scrollTop;
  });
  // else{
  //   $(document).scroll(function(){
  //     var deptNav = $('.department-nav');
  //     if($(document).scrollTop()>221){
  //       if(deptNav.css('position')!=='fixed'){
  //         deptNav.css({'position': 'fixed', 'top':'-50px'});
  //       }
  //       if($(document).scrollTop()>lastScroll){
  //         deptNav.
  //       }
  //       lastScroll = $(document).scrollTop();
  //     }
  //     else if($(document).scrollTop()<221){
  //       if(deptNav.css('position')!=='static'){
  //         deptNav.css({'position': 'static'});
  //       }
  //     }
  //   });
  // }



  $('#search-btn').click(function(){
    var searchString = $('#search-input').val();
    searchString = encodeURIComponent(searchString);
    searchString = searchString.replace(/%20/g, "+");
    console.log(searchString);
    window.location.href = 'results.html?q='+searchString;
  });
});

function HTMLEncode(str){
  var i = str.length,
      aRet = [];

  while (i--) {
    var iC = str[i].charCodeAt();
    if (iC < 65 || iC > 127 || (iC>90 && iC<97)) {
      aRet[i] = '&#'+iC+';';
    } else {
      aRet[i] = str[i];
    }
   }
  return aRet.join('');
}


  (function() {
    var cx = '002621195891316906187:mmhftt9hrp0';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
