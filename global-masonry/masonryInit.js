$(document).ready(function(){
  $('.msn-grid').masonry({itemSelector: '.msn-item', columnWidth: '.msn-item'});

  console.log($('.msn-item.msn-fill').length);
  if($('.msn-item.msn-fill').length){
    $(window).resize(msnCheck);
    msnCheck();
  }

  // REMOVE
  $('.item').each(function(){
    $(this).height(Math.floor(Math.random()*200 + 150));
  }).parent('.msn-grid').masonry();

});

// Make array in msnCheck that holds thresholds then use incrementor in .each()

function msnCheck() {
  $('.msn-grid').each(function(){
    const $grid = $(this);
    const gridWidth = $grid.innerWidth();
    const $item = $('.msn-item.msn-fill')
    const itemMinWidth = parseFloat($item.css('min-width'), 10);
    const itemMargin = $item.outerWidth(true) - $item.innerWidth();
    var cols = Math.floor(gridWidth/(itemMinWidth+itemMargin));
    if(msnCheck.lastCols != cols) msnFill($grid, cols);
    msnCheck.lastCols = cols;
  });
}

function msnFill($grid, cols){
  var itemWidth;
  $grid.find('.msn-item.msn-fill').each(function(){
    var $item = $(this)
    var margin = $item.outerWidth(true) - $item.innerWidth();
    if (margin) itemWidth = 'calc('+(100/cols)+'% - '+margin+'px)';
    else itemWidth = (100/cols)+'%';
    $item.css({width: itemWidth});
  });
  // $grid.find('.grid-sizer').css({width: 100/cols+'%'});
  $grid.masonry();
}
