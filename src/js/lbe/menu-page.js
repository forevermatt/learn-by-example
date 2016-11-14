lbe.MenuPage = function(options) {
  this.initializePage(options);
};
lbe.MenuPage.prototype = Object.create(lbe.Page.prototype);

lbe.MenuPage.prototype.getContentAsElement = function(lessonsData) {
  var lessonsList = $('<div/>', {
    'class': 'list-group'
  });

  var item;
  $.each(lessonsData, function(lessonCode, lessonData) {
    item = $('<a/>', {
      'href': 'javascript:void(0)',
      'class': 'list-group-item',
      'data-code': lessonCode
    });
    item.click(function(clickEvent) {
      item.trigger('lesson:select', [clickEvent.target.dataset.code]);
    });
    item.text(lessonData.name);
    item.appendTo(lessonsList);
  });
  
  return lessonsList;
};

lbe.MenuPage.prototype.hasInstructions = function() {
  return !!this.instructions;
};
