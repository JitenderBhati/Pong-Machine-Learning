let video, classifier, label='';
// let lUButton, lDButton, train;
let featureExtractor;
let leftscore = 0;
let rightscore = 0;
let count=0, count1=0;
var flag = false;
// let lUButton = document.getElementsByClassName("button");
// let lDButton = document.getElementsByClassName("button2");
// const train = document.getElementById("train");


function setup() {

    video = createCapture(VIDEO);
    createCanvas(600, 400);
    ding = loadSound("./data/ding.mp3");
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);

    video.size(550, 400);

    // lUButton = createButton('Left Up');
    // lUButton.position(10, 450);
    // lDButton = createButton('Left Down');
    // lDButton.position(10, 480);
    //
    // train = createButton('Train');
    // train.position(50, 530);

    featureExtractor = ml5.featureExtractor('MobileNet', ()=>{
      console.log("Model is ready");
    });

    classifier = featureExtractor.classification(video, ()=>{
      console.log("Video is Ready");
    });

//     lUButton.mousePressed(()=>{
//      console.log("Left Up: ",count);
//       count++;
//       classifier.addImage('Left Up');
//     });
//
//   lDButton.mousePressed(()=>{
//     console.log("Left Down: ", count1);
//     count1++;
//     classifier.addImage('Left Down');
// });


  // train.mousePressed(()=>{
  //    classifier.train((loss)=>{
  //     if(loss==null)
  //     {
  //       alert("Ready To Play");
  //       classifier.classify(gotResult);
  //       flag  = true;
  //     }
  //     console.log(loss);
  //     })
  //  });
  }

function leftUp()
  {
    console.log("Left Up: ",count);
    count++;
    let lblUp = document.getElementById("lblUp").innerHTML = count+ " Images";
    // lblUp.innerHTML = "hello";
    classifier.addImage('Left Up');
  }
  function leftDown()
  {
    console.log("Left Down: ", count1);
    count1++;
    let lblDown = document.getElementById("lblDown").innerHTML = count1+" Images";
    classifier.addImage('Left Down');
  }

function trains()
{
  let training =    document.getElementById("train").innerHTML = "Training...";
  classifier.train((loss)=>{
   if(loss==null)
   {
       let training =    document.getElementById("train").innerHTML = "Train It!";
     alert("Ready To Play");
     classifier.classify(gotResult);
     flag  = true;
   }
   console.log(loss);
   })
}

function gotResult(err, res){
  if(err)
    console.log(err);
  else
  {
    label = res;
    classifier.classify(gotResult);
  }
}

function draw() {

  background(0);
  textSize(32);
  fill(255);
  text(label, 20, height-60);
  if(flag==true){
  // rand = random(1, 3);
  // console.log(Math.floor(rand));
  puck.checkPaddleRight(right);
  puck.checkPaddleLeft(left);

    left.show();
    right.show();
    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    fill(255);
    textSize(32);
    text(leftscore, 32, 40);
    text(rightscore, width-64, 40);
    if(leftscore==5)
    {
      // console.log("Left Player Wins");
      flag = false;
      isSomething("Left");
      leftscore=0;
      rightscore=0;
    }
    if(rightscore==5){
      flag = false;
      isSomething("Right")
      leftscore=0;
      rightscore=0;
    }
    puck.computerMovement(right);
    // if (Math.floor(rand)==1) {
    //     right.move(-10);
    // }
    // else if (Math.floor(rand)==2) {
    //     right.move(10);
    // }
    if (label == "Left Up") {
        left.move(-10);
    }
    else if (label == "Left Down") {
        left.move(10);
    }
  }
}

function isSomething(a)
{
  fill(255);
  console.log("hehe");
  textSize(20);
  text(a + " Player Wins!", width/2-90, 50);
  textSize(10);
  text("Press 'Y' to Continue!", width/2-50, 100);
  noLoop();
}

function keyPressed()
{
  if(key=='Y')
  {
    flag = true;
    loop();
  }
}

// function computerMovement() {
// 	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
// 	if(paddle2YCenter < ballY - 35) {
// 		paddle2Y = paddle2Y + 6;
// 	} else if(paddle2YCenter > ballY + 35) {
// 		paddle2Y = paddle2Y - 6;
// 	}
// }

// function keyReleased() {
//     left.move(0);
//     right.move(0);
// }

// function keyPressed() {
//     console.log(key);
//     if (key == 'A') {
//         left.move(-10);
//     } else if (key == 'Z') {
//         left.move(10);
//     }
//   }
