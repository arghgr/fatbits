var bw = false;
var boxSize = 40;

var rainbowNum = 0;
var rainbow = [
  "red", // red
  "#FF8C00", // darkorange
  "yellow", // yellow
  "green", // green
  "blue", // blue
  "#4B0082", // indigo
  "#800080" // purple
];

randomColor = function() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = "rgb(" + r + "," + g + "," + b + ")";
  // console.log(rgb);
  return rgb;
};

cycleRainbow = function() {
  // console.log("rainbowNum: " + rainbowNum);
  if (rainbowNum < rainbow.length) {
    var color = rainbow[rainbowNum];
    // console.log("color: " + rainbow[rainbowNum]);
    rainbowNum += 1;
    return color;
  } else {
    rainbowNum = 1;
    // console.log("color: " + rainbow[0]);
    return rainbow[0];
  }
};

var animateColors = function(elem) {
  var animation = function() {
    var color = cycleRainbow();
    elem.animate({ backgroundColor: color }, 500, animation);
  }
  animation();
}

var fillBox = function(e){
  var elem = getElem(e);
  if (!elem.hasClass(boxesClass)) {
    if (filled) {
      elem.stop(false);
      elem.css({ 'background-color': clearColor });
    } else {
      if (!elem.is(':animated')) {
        animateColors(elem);
      }
    }
  }
}
