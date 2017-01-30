// Set up global namespace.
lbe = {};

lbe.init = function(targetElementCssPath, dataUrl, titleElementCssPath) {
  var website = new lbe.Website(targetElementCssPath, dataUrl);
  $(titleElementCssPath).click(function() {
    website.exitLesson();
  }).attr('title', 'Go back to the menu');
};
