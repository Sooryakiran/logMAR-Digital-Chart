current_color = 0;
scale_value = 1.5;
color_string = ["570 nm", "580 nm", "590 nm", "Black & White"]
function initializer(){
  autoSize();
  randomChar();
  updateScale(scale_value);
  setColor(current_color);
}

function updateScale(val){
  document.getElementById("input_num").value = val;
  var width = getDPI()*val;
  document.getElementById("red_line").style.width = width + "px";
  scale_value = val;
  autoSize();
}


function popUp() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function getDPI(){
  var dpi_x = document.getElementById('dpi').offsetWidth;
  var dpi_y = document.getElementById('dpi').offsetHeight;
  console.log("DPI: " + dpi_x);
  return dpi_x;
}

function setColor(option){
  if(option == 0){
    // 570 nm
    document.getElementById("body_main").style.background = "rgb(225, 255, 0)";
    document.getElementById("body_main").style.color = "rgb(0, 0, 255)";
  }
  else if(option == 1){
    // 580
    document.getElementById("body_main").style.background = "rgb(255, 255, 0)";
    document.getElementById("body_main").style.color = "rgb(0, 0, 255)";
  }
  else if(option == 2){
    // 590
    document.getElementById("body_main").style.background = "rgb(255, 223, 0)";
    document.getElementById("body_main").style.color = "rgb(0, 0, 255)";
  }
  else if(option == 3){
    // Black and white
    document.getElementById("body_main").style.background = "rgb(255, 255, 255)";
    document.getElementById("body_main").style.color = "rgb(0, 0, 0)";
  }

}

function setSize(inp){
  scaled = inp*getDPI()/72*scale_value*1.4;
  document.getElementById("view").style.fontSize = scaled + "cm";
  w = document.getElementById("view").offsetWidth;
  if (w  > screen.width){
      console.log(document.getElementById("view").style.left);
      document.getElementById("view").style.left = screen.width*0.8 + "px";
  }
  else{
      document.getElementById("view").style.left = screen.width*0.5 + "px";
  }
}

var current_value = 1.0;
var max_value = 1.0;
var min_value = -0.3;

function display(){
  str = (current_value).toFixed(1);
  document.getElementById("info").innerHTML ="<br>" + str + " logMAR | "  + "Color:" + color_string[current_color] ;
}


function autoSize(){
  var distance = 4.0 * Math.pow(10, current_value);
  var h = Math.tan(5/60 * Math.PI/180) * distance * 100;
  console.log("SIZE" + distance)
  display()
  setSize(h);

}

function left(){
  current_value = current_value + 0.1;
  if(current_value > max_value){
    current_value = max_value;
  }
}

function right(){
  current_value = current_value - 0.1;
  if(current_value < min_value){
    current_value = min_value;
  }

}

function randomChar(){
  var master = "HDKCSRNSVZVOE";
  var shuffled = master.split('').sort(function(){return 0.5-Math.random()}).join('');
  var str = shuffled.slice(0,5);
  document.getElementById("view").innerHTML = str;
}

function changeColor(){
  current_color = current_color + 1;
  if(current_color > 3)current_color = 0;
  setColor(current_color)

}

document.onkeydown = function(event) {
    switch (event.keyCode) {
       case 37:
          left();
          randomChar();
          break;
       case 39:
          right();
          randomChar();
          break;
       case 32:
          // right();
          randomChar();
          break;
       case 16:
          changeColor();
          break;
    }

    autoSize();
    console.log("Current logMAR: " + current_value);
};
