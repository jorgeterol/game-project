'use strict'

function Coin(x, y) {
    var self = this;

    self.x = x;
    self.y = y;
    self.w = 25;
    self.h = 25;
    self.color = 'yellow';

    self.img = new Image();
    self.img.src = 'images/bitcoin.png'
}

Coin.prototype.draw = function (ctx) {
    var self = this;
    
    ctx.fillStyle = self.color;
    ctx.drawImage(self.img, self.x, self.y, self.w, self.h);
};
