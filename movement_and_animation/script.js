var goRight=false;
var goLeft=false;
var goUp=false;
var goDown=false;
document.addEventListener('keydown', keyPressed, false);
document.addEventListener('keyup', keyUnpressed, false);
//Width and height for our canvas
var canvasWidth = 96;
var canvasHeight = 96;
//the with and height of our spritesheet
var spriteWidth = 32;
var spriteHeight = 32;
//we are having two rows and 8 cols in the current sprite sheet
var cols = 3;
//The 0th (first) row is for the right movement
var trackRight = 0;
//1st (second) row for the left movement (counting the index from 0)
var trackLeft = 1;
//To get the width of a single sprite we divided the width of sprite with the number of cols
//because all the sprites are of equal width and height
var width = spriteWidth;
//Same for the height we divided the height with number of rows
var height = spriteHeight;
//Each row contains 8 frame and at start we will display the first frame (assuming the index from 0)
var curFrame = 0;
//The total frame is 8
var frameCount = 3;
//x and y coordinates to render the sprite
var x=0;
var y=0;
//x and y coordinates of the canvas to get the single frame
var srcX=0;
var srcY=0;
//x and y coordinates of characters prev. pos to be cleared
var lastX;
var lastY;

//Getting the canvas
var canvas = document.getElementById('canvas');
//setting width and height of the canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//Establishing a context to the canvas
var ctx = canvas.getContext("2d");
//Creating an Image object for our character
var character = new Image();

//Setting the source to the image file
character.src = "playersprite.png";

function updateFrame(){
 //Updating the frame index
 curFrame = ++curFrame % frameCount;

 //Calculating the x coordinate for spritesheet
 srcX = curFrame * width;

		ctx.clearRect(lastX,lastY,width,height);
}

function draw(){
 //Updating the frame
 updateFrame();
 //Drawing the image
 ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
 //set lastx and lasty
 lastX = x;
 lastY = y;
 //moves the maincharacter
if(goRight){
		 ///character.x += 5;
		 x+=5;
 }
else if(goLeft) {
	 //character.x -= 5;
	 x-=5;
 }
if(goUp) {
	 //character.y -= 5;
	 y-=5;
 }
else if(goDown) {
	 //character.y += 5;
	 y+=5;
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

setInterval(draw,200);
