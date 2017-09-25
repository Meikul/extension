$(document).ready(function(){
  $('.msn-grid').masonry({itemSelector: '.msn-item', columnWidth: '.msn-item'});

  if($('.msn-item .msn-fill').length()){
      $(window).resize(msnCheck);
  }

  $('.msn-item .msn-fill').each(function(){

  });

  $('.item').each(function(){
    $(this).height(Math.floor(Math.random()*200 + 150));
  });
});

function msnCheck() {
  $('.msn-grid').each(function(){
    const $grid = $(this);
    const gridWidth = $grid.innerWidth();
    const itemMinWidth = $('.msn-item .msn-fill').css('min-width');
    var cols = Math.floor(gridWidth/itemMinWidth);
    if (!msnCheck.lastCols) msnCheck.lastCols = cols;
    if(msnCheck.lastCols != cols) msnFill($grid, cols);
    msnCheck.lastCols = cols;
  });
}

function msnFill($grid, cols){
  const itemWidth = (100/cols)+'%';
  $grid.find('.msn-item .msn-fill').each(function(){
    $(this).css({width: itemWidth});
  });
}
