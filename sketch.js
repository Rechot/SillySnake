var numberOfBlocks = 20
var blockSize = 20

var headX = 0
var headY = 0

var speedX = 0
var speedY = 0

var tailLength = 3
var tailBlocks = []

var appleX = 0
var appleY = 0

var score = 0
var highestScore = 0

function setup() {
  createCanvas(400, 400)
  frameRate(10)
  
  //Starting position at the center.
  headX = numberOfBlocks /2
  headY = numberOfBlocks /2
  
  //Randomize apple's position (0 to 19) both x and y.
  appleX = floor(random(0, numberOfBlocks))
  appleY = floor(random(0, numberOfBlocks))
}


function draw() {
  background(0,0,0)
  
  // console.log(tailBlocks)
  
  if(speedX != 0 || speedY != 0 ){
    //add a new tail;
    tailBlocks.push({x: headX, y: headY})
  
    //cut tail, you must do that first;
    while(tailBlocks.length > tailLength){
      tailBlocks.shift()
    }
    //check each block in a tail block for collision with a snakeHead;
    for(let i = 0; i < tailBlocks.length; i++){
      if(headX + speedX == tailBlocks[i].x && 
         headY + speedY == tailBlocks[i].y){
        //The "Game Over".
        //Reset the snakeHead position.
        headX = numberOfBlocks /2
        headY = numberOfBlocks /2
        
        //Reset speed of the snake.
        speedX = 0
        speedY = 0
        
        //Reset the tail lenght.
        tailLength = 3
        tailBlocks =[]
        
        //Randomize the apples position.
        appleX = floor(random(0, numberOfBlocks))
        appleY = floor(random(0, numberOfBlocks))
        
        //Reseting the score
        if( score > highestScore){ highestScore = score }
        score = 0
      }
    }
    
    //draw current score and highestScore
    fill(255) //set letter color to white
    textSize(20)
    text('score: ' + score, 10, 30)
    text('highest score: ' + highestScore, 10, 50)
  }
  
  
  
  //draw tailBlocks;
  for(let i = 0; i < tailBlocks.length ; i++){
    rect(tailBlocks[i].x * blockSize,
        tailBlocks[i].y * blockSize,
        blockSize,
        blockSize) 
  }
  
  //update the position of the snakeHead;
  headX = headX + speedX
  headY = headY + speedY
  
  //loop head back into the screen;
  if(headX < 0){ headX = numberOfBlocks -1 } 
  if(headX > numberOfBlocks){ headX = 0}
  if(headY < 0){ headY = numberOfBlocks -1 }
  if(headY > numberOfBlocks){ headY = 0}
  
  //the head eats the apple;
  if(headX == appleX && headY == appleY){
    
    //Randomize apple's position (0 to 19) both x and y.
    appleX = floor(random(0, numberOfBlocks))
    appleY = floor(random(0, numberOfBlocks))
    
    //The tail grows.
    tailLength++
    
    //Increase score number.
    score++
  }
  
  //draw apple;
  fill(255, 0, 0)
  rect(appleX * blockSize,
        appleY * blockSize,
        blockSize,
        blockSize)
    
  //draw snakeHead;
  fill(255)
  rect(headX * blockSize,
        headY * blockSize,
        blockSize,
        blockSize)
}

function keyPressed() {
  if(key == 'w'){
      speedX = 0
      speedY = -1
  } else if(key == 's'){
      speedX = 0
      speedY = 1
  } else if(key == 'a'){
      speedX = -1
      speedY = 0
  } else if(key == 'd'){
      speedX = 1
      speedY = 0
  }
}