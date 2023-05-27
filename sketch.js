
let logo;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#000080');


  imageMode(CENTER); //adjust image mode
  //Using a call back function to load first image
  loadImage('EUE-Logo.png', logo => {
    image(logo, width / 2, height / 2 - 100, 500, 150);
  });
  
  //draw an empty textbox
  rectX = width / 2;
  rectY = height - 125;
  rectMode(CENTER);
  rect(rectX, rectY, windowWidth - 50, 200, 20);


}




function draw() {
  //background(220);
   

  //gotSpeech();
}

