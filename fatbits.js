
var makeGrid = function(gridSize) {
  var numBox = Math.pow(gridSize, 2);
  var borderWidth = 1;
  var boxesWidth = $('.fr-boxes').width();
  var boxSize = ((boxesWidth / gridSize) - (borderWidth * 2)) + 'px';

  console.log('gridSize: ' + gridSize);
  console.log('numBox: ' + numBox);
  console.log('boxSize: ' + boxSize);

  for(var i = 0; i < numBox; i++) {
    $('<div/>', { class: 'fr-box' }).appendTo('.fr-boxes');
  }

  $('.fr-box').css({
    'border': borderWidth + 'px solid #FFFFFF',
    'width': boxSize,
    'height': boxSize
  });

}


var setupDraw = function() {
  var drawing = false;
  var white = 'rgb(255, 255, 255)';
  var black = 'rgb(0, 0, 0)';
  var getElem = function(e) {
    var relX = e.pageX - window.pageXOffset;
    var relY = e.pageY - window.pageYOffset;
    var elem = $(document.elementFromPoint(relX, relY));
    return elem;
  }
  var fillBox = function(e) {
    var elem = getElem(e);
    if (!elem.hasClass('fr-boxes')) {
      if (elem.css('background-color') == white) {
        elem.css({
          'background-color': black
        });
      } else if (elem.css('background-color') == black) {
        elem.css({
          'background-color': white
        });
      }
    }
  }

  $('.fr-boxes').mousedown(function(e) {
    drawing = true;
    var downElem = getElem(e);
    $(this).on('mouseup', function handler(evt) {
      drawing = false;
      var upElem = getElem(evt);
      if(_.isEqual(downElem, upElem)) {
        fillBox(e);
      }
      $(this).off('mouseup', handler);
    });
  });

  $('.fr-boxes').mouseover(function(e) {
    if (drawing == true) {
      fillBox(e);
    }
  });

}

$(document).ready(function() {
  makeGrid(40);
  setupDraw();
});
