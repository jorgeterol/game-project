'use strict'

function Player() {
    var self = this;

    self.x = 0;
    self.y = 575;
    self.w = 25;
    self.h = 25;
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

    if (self.x <= 775) {
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

}