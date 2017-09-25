$(document).ready(function(){
  $('.msn-grid').masonry({itemSelector: '.msn-item', columnWidth: '.msn-item'});

  $('.item').each(function(){
    $(this).height(Math.floor(Math.random()*200 + 150));
  })
});
