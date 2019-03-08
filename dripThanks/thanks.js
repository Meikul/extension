$(document).ready(function () {
  var params = decodeURIComponent(window.location.search.substring(1));
  params = params.split('&');
  var isThanks = false;
  params.forEach(p => {
    p = p.split('=');
    if(p[0]==='thanks') isThanks = true;
  });
  if(isThanks) $('#thanks-modal').modal()
});