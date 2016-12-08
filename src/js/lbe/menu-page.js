lbe.MenuPage = function(options) {
  this.initializePage(options);
};
lbe.MenuPage.prototype = Object.create(lbe.Page.prototype);

lbe.MenuPage.prototype.getContentAsElement = function(lessonsData) {
  var lessonsList = $('<div/>', {
    'class': 'text-center'
  });

  var item;
  $.each(lessonsData, function(lessonCode, lessonData) {
    item = $('<a/>', {
      'href': 'javascript:void(0)',
      'class': 'btn btn-default',
      'data-code': lessonCode
    });
    item.click(function(clickEvent) {
      item.trigger('lesson:select', [clickEvent.target.dataset.code]);
    });
    item.text(lessonData.name);
    lessonsList.append(
      $('<span/>', {
        'class': 'menu-item'
      }).append(item)
    );
  });
  
  return lessonsList;
};

lbe.MenuPage.prototype.hasInstructions = function() {
  return !!this.instructions;
};
