
var makeGrid = function() {
  var borderWidth = 1;
  var boxSize = 20;

  var winWidth = $(window).width();
  var winHeight = $(window).height();
  var boxNumX = Math.floor(winWidth / (boxSize + (borderWidth * 2)));
  var boxNumY = Math.floor(winHeight / (boxSize + (borderWidth * 2)));
  var numBox = boxNumX * boxNumY;

  for(var i = 0; i < numBox; i++) {
    $('<div/>', { class: 'fr-box' }).appendTo('.fr-boxes');
  }

  $('.fr-box').css({
    'border': borderWidth + 'px solid #FFFFFF',
    'width': boxSize + 'px',
    'height': boxSize + 'px'
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
