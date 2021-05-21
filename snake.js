
function init(){

canvas= document.getElementById("mycanvas");

W=canvas.width= 1000;
H=canvas.height= 1000;

pen=canvas.getContext('2d');
cs=66;
game_over=false;
score=0;
food_img=new Image();
food_img.src="apple.png";
trophy=new Image();
trophy.src="trophy.png";

food=getRandomFood();
snake={ 
     init_length:5,
    color:"black",
    cells:[],
    direction:"right",    

    createsnake:function(){
      	for(var i=this.init_length;i>0;i--){
    		this.cells.push({x:i,y:0});
    	}
    },
    drawsnake:function(){
    	for(var i=0;i<this.cells.length;i++){
            pen.fillStyle=this.color;
    		pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
    	}
    },

    updateSnake:function(){
    var headX=this.cells[0].x;
    var headY=this.cells[0].y;
    
    if(headX==food.x && headY==food.y){
        food=getRandomFood();
     score++;
    }
    else {
          this.cells.pop();    
    }

    var x,y;
if(this.direction=="right"){
     x =headX+1;
    y=headY;               }
if(this.direction=="left"){ x =headX-1;
    y=headY;             }
if(this.direction=="down"){ x =headX;
    y=headY+1;             }
if(this.direction=="up"){ x =headX;
    y=headY-1;              }

    this.cells.unshift({x:x,y:y});

   var last_x = Math.round(W/cs);
    var last_y = Math.round(H/cs);
if(this.cells[0].y < 0 ||this.cells[0].x < 0 || this.cells[0].y > last_y || this.cells[0].x > last_x){
    game_over = true;
}
 
    }

};

snake.createsnake(); 

function keyPressed(e){
    if(e.key=="ArrowRight"){snake.direction="right";}
    else if(e.key=="ArrowLeft"){snake.direction="left";}
    else if(e.key=="ArrowDown"){snake.direction="down";} 
    else if(e.key=="ArrowUp"){snake.direction="up"; }
}
document.addEventListener('keydown',keyPressed);

}

function draw(){
    pen.clearRect(0,0,W,H);
snake.drawsnake();
pen.fillStyle=food.color;
pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
pen.drawImage(trophy,27,20,cs,cs);
pen.fillStyle="black"
pen.font="40px Roboto";
pen.fillText(score,50,50);
}
 

function update(){
snake.updateSnake();
}


function getRandomFood(){
    var foodx=Math.round(Math.random()*(W-cs)/cs);
    var foody=Math.round(Math.random()*(H-cs)/cs);

   var food={
    x:foodx,
    y:foody,
    color:"red",
} 
 return food;
   } 




function gameloop(){
if (game_over==true) {
 clearInterval(f);
alert("game Over\nSCORE="+score);
return; 
}
draw();
update();
}

init();
var f=setInterval(gameloop,100); 