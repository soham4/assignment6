let video;
let poseNet;
let pose;
let position=[];
let value1=false;
let value2=false;
  let noseX=200;
  let noseY=200;
function preload(){
  img=loadImage("dogmask.png");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  imageMode(CENTER);
  strokeWeight(9);
  stroke(255);
  
  
 for(i=0; i<10; i++){ position.push({
    x:random(width),
    y:random(height),
    vx: random(-5, 5),
    vy:random(-5, 5),
    clr: color(random(100), random(100), random(255)),
  })
                    }
  

  clicker2 = new Clickable();
  clicker2.text = "Dog filter";
  clicker2.x = 50;
  clicker2.y = 100;
  styleClicker(clicker2);
  clicker2.onPress = function(){
  value1=false;
    value2=true;
}
  clicker3 = new Clickable();
  clicker3.text = "Play Game";
  clicker3.x = 50;
  clicker3.y = 150;
 styleClicker(clicker3);
  clicker3.onPress = function(){
  value1=true;
    value2=true;
}


  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function styleClicker(btn){
  btn.width = 100;
  btn.height = 50;
  btn.color= "#4903fc";
  btn.textColor="#ffffff";
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 320, 240);
  clicker2.draw();
  clicker3.draw();
  
  if (pose) {
    noseX=(noseX+pose.nose.x)/2;
    noseY=(noseY+pose.nose.y)/2;
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    let earR = pose.rightEar;
    let earL = pose.leftEar;
    let c = dist(earR.x, earR.y, earL.x, earL.y);
    
     if(value2===true && value1===false){
       clicker2.color= "#444444";
       clicker3.color= "#4903fc";
       if(pose.nose.confidence>0.4){
       image(img, noseX, noseY-d, c, d+d+c);
       }
       else{
         text('Cannot Detect your face', 320, 240);
       }
  }
    if(value1===true && value2===true){
      clicker3.color= "#444444";
      clicker2.color= "#4903fc";
  text('Collect all the butterflies with your nose', 120, 30);
      if(pose.nose.confidence>0.4){
      drawFlower(noseX, noseY, d);
      }
      else{
        text('Cannot detect your face', 320, 240 );
      }
      for(let p of position){
        fill(0, 0, 255);
        if(!p.ate){
          drawButterfly(p.x, p.y, p.clr);
        }
      }
      for(let p of position){
        p.x+=p.vx;
        p.y+=p.vy;
        if(p.x>=width){
          p.vx=-p.vx;
        }
        if(p.x<=0){
          p.vx=-p.vx;
        }
        if(p.y>=height){
          p.vy=-p.vy;
        }
        if(p.y<=0){
          p.vy=-p.vy;
        }
      }
      
      for(let p of position){
        s=dist(pose.nose.x, pose.nose.y, p.x, p.y);
        print(s);
        if(s<=40){
          p.ate=true;
        }
      }
      
    }
      
      
    

  }
}

function drawFlower(a, b, d){
     

         fill(242, 61, 203);
        ellipseMode(CORNERS);
        
        push();
        translate(a, b);
        ellipse(0, 0, d*0.5, d*0.25);
        pop();
        
        push();
        translate(a, b);
        rotate(radians(180));
        ellipse(0, 0, d*0.5, d*0.25);
        pop();
        
        
        push();
        translate(a, b);
        rotate(radians(60));
        ellipse(0, 0, d*0.5, d*0.25);
        pop();
        
        push();
        translate(a, b);
        rotate(radians(300));
        ellipse(0, 0, d*0.5, d*0.25);
        pop();
  

        push();
        translate(a, b);
        rotate(radians(240));
        ellipse(0, 0, d*0.5, d*0.25);
        pop();
  
        push();
        translate(a, b);
        rotate(radians(120));
        ellipse(0, 0, d*0.5, d*0.25);
        pop();
  
        ellipseMode(CENTER);
        fill('yellow');
        push();
        translate(a, b);
        ellipse(0, 0, d*0.25);
        pop();
        
}

function drawButterfly(e, f, g){
  stroke(0);
  noFill();
  arc(e+15, f-10, 20, 20, PI, 0, OPEN);
  arc(e-15, f-10, 20, 20, PI, 0, OPEN);
  ellipseMode(CENTER);
  noStroke();
  push();
  fill(87, 25, 13);
  translate(e, f);
  ellipse(0, 0, 10, 30);
  pop();
  
  fill(g);
  push();
  translate(e, f);
  rotate(radians(35));
  ellipse(12, -15, 15, 40);
  pop();
  
  push();
  translate(e, f);
  rotate(radians(325));
  ellipse(-12, -15, 15, 40);
  pop();
  

  push();
  translate(e, f);
  rotate(radians(130));
  ellipse(4, -24, 15, 30);
  pop();
  
  push();
  translate(e, f);
  rotate(radians(230));
  ellipse(-4, -24, 15, 30);
  pop();
  
}
