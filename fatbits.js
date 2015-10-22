var bw = true;
var borderWidth = 1;
var boxSize = 20;

var boxClass = 'f-box';
var boxesClass = 'f-boxes';
var clearColor = 'rgb(255, 255, 255)';
var fillColor = 'rgb(0, 0, 0)';

var drawing = false;
var filled = false;

var getElem = function(e) {
  var type = e.type;
  var relX;
  var relY;
  if (_.contains(type, 'mouse')) {
    relX = e.pageX - window.pageXOffset;
    relY = e.pageY - window.pageYOffset;
  } else if (_.contains(type, 'touch')) {
    if (type == 'touchend') {
      relX = e.originalEvent.changedTouches[0].pageX - window.pageXOffset;
      relY = e.originalEvent.changedTouches[0].pageY - window.pageYOffset;
    } else {
      relX = e.originalEvent.touches[0].pageX - window.pageXOffset;
      relY = e.originalEvent.touches[0].pageY - window.pageYOffset;
    }
  }
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
        'background-color': clearColor
      });
    } else {
      elem.css({
        'background-color': fillColor
      });
    }
  }
}

var setupDraw = function() {
  $('.' + boxesClass).on('touchstart mousedown', function(e) {
    e.stopPropagation();
    e.preventDefault();
    drawing = true;
    var downElem = getElem(e);
    if (downElem.css('background-color') == clearColor) {
      filled = false;
    } else {
      filled = true;
    }
    $(this).on('touchend mouseup', function handler(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      drawing = false;
      var upElem = getElem(evt);
      if(_.isEqual(downElem, upElem)) {
        fillBox(e);
      }
      $(this).off('touchend mouseup', handler);
    });
  });

  $('.' + boxesClass).on('touchmove mouseover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (drawing == true) {
      fillBox(e);
    }
  });
}

$(document).ready(function() {
  makeGrid();
  setupDraw();
});
