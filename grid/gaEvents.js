$(document).ready(function(){
  $('.grid li').click(function(){
    ga('send', 'event', 'Clicks', 'opened modal');
    var $lightbox = $('.lightbox');
    $lightbox.find('.more-info-btn').click(function(){
      ga('send', 'event', 'Clicks', 'opened form');
      $lightbox.find('form .submit').click(function(){
        ga('send', 'event', 'Clicks', 'submitted form');
      });
    });
    $lightbox.find('.apply-now-btn').click(function(){
      ga('send', 'event', 'Clicks', 'opened video');
    });
  });
});
