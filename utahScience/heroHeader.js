$(document).ready(function() {
  var article = $('.article');
  var banner = $('.banner');
  var win = $(window);
  $(window).scroll(function(){
    if(article.offset().top - win.scrollTop()<=0){
      banner.css({position: 'fixed', top: '0'});
    }
    else{
      banner.css({position: 'relative', top: 'auto'});
    }
  });
});
