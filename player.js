'use strict'

function Player() {
    var self = this;

    self.x = 0;
    self.y = 480;
    self.w = 20;
    self.h = 20;
    self.speedX = 10;
    self.speedY = -5;
    self.gravity = 0.1;
    self.bottom = true;

}


Player.prototype.moveRight = function () {
    var self = this;

    if (self.x <= 470) {
        self.x += self.speedX;
    }

}

Player.prototype.moveLeft = function () {
    var self = this;

    if (self.x >= 10) {
        self.x -= self.speedX;
    }
}

Player.prototype.jump = function () {
    var self = this;

    var rockBottom = 500 - self.h;

     if (self.y > rockBottom) {
         self.bottom = true;

         self.y = rockBottom;
         self.speedY = -5;

     } 

     else {
         self.bottom = false;

         self.speedY += self.gravity;
         self.y += self.speedY;

     }

    // if (self.bottom === true) {
    //     self.speedY = -5;
    //     self.y = rockBottom;

    // } else if (self.bottom === false) {
    //     self.speedY += self.gravity;
    //     self.y += self.speedY;
    //     if (self.y > rockBottom) {
    //         self.bottom = true;
    //     }
    // }
}

Player.prototype.move = function () {
    var self = this;

    function keyHandler(event) {
        switch (event.keyCode) {
            case 39: // Right
                self.moveRight();
                break;

            case 37: // Left
                self.moveLeft();
                break;

            case 38: // Arrow Up        
                self.bottom = false;
                self.jump();
                break;
        }
    }

    window.addEventListener('keydown', keyHandler);

}

// Player.prototype.hitGround = function (platform) {
//     var self = this;

//     if (self.x === platform.x && self.y === plaftorm.y){
//         self.bottom = true;

//     }

//     console.log(self.bottom);
// }