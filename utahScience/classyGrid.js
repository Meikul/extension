// var $storyGrid = $('.story-grid');
//
// $(document).on({
//   ajaxStart: function() { $storyGrid.addClass("loading"); },
//   ajaxStop: function() { $storyGrid.removeClass("loading"); }
// });

$(document).ready(function() {
  var items = $('.grid-item');
  var storyCards = $('.story-card');
  items.each(function(){
    var elem = $(this);
    var className = elem.attr('class');
    className.split(' ').forEach(function(str){
      if(str.substr(0,4)=='row-'){
        var rows = str.split('-');
        if(rows[1]) elem.css('grid-row-start', rows[1]);
        if(rows[2]) elem.css('grid-row-end', rows[2]);
      }
      else if (str.substr(0,4)=='col-') {
        var cols = str.split('-');
        if(cols[1]) elem.css('grid-column-start', cols[1]);
        if(cols[2]) elem.css('grid-column-end', cols[2]);
      }
    });
  });
  $(window).resize(wrapIfSmall);
});


function wrapIfSmall(){
  items = $('.story-card');
  items = items.toArray();
  console.log('resize');
  console.log(isOverflown(items));
}

function isOverflown(items){
  for(var i=0; i<items.length; i++){
    if(overflowCheck(items[i])) return true;
  }
  return false;
}

function overflowCheck(elem){
  return elem.scrollHeight > elem.clientHeight || elem.scrollWidth > elem.clientWidth;
}
