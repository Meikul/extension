(function ($) {
  $(document).ready(_init);

  var context = {};

  /**
   * Private function
   * Initializes paired lists on the page.
   */
  function _init() {
    let $linksList = $('.paired-list-links');
    let $links = $linksList.children();
    $links.on('mouseenter', _showLink);
    // Show default active link if specified. If it's not, show first link.
    let $active = $linksList.find('.active');
    if($active.length) _showLink.call($active, 0);
    else {
      let $firstLink = $links.first();
      _showLink.call($firstLink, 0);
    }
  }

  /**
   * Private function
   * Shows content associated with link in "this".
   */
  function _showLink(delay) {
    let $link = $(this);
    // If link is already active, just return now.
    if($link.hasClass('active')) return;
    // Find and show the ".paired-list-content" div identified by the
    // selector in the "data-content" attribute of this link.
    let $parentList = $link.closest('.paired-list');
    const contentSelector = $link.attr('data-content');
    let $currentActiveLink = $parentList.find('.paired-list-links .active');
    let $currentActiveContent = $parentList.find('.shown');
    let $pairedContent = $parentList.find('.paired-list-content'+contentSelector);
    if(typeof delay == 'object') delay = 500;
    console.log(delay);
    if(_showLink.timeout) clearTimeout(_showLink.timeout);
    _showLink.timeout = setTimeout(() => {
      $currentActiveLink.removeClass('active');
      $currentActiveContent.removeClass('shown');
      $pairedContent.addClass('shown');
      $link.addClass('active');
    }, delay);
  }
})(jQuery);