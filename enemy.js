'use strict'

function Enemy(x,y) {
    var self = this;

    self.x = x;
    self.y = y;
    self.w = 25;
    self.h = 25;
    self.color = '#ecf0f1';

    self.img = new Image();
    self.img.src = 'images/enemy-img.png';



}
