var bw = true;
var borderWidth = 1;
var boxSize = 20;

var boxClass = 'f-box';
var boxesClass = 'f-boxes';
var white = 'rgb(255, 255, 255)';
var black = 'rgb(0, 0, 0)';

var drawing = false;
var filled = false;

var getElem = function(e) {
  var relX = e.pageX - window.pageXOffset;
  var relY = e.pageY - window.pageYOffset;
  var elem = $(document.elementFromPoint(relX, relY));
  return elem;
}

var makeGrid = function() {
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  var boxNumX = Math.floor(winWidth / (boxSize + (borderWidth * 2)));
  var boxNumY = Math.floor(winHeight / (boxSize + (borderWidth * 2)));
  var numBox = boxNumX * boxNumY;

  for(var i = 0; i < numBox; i++) {
    $('<div/>', { class: boxClass }).appendTo('.' + boxesClass);
  }

  $('.' + boxClass).css({
    'border': borderWidth + 'px solid #FFFFFF',
    'width': boxSize + 'px',
    'height': boxSize + 'px'
  });
}

var fillBox = function(e) {
  var elem = getElem(e);
  if (bw && !elem.hasClass(boxesClass)) {
    if (filled) {
      elem.css({
        'background-color': white
      });
    } else {
      elem.css({
        'background-color': black
      });
    }
  }
}

var setupDraw = function() {
  $('.' + boxesClass).mousedown(function(e) {
    drawing = true;
    var downElem = getElem(e);
    if (downElem.css('background-color') == white) {
      filled = false;
    } else {
      filled = true;
    }
    $(this).on('mouseup', function handler(evt) {
      drawing = false;
      var upElem = getElem(evt);
      if(_.isEqual(downElem, upElem)) {
        fillBox(e);
      }
      $(this).off('mouseup', handler);
    });
  });

  $('.' + boxesClass).mouseover(function(e) {
    if (drawing == true) {
      fillBox(e);
    }
  });
}

$(document).ready(function() {
  makeGrid();
  setupDraw();
});
