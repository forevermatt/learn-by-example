// Set up global namespace.
lbe = {};

lbe.init = function(targetElementCssPath, dataUrl) {
  new lbe.Website(targetElementCssPath, dataUrl);
};
