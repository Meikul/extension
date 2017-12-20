$(document).ready(function(){
  var urls = [
	  "{{f:18731661}}",
	  "{{f:18731662}}",
	  "{{f:18731663}}",
	  "{{f:18731664}}",
	  "{{f:18731665}}",
	  "{{f:18731666}}",
	  "{{f:18731667}}",
	  "{{f:18731668}}",
	  "{{f:18731669}}"
  ];
  var index = Math.floor(Math.random() * urls.length);
  $('.banner .full-banner, .banner .blurry-banner').attr('src', urls[index]);
});
