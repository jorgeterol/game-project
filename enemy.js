'use strict'

function Enemy() {
    var self = this;

    self.x = 320;
    self.y = 480;
    self.w = 20;
    self.h = 20;
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