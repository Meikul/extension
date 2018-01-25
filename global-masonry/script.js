$('.item').each(function(){
  $(this).height(Math.floor(Math.random()*100 + 150));
}).parent('.msn-grid').masonry();
