lbe.LessonPage = function(options) {
  this.initializePage(options);
};
lbe.LessonPage.prototype = Object.create(lbe.Page.prototype);

lbe.LessonPage.prototype.addExampleToList = function(lessonData, example, targetIndex) {
  lessonData.examples.splice(targetIndex, 0, example);
};

lbe.LessonPage.prototype.adjustDelayForCurrentExample = function(lessonData, gotItRight) {
  var example = lessonData.examples[0];
  if (example.nextDelay === undefined) {
    example.prevDelay = 0;
    example.nextDelay = 1;
  }
  
  this.moveCurrentExample(lessonData, example.nextDelay)
  if (gotItRight) {
    // Get next pair of numbers in Fibonacci sequence.
    example.prevDelay = example.nextDelay;
    example.nextDelay = Math.ceil(example.nextDelay * 1.33);
    
    // Add some unpredictability.
    example.nextDelay += Math.round(Math.random() * 0.5);
  }
};

lbe.LessonPage.prototype.getContentAsElement = function(lessonData) {
  if ( ! this.alreadyRandomized) {
    this.randomizeExamples(lessonData);
    this.alreadyRandomized = true;
  }
  
  if (this.numExamplesAttempted === undefined) {
    this.numExamplesAttempted = 0;
  } else {
    this.numExamplesAttempted++;
  }
  
  if (this.numExamplesAttempted >= 50) {
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
  var example = lessonData.examples[0];
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
        lessonPage.adjustDelayForCurrentExample(lessonData, true);
      } else {
        lessonElement.append(wrongResponseElement);
        lessonPage.adjustDelayForCurrentExample(lessonData, false);
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

lbe.LessonPage.prototype.moveCurrentExample = function(lessonData, delay) {
  var currentExample = lessonData.examples[0];
  this.removeCurrentExampleFromList(lessonData);
  this.addExampleToList(lessonData, currentExample, delay);
};

/**
 * Randomize lesson examples array in-place using Durstenfeld shuffle algorithm.
 * Adapted from http://stackoverflow.com/a/12646864/3813891
 */
lbe.LessonPage.prototype.randomizeExamples = function(lessonData) {
  for (var i = lessonData.examples.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    this.swapExamples(lessonData, i, j);
  }

  // Check for duplicates (two of the same thing in a row).
  var lastIndex = lessonData.examples.length - 1;
  for (var k = lastIndex - 1; k > 0; k--) {
    if (lessonData.examples[k][0] === lessonData.examples[k + 1][0]) {
      
      /* If we found a duplicate, move one of them to the end of the list of
       * examples.  */
      this.swapExamples(lessonData, lastIndex, k);
    }
  }
};

lbe.LessonPage.prototype.removeCurrentExampleFromList = function(lessonData) {
  lessonData.examples.splice(0, 1);
};

lbe.LessonPage.prototype.reset = function() {
  delete this.alreadyRandomized;
  delete this.numExamplesAttempted;
};

lbe.LessonPage.prototype.getTitleText = function(lessonData) {
  return lessonData.question;
};

lbe.LessonPage.prototype.hasTitle = function(lessonData) {
  return !!lessonData.question;
};

lbe.LessonPage.prototype.swapExamples = function(lessonData, indexA, indexB) {
    var temp = lessonData.examples[indexA];
    lessonData.examples[indexA] = lessonData.examples[indexB];
    lessonData.examples[indexB] = temp;
};
