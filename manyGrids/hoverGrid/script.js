$(document).ready(function() {
  $('.grid').masonry({
    itemSelector: '.grid>li',
    columnWidth: '.grid-sizer'
  });

  function expand(){
    var fig = $(this),
        cap = fig.children('figcaption'),
        short = cap.children('.short-text'),
        full = cap.children('.full-text');
    const imgHeight = fig.children('img').height();
    fig.parent('li').addClass('expanded');
    fig.parent('li').siblings('.expanded').each(function(){shrink.call($(this).children('figure'));});
    fig.height(fig.height()); // figure grows on animation without this
    fig.clearQueue().delay(100).queue(function(){
      cap.stop().animate({top:-imgHeight+'px', height:fig.height()+'px'}, 400);
      short.stop().fadeOut(200, function(){
        full.stop().fadeIn(200, function(){
          cap.children('.btn').stop().delay(100).fadeIn(200);
        });
      });
      cap.dequeue();
    });
  }

  function shrink(){
    var fig = $(this),
        cap = fig.children('figcaption'),
        short = cap.children('.short-text'),
        full = cap.children('.full-text');
    const imgHeight = fig.children('img').height();
    fig.parent('li').removeClass('expanded');
    fig.dequeue();
    fig.children().each(function(){$(this).stop();});
    fig.height(fig.height()); // figure grows on animation without this
    cap.stop().animate({top:'0px', height:'auto'}, 400);
    cap.children('.btn').stop().fadeOut(200);
    full.stop().fadeOut(200, function(){
      short.stop().fadeIn(200);
    });
  }

  function not() {

  }

  $('.grid figure').bind({mouseenter: expand, mouseleave: shrink, click: expand});
});
