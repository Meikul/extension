$(document).ready(function() {
  $('.grid').masonry({
    itemSelector: '.grid>li',
    columnWidth: '.grid-sizer'
  });

  $('.grid figure').click(function(e){
    var fig = $(e.target).parents('figure');
    var paragraph = fig.find('figcaption>p').text();
    var img = fig.find('img').attr('src');
    $('.slideshow').fadeIn(500);
    // Background Blur Effect
    // $({blurRadius: 0}).animate({blurRadius: 5}, {
    //     duration: 500,
    //     easing: 'swing', // or "linear"
    //                      // use jQuery UI or Easing plugin for more options
    //     step: function() {
    //         console.log(this.blurRadius);
    //         $('.grid-wrap').css({
    //             "-webkit-filter": "blur("+this.blurRadius+"px)",
    //             "filter": "blur("+this.blurRadius+"px)"
    //         });
    //     }
    // });
  });

  // Close Modal
  $('.slideshow').click(function(){
    $('.slideshow').fadeOut(500);
  }).children().click(function(){return false;});
});
