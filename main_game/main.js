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
//players wheravouts in game
var playerlocationfunc = level0;
var playerlocationstr = "level0";

//create canvas
//Width and height for our canvas
var canvasWidth = 910;
var canvasHeight = 910;
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


//declare obstacle
function obstacle(options){

  var that = {};

  that.noOfVals = options.noOfVals;
  that.xvalues = options.xvalues;
  that.yvalues = options.yvalues;

  that.build = function(){
    l2ctx.fillStyle = "#000000";
    l2ctx.fillRect(that.xvalues[0], that.yvalues[0], 30, 910);
    l2ctx.fillRect(that.xvalues[1], that.yvalues[1], 910, 30);
    l2ctx.fillRect(that.xvalues[2], that.yvalues[2], 30, 910);
    l2ctx.fillRect(that.xvalues[3], that.yvalues[3], 910, 30);
    for(var i=65; i<845; i+=75){
      var valuescount = 4;
          for(var o=65; o<845; o+=75){
            l2ctx.fillRect(i, o, 30, 30);
            that.xvalues[valuescount] = i;
            that.yvalues[valuescount] = o;
            valuescount++;
          }
      }
    }

    return that;
}

var level0wall = obstacle({
  noOfVals: 124,
  xvalues: [1, 1, 880, 1],
  yvalues: [1, 1, 1, 880]
})

//declare door
function door(options){
  var that = {};

  that.opened = options.opened;
  that.image = options.image;
  that.x = options.x;
  that.y = options.y;
  that.srcX = options.srcX;
  that.srcY = options.srcY;
  that.sheetwidth=options.sheetwidth;
  that.sheetheight=options.sheetheight;
  that.sizewidth=options.sizewidth;
  that.sizeheight=options.sizeheight;

  that.show = function(){
    //if door is opened
    if(that.opened == false){
          that.srcY = 0;
    }
    //if door is closed
    else if(that.opened == true){
          that.srcY = 48;
    }
    l2ctx.drawImage(that.image,that.srcX, that.srcY,that.sheetwidth,that.sheetheight,that.x,that.y,that.sizewidth,that.sizeheight);
  }

  return that;
}

var level0door = door({

  x: 778,
  y: 795,
  opened: false,
  srcX:0,
  srcY: 0,
  sheetwidth: 32,
  sheetheight: 48,
  sizewidth: 32,
  sizeheight: 48,
  image: doorImage,
})

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
  var currentwall = playerlocationstr + "wall";

  //check for each x and y value of currentwall
  for(var i=0;i<=currentwall.noOfVals;i++){
    //set collisions
    if (currentwall.xvalues[i]==(player.x+20)){
      rightcollision = true;
    }
    else{
      rightcollision = false;
    }
    if(currentwall.xvalues[i]==player.x-20){
      leftcollision = true;
    }
     else{
       leftcollision = false;
     }
     if (currentwall.yvalues[i]==player.y+20){
       downcollision = true;
     }
     else{
       downcollision = false;
     }
     if(currentwall.yvalues[i]==player.y-20){
       upcollision = true;
     }
     else{
       upcollision = false;
     }
  }
}

//function for level 1
function level0(){
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
  //draw the wall
  level0wall.build();
  //show door
  level0door.show();
  //update movement
  movementUpdate();
  //update collisions
  collisionsUpdate();

}

//function for level 1
function level1(){

}

//function for level 2
function level2(){

}

//gameloop
function gameLoop(){
    //do level player is currently on
    playerlocationfunc();
}


  //(for movement) if player is not vertically colliding, CAN vertically move, same apps. for horizontally

//set for gameLoop to only occur every 200ms
setInterval(gameLoop,100);
