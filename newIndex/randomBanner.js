$(document).ready(function(){
  var urls = [
	  ["{{f:18731661}}","A PLANT SCIENTIST"],
	  ["{{f:18731662}}","AN OUTDOOR PRODUCT DESIGNER"],
	  ["{{f:18731663}}","A VETERINARIAN"],
	  ["{{f:18731664}}","A FACS TEACHER"],
	  ["{{f:18731665}}","A LANDSCAPE ARCHITECT"],
	  ["{{f:18731666}}","A SMALL BUSINESS OWNER"],
	  ["{{f:18731667}}","A PILOT"],
	  ["{{f:18731668}}","A REPORTER"],
	  ["{{f:18731669}}","A DIETICIAN"]
  ];
  var index = Math.floor(Math.random() * urls.length);
  $banner = $('.banner');
  $imgs = $banner.find('.full-banner, .blurry-banner');
  $jobTitle = $banner.find('.banner-text h3');
  $imgs.attr('src', urls[index][0]);
  $jobTitle.html(urls[index][1]);
});

		// "https://caas.usu.edu/ou-images/caas-web-banner-2.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-1.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-4.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-9.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-3.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-8.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-5.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-6.jpg",
		// "https://caas.usu.edu/ou-images/caas-web-banner-7.jpg"
