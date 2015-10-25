var bw = false;

if (window.devicePixelRatio > 1) {
  boxSize = 80;
} else {
  boxSize = 40;
}

var rainbow = [
  "#FF0000", // red
  "#FF8C00", // darkorange
  "#FFFF00", // yellow
  "#008000", // green
  "#0000FF", // blue
  "#4B0082", // indigo
  "#800080" // purple
];

var randomColor = function() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = "rgb(" + r + "," + g + "," + b + ")";
  return rgb;
};

var animateColors = function(elem) {
  var rainbowNum = -1;
  var color;
  var animation = function() {
    if (rainbowNum < rainbow.length) {
      rainbowNum += 1;
    } else {
      rainbowNum = 0;
    }
    color = rainbow[rainbowNum];
    elem.animate({ backgroundColor: color }, {
      duration: 500,
      complete: animation
    });
  }
  animation();
}

var fillBox = function(e){
  var elem = getElem(e);
  if (elem.hasClass(boxClass) && !elem.hasClass(boxesClass)) {
    if (filled) {
      elem.stop();
      elem.css({ 'background-color': clearColor });
    } else {
      if (!elem.is(':animated')) {
        animateColors(elem);
      }
    }
  }
}
