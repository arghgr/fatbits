$(document).ready(function() {
  var boxNum = 0;
  var rainbowNum = 0;
  var boxes = $(".fr-boxes");

  randomColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    // console.log(rgb);
    return rgb;
  };
  cycleRainbow = function() {
    var rainbow = ["red","darkorange","yellow","green","blue","indigo"];
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

  addBox = function(x, y) {
    boxNum++;
    var boxName = "fr-box-" + boxNum;
    $('.fr-boxes').append('<div class="fr-box ' + boxName + '"></div>');
    console.log('appended ' + boxName);
    $("." + boxName)
      .draggable({
        cursor: "move",
        containment: "parent",
        snap: true,
        snapTolerance: 8,
        grid: [ 8,8 ],
        opacity: 0.7,
        drag: function() {
          console.log('draggin');
        }
      })
      .css({
        'left': x,
        'top': y,
        'background-color': cycleRainbow()
      });
  };

  removeBox = function() {

  }

  $('.fr-boxes').on('click', function(e) {
    console.log(e);
    var xCoord = e.pageX;
    var yCoord = e.pageY;
    var parentOffset = $(this).parent().offset();
    var relX = xCoord - parentOffset.left;
    var relY = yCoord - parentOffset.top;
    var elem = $(document.elementFromPoint(xCoord, yCoord));
    console.log(elem);
    if (elem.hasClass('fr-box')) {
      elem.remove();
      console.log('removed ' + elem);
    } else {
      addBox(relX, relY);
    }
  });
});
