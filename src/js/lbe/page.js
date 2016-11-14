lbe.Page = function(options) {
  this.initializePage(options);
};

lbe.Page.prototype.initializePage = function(options) {
  var options = options || {};
  this.title = options.title;
  this.instructions = options.instructions;
};

lbe.Page.prototype.getAsElement = function(dataForPage) {
  var pageElement = $('<div/>');
  if (this.hasTitle(dataForPage)) {
    pageElement.append(this.getTitleAsElement(dataForPage));
  }
  if (this.hasInstructions(dataForPage)) {
    pageElement.append($('' +
      '<div class="alert alert-info" role="alert">' +
        '<b>Instructions:</b> ' + this.getInstructionsAsElement(dataForPage) +
      '</div>'
    ));
  }
  pageElement.append(this.getContentAsElement(dataForPage));
  return pageElement;
};

lbe.Page.prototype.getContentAsElement = function() {
  return $('<div class="inline-block text-left" id="content"></div>').text(text);
};

lbe.Page.prototype.getInstructionsAsElement = function() {
  return $('<span id="instructions"/>').text(this.instructions);
};

lbe.Page.prototype.getTitleAsElement = function() {
  return $('<h2 id="title"></h2>').text(this.title);
};

lbe.Page.prototype.hasInstructions = function() {
  return !!this.instructions;
};

lbe.Page.prototype.hasTitle = function() {
  return !!this.title;
};

