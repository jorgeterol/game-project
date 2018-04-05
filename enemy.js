'use strict'

function Enemy(x,y) {
    var self = this;

    self.x = x;
    self.y = y;
    self.w = 25;
    self.h = 25;
    self.color = 'blue';


}

// Enemy.prototype.movement = function () {
//     var self = this;

//     if (self.x <= 320) {
//         self.x++
//     } else if (self.x <= 330) {
//         self.x--
//     }
// }