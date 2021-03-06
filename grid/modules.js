/**
 * This script uses a revealing module pattern for organization.
 * References for revealing module pattern:
 * https://toddmotto.com/mastering-the-module-pattern/
 * https://learn.jquery.com/code-organization/concepts/
 */
$(document).ready(initPage);

function initPage(){
	grid.init();
	/**
	 * View Degrees button handler
	 */
	$('#view-deg-btn').click(function(){
		$('html, body').animate({scrollTop: '730px'}, 600, 'easeInOutCubic');
	});
}
/**
 * Grid of degrees
 */
var grid = (function(){
	// Private
  /**
	 * True if css blur isn't supported
	 */
	var _noBlur = false;

	/**
	 * Grid gallery element
	 */
	 var _$gridGal = $('#grid-gallery');

	/**
	 * Deblurs grid images when they've loaded, or fades them in if blur isn't supported
	 */
	var _deblur = function(){
		_$gridGal.find('.img-container img').load(function(){
			var $img = $(this);
			console.log('Deblurring' + $img.attr('src'));
			if(_noBlur) $img.animate({opacity: 1}, 600);
			else $img.sharpen(600);
			$img.closest('.msn-grid').masonry();
		});
	};

	/**
	 * Does final check for all blurry images in grid and lightbox and deblurs them.
	 * Also sets image conatainer background from loading color to same color as modal
	 * in case of sizing issues.
	 */
	var _blurCheck = function(){
		_$gridGal.find('.msn-item .img-container img').each(function(){
			if(this.complete){
				var $img = $(this);
				if(_noBlur){
					$img.animate({opacity: 1}, 600, function(){
						$img.closest('.img-container').css('background', '#f4f4f4');
					});
				}
				else $img.sharpen(600);
			}
		});
	};
	/**
	 * URL parameteres
	 */
	var _urlDegTabParam = function(){
		var fullReturn = false;
		var tabArg = _getURLParam('tab');
		var $tab = $('#grid-'+tabArg+'-link');
		var degArg = _getURLParam('deg');
		if(degArg){
			degArg = decodeURIComponent(degArg).toUpperCase();
			_$gridGal.find('.grid-wrap').each(function(i){
				$(this).find('figure').each(function(){
					var $fig = $(this);
					var degName = $fig.find('figcaption .degree-name').html().toUpperCase();
					if(degName == degArg) {
						if(!tabArg && $('#grid-'+i+'-link').length !== 0){
							changeGrid(i);
						}
						modal.open.call($fig);
						// Scroll down so degree is in view
						var $page = $('html, body');
						if($page.scrollTop()<730){
							$page.animate({scrollTop: '730px'}, 600, 'easeInOutCubic');
						}
						// break out of both loops
						fullReturn = true;
						return false;
					}
				});
				if(fullReturn) return false;
			});
		}
		if($tab.length !== 0){
			changeGrid(tabArg);
		}
	}
	/**
	 * Hides old and shows new active when grid selector tab is clicked
	 */
	var _openGrid = function(id) {
		var $activeGrid = $('.active-grid');
		if ($activeGrid[0].id !== id) {
			$activeGrid.animate({opacity: 0}, {complete: function() {
				$activeGrid.css('display', 'none');
				$activeGrid.removeClass('active-grid');
				$('#' + id).addClass('active-grid');
				$activeGrid = $('.active-grid');
				$activeGrid.show();
				$activeGrid.css('opacity', 1);
				$activeGrid.find('.msn-grid').masonry();
				$activeGrid.find('.msn-grid').children('li').each(function(i, elem) {
					var $elem = $(elem);
					$elem.css('display', 'none');
					$elem.stop().delay(70 * i).fadeIn(300);
				});
			}, duration: 400});
		}
	}
	/**
	 * Returns url parameter if it is defined
	 */
	var _getURLParam = function(sParam) {
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


	// Public
	/**
	 * initializes grid
	 */
	var init = function(){
		_$gridGal = $('#grid-gallery');

		// Checks to see if css @support failed for blur and sets noBlur if it did
		if(_$gridGal.find('figure .img-container img').first().css('opacity') == 0){
			console.log('Blur not supported');
			_noBlur = true;
		}

		// Deblurs images as they load
		_deblur();

		// Final check; deblurs all images once they've loaded
		_blurCheck();

		/**
		 * Handles grid selector tab clicks
		 */
		$('.grid-selector').click(changeGrid);

		// Hides non-active grids (for grid selector tabs). Can't be "display:none" before now because of masonry.
		_$gridGal.find('.grid-wrap:not(.active-grid)').css('display', 'none');

		// Opens modal on click
		_$gridGal.find('figure').click(modal.open);

		// Does degree specific url stuff
		_urlDegTabParam();

		console.log('Grid initialized');
	}

	/**
	 * Public getter for _noBlur
	 */
	var getNoBlur = function(){
		return _noBlur;
	}

	/**
	 * Opens a grid
	 */
 var changeGrid = function(index) {
	 console.log(typeof index);
	 var $selectors = $('#grid-selectors');
	 $selectors.find('.active-grid-selector').removeClass('active-grid-selector');
	 var $link = $(this);
	 if(typeof index === 'number' || typeof index === 'string'){
		 console.log('#grid-'+index+'-link');
		 var $link = $selectors.find('#grid-'+index+'-link');
	 }
	 else{
		 index = $link.attr('id').split('-')[1];
	 }
	 $link.addClass('active-grid-selector');
	 _openGrid('grid-' + index);
 }

	return {
		init: init,
		getNoBlur: getNoBlur,
		changeGrid: changeGrid
	};
})();

var modal = (function(){
	// Private
	/**
	 * resizes modal image container
	 */
	var _sizeImgContainer = function(){
		var $lightbox = $('.lightbox');
		var $fig = $lightbox.find('figure');
		var $figCaption = $fig.find('figcaption');
		var containerHeight = $fig.height() - $figCaption.outerHeight();
		$lightbox.find('.img-container').height(containerHeight);
	}

	var _getUrl = function(fig){
		var $fig = $(fig);
		var url = window.location.href;
		// cutting of any previous http parameters
		url = url.substring(0, url.indexOf('?'));
		// if function was passed a figure add degree name parameter onto base page url
		if($fig.is('figure')){
			var title = $fig.find('.degree-name').html();
			title = encodeURIComponent(title);
			url = url+"?deg="+title;
		}
		return url;
	}

	var _deblur = function(){
		var $lightbox = $('.lightbox');
		var $img = $lightbox.find('.img-container img');
		if(grid.getNoBlur()) $img.css('opacity', 1);
		else $img.css('filter','blur(0px)');
	}

	/**
	 * sets events for modal buttons and other things
	 */
	var _setEvents = function(){
		var $lightbox = $('.lightbox');
		// close modal by clicking x icon
		$lightbox.find('.modal-close>img').click(close);
		// close modal by clicking background
		$lightbox.click(function(event){
			if(event.target === this) close();
		});
		// open form by clicking "request info"
		$lightbox.find('.more-info-btn').click(form.open);
		// open video by clicking "apply now"
		$lightbox.find('.apply-now-btn').click(close.bind(this, video.open));
		// deblur modal image when it loads
		$lightbox.find('.img-container img').load(_deblur);
	}

	// Public
	/**
	 * opens modal in lightbox
	 */
	var open = function(e){
		var $fig;
		if(e != undefined){
			$fig = $(e.target).closest('figure');
		}
		else{
			$fig = $(this);
		}
		// Adding degree name parameter to url so degree can be linked to by copying
		// current url. replaceState is used so history is not changed
		var degreeName = $fig.find('.degree-name').html();
		window.history.replaceState({modalOpen: true}, degreeName, _getUrl($fig));
		var $lightbox = $('.lightbox');
		$fig.clone().appendTo($lightbox);
		$lightbox.fadeIn(500);
		_sizeImgContainer();
		_setEvents();
	}

	/**
	 * closes modal and calls callback if one is passed
	 */
	var close = function(callback = undefined){
		// Removing degree parameter from url.
		window.history.replaceState({modalOpen: false}, 'STEM Degrees', _getUrl('html'));
		var $lightbox = $('.lightbox');
		if (typeof callback === 'function') {
			$lightbox.find('figure').fadeOut(500, function() {
				$('.lightbox').children().remove();
				callback();
			});
		} else {
			$lightbox.fadeOut(500, function() {
				$lightbox.children().remove();
			});
		}
	}

	return {
		open: open,
		close: close
	};
})();

var form = (function(){
	// Private
	/**
	 * trigger click if enter was pressed
	 */
	var _enterClick = function(e) {
		if (e.which === 13) {
			$(this).click();
		}
	}
	/**
	 * handles keystrokes for select list
	 */
	var _selectListKeyHandle = function(e){
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
	}
	/**
	 * restricts problematic keys for number inputs
	 */
	var _checkInput = function(e) {
		switch (e.which) {
			case 69:
			case 187:
			case 189:
			case 190:
				e.preventDefault();
		}
	}
	/**
	 * updates hidden field of select list
	 */
	var _selectUpdate = function() {
		var field = $(this);
		var value = field.find('.selected').text();
		field.find('input[type=hidden]').val(value);
	}
	/**
	 * validate and submit form
	 */
	var _submit = function() {
		var $form = $(this).closest('form');
		if (_validate($form)) {
			if(true){
				_send($form);
			} else {
				_shakeButton(this);
			}
		}
	}
	/**
	 * User notification of invalid form
	 */
	var _shakeButton = function(btn) {
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
	 * validates form
	 */
	var _validate = function($form) {
		var allValid = true;
		$form.find('.input-field.text-field').each(function() {
			if (!$(this).hasClass('filled')) {
				_invalid($(this), 'Required');
				allValid = false;
			} else {
				_valid($(this));
			}
		});
		$form.find('.input-field input[name=zipcode]').each(function() {
			var length = $(this).val().length;
			if (length === 0) {
				_invalid($(this), 'Required');
				allValid = false;
			} else if (length !== 5) {
				_invalid($(this), 'Invalid postal code');
				allValid = false;
			}
		});
		$form.find('.input-field input[name=phonenumber]').each(function() {
			var $input = $(this);
			var length = $input.val().length;
			if (length == 10 || length == 11) _valid($input);
			else {
				allValid = false;
				if (length == 7) _invalid($input, 'Please include your area code');
				else if (length == 0) _invalid($input, 'Required');
				else _invalid($input, 'Invalid phone number');
			}
		});
		var $emailInput = $form.find('.input-field input[name=email]');
		if ($emailInput.val().length == 0) {
			_invalid($emailInput, 'Required');
			allValid = false;
		} else if (!_validateEmail($emailInput.val())) {
			_invalid($emailInput, 'Invalid email address');
			allValid = false;
		} else {
			_valid($emailInput);
		}
		var $birthdayInput = $form.find('.birthday input[name=birthday]');
		var date = $birthdayInput.val();
		if(date.length == 0){
			_invalid($birthdayInput, 'Required');
			allValid = false;
		} else{
			var year = parseInt(date.split('-')[0]);
			var age = new Date().getFullYear() - year;
			if(age > 100 || age < 12){
				_invalid($birthdayInput, 'Invalid Date');
				allValid = false;
			} else{
				_valid($birthdayInput);
			}
		}
		return allValid;
	}
	/**
	 * Displays error message under invalid field
	 */
	var _invalid = function(...args) {
		$elem = $(args[0]);
		$elem.closest('.input-field').addClass('invalid');
		if (args[1]) $elem.next('span').text(args[1]);
	}
	/**
	 * Removes error message under fields
	 */
	var _valid = function($elem) {
		$elem.closest('.input-field').removeClass('invalid');
	}
	/**
	 * validate email address
	 */
	var _validateEmail = function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	/**
	 * Does ajax to send form. Uses OUcampus's form infrastructure by POSTing a string
	 * identical to what an actual instance of the "More Info" form would POST
	 * to their forms.php.
	 */
	var _send = function($form) {
		var $btn = $form.find('.submit');
		var programTitle = $form.closest('figure').find('figcaption .degree-name').text();
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
				_showDownload();
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
	var _showDownload = function() {
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
		if(_isURL(sheetURL)){
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
	var _isURL = function(str){
		if(typeof str === 'string'){
			if(str.indexOf('http') >= 0) return true;
		}
		return false;
	}
	/**
	 * set events for form
	 */
	var _setEvents = function(){
		console.log('setting');
		var $lightbox = $('.lightbox');
		// submit form by clicking submit
		$lightbox.find('.submit').click(_submit);
		// change select field by clicking it
		$lightbox.find('.select-field').click(_selectUpdate);
		// ignore some lame keystrokes in number fields
		$lightbox.find('input[type=number]').keydown(_checkInput);
		// close form by clicking off form or close icon
		$lightbox.find('.more-info, em.close-form, .cover').click(close);
		// Stop click even propogating to lightbox to prevent closing modal
		$lightbox.find('form').click(function(e) {
			return false;
		});

		$lightbox.find('.select-field').focus(function() {
			$(this).children('.select-list').focus();
		});

		var textInputs = $lightbox.find('.more-info input[type=text], .more-info input[type=number]');
		var inputs = $lightbox.find('.more-info input, .more-info .select-list, .more-info .checkbox-field>label');
		var selectLists = $lightbox.find('.select-list');
		var selectListItems = selectLists.children('div');

		// submit form by pressing enter on submit button
		$lightbox.find('.submit').keydown(function(e) {
			_enterClick.call($(this).children('input'), e);
		});

		// open select list by clicking it
		selectLists.click(function(e) {
			$(this).parent().toggleClass('open');
		});
		// select select list item by clicking it
		selectListItems.click(function() {
			if (!$(this).hasClass('selected')) {
				$(this).siblings('.selected').removeClass('selected');
				$(this).addClass('selected');
			}
		});
		// navigate select list with keys
		selectLists.keydown(_selectListKeyHandle);
		// add focused class to div if input is focused on
		inputs.focus(function() {
			$(this).parent().closest('div').addClass('focused');
		});
		// remove focused and open classes from div when input isn't focused on
		inputs.focusout(function() {
			$(this).parent().removeClass('focused');
			$(this).parent().removeClass('open');
		});
		// check whether textbox has content when it's value changes
		textInputs.change(function() {
			if ($(this).val() === '') $(this).parent('.text-field').removeClass('filled');
			else $(this).parent('.text-field').addClass('filled');
		});
	}

	// Public
	var open = function(){
		var $lightbox = $('.lightbox');
		var $moreInfo = $('.more-info');
		$moreInfo.clone().appendTo($lightbox.find('figure'));
		$moreInfo = $lightbox.find('figure .more-info');
		$lightbox.find('.img-container, figcaption').append('<div class="cover"></div>');
		$lightbox.find('.cover').fadeTo(300, 0.3);
		$lightbox.animate({scrollTop: 0}, 300);
		$moreInfo.fadeIn(300, _setEvents);
		$moreInfo.find('.form-container').animate({
			left: '0'
		}, 300);
	}

	var close = function(){
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

	return{
		open: open,
		close: close
	}
})();

var video = (function(){
	// Public
	var open = function(){
		var $lightbox = $('.lightbox');
		var $vidWindow = $('#grid-gallery>.apply-now');
		$vidWindow.clone().appendTo($lightbox);
		$lightbox.find('.apply-now').fadeIn(500);
	}

	return {
		open: open
	};
})();

/**
 * Adds sharpen function to animate blur radius to 0
 */
jQuery.fn.extend({
 sharpen: function(duration){
	 var $elem = $(this);
	 $({blurRadius: 20}).animate({blurRadius: 0}, {
		 duration: duration,
		 easing: 'swing', // or "linear"
		 // use jQuery UI or Easing plugin for more options
		 complete: function(){
			 $elem.css({
				 "-webkit-filter": "blur(0px)",
				 "filter": "blur(0px)"
			 });
		 },
		 step: function(now) {
			 $elem.css({
				 "-webkit-filter": "blur("+now+"px)",
				 "filter": "blur("+now+"px)"
			 });
		 }
	 });
 }
});

/**
 * Defines cubic easeing function
 */
$.easing.easeInOutCubic = function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
}
