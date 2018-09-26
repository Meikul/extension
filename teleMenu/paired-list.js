(function ($) {
  $(document).ready(_init);

  /**
   * Private function
   * Initializes paired lists on the page.
   */
  function _init() {
    let $linksList = $('.paired-list-links');
    let $links = $linksList.children();
    $links.on('mouseenter', _switchLink);
    // Show default active link if specified. If it's not, show first link.
    let $active = $linksList.find('.active');
    if($active.length) _showLink.call($active);
    else {
      let $firstLink = $links.first();
      _showLink.call($firstLink);
    }
    $('body').on('click', '.teleMenu .dropdown-menu', function (e) {
      e.stopPropagation();
    })
  }

  /**
   * Private function
   * Handles the logic for link switching. To switch links, you have to keep
   * the cursor in one link for an amount of time.
   */
  function _switchLink() {
    
  }

  /**
   * Private function
   * Shows content associated with link in "this".
   */
  function _showLink() {
    let $link = $(this);
    // Find and show the ".paired-list-content" div identified by the
    // selector in the "data-content" attribute of this link.
    let $parentList = $link.closest('.paired-list');
    const contentSelector = $link.attr('data-content');
    let $currentActiveLink = $parentList.find('.paired-list-links .active');
    let $currentActiveContent = $parentList.find('.shown');
    let $pairedContent = $parentList.find('.paired-list-content'+contentSelector);
    $currentActiveLink.removeClass('active');
    $currentActiveContent.removeClass('shown');
    $pairedContent.addClass('shown');
    $link.addClass('active');
  }
})(jQuery);