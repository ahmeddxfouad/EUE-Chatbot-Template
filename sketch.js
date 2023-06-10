
let logo;
let HumanText;
let BotText;
let inp;
let sendBtn;
let navigateBtn;
let speachBtn;
let talkBtn;
let mode=0;
var myVoice;

let speechRec;
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    background('#000080');
    
    //RiveScript
    bot = new RiveScript(); //load library
    
    loadBot(); //call function to load the rivescript bot


    imageMode(CENTER);             //adjust image mode
    //Using a call back function to load first image
    loadImage('EUE-Logo.png', logo => {
    image(logo, width / 2, height / 2 - 100, 500, 150);
    });
    
     imageMode(CENTER); //adjust image mode
        //Using a call back function to load first image
            loadImage('EUE-Logo.png', logo => {
                image(logo, width / 2, height / 2 - 100, 500, 150);
            });
    
    
    //draw input field
    //textSize(30);
    //text("Enter Here: ",50, height-320)
    inp = createInput('');
    inp.attribute('placeholder',"Please enter your question here!")
    inp.position(50, height-300);
    inp.size(windowWidth-250);
    inp.input(HumanInputEvent);

    //draw button
    sendBtn = createButton('Send');
    sendBtn.position(width-150, height-300);
    sendBtn.size(100);
    sendBtn.mousePressed(submitQuestion);

    
    //navigation button
    navigateBtn = createButton('Use Sound');
    navigateBtn.position(width-150, 300);
    navigateBtn.size(100);
    navigateBtn.mousePressed(navigate);
    
    
    //speak button
    speachBtn = createButton('Speak');
    speachBtn.position(width-150, 400);
    speachBtn.size(100);
    speachBtn.mousePressed(gotSpeech);
    
    //talk button
    talkBtn = createButton('Talk');
    talkBtn.position(width-150, 400);
    talkBtn.size(100);
    talkBtn.mousePressed(talk);
    
    
    //call variable and set up library here(or in a function)
    //don't forget to look for a call back function
    speechRec = new p5.SpeechRec('en-us', gotSpeech);
    
     //configure speech rec mode
        let continuous = true;
        let interimResults = false;
        speechRec.start(continuous, interimResults);
    
    gotSpeech();
    
    //my Voice
    myVoice = new p5.Speech(); // new P5.Speech object
     myVoice.speak("say something");
    

    
}


async function loadBot() {
 
  await bot.loadFile('botbrain.rive.txt'); // wait for promise to resolve then loadfile
 
}

function HumanInputEvent() {
  console.log('you are typing: ', this.value());
//    HumanText = this.value();
}

function navigate(){
    console.log("navigate");
    console.log("mode: "+mode);
    if(mode == 0){
        mode =1;
    }
    else{
        mode = 0;
    }
    
}

function submitQuestion(){
    
    setTimeout( () =>{
    console.log("inp.value: "+inp.value());
    console.log("Mouse is pressed!");
    HumanText = inp.value();
    getResponse();
    }, 2000);
  
}

function gotSpeech(){
    console.log("gotSpeech")
    if (speechRec.resultValue) {
        let said = speechRec.resultString;
    
        // display user input
        console.log(said);
    
        }
}

function talk(){
         setTimeout( () =>{
             myVoice.speak(BotText);
        }, 2000);
   
}

async function getResponse(){
    
    //--------------------bot response----------------------     
    //sort replies before running the bot
    bot.sortReplies();
    //wait for the promise to be returned(?)before loading the reply
    let response = await bot.reply('local-user', HumanText);
    //display response
    console.log(response);
    
    BotText = response;
    
}


function draw() {
    if(mode == 0 ){ 
        inp.show();
        sendBtn.show();  
        
        speachBtn.hide();
        
//        speechRec.pause();
        
    }
    else if(mode == 1){
        inp.hide();
        sendBtn.hide();      
        
        speachBtn.show();
        
        if (speechRec.resultValue) {
            let said = speechRec.resultString;
            HumanText = said;
            // display user input
            console.log(said);
    
        }

        
    }
    
    
    //draw an empty textbox
    let rectX = width / 2;
    let rectY = height - 125;
    fill("white");
    rectMode(CENTER);
    rect(rectX, rectY, windowWidth - 50, 200, 20);
    
    //Human Text
    textSize(20);
    textAlign(LEFT);
    fill("black");
    if(HumanText == undefined)
        HumanText = "";
    
    text("> Human Text: "+HumanText,(width/15) ,height-200); //draw Human Text within a box
    
    
    if(BotText == undefined)
        BotText = "";
//    else if(HumanText.includes("hello"))
//        BotText = "Hello There!";
//    else if(HumanText.includes("good morning"))
//        BotText = "Good Morning Sir!";
    
    //draw Bot text inside the box
    let padding = 20;
    textSize(20);
    textAlign(RIGHT);
    strokeWeight(1);
    stroke(20);
    text(BotText+" : Bot Respond <", rectX - padding, rectY + (3*padding), windowWidth - 75, 190); //draw Bot Text within a box
    
    

  //gotSpeech();
}

