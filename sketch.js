let video;
let poseNet;
let pose;
let value1=false;
let value2=false;
function preload(){
  img1=loadImage("dogmask.png");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  imageMode(CENTER);
  
  clicker1 = new Clickable();
  clicker1.text = "Mask1";
  clicker1.x = 50;
  clicker1.y = 50;
  clicker1.width = 100;
  clicker1.height = 50;
  clicker1.color= "#4903fc";
  clicker1.onPress = function(){
  value1=true;
  value2=false;
}
  clicker2 = new Clickable();
  clicker2.text = "Mask2";
  clicker2.x = 50;
  clicker2.y = 150;
  clicker2.width = 100;
  clicker2.height = 50;
  clicker2.onPress = function(){
  value1=false;
    value2=true;
}
  clicker3 = new Clickable();
  clicker3.text = "Mask3";
  clicker3.x = 50;
  clicker3.y = 200;
  clicker3.width = 100;
  clicker3.height = 50;
  clicker3.onPress = function(){
  value1=true;
    value2=true;
}


  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
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
  clicker1.draw();
  clicker2.draw();
  clicker3.draw();
  if (pose) {
    //print(pose);
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    let earR = pose.rightEar;
    let earL = pose.leftEar;
    let c = dist(earR.x, earR.y, earL.x, earL.y);
    
    if(value1===true && value2===false){
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);

    for (let i = 1; i < 3; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(255, 255, 255);
      ellipse(x, y, 16, 16);
    }
  }
     if(value2===true && value1===false){
    fill(0, 255, 0);
    ellipse(pose.nose.x, pose.nose.y, d);

    for (let i = 1; i < 3; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(255, 255, 255);
      ellipse(x, y, 16, 16);
    }
  }
    if(value1===true && value2===true){
      image(img1, pose.nose.x, pose.nose.y, c, c);
    }
    

  }
}
