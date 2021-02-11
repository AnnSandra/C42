var backImage,backgr;
var player, player_running;
var ground,ground_img;

var foodGroup,obstacleGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacle_img=loadImage("stone.png");
  gameover_img=loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  gameover= createSprite(400,200)
  gameover.addImage(gameover_img);
  gameover.visible=false;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup= new Group();
  obstacleGroup = new Group();

  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(player.isTouching(foodGroup)){
      score = score+2;
      foodGroup.destroyEach();
      player.scale+=0.1;
    }

    if(obstacleGroup.isTouching(player)){
      gameState=END
    }

    createFood();
    createObstacles();

  }

  if(gameState===END){

    ground.velocityX=0;
    backgr.velocityX=0;
    gameover.visible=true;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);


  }

  drawSprites();
  fill("white");
  text("Score:"+score,500,100);
}


function createFood(){
  if(frameCount% 80 ===0){ 
    var rand= Math.round(random(120,200));
    banana = createSprite(800,rand,10,10);
    banana.velocityX=-4;
    banana.addImage(bananaImage);
    banana.scale=0.05;
    player.depth=banana.depth+1;
    foodGroup.add(banana);
    
  }
}

function createObstacles(){
  if(frameCount%200=== 0){
    obstacles = createSprite(800,320,20,20);
    obstacles.velocityX=-3;
    obstacles.addImage(obstacle_img);
    obstacles.scale= 0.2;
    //obstacles.collide(ground);
    obstacleGroup.add(obstacles);
  }
}
