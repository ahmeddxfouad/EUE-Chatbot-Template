
let logo;


let inp;
let sendBtn;
let HumanText = "";
let botText = "";
let navigateBtn;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#000080');


  imageMode(CENTER); //adjust image mode
  //Using a call back function to load first image
  loadImage('EUE-Logo.png', logo => {
    image(logo, width / 2, height / 2 - 100, 500, 150);
  });
    
    //input field
    inp = createInput('');
    inp.position(50, height - 300);
    inp.attribute('placeholder', "Please eneter your questions");
    inp.size(windowWidth - 250);
    inp.input(HumanInputEvent);
    
    //Send button
    sendBtn = createButton('Send');
    sendBtn.position(width-150, height - 300);
    sendBtn.size(100);
    sendBtn.mousePressed(sumbitQuestion);
    
    //navigation button
    navigateBtn = createButton('Use Sound');
    navigateBtn.position(width-150, 300);
    navigateBtn.size(100);
    navigateBtn.mousePressed(navigate);
    
    
  
 


}

function HumanInputEvent(){
//    console.log("this is the user input: "+ this.value());
}

function sumbitQuestion(){
     setTimeout( () =>{
    console.log("inp.value: "+inp.value());
    console.log("Mouse is pressed!");
    HumanText = inp.value();
    }, 2000);
    
}

function navigate(){
    //
    inp.hide();
    sendBtn.hide();
}

function draw() {
  //background(220);
   
     //draw an empty textbox
    fill("white");
        rectX = width / 2;
        rectY = height - 125;
        rectMode(CENTER);
        rect(rectX, rectY, windowWidth - 50, 200, 20);
    
    //Human Text
    textSize(20);
    textAlign(LEFT);
    fill("black");
    textFont('Arial');
    text("> Human text: "+HumanText,  (width/15) , height - 200);
    
    if(HumanText.includes("hello"))
        {
            botText = "Hello There!"
        }
    else if (HumanText.includes("good morning")){
            botText = "Guten Morgan"
    }else if(HumanText != ""){
        botText = "I can't understand";
    }
    
    //draw Bot text inside the box
    let padding = 20;
    textSize(20);
    textAlign(RIGHT);
    strokeWeight(1);
    stroke(20);
    text(botText+" : Bot Respond <", rectX - padding, rectY + (3*padding), windowWidth - 75, 190);
    
    
    
  //gotSpeech();
}

