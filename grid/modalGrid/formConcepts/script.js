$(document).ready(function() {
  window.mdc.autoInit();

  $('.grid').masonry({
    itemSelector: '.grid>li',
    columnWidth: '.grid-sizer'
  });

  $('.more-info label').click(function(){
    $(this).next('input').focus();
  });

  $('.select-field').focus(function(){
    $(this).children('.select-list').focus();
  });

  var textInputs = $('.more-info input[type=text]');
  var inputs = $('.more-info input, .more-info .select-list, .more-info .checkbox-field>label');
  var checkboxes = $('.more-info .checkbox-field>label');
  var selectLists = $('.select-list');
  var selectListItems = selectLists.children('div');

  checkboxes.keydown(function(e){
    if(e.which === 13){
      $(this).click();
    }
  });
  checkboxes.click(function(){
    var checked = $('.checkbox-field[data-required] input:checked').closest('.checkbox-field');
    var parentForm = $(this).closest('form');
    parentForm.children('.input-field').removeClass('active-field').children('input, .select-list').attr('tabindex','-1');
    // parentForm.children('.input-field').fadeOut(150);
    checked.each(function(){
      var required = $(this).attr('data-required').split(' ');
      required.forEach(function(reqGroup){
        this.children('.'+reqGroup).addClass('active-field').children('input, .select-list').attr('tabindex','0');
        // this.children('.'+reqGroup).fadeIn(150);
      }, parentForm);
    });
  });

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
    $(this).parent().closest('div').addClass('focused');
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
