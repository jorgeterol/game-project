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

Player.prototype.collidesWithPlatform = function (platform) {
    var self = this;

    var playerFalling = self.speedY >= 0;
    var verticalCollision = self.y + self.h >= platform.y - platform.magnetThreshold && self.y + self.h <= platform.y;
    var horizontalCollision = self.x + self.w > platform.x && self.x < platform.w + platform.x;
    return (self.jumping && playerFalling && verticalCollision && horizontalCollision);
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
    }


    if (!self.grounded && self.jumping) {
        self.speedY += self.gravity;
        self.y += self.speedY;
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
    else{
        self.x = 10;
    }

}

Player.prototype.moveLeft = function () {
    var self = this;

    if (self.x >= 10) {
        self.x -= self.speedX;
    }
    else{
        self.x = 775;
    }
}

Player.prototype.resetStatus = function (y) {
    var self = this;

    self.jumping = false;
    self.grounded = true;
    self.speedY = 0;
    self.y = y;

    if (self.direction === 'up') {
        self.direction = null;
    }

}

Player.prototype.jump = function () {
    var self = this;

    if (!self.jumping && self.grounded) {
        self.jumping = true;
        self.grounded = false;
        self.speedY = -5;
    }
}

Player.prototype.fall = function () {
    var self = this;

    self.grounded = false;
    self.jumping = true;
    self.speedY += self.gravity;
}

Player.prototype.draw = function (ctx) {
    var self = this;

    ctx.fillStyle = self.color;
    ctx.fillRect(self.x, self.y, self.w, self.h);
    ctx.clearRect(self.x + 5, self.y + 5, 15, 15);
};
