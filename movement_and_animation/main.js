//directional variables
var goRight=false;
var goLeft=false;
var goUp=false;
var goDown=false;
//var for whether or not character is moving
var moving = false;
//tell computer what keydown and keyup mean
document.addEventListener('keydown', keyPressed, false);
document.addEventListener('keyup', keyUnpressed, false);


//create canvas
//Width and height for our canvas
var canvasWidth = 420;
var canvasHeight = 420;
//Getting the canvas
var canvas = document.getElementById('canvas');
//setting width and height of the canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//Establishing a context to the canvas
var context = canvas.getContext("2d");
function background(){
  document.body.style.background = "backgroundimage.png";
}


//importing graphics
var maincharacterImage = new Image();
maincharacterImage.src = "playersprite.png";

//declare sprite
function sprite(options){
  var that = {};

  // values for this case
  that.x=options.x;
  that.y=options.y;
  that.srcX=options.srcX;
  that.srcY=options.srcY;
  that.lastX=options.lastX;
  that.lastY=options.lastY;
  that.sheetwidth=options.sheetwidth;
  that.sheetheight=options.sheetheight;
  that.sizewidth=options.sizewidth;
  that.sizeheight=options.sizeheight;
  that.image=options.image;
  that.frameCount=options.frameCount;
  that.curFrame=options.curFrame;

  //SHOW FUNCTION
  that.show=function()
  {
    //draw image
      context.drawImage(that.image,that.srcX, that.srcY,that.sheetwidth,that.sheetheight,that.x,that.y,that.sizewidth,that.sizeheight);
  }

  //UPDATE FUNCTION
  that.update=function(){
  //player moving frame updates
    if(moving){
      //Updating the frame index
      that.curFrame = ++that.curFrame % that.frameCount;
    }
    //if not moving current frame is 0
    else {
      //set current frame to 0
        that.curFrame = 0;

    }
    //Calculating the x coordinate for spritesheet
    that.srcX = that.curFrame * that.sheetwidth;
    //clear
       context.clearRect(that.lastX,that.lastY,that.sizewidth,that.sizeheight);
  }

  return that;
}

//create a sprite for the player
var player = sprite({
  //context: canvas.getContext("2d"),
  x: 30,
  y: 30,
  srcX:0,
  srcY: 0,
  lastX:0,
  lastY:0,
  sheetwidth: 32,
  sheetheight: 32,
  sizewidth: 96,
  sizeheight: 96,
  image: maincharacterImage,
  frameCount: 3,
  curFrame: 0
})

//declare obstacle
function obstacle (x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height  =  height;


  this.show = function(){
    fill(0);
      rect(this.x, this.y, this.width, this.height);
    }
}

//create a platform (walls)

//gameloop
function draw(){
  //set background
  background();
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
}

//for when the arrow keys are pressed
function keyPressed(event){
	if (event.keyCode == '39')
	{
		goRight=true;
      moving = true;
	}
	else if (event.keyCode == '37')
	{
		goLeft= true;
      moving = true;
	}
	if (event.keyCode == '40')
	{
		goDown= true;
      moving = true;
	}
	else if (event.keyCode == '38')
	{
		goUp= true;
      moving = true;
	}

}
//for when the keys are let go
function keyUnpressed(event){
	if (event.keyCode == '39')
	{
		goRight=false;
    moving = false;
	}
	else if (event.keyCode == '37')
	{
		goLeft= false;
    moving = false;
	}
	if (event. keyCode == '40')
	{
		goDown= false;
    moving = false;
	}
	else if (event. keyCode == '38')
	{
		goUp= false;
    moving = false;
	}

}
  //(for movement) if player is not vertically colliding, CAN vertically move, same apps. for horizontally

//set for gameLoop to only occur every 100ms
setInterval(draw,100);
