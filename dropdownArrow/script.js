$(document).ready(function(){

  $('.dropdown').click(function(e){        // When dropdown is clicked
    const angle = $(this).find($('.dropdown-toggle > .fa-angle-down')[0]);
    console.log(angle[0]);
    angle.toggleClass('open');
  });
});
