status="";
objects=[];
random=255;
function preload()
{}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380)
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
  }
  function modelLoaded()
  {
    console.log("Model Loaded!");
    status=true;
    
  }
  function gotResult(error,results)
  {
    if (error)
    {
      console.log("error");   
    }
    else
    {
      console.log(results);
      objects=results;
      
    }
  }
  function draw()
  {
    image(video, 0,0,380,380);
    if(status !=" ")
    {
      r=random(225);
      g=random(225);
      b=random(225); 
      objectDetector.detect(video,gotResult);      
      for (i=0; i<objects.length; i++ )
     {    
       document.getElementById("status").innerHTML="Status :Object Detected!";
       document.getElementById("objectsdetected").innerHTML="Baby not detected"+objects.length;
       fill(r,g,b);
       percent=floor(objects[i].confidence*100);
       text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
       song.play("mixkit-warning-alarm-buzzer-991.wav")
       noFill();
       stroke(r,g,b);
       rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
       
      }
    }
  }