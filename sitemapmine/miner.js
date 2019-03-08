(function () {
  var sites = '';
  $('#sites-list li a.site-name').each(function () {
    var site = $(this);
    var siteName = site.html();
    var siteUrl = site.attr('href');
    sites += siteName + "," + "http://a.cms.omniupdate.com/10/#usu/extension/"+siteName+"/browse/staging/" + "\n";
  })  
  return sites;
})();
