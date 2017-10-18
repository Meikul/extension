$(document).ready(function(){
  $('.msn-grid').masonry({itemSelector: '.msn-item', columnWidth: '.msn-item'});

  msnCheck.lastCols=[];
  console.log($('.msn-grid.msn-fill .msn-item').length);
  if($('.msn-grid.msn-fill .msn-item').length){
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
  $('.msn-grid.msn-fill').each(function(i){
    const $grid = $(this);
    const gridWidth = $grid.innerWidth();
    const $item = $grid.find('.msn-item');
    const itemMinWidth = parseFloat($item.css('min-width'), 10);
    const itemMargin = $item.outerWidth(true) - $item.innerWidth();
    var cols = Math.floor(gridWidth/(itemMinWidth+itemMargin));
    if(msnCheck.lastCols[i] != cols) msnFill($grid, cols);
    msnCheck.lastCols[i] = cols;
  });
}

function msnFill($grid, cols){
  var itemWidth;
  $grid.find('.msn-item').each(function(){
    var $item = $(this)
    var margin = $item.outerWidth(true) - $item.innerWidth();
    if (margin) itemWidth = 'calc('+(100/cols)+'% - '+margin+'px)';
    else itemWidth = (100/cols)+'%';
    $item.css({width: itemWidth});
  });
  // $grid.find('.msn-grid-sizer').css({width: 100/cols+'%'});
  $grid.masonry();
}
