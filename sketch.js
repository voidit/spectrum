// import { Spot } from "Spot.js";
let temp1 = 0;

/*==========P5 Part===============*/
let spots = [];
let Exist = false;
let ProgressRate = 0;
let CanvasHeight = 400;
let CanvasWidth = 400;
let TotalPopulation = 0;
let KnownPopulation = 0;
let LastConnectedPopulation = 0;
let FrameRate = 30;
let ConnectedCount = 0;
let inputbuffer = 0;
let tempinput = 99;

let journey = [];
let sentences = [];

let TravelerColorID = 0;

let cnv;

/*================P5 Part=================*/
function preload() {}

function setup() {
  cnv = createCanvas(windowWidth, CanvasHeight);
  cnv.center();
  noStroke();
  frameRate(6);
}

function draw() {
  background(30);

  let t = frameCount / FrameRate; // update time
  frameRate(FrameRate);
  let BornRate = 0.75;

  // create a spots each frame according to bornrate
  if (random(1) < BornRate) {
    spots.push(new Spot()); // append
    if (Exist == true) {
      TotalPopulation++; //record population
    }
  }

  for (let i = 0; i < spots.length; i++) {
    spots[i].joinSpots(spots.slice(i));
  }

  // loop through individuals with a for..of loop
  for (let s of spots) {
    s.update(t); // update Spot position
    s.display(t); // draw Spot
  }

  if (Exist == false) {
    ProgressRate = 0;
  }
}

function mouseReleased() {
  if (Exist == false) {
    let Meball = new Spot();
    Meball.isMe = true;
    Meball.size = 20;
    spots.push(Meball); // append
    Exist = true;
    TravelerColorID = floor(
      Meball.initialB + Meball.initialG * 1000 + Meball.initialR * 1000000
    );
  }
}

function keyReleased() {
  if (keyCode != UP_ARROW && keyCode != DOWN_ARROW) {
    if (Exist == false) {
      let Meball = new Spot();
      Meball.isMe = true;
      Meball.size = 20;
      spots.push(Meball); // append
      Exist = true;
      TravelerColorID = floor(
        Meball.initialB + Meball.initialG * 1000 + Meball.initialR * 1000000
      );
    }
  }
}
