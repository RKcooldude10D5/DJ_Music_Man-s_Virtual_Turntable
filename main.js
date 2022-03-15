fnafsbts="";
function preload(){
    fnafsbts=loadSound("security_breach.mp3");
}
rightWristx=0;
rightWristy=0;
leftWristx=0;
leftWristy=0;
scorerightWrist=0;
scoreleftWrist=0;
function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FFFFFF");
    stroke("#000000");
    if(scorerightWrist > 0.2){
        circle(rightWristx, rightWristy, 20);
    if(rightWristy > 0 && rightWristy <=100){
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        fnafsbts.rate(0.5);
    }
    else if(rightWristy > 100 && rightWristy <=200){
        document.getElementById("speed").innerHTML="Speed = 1x";
        fnafsbts.rate(1);
    }
    else if(rightWristy > 200 && rightWristy <=300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        fnafsbts.rate(1.5);
    }
    else if(rightWristy > 300 && rightWristy <=400){
        document.getElementById("speed").innerHTML="Speed = 2x";
        fnafsbts.rate(2);
    }
    else if(rightWristy > 400){
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        fnafsbts.rate(2.5);
    }
    }
    if(scoreleftWrist > 0.2){
        circle(leftWristx, leftWristy, 20);
        inNumberleftWristy=Number(leftWristy);
        remove_decmals=floor(inNumberleftWristy);
        volume=remove_decmals/500;
        document.getElementById("volume").innerHTML="Volume = " + volume;
        fnafsbts.setVolume(volume);
    }
}
function play(){
    fnafsbts.play();
    fnafsbts.setVolume(1);
    fnafsbts.rate(1);
}
function modelLoaded(){
    console.log("PoopNet is initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
    scorerightWrist=results[0].pose.keypoints[10].score;
    scoreleftWrist=results[0].pose.keypoints[9].score;
    console.log("scorerightWrist=" + scorerightWrist + "scoreleftWrist=" + scoreleftWrist);
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("rightWristx = " + rightWristx + "rightWristy = " + rightWristy);
    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("leftWristx = " + leftWristx + "leftWristy = " + leftWristy);
    }
}