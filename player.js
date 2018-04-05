'use strict'

function Player() {
    var self = this;

    self.x = 0;
    self.y = 480;
    self.w = 20;
    self.h = 20;
    self.speedX = 0;
    self.speedY = 0;
    self.gravity = 0.1;
    self.jumping = false;
    self.grounded = true;
    self.color = 'red';

}

Player.prototype.update = function () {
    var self = this;

    switch (self.direction) {
        case 'right': // Right
            self.moveRight();
            break;

        case 'left': // Left
            self.moveLeft();
            break;

        case 'up': // Arrow Up        
            // if (!self.jumping && self.grounded) {
            //     self.jumping = true;
            //     self.grounded = false;
            //     self.speedY = -5;
            //     break;
            // }
            if (!self.jumping && self.grounded) {
                self.jumping = true;
                self.grounded = false;
                self.speedY = -5;
            }
    }

    if (self.jumping && !self.grounded) {
        self.jump();
    }

}

Player.prototype.setDirection = function (direction) {
    var self = this;

    self.direction = direction;

}


Player.prototype.setSpeed = function (speedX, speedY) {
    var self = this;

    self.speedX = speedX;
    self.speedY = speedY || self.speedY;
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

Player.prototype.resetStatus = function () {
    var self = this;

    self.jumping = false;
    self.grounded = true;

    if (self.direction === 'up') {
        self.direction = null;
    }

}

Player.prototype.jump = function () {
    var self = this;

    if (!self.grounded && self.jumping) {
        self.speedY += self.gravity;
        self.y += self.speedY;
    }

    // var rockBottom = 500 - self.h;

    // if (self.y > rockBottom) {
    //     self.jumping = false;
    //     self.grounded = true;
    //     self.direction = null;
    //     self.speedY = 0;

    //     self.y = rockBottom;
    // }

    // if (self.y <= 390 && self.y >= 370 && self.speedY >= 0) {
    //     if (self.x + self.w > 100 && self.x + self.w < 160) {
    //         self.jumping = false;
    //         self.grounded = true;
    //         self.direction = null;

    //         self.y = 370;
    //         self.speedY = 0;

    //     } else if ((self.x <= 100 && self.x >= 80) || (self.x >= 160 && self.x <= 180)) {
    //         self.grounded = false;
    //         self.jumping = true;
    //         self.direction = 'up';
    //         self.speedY += self.gravity;
    //         self.y += self.speedY;
    //     }
    // }
    // if (self.y <= 390 && self.y >= 370 && self.x >= 100 && self.x <= 160) {
    //     self.jumping = false;
    //     self.grounded = true;
    //     self.direction = 'null';

    //     self.y = 370;
    //     self.speedY = 0;


    // }

    // if (self.y <= 390 && self.y >= 370 && self.x <= 100 && self.x >= 160){
    //     self.grounded = false;
    //     self.jumping = true;
    //     self.direction = 'up';
    //     self.speedY += self.gravity;
    //     self.y += self.speedY;

    // }




    // else {
    //     self.speedY += self.gravity;
    //     self.y += self.speedY;
    // }
}