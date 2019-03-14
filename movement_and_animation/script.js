var goRight=false;
var goLeft=false;
var goUp=false;
var goDown=false;
document.addEventListener('keydown', keyPressed, false);
document.addEventListener('keyup', keyUnpressed, false);
//Width and height for our canvas
var canvasWidth = 96;
var canvasHeight = 96;
//Getting the canvas
var canvas = document.getElementById('canvas');
//setting width and height of the canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//Establishing a context to the canvas
var context = canvas.getContext("2d");
//Creating an Image object for our character
var maincharacter = new Image();
//Setting the source to the image file
maincharacter.src = "playersprite.png";

function sprite(options){

  var that = {};

  // values for this case
  //that.context=options.context
  that.x=options.x;
  that.y=options.y;
  that.srcX=options.srcX;
  that.srcY=options.srcY;
  that.lastX=options.lastX;
  that.lastY=options.lastY;
  that.width=options.width;
  that.height=options.height;
  that.image=options.image;
  that.frameCount=options.frameCount;
  that.curFrame=options.curFrame;

  that.show=function()
  {
      context.drawImage(that.image,that.srcX, that.srcY,that.width,that.height,that.x,that.y,that.width,that.height);
  }

  that.update=function(){
   //Updating the frame index
   that.curFrame = ++that.curFrame % that.frameCount;

   //Calculating the x coordinate for spritesheet
   that.srcX = that.curFrame * that.width;
  		context.clearRect(that.lastX,that.lastY,that.width,that.height);
  }

  return that;
}

var player = sprite({
  //context: canvas.getContext("2d"),
  x: 30,
  y: 30,
  srcX:0,
  srcY: 0,
  lastX:0,
  lastY:0,
  width: 32,
  height: 32,
  image: maincharacter,
  frameCount: 3,
  curFrame: 0
})



function draw(){
 //Updating the frame
player.update();
 //Drawing the image
 player.show();
 //set lastx and lasty
 player.lastX = player.x;
 player.lastY = player.y;
 //moves the maincharacter
if(goRight){
		 ///character.x += 5;
		 player.x+=5;
 }
else if(goLeft) {
	 //character.x -= 5;
	 player.x-=5;
 }
if(goUp) {
	 //character.y -= 5;
	 player.y-=5;
 }
else if(goDown) {
	 //character.y += 5;
	 player.y+=5;
 }
 console.log("draw loop");
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

setInterval(draw,200);
