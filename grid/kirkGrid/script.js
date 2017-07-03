$(document).ready(function() {
  $('.grid').masonry({
    itemSelector: '.grid>li',
    columnWidth: '.grid-sizer'
  });

  $('.grid figure').click(function(e){
    var fig = $(e.target).closest('figure');
    // var title = fig.find('figcaption>h3').text();
    // var p = fig.find('figcaption>.modal-text').text();
    // p = (p === "") ? fig.find('figcaption>p').text() : p; // if there isn't a modal-text div just use the original text
    // var img = fig.find('img');
    console.log(fig.clone());
    fig.clone().appendTo('.slideshow');
    // var modHtml = '<figure>'+img+'<figcaption><h3>'+title+'</h3><div </figcaption></figure>';
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
    $('.slideshow').fadeOut(500, function(){$('.slideshow').children().remove()});
  }).children().click(function(){return false;});
});
