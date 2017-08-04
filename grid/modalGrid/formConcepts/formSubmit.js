$(document).ready(function() {
  $('.submit').click(submit);
  $('.select-field').click(selectUpdate);
});

function selectUpdate(){
  var field = $(this);
  var value = field.find('.selected').text();
  field.find('input[type=hidden]').val(value);
}

 function submit(){
   var serial = $(this).closest('form').serialize();
   console.log(serial);
   console.log('firstname=&lastname=&email=&phonenumber=&address=&grade%5B%5D=&contactmethod%5B%5D=&form_uuid=fda8bcf4-300e-40a9-8bda-ec7613906579&site_name=z_Clone_USU');
   $.ajax({
     type: "POST",
     cache: false,
     url: "https://ouresources.usu.edu/_assets/forms/forms.php", //form_submit.aspx
     data: $(this).serialize(),
     success: function (data) {
       console.log('success');
     },
     error: function (data) {
       console.log('failed');
     }
   });
 }
