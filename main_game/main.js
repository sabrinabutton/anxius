//directional variables
var goRight=false;
var goLeft=false;
var goUp=false;
var goDown=false;
//var for whether or not character is moving
var moving = false;
//collision variables
var leftcollision = false;
var rightcollision = false;
var upcollision = false;
var downcollision = false;
//tell computer what keydown and keyup mean
document.addEventListener('keydown', keyPressed, false);
document.addEventListener('keyup', keyUnpressed, false);
//players wheravouts in game
var playerlocationfunc = level1;
var playerlocationstr = "level1";

//create canvas
//Width and height for our canvas
var canvasWidth = 420;
var canvasHeight = 420;
//Getting the canvas 1st layer
var layer1 = document.getElementById('layer2');
//setting width and height of the canvas
layer1.width = canvasWidth;
layer1.height = canvasHeight;
//Establishing a context to the canvas
var l1ctx = layer1.getContext("2d");
//Getting the canvas 2nd layer
var layer2 = document.getElementById('layer2');
//setting width and height of the canvas
layer2.width = canvasWidth;
layer2.height = canvasHeight;
//Establishing a context to the canvas
var l2ctx = layer2.getContext("2d");

//importing graphics
var maincharacterImage = new Image();
maincharacterImage.src = "playersprite.png";

//set background function
function background(){
  document.body.style.backgroundImage = "url('backgroundimage.png')";
}

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
      l1ctx.drawImage(that.image,that.srcX, that.srcY,that.sheetwidth,that.sheetheight,that.x,that.y,that.sizewidth,that.sizeheight);
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
       l1ctx.clearRect(that.lastX,that.lastY,that.sizewidth,that.sizeheight);
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
  sizewidth: 32,
  sizeheight: 32,
  image: maincharacterImage,
  frameCount: 3,
  curFrame: 0
})


//declare obstacle
function obstacle(options){

  var that = {};

  that.noOfVals = options.noOfVals;
  that.xvalues = options.xvalues;
  that.yvalues = options.yvalues;

  that.build = function(){
  l2ctx.fillStyle = "#eae3f9";
  l2ctx.fillRect(that.xvalues[0], that.yvalues[0], 20, 420);
  l2ctx.fillRect(that.xvalues[1], that.yvalues[1], 420, 20);
    l2ctx.fillRect(that.xvalues[2], that.yvalues[2], 20, 420);
    l2ctx.fillRect(that.xvalues[3], that.yvalues[3], 420, 20);
    }

    return that;
}

var level1wall = obstacle({
  noOfVals: 3,
  xvalues: [1, 1, 400, 1],
  yvalues: [1, 1, 1, 400]
})

//declare door
function door(options){
  var that = {};

  return that;
}

function chest(options){
  var that = {};

  return that;
}

//general movement FUNCTION
function movementUpdate(){
  //set lastx and lasty before moving
  player.lastX = player.x;
  player.lastY = player.y;
  //moves the maincharacter
    if(goRight && !rightcollision){
    		 ///character.x += 5;
    		 player.x+=5;
     }
    else if(goLeft && !leftcollision) {
    	 //character.x -= 5;
    	 player.x-=5;
     }
   if(goUp && !upcollision) {
   	 //character.y -= 5;
   	 player.y-=5;
    }
   else if(goDown && !downcollision) {
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

//general collisions FUNCTION
function collisionsUpdate(){
  var currentwall = playerlocationstr + "wall";
  console.log(currentwall);

  //check for each x and y value of currentwall
  for(var i=0;i<=currentwall.noOfVals;i++){
    //set collisions
    if (currentwall.xvalues.includes(player.x+20)){
      rightcollision = true;
    }
    else{
      rightcollision = false;
    }
    if(currentwall.x==player.x-20){
      leftcollision = true;
    }
     else{
       leftcollision = false;
     }
     if (currentwall.y==player.y+20){
       downcollision = true;
     }
     else{
       downcollision = false;
     }
     if(currentwall.y==player.y-20){
       upcollision = true;
     }
     else{
       upcollision = false;
     }
  }
}

//function for level 1
function level1(){
  //set background
  background();
 //Updating the frame
 player.update();
 //Drawing the player
 player.show();
 //draw the wall
 level1wall.build();
 //update movement
 movementUpdate();
 //update collisions
 collisionsUpdate();

}

//function for level 2
function level2(){

}

//function for level 3
function level3(){

}

//gameloop
function gameLoop(){
    //do level player is currently on
    playerlocationfunc();
}


  //(for movement) if player is not vertically colliding, CAN vertically move, same apps. for horizontally

//set for gameLoop to only occur every 200ms
setInterval(gameLoop,100);
