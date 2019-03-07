var img;
var goRight=false;
var goLeft=false;
var goUp=false;
var goDown=false;
document.addEventListener('keydown', keyPressed, false);
document.addEventListener('keyup', keyUnpressed, false);

function preload(){
  // load image
  img = loadImage("maincharacter.png");
}
//creates canvas
function setup() {
  createCanvas(500, 500);
}
//stores maincharacter in function
function moveman(x,y,width,height)
{
  // values for this case
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;

  this.show=function()
  {
      image(img, this.x, this.y, this.width / 1, this.height / 1);
  }
}
//assigns values to moveman
man=new moveman (250,250,100,100);
function draw() {
  background(0, 0, 0);
  textSize(50);
  textAlign(CENTER);
  text('', 300, 150);
//calls man
  man.show();
//moves the maincharacter
if(goRight)
{
          man.x += 5;
}
else if(goLeft) {
        man.x -= 5;
}
if(goUp) {
        man.y -= 5;
}
else if(goDown) {
        man.y += 5;
}
}
//for when the arrow keys are pressed
function keyPressed(event){
  if (event.keyCode == '39')
  {
    goRight=true;
  }
  else if (event.keyCode == '37')
  {
    goLeft= true;
  }
  if (event.keyCode == '40')
  {
    goDown= true;
  }
  else if (event.keyCode == '38')
  {
    goUp= true;
  }
}
//for when the keys are let go
function keyUnpressed(event){
  if (event.keyCode == '39')
  {
    goRight=false;

  }
  else if (event.keyCode == '37')
  {
    goLeft= false;

  }
  if (event. keyCode == '40')
  {
    goDown= false;

  }
  else if (event. keyCode == '38')
  {
    goUp= false;

  }
}
