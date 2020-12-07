
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;
var score = 0;

var PLAY = 1;
var END = 0;

var ground;

var GameState = PLAY;

var reset,resetImage;

var youLost,lostImage;

var background,backgroundImage;

function preload(){
  
   backgroundImage = loadImage("back.jpg");

  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  resetImage = loadImage("restart.jpg")
  lostImage = loadImage("youlost.jpg")
  

}



function setup() {
  createCanvas(400, 400);
  
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 2.5;

  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  youLost = createSprite(200,150,10,10);
  youLost.addImage("lost",lostImage);
  youLost.scale = 0.1;
  
  restart = createSprite(200,250,10,10);
  restart.addImage("reset",resetImage);
  restart.scale = 0.5;

  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  monkey.setCollider("circle",0,0,250);
  monkey.debug = false;
  
}


function draw() {
  
  background.velocityX = -3 ;
  
  console.log(GameState);

    if (background.x < 0){
      background.x = background.width/1;
    }
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  // restart.visible = false;
  //   youLost.visible = false;
  
  
  ground.visible = false;
  
  if(GameState === PLAY){
   
    restart.visible = false;
    youLost.visible = false;
    
    if(keyDown("space") && monkey.y >=300) {
      monkey.velocityY = -18;
    }
  
    if(keyDown("UP_ARROW") && monkey.y >=300) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
   drawSprites();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1
  }
  
  
    if(obstaclesGroup.isTouching(monkey)){
        GameState = END;
        
    
    }
  }
    
    else if(GameState === 0 ){
      restart.visible = true;
      youLost.visible = true;
      
      
      ground.velocityX = 0;
      monkey.velocityY = 0;
      
      
      
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
      reset();
    }
      
       
      
      
    }

  textSize(20);
  fill("black");
  text("Score: "+ score, 125,70);
  
  
  

  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  
  
  }

function reset(){
  gameState = PLAY;
  score = 0;
  
  youLost.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
