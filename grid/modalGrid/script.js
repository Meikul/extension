$(document).ready(function() {
  $('.grid').masonry({
    itemSelector: '.grid>li',
    columnWidth: '.grid-sizer'
  });

  $('.grid-wrap:not(.active-grid)').css('display', 'none');

  $('.grid figure').click(function(e){
    var fig = $(e.target).closest('figure');
    fig.clone().appendTo('.lightbox');
    $('.lightbox').fadeIn(500);
    $('.lightbox').children().click(function(){return false;});
    $('.modal-close>img').click(closeModal);
    $('.lightbox .more-info-btn').click(function(){
      // console.log('ok');
      $(this).parentsUntil('figure').append(`
        <h3>ok</h3>
      `);
    });
    // Background Blur Effect
    // $({blurRadius: 0}).animate({blurRadius: 5}, {
    //     duration: 500,
    //     easing: 'swing', // or "linear"
    //                      // use jQuery UI or Easing plugin for more options
    //     step: function() {
    //         console.log(this.blurRadius);
    //         $('.grids-wrap').css({
    //             "-webkit-filter": "blur("+this.blurRadius+"px)",
    //             "filter": "blur("+this.blurRadius+"px)"
    //         });
    //     }
    // });
  });


  // Close Modal
  function closeModal(){
    $('.lightbox').fadeOut(500, function(){$('.lightbox').children().remove();});
  }
  $('.lightbox').click(closeModal);
  $(document).keydown(function(e) {
    if (e.keyCode == 27) closeModal();
  });

  $('.grid-selector').click(function(){
    $('.active-grid-selector').removeClass('active-grid-selector');
    $(this).addClass('active-grid-selector');
    console.log($(this)[0].id);
    switch ($(this)[0].id) {
      case 'undergrad-link':
        openGrid('undergrad-grid');
        break;
      case 'graduate-link':
        openGrid('graduate-grid');
        break;
      case 'minors-link':
        openGrid('minors-grid');
    }
  });
});

function openGrid(id) {
  console.log($('.active-grid')[0].id, id);
  if($('.active-grid')[0].id !== id){
    $('.active-grid').fadeOut(400, function(){
      $('.active-grid').removeClass('active-grid');
      $('#'+id).addClass('active-grid');
      $('.active-grid').show();
      // $('.grid').masonry({
      //   itemSelector: '.grid>li',
      //   columnWidth: '.grid-sizer'
      // });
      $('.active-grid').children().children('li').each(function(i, elem) {
        $(elem).css('display', 'none');
        $(elem).stop().delay(100*i).fadeIn(300);
      });
      console.log($('#'+id)[0].id);
    });
  }
}
