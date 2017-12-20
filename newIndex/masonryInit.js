$(document).ready(function(){
	$('.msn-grid').masonry({itemSelector: '.msn-item', columnWidth: '.msn-item'});

	msnCheck.lastCols=[];
	console.log($('.msn-grid.msn-fill .msn-item').length);
	if($('.msn-grid.msn-fill .msn-item').length){
		$(window).resize(msnCheck);
		msnCheck();
	}
});

// Make array in msnCheck that holds thresholds then use incrementor in .each()

function rectify(val, min, max){
  if(min && val < min) val = min;
  if(max && val > max) val = max;
  return val;
}

function msnCheck() {
	$('.msn-grid.msn-fill').each(function(i){
		const $grid = $(this);
		const gridWidth = $grid.innerWidth();
		const $item = $grid.find('.msn-item');
		const itemMinWidth = parseFloat($item.css('min-width'), 10);
		const itemMaxWidth = parseFloat($item.css('max-width'), 10);
		const itemMargin = $item.outerWidth(true) - $item.innerWidth();
		var cols = 1;
		if(itemMinWidth) cols = Math.floor(gridWidth/(itemMinWidth+itemMargin));
		if(itemMaxWidth) cols = Math.ceil(gridWidth/(itemMaxWidth+itemMargin));
		if(msnCheck.lastCols[i] != cols){
      var maxCols = parseInt($grid.attr('data-msn-max-cols'), 10);
      var minCols = parseInt($grid.attr('data-msn-min-cols'), 10);
      cols = rectify(cols, minCols, maxCols);
      msnFill($grid, cols);
    }
		msnCheck.lastCols[i] = cols;
	});
}

function msnFill($grid, cols){
	var itemWidth;
	var $allItems = $grid.find('.msn-item');
	if($allItems.length < cols) cols = $allItems.length;
	$allItems.each(function(){
		var $item = $(this)
		var margin = $item.outerWidth(true) - $item.innerWidth();
		if (margin) itemWidth = 'calc('+(100/cols)+'% - '+margin+'px)';
		else itemWidth = (100/cols)+'%';
		$item.css({width: itemWidth});
	});
	// $grid.find('.msn-grid-sizer').css({width: 100/cols+'%'});
	$grid.masonry();
}
