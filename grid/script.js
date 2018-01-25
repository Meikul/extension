$(document).ready(function() {

	/**
	 * Sizes modal image container
	 */
	$(window).resize(sizeImgContainer);

	function sizeImgContainer(){
		var $fig = $('.lightbox figure');
		var $figCaption = $fig.find('figcaption');
		var containerHeight = $fig.height() - $figCaption.outerHeight();
		$('.lightbox .img-container').height(containerHeight);
	}

	/**
	 * Checks to see if css @support failed for blur and sets noBlur if it did
	 */
	if($('.grid-gallery figure .img-container img').css('opacity') == 0){
		console.log('not supported');
		var noBlur = true;
	}

	/**
	 * Deblurs grid images when they've loaded, or fades them in if blur isn't supported
	 */
	$('.msn-item .img-container img').load(function(){
		var $img = $(this);
		if(noBlur) $img.animate({opacity: 1}, 600);
		else $img.sharpen(600);
		$img.closest('.msn-grid').masonry();
	});

	/**
	 * Does final check for all blurry images in grid and lightbox and deblurs them. Also, sets image conatainer
	 * background from color loading to same color as modal.
	 */
	$('.msn-item .img-container img').each(function(){
		if(this.complete){
			var $img = $(this);
			if(noBlur){
				$img.animate({opacity: 1}, 600, function(){
					$img.closest('.img-container').css('background', '#f4f4f4');
				});
			}
			else $img.sharpen(600);
		}
	});

	/**
	 * Hides non-active grids (for grid selector tabs)
	 */
	$('.grid-wrap:not(.active-grid)').css('display', 'none');

	/**
	 * Request Info button handler
	 */
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

	/**
	 * View Degrees button handler
	 */
	 $('#view-degrees').click(function(){
		 $('html, body').animate({scrollTop: '730px'}, 600, 'easeInOutCubic');
	 });

	/**
	 * Open modal on grid item click
	 */
	$('.grid figure').click(openModal);

	/**
	 * Opens modal
	 */
	function openModal(e) {
		var fig = $(e.target).closest('figure');
		fig.clone().appendTo('.lightbox');
		var $lightbox = $('.lightbox');
		$lightbox.fadeIn(500);
		sizeImgContainer();
		$lightbox.find('.modal-close>img').click(closeModal);
		$lightbox.find('.more-info-btn').click(function() {
			var $moreInfo = $('.more-info');
			$moreInfo.clone().appendTo($lightbox.find('figure'));
			$moreInfo = $lightbox.find('figure .more-info');
			$lightbox.find('.img-container, figcaption').append('<div class="cover"></div>');
			$lightbox.find('.cover').fadeTo(300, 0.3);
			$lightbox.animate({scrollTop: 0}, 300);
			$moreInfo.fadeIn(300, setFormEvents);
			$moreInfo.find('.form-container').animate({
				left: '0'
			}, 300);
		});
		$lightbox.find('.apply-now-btn').click(function() {
			closeModal(openVideo);
		});
		$lightbox.click(function(e) {
			if (e.target === this) closeModal();
		});
		// title click for direct degree url
		$lightbox.find('figcaption h3').click(function(){
			var title = $(this).html();
			title = encodeURIComponent(title);
			var url = window.location.href;
			// cutting of any previous http parameters
			url = url.substring(0, url.indexOf('?'));
			// directing page to direct link to degree
			window.location.href = url+"?deg="+title;
		});
		// Inserting degree name
		var degreeName = $lightbox.find('figcaption h3').html();
		if(degreeName){
			var $desc = $lightbox.find('.form-desc');
			var descText = $desc.html();
			// replace this degree with degree name if it's defined
			descText = descText ? descText.replace('this degree', degreeName) : descText;
			$desc.html(descText);
		}
		// Deblurring image when loaded
		$lightbox.find('.img-container img').load(function(){
			var $img = $lightbox.find('.img-container img');
			if(noBlur) $img.css('opacity', 1);
			else $img.css('filter','blur(0px)');
		});
	}

	/**
	 * Opens video modal
	 */
	function openVideo() {
		var vidWindow = $('#grid-gallery>.apply-now');
		vidWindow.clone().appendTo('.lightbox');
		$('.lightbox .apply-now').fadeIn(500);
	}

	/**
	 * Closes moreInfo form
	 */
	function closeForm(){
		var $lightbox = $('.lightbox');
		$lightbox.find('.more-info').find('.form-container').animate({
			left: '-350px'
		}, 300);
		$lightbox.find('.cover').fadeOut(300,function(){
			$lightbox.find('.cover').remove();
		});
		$lightbox.find('.more-info').fadeOut(300, function() {
			$lightbox.find('.more-info').remove();
		});
	}

	/**
	 * Sets up event listeners for more info form
	 */
	function setFormEvents() {
		var $lightbox = $('.lightbox');
		$lightbox.find('.submit').click(submit);
		$lightbox.find('.select-field').click(selectUpdate);
		$lightbox.find('input[type=number]').keydown(checkInput);
		$lightbox.find('.more-info, em.close-form, .cover').click(closeForm);
		$lightbox.find('#req-more-info .close-form').click(function(){
			$lightbox.find('.more-info').click();
		});

		// Stop click even propogating to lightbox to prevent closing modal
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

		$lightbox.find('.submit').keydown(function(e) {
			enterClick.call($(this).children('input'), e);
		});
		checkboxes.keydown(enterClick);
		function enterClick(e) {
			if (e.which === 13) {
				$(this).click();
			}
		}
		checkboxes.click(function() {
			var checked = $lightbox.find('.checkbox-field[data-required] input:checked').closest('.checkbox-field');
			var parentForm = $(this).closest('form');
			parentForm.children('.input-field').removeClass('input-field').children('input, .select-list').attr('tabindex', '-1'); //.each(function(){this.disabled=true;});
			checked.each(function() {
				var required = $(this).attr('data-required').split(' ');
				required.forEach(function(reqGroup) {
					this.children('.' + reqGroup).addClass('input-field').children('input, .select-list').attr('tabindex', '0'); //.each(function(){this.disabled=false;});
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

	// Bans problematic number keys
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

	/**
	 * Validates more info form
	 */
	function submit() {
		var $form = $(this).closest('form');
		if (validate($form)) {
			if(true){
				send($form);
			} else {
				shakeButton(this);
			}
		}
	}

	/**
	 * User notification of invalid form
	 */
	function shakeButton(btn) {
		var $btn = $(btn);
		$btn.addClass('shaking');
		$btn.find('input').val('Some Problems');
		setTimeout(function() {
			$btn.removeClass('shaking');
		}, 1000);
		setTimeout(function() {
			$btn.find('input').val('Submit');
		}, 2000);
	}

	/**
	 * Validates more info form
	 */
	function validate($form) {
		var allValid = true;
		$form.find('.input-field.text-field').each(function() {
			if (!$(this).hasClass('filled')) {
				invalid($(this), 'Required');
				allValid = false;
			} else {
				valid($(this));
			}
		});
		$form.find('.input-field input[name=zipcode]').each(function() {
			var length = $(this).val().length;
			if (length === 0) {
				invalid($(this), 'Required');
				allValid = false;
			} else if (length !== 5) {
				invalid($(this), 'Invalid postal code');
				allValid = false;
			}
		});
		$form.find('.input-field input[name=phonenumber]').each(function() {
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
		var $emailInput = $form.find('.input-field input[name=email]');
		if ($emailInput.val().length == 0) {
			invalid($emailInput, 'Required');
			allValid = false;
		} else if (!validateEmail($emailInput.val())) {
			invalid($emailInput, 'Invalid email address');
			allValid = false;
		} else {
			valid($emailInput);
		}
		var $birthdayInput = $form.find('.birthday input[name=birthday]');
		var date = $birthdayInput.val();
		if(date.length == 0){
			invalid($birthdayInput, 'Required');
			allValid = false;
		} else{
			var year = parseInt(date.split('-')[0]);
			var age = new Date().getFullYear() - year;
			if(age > 100 || age < 12){
				invalid($birthdayInput, 'Invalid Date');
				allValid = false;
			} else{
				valid($birthdayInput);
			}
		}
		return allValid;
	}

	/**
	 * Displays error message under invalid field
	 */
	function invalid(...args) {
		$elem = $(args[0]);
		$elem.closest('.input-field').addClass('invalid');
		if (args[1]) $elem.next('span').text(args[1]);
	}

	/**
	 * Removes error message under fields
	 */
	function valid($elem) {
		$elem.closest('.input-field').removeClass('invalid');
	}

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	/**
	 * Defines cubic easeing function
	 */
	$.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
  }

	/**
	 * Closes modal on escape key
	 */
	$(document).keydown(function(e) {
		if (e.keyCode == 27) closeModal();
	});

	/**
	 * Handles grid selector tab clicks
	 */
	$('.grid-selector').click(function() {
		$('.active-grid-selector').removeClass('active-grid-selector');
		$link = $(this);
		$link.addClass('active-grid-selector');

		var index = $link.attr('id').split('-')[1];
		openGrid('grid-' + index);
	});

	/**
	 * Does ajax to send form. Uses OUcampus's form infrastructure by POSTing a string
	 * identical to what an actual instance of the "More Info" form would POST
	 * to their forms.php.
	 */
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
				showDownload();
			},
			error: function(data) {
				$btn.find('input').val("Couldn't Submit");
				$btn.removeClass('pending');
				$btn.addClass('error');
			}
		});
	}

	/**
	 * Shows major sheet and viewbook pdf download links when form successfully submits
	 */
	function showDownload() {
		var $modal = $('.lightbox figure');
		var $form = $modal.find('form');
		var $btn = $form.find('.submit');
		var $bookBtn = $form.find('.bookBtn');
		$form.addClass('download');
		$btn.off('click');
		$btn.html('<em class="fa fa-download"></em><input type="button" value="Get 4 Year Plan"/>');
		$btn.removeClass('pending');
		$btn.addClass('success');
		$btn.find('*').delay(100).fadeIn(300);

		var sheetURL = $modal.find('figcaption .sheet-link').html();
		var viewBookURL = "https://caas.usu.edu/ou-files/USU-2017-Viewbook.pdf";
		$bookBtn.fadeIn(300);
		$bookBtn.click(function(){
			var newTab = window.open(viewBookURL, '_blank');
			newTab.focus();
		})
		if(isURL(sheetURL)){
			$btn.click(function(){
				window.location.href=sheetURL;
			});
		}
		else{
			$btn.fadeOut(10);
		}
	}
	/**
	 * Checks if string is a valid url (used to check if the major sheet pdf url is valid)
	 */
	function isURL(str){
		if(typeof str === 'string'){
			if(str.indexOf('http') >= 0) return true;
		}
		return false;
	}

	/**
	 * Closes modal
	 */
	function closeModal(callback = undefined) {
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
	// Calls function for
	urlDegTabParam();
});

/**
 * URL parameteres
 */
 function urlDegTabParam(){
 	var fullReturn = false;
 	var tabArg = getURLParam('tab');
 	var $tab = $('#grid-'+tabArg+'-link');
 	var degArg = getURLParam('deg');
 	if(degArg){
		console.log(degArg);
		degArg = decodeURIComponent(degArg).toUpperCase();
		console.log(degArg);
 		// degArg = degArg.split('+').join(' ').toUpperCase();
 		$('.grid-wrap').each(function(i){
 			$(this).find('figure').each(function(){
 				var $fig = $(this);
 				var degName = $fig.find('figcaption>h3').html().toUpperCase();
 				if(degName == degArg) {
 					if(!tabArg){
 						$('#grid-'+i+'-link').click();
 					}
 					$fig.click();
 					// Scroll down so degree is in view
 					scrollToDegrees();
 					// break out of both loops
 					fullReturn = true;
 					return false;
 				}
 			});
 			if(fullReturn) return false;
 		});
 	}
 	if($tab){
 		$tab.click();
 	}
 }

/**
 * Adds sharpen function to animate blur radius to 0
 */
 jQuery.fn.extend({
	sharpen: function(duration){
		var loadedImg = $(this);
		$({blurRadius: 20}).animate({blurRadius: 0}, {
			duration: duration,
			easing: 'swing', // or "linear"
			// use jQuery UI or Easing plugin for more options
			complete: function(){
				loadedImg.css({
					"-webkit-filter": "blur(0px)",
					"filter": "blur(0px)"
				});
			},
			step: function(now) {
				loadedImg.css({
					"-webkit-filter": "blur("+now+"px)",
					"filter": "blur("+now+"px)"
				});
			}
		});
	}
});

/**
 * Hides old and shows new active when grid selector tab is clicked
 */
function openGrid(id) {
	if ($('.active-grid')[0].id !== id) {
		$('.active-grid').animate({opacity: 0}, {complete: function() {
			$('.active-grid').css('display', 'none');
			$('.active-grid').removeClass('active-grid');
			$('#' + id).addClass('active-grid');
			$('.active-grid').show();
			$('.active-grid').css('opacity', 1);
			$('.active-grid .msn-grid').masonry();
			$('.active-grid .msn-grid').children('li').each(function(i, elem) {
				$(elem).css('display', 'none');
				$(elem).stop().delay(100 * i).fadeIn(300);
			});
		}});
	}
}

/**
 * Returns url parameter if it is defined
 */
 function getURLParam(sParam) {
   var sPageURL = decodeURIComponent(window.location.search.substring(1)),
       sURLVariables = sPageURL.split('&'),
       sParameterName,
       i;
   for (i = 0; i < sURLVariables.length; i++) {
       sParameterName = sURLVariables[i].split('=');
       if (sParameterName[0] === sParam) {
           return sParameterName[1] === undefined ? true : sParameterName[1];
       }
   }
 }
