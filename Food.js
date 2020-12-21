class Food{
    constructor(){
        this.foodStock=15;
        this.lastFed;
        this.image=loadImage("Milk.png");

    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
        }

    getFedTime(lastFed){
        this.lastFed=lastFed;


    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
        return this.foodStock;
    }
    getFoodStock(){
        return this.foodStock;
    }

display(){
    var x=0, y=0;
    imageMode(CENTER);
    image(this.image,720,260,100,100);


    if(this.foodStock!=0){
        for (var i=0;i<this.foodStock;i++){
            if(i%20==0){
                x=80;
                y=y+200;
            }
            image(this.image,x,y,100,100);
            x=x+30;
        }
    }




}

}