lbe.Website = function(targetElementCssPath, dataUrl) {
  var website = this;
  website.targetElement = $(targetElementCssPath);
  website.pages = {
    'error': new lbe.Page({
      'title': 'Oops! It looks like something went wrong...'
    }),
    'lesson': new lbe.LessonPage({
      'instructions': 'Pick an answer.  If you have no idea, simply guess. ' +
                      'You will find out whether your guess was correct.'
    }),
    'menu': new lbe.MenuPage({
      'title': 'What do you want to do?'
    })
  };
  this.listenForEvents();
  this.retrieveData(dataUrl, function(lessonsData) {
    website.lessonsData = lessonsData;
    website.showPage(website.pages.menu, lessonsData);
  });
};

lbe.Website.prototype.listenForEvents = function() {
  var website = this;
  this.targetElement.on('lesson:select', function(event, lessonCode) {
    website.showLesson(lessonCode);
  });
};

lbe.Website.prototype.retrieveData = function(dataUrl, callback) {
  var website = this;
  $.getJSON(dataUrl, function(lessonsData) {
    callback(lessonsData);
  }).error(function(error) {
    website.showError(error);
  });
};

lbe.Website.prototype.showError = function(errorMessage) {
  this.pages.error.showText(errorMessage);
  this.showPage(this.pages.error);
};

lbe.Website.prototype.showLesson = function(lessonCode) {
  this.showPage(this.pages.lesson, this.lessonsData[lessonCode]);
};

lbe.Website.prototype.showPage = function(page, dataForPage) {
  this.targetElement.empty();
  this.targetElement.append(page.getAsElement(dataForPage));
};
