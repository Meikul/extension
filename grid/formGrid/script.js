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
      $(this).closest('figure').append(`
        <div class="more-info">
          <form>
            <div class="info-checkboxes">
              <span>I want a...</span>
              <div class="checkbox-field" data-required="nameEmail phone age">
                <label tabindex="0">
                  <span>Campus Tour</span>
                  <input type="checkbox">
                  <div></div>
                </label>
              </div>
              <div class="checkbox-field" data-required="nameEmail">
                <label tabindex="0">
                  <span>Email Newsletter</span>
                  <input type="checkbox">
                  <div></div>
                </label>
              </div>
              <div class="checkbox-field" data-required="nameEmail phone age contactMethod">
                <label tabindex="0">
                  <span>Advisor Appointment</span>
                  <input type="checkbox">
                  <div></div>
                </label>
              </div>
              <div class="checkbox-field" data-required="nameEmail address age">
                <label tabindex="0">
                  <span>Physical Mailer</span>
                  <input type="checkbox">
                  <div></div>
                </label>
              </div>
            </div>
            <div class="nameEmail text-field input-field">
              <label>First name</label>
              <input name="firstname" type="text">
            </div>
            <div class="nameEmail text-field input-field">
              <label>Last name</label>
              <input type="text" name="lastname">
            </div>
            <div class="nameEmail text-field input-field">
              <label>Email</label>
              <input name="email" type="text">
            </div>
            <div class="phone text-field input-field">
              <label>Phone number</label>
              <input name="phone" type="text">
            </div>
            <div class="address text-field input-field">
              <label>Address</label>
              <input name="address" type="text">
            </div>
            <div class="age select-field input-field">
              <label>Current grade</label>
              <div class="sfoelect-list" tabindex="0">
                <div>Freshman</div>
                <div>Sophomore</div>
                <div>Junior</div>
                <div class="selected">Senior</div>
                <div>Graduated</div>
                <em class="fa fa-caret-down">&nbsp;</em>
              </div>
            </div>
            <div class="contactMethod select-field input-field">
              <label>Contact method</label>
              <div class="select-list" tabindex="0">
                <div>Call</div>
                <div class="selected">Text</div>
                <div>Email</div>
                <em class="fa fa-caret-down">&nbsp;</em>
              </div>
            </div>
            <div class="submit" tabindex="0">
              <input type="submit" disabled>
            </div>
          </form>
        </div>
      `);
      $('.more-info').css('display', 'block');
      $('.more-info form').css('left', '-'+$('.more-info form').width()+'px');
      $('.more-info').animate({opacity: '1'}, {duration: 200, complete:function(){
        $('.more-info form').animate({left: '0px'}, {duration: 300});
        initForm();
      }});
    });

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
    $('.lightbox').click(closeModal);
    $(document).keydown(function(e) {
      if (e.keyCode == 27) closeModal();
    });
  });

  function initForm(){
    $('.more-info').click(function(e){
      if(e.target === $(this)[0]){
        $('.more-info form').animate({left: '-'+$('.more-info form').width()+'px'})
        $('.more-info').animate({opacity: '0'}, {duration: 200, complete:function(){
          $('.more-info').css('display', 'none');
          $('.more-info').remove();
        }});
      }
    });

    console.log('initing');
    $('.more-info label').click(function(){
      console.log($(this).next('input'));
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

    function enterClick(e){
      if(e.which === 13){
        $(this).click();
      }
    }
    $('.submit').keydown(function(e){ enterClick.call($(this).children('input'), e); });
    checkboxes.keydown(enterClick);
    checkboxes.click(function(){
      var checked = $('.checkbox-field[data-required] input:checked').closest('.checkbox-field');
      var parentForm = $(this).closest('form');
      // if(checked.length) parentForm.children('.submit').children('input')[0].disabled = false;
      // else parentForm.children('.submit').children('input')[0].disabled = true;
      parentForm.children('.input-field').removeClass('active-field').children('input, .select-list').attr('tabindex','-1').each(function(){this.disabled=true;});
      // parentForm.children('.input-field').fadeOut(150);
      checked.each(function(){
        var required = $(this).attr('data-required').split(' ');
        required.forEach(function(reqGroup){
          this.children('.'+reqGroup).addClass('active-field').children('input, .select-list').attr('tabindex','0').each(function(){this.disabled=false;});
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
  }

  // Close Modal
  function closeModal(){
    $('.lightbox').fadeOut(500, function(){$('.lightbox').children().remove();});
  }


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
