var blurred = false;
window.onblur = function() { blurred = true; };
window.onfocus = function() { blurred && (location.reload()); };

$(document).ready(function(){


  function isMobile(){
    return window.innerWidth < 768;
  }

  // makes yamm dropdown not close when you click somthing in it
  $(document).on('click', '.dropdown-menu', function(e) {
    e.stopPropagation();
  });


  // turns dropdown angles
  // $(document).on('click', '.dropdown', function(elem){
  //   const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
  //   angle.toggleClass('up-angle');
  // });
  // $('.dropdown').on('click',function(elem){
  //   const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
  //   angle.toggleClass('up-angle');
  // });
  // $('.dropdown').focusout('click',function(elem){
  //   const angle = $(this).find('.dropdown-toggle > .fa-angle-down');
  //   angle.removeClass('up-angle');
  // });


  // $('.dropdown').hover(function(){
  //   if(!isMobile()) $(this).find('.dropdown-toggle > .fa-angle-down').addClass('up-angle');
  // },function(){
  //   if(!isMobile()) $(this).find('.dropdown-toggle > .fa-angle-down').removeClass('up-angle');
  // });



  if($('.department-nav').length){
    // Makes department nav bar stick to top of screen when scrolling.
    var lastScroll = 0;
    var initDeptTop = $('.department-nav').position().top;
    var initDeptBottom = $('.department-nav').position().top + $('.department-nav').outerHeight();
    var initDeptHeight = $('.department-nav').outerHeight();
    function recalcNavbarPos(){
      if($('.department-nav').css('position')!=='fixed'){
        initDeptTop = $('.department-nav').position().top;
        initDeptBottom = $('.department-nav').position().top + $('.department-nav').outerHeight();
        initDeptHeight = $('.department-nav').outerHeight();
        console.log('top: '+ initDeptTop + ' bottom: '+ initDeptBottom);
      }
    }

    $('.navbar-collapse').on('shown.bs.collapse', function() {
      recalcNavbarPos();
    });
    $('.navbar-collapse').on('hidden.bs.collapse', function(){
      recalcNavbarPos();
    });
    $('.dropdown').on('shown.bs.dropdown',function(){
      recalcNavbarPos();
    });
    $('.dropdown').on('hidden.bs.dropdown',function(){
      recalcNavbarPos();
    });

    $(document).scroll(function(){
      var deptNav = $('.department-nav');
      var scrollTop = $(document).scrollTop();
      var deptTop = deptNav.position().top;
      if(window.innerHeight>660){
        if(scrollTop>initDeptTop){
          if(deptNav.css('position')!=='fixed'){
            deptNav.css({'position': 'fixed', 'top':'0'});
          }
        }
        else {
          if(deptNav.css('position')!=='relative'){
            deptNav.css({'position': 'relative'});
          }
        }
      } else {
        if(deptNav.css('position')!=='relative'){
          deptNav.css({'position':'relative'});
        }
        // if(scrollTop>initDeptBottom){
        //   if(deptNav.css('position')!=='fixed'){
        //     deptNav.css({'position': 'fixed', 'top':'-'+initDeptHeight+'px'});
        //   }
        //   if(scrollTop > lastScroll && deptTop == 0){ // scrolling down and bar is out
        //     $('.department-nav .collapse').collapse('hide');
        //     deptNav.animate({top:'-'+initDeptHeight+'px'}, 300);
        //   } else if(scrollTop < lastScroll && deptTop == -initDeptHeight){ // scrolling up and bar is hidden
        //     deptNav.animate({top:'0'}, 300);
        //   }
        // }
        // else if(scrollTop<initDeptTop){
        //   if(deptNav.css('position')!=='relative'){
        //     deptNav.css({'position': 'relative'});
        //   }
        // }
      }
      lastScroll = scrollTop;
    });
  }

  // search functionality

  // $('#search-btn').click(function(e){
  //   e.preventDefault();
  //   var searchString = $('#search-input').val();
  //   searchString = encodeURIComponent(searchString);
  //   searchString = searchString.replace(/%20/g, "+");
  //   console.log('results.html?q='+searchString);
  //   window.location.href = '?q='+searchString;
  // });

  // When #search-form is submitted, value of the input is copied into the invisible gcse searchbox and
  // the click event on the gsc search button is triggered
  $('#search-btn').click(function(){
    $('#gsc-i-id1').val($('#search-input').val());
    $('.gsc-search-button').trigger('click');
  });
});

  (function() {
    var cx = '008637555176047886659:dyr814d8vq0';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
