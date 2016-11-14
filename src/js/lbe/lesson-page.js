lbe.LessonPage = function(options) {
  this.initializePage(options);
};
lbe.LessonPage.prototype = Object.create(lbe.Page.prototype);

lbe.LessonPage.prototype.getContentAsElement = function(lessonData) {
  if (this.exampleIndex === undefined) {
    this.exampleIndex = 0;
  } else {
    this.exampleIndex++;
  }
  
  if (this.exampleIndex >= lessonData.examples.length) {
    var messageElement = $('<p/>').text(
      'Congratulations! You finished this lesson.'
    ).append(
      '<br />',
      $('<a/>', {
        'href': 'javascript:void(0)',
        'class': 'btn btn-default'
      }).text(
        'Go back to the menu'
      ).click(function() {
        messageElement.trigger('lesson:complete');
      })
    );
    return messageElement;
  }
  
  var lessonPage = this;
  var example = lessonData.examples[this.exampleIndex];
  var lessonElement = $('<div/>');
  var optionsElements = $('<div id="option-buttons" class="row"></div>');
  var correctResponseElement = $('<div role="alert" class="alert alert-success">Correct</div>');
  var wrongResponseElement = $('<div role="alert" class="alert alert-danger">Wrong</div>');
  var continueElement = $('<a/>', {
    'href': 'javascript:void(0)',
    'class': 'btn btn-primary'
  }).text('Continue').click(function() {
      lessonElement.replaceWith(lessonPage.getContentAsElement(lessonData));
  });
  var optionText, optionElement;
  for (var i = 0; i < lessonData.options.length; i++) {
    optionText = lessonData.options[i];
    optionElement = $('<a/>', {
      'href': 'javascript:void(0)',
      'class': 'btn btn-default',
      'data-correct': (optionText === example[1]) ? 'true' : 'false'
    }).text(optionText);
    optionElement.click(function(clickEvent) {
      optionsElements.empty();
      if (clickEvent.target.dataset.correct === 'true') {
        lessonElement.append(correctResponseElement);
      } else {
        lessonElement.append(wrongResponseElement);
      }
      lessonElement.append(continueElement);
    });
    optionsElements.append(optionElement);
  }
  var exampleElement = $(
    '<div id="example-content" class="well well-sm">' +
      '<div class="text-left" style="display: inline-block;">' +
        $('<span/>').text(example[0]).html() +
      '</div>' +
    '</div>'
  ).append(optionsElements);
  return lessonElement.append(exampleElement, optionsElements);
};

lbe.LessonPage.prototype.reset = function() {
  delete this.exampleIndex;
};

lbe.LessonPage.prototype.getTitleText = function(lessonData) {
  return lessonData.question;
};

lbe.LessonPage.prototype.hasTitle = function(lessonData) {
  return !!lessonData.question;
};
