$(document).ready(function() { // This function is 319 lines long... I'm so sorry

  $(window).resize(function() {
    $('.lightbox .img-container').height($('.lightbox figure').height() - $('.lightbox figcaption').outerHeight());
  });

  $('.grid-wrap:not(.active-grid)').css('display', 'none');

  $('#req-info').click(function() {
    $('#req-more-info').clone().appendTo('.lightbox');
    $('.lightbox .more-info').css({
      left: '0'
    });
    $('.lightbox').fadeIn(300, setFormEvents);
    $('.lightbox, .more-info').click(function(e) {
      if (e.target === this) closeModal();
    });
  });

  $('.grid figure').click(openModal);

  function sizeModalImg() {
    var $lightbox = $('.lightbox');
    $lightbox.find('.img-container').height(
      $lightbox.find('figure').height() - $lightbox.find('figcaption').outerHeight()
    );
  }

  function openModal(e) {
    var fig = $(e.target).closest('figure');
    fig.clone().appendTo('.lightbox');
    $('.lightbox').fadeIn(500);
    $('.lightbox .img-container').height($('.lightbox figure').height() - $('.lightbox figcaption').outerHeight());
    $('.modal-close>img').click(closeModal);
    $('.lightbox .more-info-btn').click(function() {
      disableScroll();
      $('.more-info').clone().appendTo($(this).closest('figure'));
      $('.lightbox .more-info').css('top', $('.lightbox figure').scrollTop());
      $('.lightbox .more-info').fadeIn(300, setFormEvents);
      $('.lightbox .more-info form').animate({
        left: '0'
      }, 300);
    });
    $('.lightbox .apply-now-btn').click(function() {
      closeModal(openVideo);
    });
    $('.lightbox').click(function(e) {
      if (e.target === this) closeModal();
    });
  }

  function openVideo() {
    var vidWindow = $('#grid-gallery>.apply-now');
    vidWindow.clone().appendTo('.lightbox');
    $('.lightbox .apply-now').fadeIn(500);
  }

  function setFormEvents() {
    $lightbox = $('.lightbox');
    $lightbox.find('.submit').click(submit);
    $lightbox.find('.select-field').click(selectUpdate);
    $lightbox.find('input[type=number]').keydown(checkInput);

    $lightbox.find('.more-info').click(function() {
      $(this).find('form').animate({
        left: '-350px'
      }, 300);
      $(this).fadeOut(300, function() {
        $(this).remove();
        enableScroll($lightbox.find('figure').get());
      });
    });

    $lightbox.find('form').click(function(e) {
      return false;
    });

    $lightbox.find('.checkbox-field label').click(function() {
      var $input = $(this).find('input');
      $input.prop('checked', !$input.prop('checked'));
    });

    $lightbox.find('.more-info label').click(function() {
      $(this).next('input').focus();
    });

    $lightbox.find('.select-field').focus(function() {
      $(this).children('.select-list').focus();
    });

    var textInputs = $lightbox.find('.more-info input[type=text], .more-info input[type=number]');
    var inputs = $lightbox.find('.more-info input, .more-info .select-list, .more-info .checkbox-field>label');
    var checkboxes = $lightbox.find('.more-info .checkbox-field>label');
    var selectLists = $lightbox.find('.select-list');
    var selectListItems = selectLists.children('div');

    function enterClick(e) {
      if (e.which === 13) {
        $(this).click();
      }
    }
    $lightbox.find('.submit').keydown(function(e) {
      enterClick.call($(this).children('input'), e);
    });
    checkboxes.keydown(enterClick);
    checkboxes.click(function() {
      var checked = $lightbox.find('.checkbox-field[data-required] input:checked').closest('.checkbox-field');
      var parentForm = $(this).closest('form');
      parentForm.children('.input-field').removeClass('active-field').children('input, .select-list').attr('tabindex', '-1'); //.each(function(){this.disabled=true;});
      checked.each(function() {
        var required = $(this).attr('data-required').split(' ');
        required.forEach(function(reqGroup) {
          this.children('.' + reqGroup).addClass('active-field').children('input, .select-list').attr('tabindex', '0'); //.each(function(){this.disabled=false;});
        }, parentForm);
      });
    });

    selectListItems.click(function() {
      if (!$(this).hasClass('selected')) {
        $(this).siblings('.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });
    selectLists.click(function(e) {
      $(this).parent().toggleClass('open');
    });
    selectLists.keydown(function(e) {
      switch (e.which) {
        case 13:
          $(this).click();
          break;
        case 38:
          e.preventDefault();
          $(this).parent().addClass('open');
          var selected = $(this).children('.selected');
          if (selected.prev('div').length) {
            selected.removeClass('selected');
            selected.prev('div').addClass('selected');
          }
          break;
        case 40:
          e.preventDefault();
          $(this).parent().addClass('open');
          var selected = $(this).children('.selected');
          if (selected.next('div').length) {
            selected.removeClass('selected');
            selected.next('div').addClass('selected');
          }
      }
    });

    inputs.focus(function() {
      $(this).parent().closest('div').addClass('focused');
    });
    inputs.focusout(function() {
      $(this).parent().removeClass('focused');
      $(this).parent().removeClass('open');
    });
    textInputs.change(function() {
      if ($(this).val() === '') $(this).parent('.text-field').removeClass('filled');
      else $(this).parent('.text-field').addClass('filled');
    });
  }


  function checkInput(e) {
    switch (e.which) {
      case 69:
      case 187:
      case 189:
      case 190:
        e.preventDefault();
    }
  }

  function selectUpdate() {
    var field = $(this);
    var value = field.find('.selected').text();
    field.find('input[type=hidden]').val(value);
  }

  function submit() {
    var $form = $(this).closest('form');
    if (validate($form)) {
      send($form);
    } else {
      shakeButton(this);
    }
  }

  function shakeButton(btn) {
    var $btn = $(btn);
    $btn.addClass('shaking');
    $btn.find('input').val('Fix Problems');
    setTimeout(function() {
      $btn.removeClass('shaking');
    }, 1000);
    setTimeout(function() {
      $btn.find('input').val('Submit');
    }, 2000);
  }

  function validate($form) {
    if ($form.find('.checkbox-field[data-required] input:checked').length === 0) return false;
    var allValid = true;
    $form.find('.active-field.text-field').each(function() {
      if (!$(this).hasClass('filled')) {
        invalid($(this), 'Required');
        allValid = false;
      } else {
        valid($(this));
      }
    });
    $form.find('.active-field input[name=zipcode]').each(function() {
      var length = $(this).val().length;
      if (length === 0) {
        invalid($(this), 'Required');
        allValid = false;
      } else if (length !== 5) {
        invalid($(this), 'Invalid postal code');
        allValid = false;
      }
    });
    $form.find('.active-field input[name=phonenumber]').each(function() {
      var $input = $(this);
      var length = $input.val().length;
      if (length == 10 || length == 11) valid($input);
      else {
        allValid = false;
        if (length == 7) invalid($input, 'Please include your area code');
        else if (length == 0) invalid($input, 'Required');
        else invalid($input, 'Invalid phone number');
      }
    });
    var $emailInput = $form.find('.active-field input[name=email]');
    if ($emailInput.val().length == 0) {
      invalid($emailInput, 'Required');
      allValid = false;
    } else if (!validateEmail($emailInput.val())) {
      invalid($emailInput, 'Invalid email address');
      allValid = false;
    } else {
      valid($emailInput);
    }
    return allValid;
  }

  function invalid(...args) {
    $elem = $(args[0]);
    $elem.closest('.input-field').addClass('invalid');
    if (args[1]) $elem.next('span').text(args[1]);
  }

  function valid($elem) {
    $elem.closest('.input-field').removeClass('invalid');
  }

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function send($form) {
    var $btn = $form.find('.submit');
    var programTitle = $form.closest('figure').find('figcaption h3').text();
    var department = $('#degrees-header h2').text();
    $form.find('input[name=program]').val(programTitle);
    $form.find('input[name=department]').val(department);
    $btn.removeClass('success error');
    $btn.addClass('pending');
    $.ajax({
      type: "POST",
      cache: false,
      url: "https://ouresources.usu.edu/_assets/forms/forms.php", //form_submit.aspx
      data: $form.serialize(),
      success: function(data) {
        $btn.off('click');
        $btn.find('input').val('Thank You');
        $btn.removeClass('pending');
        $btn.addClass('success');
      },
      error: function(data) {
        $btn.find('input').val("Couldn't Submit");
        $btn.removeClass('pending');
        $btn.addClass('error');
      }
    });
  }

  // Close Modal
  function closeModal(callback = undefined) {
    enableScroll();
    if (typeof callback === 'function') {
      $('.lightbox figure').fadeOut(500, function() {
        $('.lightbox').children().remove();
        callback();
      });
    } else {
      $('.lightbox').fadeOut(500, function() {
        $('.lightbox').children().remove();
      });
    }
  }
  // $('.lightbox').click(closeModal);
  $(document).keydown(function(e) {
    if (e.keyCode == 27) closeModal();
  });

  $('.grid-selector').click(function() { // Not firing
    $('.active-grid-selector').removeClass('active-grid-selector');
    $link = $(this);
    $link.addClass('active-grid-selector');

    var index = $link.attr('id').split('-')[1];
    openGrid('grid-' + index);
  });
});

function openGrid(id) {
  if ($('.active-grid')[0].id !== id) {
    $('.active-grid').animate({opacity: 0}, {complete: function() {
      $('.active-grid').css('display', 'none');
      $('.active-grid').removeClass('active-grid');
      $('#' + id).addClass('active-grid');
      $('.active-grid').show();
      $('.active-grid').css('opacity', 1);
      $('.active-grid .msn-grid').masonry(); // Re init masonry in case of a window resize
      $('.active-grid .msn-grid').children('li').each(function(i, elem) {
        $(elem).css('display', 'none');
        $(elem).stop().delay(100 * i).fadeIn(300);
      });
    }});
  }
}


// Functions for preventing modal scroll when more info form is open.

var keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
    e.preventDefault();
  e.returnValue = false;
}

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}
