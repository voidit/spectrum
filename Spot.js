// Spot class
class Spot {
  constructor() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 15);
    this.initialR = random(0, 255);
    this.initialG = random(0, 255);
    this.initialB = random(0, 255);
    this.initialA = 255;
    this.FamiliarRGBA = [158, 110, 240, 255];
    this.Familiar = false;
    this.AgeFactor = random(1, 2);
    this.isMe = false;
    this.HorizontalSpeed = 2.5; //横向移动速度
    this.VerticalSpeed = 4; //纵向移动速度
    this.CurrentHeight = CanvasHeight / 2;
    this.isConnected = false;

    // radius of individual spiral
    // chosen so the individuals are uniformly spread out in area
    this.radius = sqrt(random(pow(CanvasHeight / 2, 2)));
  }

  update(time) {
    // x position follows a circle
    let w = 0.5; // angular speed
    let angle = w * time + this.initialangle;

    //console.log('tempresult:' + tempresult);

    // different size individuals fall at slightly different y speeds
    if (this.isMe == false) {
      this.posX += pow(this.size, 0.5);
      this.posY = CanvasHeight / 2 + this.radius * sin(angle);
    } else {
      //Controll your ball movement
      this.posX += this.HorizontalSpeed;

      if (keyIsDown(UP_ARROW) && this.CurrentHeight >= 0) {
        this.CurrentHeight -= this.VerticalSpeed;
      } else if (keyIsDown(DOWN_ARROW) && this.CurrentHeight <= CanvasHeight) {
        this.CurrentHeight += this.VerticalSpeed;
      }
      this.posY = this.CurrentHeight;
      ProgressRate = floor((this.posX / width) * 100);
    }

    // delete individual if past end of screen
    if (this.posX > width) {
      // set to true for saving file
      let saveFile = false;
      if (this.isMe == true && saveFile) {
        Exist = false;
        journey.push(
          "\nDear Student No." +
            TravelerColorID +
            ",\n\n  Good Morning, Good Afternoon and Good Evening."
        );
        journey.push(
          "\n  ·  During your journey, " +
            TotalPopulation +
            " students learned with you. You are not alone. \n"
        );
        journey.push(
          "  ·  You met " +
            KnownPopulation +
            " of them. No one else is like you.\n"
        );
        journey.push("  ·  " + this.CountLastKnown(spots) + "");
        journey.push("\n");
        temp1 = int(random(0, 5));
        journey.push(sentences[temp1]);
        save(journey, "DiveInTime.txt");
        console.log("Ever Connected:" + ConnectedCount);
        TotalPopulation = 0;
        KnownPopulation = 0;
        LastConnectedPopulation = 0;
        journey = [];
      }
      let index = spots.indexOf(this);
      spots.splice(index, 1);
    }
  }

  display(time) {
    let tempA = this.initialA - 75 * (sin(time * this.AgeFactor) + 1);
    if (this.isMe == true) {
      tempA = this.initialA;
      push();
      drawingContext.shadowColor = color(this.FamiliarRGBA);
      drawingContext.shadowBlur = 20;
      strokeWeight(3);
      stroke("yellow");
      ellipse(this.posX, this.posY, this.size); //stroke me
      pop();
    }
    if (this.Familiar == true && this.isMe == false) {
      push();
      //fill(this.FamiliarRGBA);  //
      drawingContext.shadowColor = color(this.FamiliarRGBA);
      drawingContext.shadowBlur = 20;
      strokeWeight(3);
      stroke("yellow");
      fill("white");
      ellipse(this.posX, this.posY, this.size);
      pop();
    } else {
      push();
      this.initialR += random([-5, 5]);
      this.initialG += random([-5, 5]);
      this.initialB += random([-5, 5]);
      fill(this.initialR, this.initialG, this.initialB, tempA); //陌生人逐渐变色
      ellipse(this.posX, this.posY, this.size);
      pop();
    }
  }

  joinSpots(spots) {
    spots.forEach((element) => {
      let dis = dist(this.posX, this.posY, element.posX, element.posY);
      if (dis < 55) {
        if (this.isMe == true) {
          //
          push();
          drawingContext.shadowColor = color(this.FamiliarRGBA);
          drawingContext.shadowBlur = 20;
          strokeWeight(3);
          stroke("yellow");
          if (element.Familiar == false) {
            KnownPopulation++;
          }
          element.Familiar = true; //
        } else if (element.isMe == true) {
          push();
          drawingContext.shadowColor = color(this.FamiliarRGBA);
          drawingContext.shadowBlur = 20;
          strokeWeight(3);
          stroke("yellow");
          if (this.Familiar == false) {
            KnownPopulation++;
          }
          this.Familiar = true;
        } else {
          //
          push();
          drawingContext.shadowColor = color("white");
          drawingContext.shadowBlur = 10;
          stroke("rgba(255,255,255,0.2)");
        }
        line(this.posX, this.posY, element.posX, element.posY);
        pop();
      }
    });
  }

  //
  CountLastKnown(spots) {
    spots.forEach((element) => {
      let dis = dist(this.posX, this.posY, element.posX, element.posY);
      if (dis < 55) {
        if (this.isMe == true) {
          //
          LastConnectedPopulation++; //
        } else if (element.isMe == true) {
          LastConnectedPopulation++;
        }
      }
    });
    LastConnectedPopulation -= 1;
    return LastConnectedPopulation;
  }

  //self(spots) {
  // spots.forEach(element =>{
  //   let dis = dist(mouseX,mouseY,element.posX,element.posY);
  //   if(dis<55) {
  //     stroke('rgba(255,255,0,1)');
  //     line(mouseX,mouseY,element.posX,element.posY);
  //     element.Familiar = true;
  //   }
  // });
  //}
}
