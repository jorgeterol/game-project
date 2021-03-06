'use strict'

var PLAFTORM_MAGNET_DISTANCE = 10;

function Platform(x, y, width, fades) {
    var self = this;
    
    self.x = x;
    self.y = y;
    self.w = width || 60;
    self.h = 10;
    self.color = {red: 149, green: 165, blue: 166};
    self.alpha = 1;
    self.fades = fades || false;
    self.gone = false;

    self.magnetThreshold = PLAFTORM_MAGNET_DISTANCE;

}

Platform.prototype.getColor = function () {
    var self = this;
    return 'rgba(' + self.color.red + ', ' + self.color.green + ', ' + self.color.blue + ', ' + self.alpha + ')';
};

Platform.prototype.setCollided = function (isCollided) {
    var self = this;
    self.hasCollided = self.gone || isCollided;    
};

Platform.prototype.update = function () {
    var self = this;

    if (!self.fades || !self.hasCollided) {
        return;
    }
    if (self.alpha >= 0) {
        self.alpha -= 0.01;
    }
    if (self.alpha <= 0) {
        self.alpha = 0;
        self.gone = true;
    }
};


Platform.prototype.draw = function (ctx) {
    var self = this;

    ctx.fillStyle = self.getColor();
    ctx.fillRect(self.x, self.y, self.w, self.h);
};
