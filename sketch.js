//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("happydogImg.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  foodObj=new Food();

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {  
  background("pink");


fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed=data.val();
})


fill(255);
textSize(20);
if(lastFed>=12){
  text("Last Feed : "+lastFed%12+"PM",350,30);
}
else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}
else{
  text("Last Feed : "+lastFed+"AM",350,30);
}

foodObj.display();

  /*if(foodS!== undefined){
    textSize(20);    
    fill("red");    
    text("Note: Press UP ARROW to feed Johnny milk", 50,50);
    fill("green")
    text("Food Remaining: "+foodS, 150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
  

    if(foodS === 0){
      foodS = 20;
    }*/


    drawSprites();
  }


/*function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}*/

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}