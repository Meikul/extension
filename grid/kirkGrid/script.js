$(document).ready(function() {
  $('.grid').masonry({
    itemSelector: '.grid>li',
    columnWidth: '.grid-sizer'
  });

  $('.grid figure').click(function(e){
    var fig = $(e.target).closest('figure');
    fig.clone().appendTo('.lightbox');
    $('.lightbox').fadeIn(500);
    $('.lightbox').children().click(function(){return false;});
    $('.modal-close>img').click(closeModal);
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
  function closeModal(){
    $('.lightbox').fadeOut(500, function(){$('.lightbox').children().remove()});
  }
  $('.lightbox').click(closeModal);
  $(document).keyup(function(e) {
    if (e.keyCode == 27) closeModal();
  });
});
