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
            if (!self.jumping && self.grounded) {
                self.jumping = true;
                self.grounded = false;
                self.speedY = -5;
                break;
            }
    }

    if (self.jumping && !self.grounded) {
        self.jump(); 
    }
    else{
        self.speedY = 0;
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

Player.prototype.jump = function () {
    var self = this;

    var rockBottom = 500 - self.h;

    if (self.y > rockBottom) {
        self.jumping = false;
        self.grounded = true;
        self.direction = null;

        self.y = rockBottom;
        self.speedY = 0;
    }

    if (!self.grounded && self.jumping){
        self.speedY += self.gravity;
        self.y += self.speedY;
    }

 
    // else {
    //     self.speedY += self.gravity;
    //     self.y += self.speedY;
    // }
}