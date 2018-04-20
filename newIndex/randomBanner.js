$(document).ready(function(){
  var urls = [
	  ["https://caas.usu.edu/ou-images/caas-web-banner-2.jpg","A PLANT SCIENTIST"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-1.jpg","AN OUTDOOR PRODUCT DESIGNER"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-4.jpg","A VETERINARIAN"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-9.jpg","A FACS TEACHER"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-3.jpg","A LANDSCAPE ARCHITECT"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-8.jpg","A SMALL BUSINESS OWNER"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-5.jpg","A PILOT"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-6.jpg","A REPORTER"],
	  ["https://caas.usu.edu/ou-images/caas-web-banner-7.jpg","A DIETICIAN"]
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
