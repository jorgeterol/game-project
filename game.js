//  Data structures etc

'use strict'

function Game(parentElement) {
    var self = this;

    self.parentElement = parentElement;
    self.gameScreenElement = null;

    self.gameOverButtonElement = null;

    self.canvasElement;
    self.ctx = null;

}

Game.prototype.createGame = function () {
    var self = this;

    self.gameScreenElement = createHtml(`<div class="game-screen container">
        <div class="header">
        </div>
        <div class="main">
        <div>
        <button class="btn-game-over">Game over</button>
        </div>
        <div>
        <canvas id="canvas-id"></canvas>
        </div>
        </div>
        <div class="footer">
        </div>
        </div>`)


    self.gameOverButtonElement = self.gameScreenElement.querySelector('.btn-game-over')
    // self.gameOverButtonElement.addEventListener('click', handleGameOverClick) //I'm adding a game over button just for testing purposes. Delete when everything works.

    self.canvasElement = self.gameScreenElement.querySelector('#canvas-id')
    self.canvasElement.height = 500;
    self.canvasElement.width = 500;
    self.ctx = self.canvasElement.getContext('2d');

    self.parentElement.appendChild(self.gameScreenElement);
}


Game.prototype.gameFrame = function (player, platform) {
    var self = this;

    self.updateCanvas(player, platform)
}

Game.prototype.clearCanvas = function () {
    var self = this;

    self.ctx.clearRect(0, 0, 500, 500);
}

Game.prototype.draw = function (object) {
    var self = this;

    self.ctx.fillRect(object.x, object.y, object.w, object.h);
}

Game.prototype.updateCanvas = function (player, platform) {
    var self = this;

    self.clearCanvas();
    self.draw(player);
    self.draw(platform);


    if (player.bottom === false) {
        player.jump()
    }


    if (player.x == 480 && player.y == 480) {
        self.gameOver();

    }

    // self.hitBottom(player);

    window.requestAnimationFrame(function () {
        self.gameFrame(player, platform);
    });

    

}

// Game.prototype.hitBottom = function (player) {
//     var self = this;

//     if (player.x == 100 && player.y < 360) {
//         console.log(player.speedY);
//         player.x = 100;
//         player.y = 360;
//         player.bottom = true;
        
//     }
//     else {
//         player.bottom = false;
//     }
// }

Game.prototype.gameOver = function (player) {
    var self = this;

    self.gameScreenElement.remove();

}

// requestAnimationFrame
// Aceder a las funciones de main.js
// Move