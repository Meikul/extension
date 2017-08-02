$(document).ready(function() {
  var banner = $('.banner');
  var win = $(window);
  $(window).scroll(function(){
    console.log(banner.offset().top-win.scrollTop());
    if(banner.offset().top - win.scrollTop()<=0){
      banner.css('position','fixed');
    }
    else{
      banner.css('position','relative');
    }
  });
});
