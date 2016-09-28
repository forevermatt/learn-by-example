lbe.LearnByExample = function() {
  this.contentElement = $('#content');
  var learnByExample = this;
  this.getLessonsData(function(error, data) {
    learnByExample.lessonsData = data;
    learnByExample.showLessonsList(data);
  });
};

lbe.LearnByExample.prototype.getLessonData = function(lessonCode) {
  for (var i = 0; i < this.lessonsData.length; i++) {
    if (this.lessonsData[i].code === lessonCode) {
      return this.lessonsData[i];
    }
  }
  return null;
};

lbe.LearnByExample.prototype.getLessonsData = function(callback) {
  $.getJSON('data/lessons.json', function(lessonsData) {
    callback(null, lessonsData);
  });
};

lbe.LearnByExample.prototype.setContent = function(content) {
  var contentElement = $('#content');
  contentElement.empty();
  contentElement.append(content);
};

lbe.LearnByExample.prototype.showLesson = function(lessonCode) {
  var lessonData = this.getLessonData(lessonCode);
  
  console.log(lessonData); // TEMP
  
};

lbe.LearnByExample.prototype.showLessonsList = function(lessonsData) {
  var lessonsList = $('<div/>', {
    'class': 'list-group'
  });

  var learnByExample = this;
  var item;
  $.each(lessonsData, function(index, lessonData) {
    item = $('<a/>', {
      'href': 'javascript:void(0)',
      'class': 'list-group-item',
      'data-code': lessonData.code
    });
    item.click(function(clickEvent) {
      learnByExample.showLesson(clickEvent.target.dataset.code);
    });
    item.text(lessonData.name);
    item.appendTo(lessonsList);
  });
  
  this.setContent(lessonsList);
};
