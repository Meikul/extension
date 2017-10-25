$(document).ready(function() {
  $('.submit').click(submit);
  $('.select-field').click(selectUpdate);
  $('input[type=number]').keydown(checkInput);
});

function checkInput(e){
  switch(e.which){
    case 69:
    case 187:
    case 189:
    case 190:
    e.preventDefault();
  }
}

function selectUpdate(){
  var field = $(this);
  var value = field.find('.selected').text();
  field.find('input[type=hidden]').val(value);
}

function submit(){
  var $form = $(this).closest('form');
  if(validate($form)){
    send($form);
  }
  else{
    shakeButton(this);
  }
}

function shakeButton(btn){
  var $btn = $(btn);
  $btn.addClass('shaking');
  $btn.find('input').val('Fix Problems');
  setTimeout(function(){
       $btn.removeClass('shaking');
   }, 1000);
   setTimeout(function(){
        $btn.find('input').val('Submit');
    }, 2000);
}

function validate($form){
  if($form.find('.checkbox-field[data-required] input:checked').length === 0) return false;
  var allFilled = true;
  $form.find('.active-field.text-field').each(function(){
    if(!$(this).hasClass('filled')){
      invalid($(this));
      allFilled = false;
    }else{
      valid($(this));
    }
  });
  $form.find('.active-field input[name=phonenumber]').each(function(){
    var $input = $(this);
    var length = $input.val().length;
    if(length == 7) invalid($input, 'Please include area code');
    else if(length == 10 || length == 11) valid($input);
    else invalid($input, 'Invalid phone number');
  });
  var $emailInput = $form.find('.active-field input[name=email]');
  if(!validateEmail($emailInput.val())){
    invalid($emailInput);
    return false;
  }
  else{
    valid($emailInput);
  }
  return true;
}

function invalid(...args){
  $elem = $(args[0]);
  $elem.closest('.input-field').addClass('invalid');
  if(args[1]) $elem.next('span').text(args[1]);
}

function valid($elem){
  $elem.closest('.input-field').removeClass('invalid');
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

 function send($form){
   var $btn = $form.find('.submit');
   var programTitle = $form.closest('figure').find('figcaption h3').text();
   var department = $('#degrees-header h2').text();
   $form.find('input[name=program]').val(programTitle);
   $form.find('input[name=department]').val(department);
   $btn.removeClass('success error');
   $btn.addClass('pending');
  //  console.log(serial);
  //  console.log('firstname=&lastname=&email=&phonenumber=&address=&grade%5B%5D=&contactmethod%5B%5D=&form_uuid=fda8bcf4-300e-40a9-8bda-ec7613906579&site_name=z_Clone_USU');
   $.ajax({
     type: "POST",
     cache: false,
     url: "https://ouresources.usu.edu/_assets/forms/forms.php", //form_submit.aspx
     data: $form.serialize(),
     success: function (data) {
       $btn.off('click');
       $btn.find('input').val('Done!');
       $btn.removeClass('pending');
       $btn.addClass('success');
       $
     },
     error: function (data) {
       $btn.find('input').val("Couldn't Submit");
       $btn.removeClass('pending');
       $btn.addClass('error');
     }
   });
 }
