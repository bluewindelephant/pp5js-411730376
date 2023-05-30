// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


let points =[[1*0.2,10*0.2], [0,17*0.2], [6*0.2,19*0.2],[13*0.2,18*0.2],[15*0.2,19*0.2],[20*0.2,17*0.2],[20*0.2,14*0.2],[17*0.2,11*0.2],[16*0.2,11*0.2],[15*0.2,9*0.2],[15*0.2,6*0.2],[16*0.2,0],[16*0.2,-4*0.2],[16*0.2,-7*0.2],[15*0.2,-11*0.2],[16*0.2,-16*0.2],[17*0.2,-16*0.2],[19*0.2,-18*0.2],[17*0.2,-19*0.2],[13*0.2,-19*0.2],[12*0.2,-17*0.2],[12*0.2,-16*0.2],[11*0.2,-10*0.2], [11*0.2,-6*0.2], [9*0.2,-7*0.2],[8*0.2,-7*0.2],[4*0.2,-8*0.2],[3*0.2,-12*0.2],[5*0.2,-19*0.2],[4*0.2,-20*0.2],[0,-20*0.2],[-1*0.2,-19*0.2],[-1*0.2,-16*0.2],[-1*0.2,-11*0.2], [-2*0.2,-7*0.2], [-4*0.2,-6*0.2],[-8*0.2,-8*0.2],[-8*0.2,-13*0.2],[-8*0.2,-15*0.2],[-7*0.2,-16*0.2],[-7*0.2,-17*0.2],[-8*0.2,-18*0.2],[-11*0.2,-18*0.2],[-12*0.2,-16*0.2],[-12*0.2,-9*0.2],[-8*0.2,2*0.2],[-7*0.2,5*0.2],[-14*0.2,9*0.2],[-13*0.2,9*0.2],[-19*0.2,10*0.2],[-19*0.2,11*0.2],[-18*0.2,12*0.2],[-12*0.2,12*0.2],[-2*0.2,7*0.2],[1*0.2,8*0.2],[4*0.2,8*0.2],[3*0.2,10*0.2],[3*0.2,12*0.2],[1*0.2,10*0.2]];

// let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料
var fill_colors = "002289-805f73-8a9396-84d2bd-89d8a6-e89b00-c86702-bb3e83-ae2812-9b8226".split("-").map(a=>"#"+a)
var line_colors = "064889-4278a1-eb82fa-679836-a5b800".split("-").map(a=>"#"+a)
// +++++++++++++++++++++++++
var ball //"目前要處理的物件，暫時放在ball變數內"
var balls=[] //把產生的"所有"的物件，為物件的倉庫，所有物件資料都在此
// +++++++++++++++++++++++++++++++++++
var bullet = [] //"目前要處理的物件，暫時放在bullet變數內"
var bullets = [] //把產生的"所有"的物件，為物件的倉庫，所有物件資料都在此
// ++++++++++++++++++
// +++++++++++++++++++++++++++++++++++
var monster = [] //"目前要處理的物件，暫時放在bullet變數內"
var monsters = [] //把產生的"所有"的物件，為物件的倉庫，所有物件資料都在此
// ++++++++++++++++++
//+++++++++++++++++++++++砲台位置
var shipP
//+++++++++++++++++++++++++++++++++
var score = 0

function preload(){
  dead_sound = loadSound("sound/ARF3.wav")
  bullet_sound = loadSound("sound/123.wav")
  monster_sound = loadSound("sound/score.mp3")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2) //預設砲台位置
  for(var i=0;i<4;i=i+1){//i=0,1,2,3,4,8,10
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放到balls陣列內
}
 for(var i=0;i<10;i=i+1){//i=0,1,2,3,4,8,10
  monster = new Monster({}) //產生一個Monster class元件
  monsters.push(monster) //把ball的物件放到monsters陣列內
}
}
function draw() {
   background(220);
  // for(var j=0;j<balls.length;j=j+1){
  // ball=balls[j]
  // ball.draw()
  // ball.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowLeft" || key=="a"){//往左
      shipP.x =shipP.x-5
      }
      if(key=="ArrowRight"|| key=="d"){//往右
        shipP.x =shipP.x+5
      }
      if(key=="ArrowUp"|| key=="w"){//往上
        shipP.y =shipP.y-5
      }
      if(key=="ArrowDown"|| key=="s"){//往下
        shipP.y =shipP.y+5
      }
  }
//狗出現
  for(let ball of balls)
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
    if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
     balls.splice(balls.indexOf(ball),1)
     bullets.splice(bullets.indexOf(bullet),1)
     score =score - 5
     dead_sound.play()
  }
}
  }
  for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters)
  {
    if(monster.dead == true && monster.timenum>4){
    monsters.splice(monsters.indexOf(monster),1) 
    }
    monster.draw()
    monster.update()
  for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
      // monsters.splice(monsters.indexOf(monster),1) //從倉庫monster
       bullets.splice(bullets.indexOf(bullet),1)
       score =score + 10
       monster.dead = true //代表該怪物已死掉
      dead_sound.play()
      monster_sound.play()
    }
  } 
  }
    textSize(50)
    text("楷威:"+score,50,50) //在座標為(50,50)上，顯示Scroe分數
  push() //重新規劃原點(0,0)，在視窗中間
  let dx = mouseX - width/2
  let dy = mouseY - height/2
  let angle = atan2(dy,dx)
  translate(shipP.x,shipP.y) //把砲台的中心點放在視窗中間
  fill("#555555")
  //noStroke()
  rotate(angle)
  triangle(-25,-25,-25,25,50,0) //畫三個點，成一個三角形
  ellipse(0,0,50)
  pop() //恢復原本設定，原點(0,0)，在視窗左上角
}

function mousePressed(){
//   ball= new Obj({
// p:{x:mouseX,y:mouseY}
//   })
//   balls.push(ball)
bullet = new Bullet({
  r:15,
  color:"red"})
 //在滑鼠按下的地方，產生一個新的bullet class的原件
bullets.push(bullet) //把bullet放到倉庫
bullet_sound.play()


// for(let ball of balls){
//   if(ball.isBallInRanger(mouseX,mouseY)){
//     balls.splice(balls.indexOf(ball),1)
//     score =score+1
//   }
// }
}

function keyPressed(){ //按下空白鍵，發射飛彈，按下滑鼠的功能一樣
  if(key==" "){
    bullet = new Bullet({
      r:15,
      color:"red"})
     //在滑鼠按下的地方，產生一個新的bullet class的原件
    bullets.push(bullet) //把bullet放到倉庫
    bullet_sound.play()
  }
}
