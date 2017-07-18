$(document).ready(function() {
  window.mdc.autoInit();

  $('.grid').masonry({
    itemSelector: '.grid>li',
    columnWidth: '.grid-sizer'
  });

  $('.more-info label').click(function(){
    $(this).next('input').focus();
  });

  var textInputs = $('.more-info input[type=text]');
  var inputs = $('.more-info input, .more-info .select-list');
  var selectLists = $('.select-list');
  var selectListItems = selectLists.children('div');
  selectListItems.click(function(){
    if(!$(this).hasClass('selected')){
      $(this).siblings('.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });
  selectLists.click(function(e){
    $(this).parent().toggleClass('open');
  });
  selectLists.keydown(function(e){
    // if(e.which == 13) $(this).click();
    switch (e.which) {
      case 13:
        $(this).click();
        break;
      case 38:
        e.preventDefault();
        $(this).parent().addClass('open');
        var selected = $(this).children('.selected');
        if(selected.prev('div').length){
          selected.removeClass('selected');
          selected.prev('div').addClass('selected');
        }
        break;
      case 40:
        e.preventDefault();
        $(this).parent().addClass('open');
        var selected = $(this).children('.selected');
        if(selected.next('div').length){
          selected.removeClass('selected');
          selected.next('div').addClass('selected');
        }
    }
  });

  inputs.focus(function(){
    $(this).parent().addClass('focused');
  });
  inputs.focusout(function(){
    $(this).parent().removeClass('focused');
    $(this).parent().removeClass('open');
  });
  textInputs.change(function(){
    if($(this).val() === '') $(this).parent('.text-field').removeClass('filled');
    else $(this).parent('.text-field').addClass('filled');
  });
  $('.lightbox .more-info-btn').click(function(){
    $(this).parentsUntil('figure').append(``);
  });
});
