var trex ,trex_running;
var score = 0
var PLAY=1
var END=0
var gamestate = PLAY 
var cloudsGroup, obstaclesGroup
var gameover, gameoverimage, restart, restartimage

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
cloudimage= loadImage("cloud.png")
  groundImage = loadImage("ground2.png")
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
obstacle4 = loadImage("obstacle4.png")
obstacle5 = loadImage("obstacle5.png")
obstacle6 = loadImage("obstacle6.png")
gameoverimage = loadImage("gameOver.png")
restartimage = loadImage("restart.png")
}
function setup(){
  createCanvas(600,200)
 //create a trex sprite
 trex=createSprite(50,160, 20, 50)

 trex.addAnimation("running",trex_running)

 trex.scale = 0.5

 ground = createSprite(200, 180, 400, 20)

 ground.velocityX = -4

 ground.addImage("ground",groundImage)

 invisibleground = createSprite(200, 188, 400, 20)

 invisibleground.visible = false
obstaclesGroup = new Group()
cloudsGroup = new Group()
 var rand = Math.round(random(1,100))
 console.log("hello"+5)
gameover = createSprite(300, 100)
gameover.addImage(gameoverimage)

restart = createSprite(300, 140)
restart.addImage(restartimage)

}


function draw(){
  background("skyblue")
  
 text("Score: "+score,500, 50)

 if(gamestate==PLAY){
  
  gameover.visible=false
  restart.visible=false
  score = score +Math.round(frameCount/60)
  if (ground.x<0){
  ground.x = ground.width/2
 }
 if(keyDown("space") && trex.y >120){
  trex.velocityY = -10
}
 SpawnObstacles()
 SpawnClouds()
 if(obstaclesGroup.isTouching(trex)){
  gamestate = END
 }

}
 else if(gamestate==END){
 ground.velocityX = 0
 obstaclesGroup.setVelocityXEach(0)
 cloudsGroup.setVelocityXEach(0)
 gameover.visible=true
 restart.visible=true
}

console.log(frameCount)



trex.velocityY = trex.velocityY + 0.8
trex.collide(invisibleground)

drawSprites()


}
function SpawnClouds(){
 if (frameCount%60==0){
  var cloud = createSprite(600, 100, 40, 10)
 cloud.velocityX = -3
 cloud.y = Math.round(random(10,60))
 cloud.addImage("cloud",cloudimage) 
 cloud.scale = 0.5
 cloud.depth=trex.depth
 trex.depth=trex.depth+1
 cloud.lifetime=250
 cloudsGroup.add(cloud)
}
}
function SpawnObstacles(){
  if (frameCount%60==0){
var obstacle = createSprite(610, 165, 10, 40)
obstacle.velocityX = -6
var rand = Math.round(random(1,6))
switch(rand){
  case 1:obstacle.addImage(obstacle1)
  break;
  case 2:obstacle.addImage(obstacle2)
  break;
  case 3:obstacle.addImage(obstacle3)
 break;
 case 4:obstacle.addImage(obstacle4)
 break;
 case 5:obstacle.addImage(obstacle5)
 break;
 case 6:obstacle.addImage(obstacle6)
 break;
default:break;
}
obstacle.scale=0.5
obstacle.lifetime=110
obstaclesGroup.add(obstacle)
  }
}
