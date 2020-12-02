var monkey_img, banana_img, bg_img, obs_img;
var monkey, bg, obs_grp, banana_grp, ground;
var score=0, count=0, gamestate="play";
function preload()
{
  monkey_img= loadAnimation("Monkey_01.png","Monkey_02.png",      "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",  "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img= loadImage("banana.png");
  bg_img=loadImage("jungle.jpg");
  obs_img=loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);
  
  bg= createSprite(200,200,400,400);
  bg.addImage("background", bg_img);
  bg.velocityX=-4;
  
  ground= createSprite(200,380,400,5);
  ground.visible=false;
  
  monkey= createSprite(40,360,20,20);
  monkey.addAnimation("Monkey", monkey_img);
  monkey.scale=0.1;
  monkey.debug=true;
  
  banana_grp= new Group();
  obs_grp= new Group();
}

function draw() {
  background(220);
  drawSprites();
  monkey.collide(ground);
  if(gamestate=="play")
    {
      if(bg.x<0)
    {
      bg.x=bg.width/2;
    }
  if(keyDown("space") && monkey.y>320)
    {
      monkey.velocityY=-12;
    }
  monkey.velocityY=monkey.velocityY+0.5;
  if(banana_grp.isTouching(monkey))
    {
      score=score+2;
      banana_grp.destroyEach();
    }
    switch(score)
    {
        case 10: monkey.scale=0.12;
        break;
        case 20: monkey.scale=0.14;
        break;
        case 30: monkey.scale=0.16;
        break;
        case 40: monkey.scale=0.18;
        break;
        case 50: monkey.scale=0.2;
        break;
        default:
        break;
    }
  if(obs_grp.isTouching(monkey))
    {
      obs_grp.destroyEach();
      if(count!=0)
        {
          gamestate="end";
        }
      monkey.scale=0.1;
      count=count+1;
    }
  banana1();
  obstacle();
    }
  fill("black");
   
  if (gamestate=="end")
     {
       bg.velocityX=0;
       textSize(40);
       text("Game Over!",90,100);
       obs_grp.setVelocityEach(0);
       banana_grp.destroyEach();
       obs_grp.setLifetimeEach(-1);
     }
  textSize(20);
  text("Score: "+score, 20,20);
}

function banana1()
{
  if(frameCount%90==0)
    {
      var banana= createSprite(400,random(120,250), 20, 20);
      banana.addImage("food", banana_img); 
      banana.scale=0.08;
      banana.velocityX=-4;
      banana.lifetime=110;
      banana_grp.add(banana);
    }
}
function obstacle()
{
  if(frameCount%300==0)
    {
      var stone= createSprite(400,370,20,20);
      stone.addImage("stone1", obs_img);
      stone.scale=0.15;
      stone.velocityX=-4;
      stone.lifetime=110;
      stone.debug=true;
      obs_grp.add(stone);
    } 
}