//directional variables
var goRight=false;
var goLeft=false;
var goUp=false;
var goDown=false;
//collision variables
var leftcollision = false;
var rightcollision = false;
var upcollision = false;
var downcollision = false;
//tell computer what keydown and keyup mean
document.addEventListener('keydown', keyPressed, false);
document.addEventListener('keyup', keyUnpressed, false);
//players wheravouts in game for making strings
var playerlocationstr = "level0";

//create canvas
//Width and height for our canvas
var canvasWidth = 900;
var canvasHeight = 900;
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
//getting canvas 3rd layer
var layer3 = document.getElementById('layer3');
//setting width and height of the canvas
layer3.width = canvasWidth;
layer3.height = canvasHeight;
//Establishing a context to the canvas
var l3ctx = layer3.getContext("2d");

//importing graphics
var maincharacterImage = new Image();
maincharacterImage.src = "playersprite.png";
var demonImage = new Image();
demonImage.src = "demonsprite.png";
var doorImage = new Image();
doorImage.src = "doorsprite.png";
var keyImage = new Image();
keyImage.src = "key.png";

//matrix for each level
var level0matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

//set background function
function background(){
  document.body.style.backgroundImage = "url('backgroundimage.png')";
}

//declare sprite
function sprite(options){
  var that = {};

  // values for this case
  that.context = options.context;
  that.x=options.x;
  that.y=options.y;
  that.moving=options.moving;
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
      that.context.drawImage(that.image,that.srcX, that.srcY,that.sheetwidth,that.sheetheight,that.x,that.y,that.sizewidth,that.sizeheight);
  }

  //UPDATE FUNCTION
  that.update=function(){
  //player moving frame updates
    if(that.moving){
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
       that.context.clearRect(that.lastX,that.lastY,that.sizewidth,that.sizeheight);
  }

  return that;
}

//create a sprite for the player
var player = sprite({

  context: l3ctx,
  x: 30,
  y: 30,
  moving: false,
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

var demon = sprite({

  context: l1ctx,
  x: 70,
  y: 30,
  moving: true,
  srcX:0,
  srcY: 0,
  lastX:70,
  lastY:30,
  sheetwidth: 32,
  sheetheight: 32,
  sizewidth: 32,
  sizeheight: 32,
  image: demonImage,
  frameCount: 3,
  curFrame: 0
})

//function for demon movement
function demonAI(){

}

function buildlevel(){
  var currentmatrix = level0matrix;
  //console.log(currentmatrix);
  var xvalue = 0;
  var yvalue = 0;

  for(var i=0;i<=24;i++){
    for(var j=0;j<=24;j++){
      //if current matrix value holds a 1, signfies wall
      if (currentmatrix[i][j] == 1){
        //draw square at current i and j values size 36 by 36
        l2ctx.fillStyle = "#000000";
        l2ctx.fillRect(xvalue, yvalue, 36, 36);
      }
      //if current matrix value holds 2, signifies door
     if(currentmatrix[i][j] == 2){
        //set to matrix value x 36 to be equivalent on scale of grid
        door.x = j * 36;
        door.y = (i * 36) - 12;
        //show door
        door.show();
      }
      //if current matrix value holds 3, signifies key
      if(currentmatrix[i][j] == 3){
        key.x = j * 36;
        key.y = i * 36;
        //show door
        key.show();
      }

      xvalue+=36;
      console.log("Matrix Y = ", i, ", Matrix X = ", j, "Value = ", level0matrix[i][j])
    }
    //reset y value
    xvalue = 0;
    //add to x
    yvalue+=36;
  }

}

//declare door
function doorobject(options){
  var that = {};

  that.opened = options.opened;
  that.x = options.x;
  that.y = options.y;
  that.srcX = options.srcX;
  that.srcY = options.srcY;

  that.show = function(){
    //if door is opened
    if(that.opened == false){
          that.srcY = 0;
    }
    //if door is closed
    else if(that.opened == true){
          that.srcY = 48;
    }
    l2ctx.drawImage(doorImage,that.srcX, that.srcY,32,48,that.x,that.y,32,48);
  }
  return that;
}

var door = doorobject({

  x: 0,
  y: 0,
  opened: false,
  srcX:0,
  srcY: 0,
})



function keyobject(options){
  var that = {};

  that.x = options.x;
  that.y = options.y;

  that.show = function(){
    l2ctx.Image(keyImage, that.x, that.y, 16, 16);
  }
  return that;
}

var key = keyobject({
  x: 35,
  y: 35
})

//general movement FUNCTION
function movementUpdate(){
  //set lastx and lasty before moving
  player.lastX = player.x;
  player.lastY = player.y;
  //moves the maincharacter
    if(goRight && !rightcollision){
    		 ///character.x += 5;
    		 player.x+=10;
         //tell that player is moving
         player.moving = true;
     }
    else if(goLeft && !leftcollision) {
    	 //character.x -= 5;
    	 player.x-=10;
       player.moving = true;
     }
   if(goUp && !upcollision) {
   	 //character.y -= 5;
   	 player.y-=10;
     player.moving = true;
    }
   else if(goDown && !downcollision) {
   	 //character.y += 5;
   	 player.y+=10;
     player.moving = true;
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
    player.moving = false;
  }
  else if (event.keyCode == '37')
  {
    goLeft= false;
    player.moving = false;
  }
  if (event. keyCode == '40')
  {
    goDown= false;
    player.moving = false;
  }
  else if (event. keyCode == '38')
  {
    goUp= false;
    player.moving = false;
  }

}

//general collisions FUNCTION
function collisionsUpdate(){
    //first get player matrix locations by dividing current by 36
    var matrixX = player.x/36;
    var martixY = player.y/36;

    //set collsisions based on matrix values around player
}

//gameloop
function gameLoop(){
    //do level player is currently on
    //playerlocationfunc();
    //set background
    background();
    //Updating the frame
    player.update();
    //Drawing the player
    player.show();
    //update demon frame
    demon.update();
    //draw demon
    demon.show();
    buildlevel();
    //show keys
    //level0key.show();
    //draw the wall
    //level0wall.build();
    //show door
    //level0door.show();
    //update movement
    movementUpdate();
    //update collisions
    collisionsUpdate();
}


  //(for movement) if player is not vertically colliding, CAN vertically move, same apps. for horizontally

//set for gameLoop to only occur every 200ms
setInterval(gameLoop,100);
