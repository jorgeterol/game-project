//  Data structures etc

'use strict'

function Game(parentElement) {
    var self = this;

    self.parentElement = parentElement;
    self.gameScreenElement = null;

    self.gameOverButtonElement = null;

    self.canvasElement;
    self.ctx = null;

    self.player = new Player();
    self.platform = new Platform();
    self.coin = new Coin();
    self.enemy = new Enemy();

    self.gameOverCallback = null;

    self.score = 0;

    self.init();
}

Game.prototype.init = function () {
    var self = this;

    self.createGame();
    self.playerMovement();
    self.renderFrame();

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


    self.canvasElement = self.gameScreenElement.querySelector('#canvas-id')
    self.canvasElement.height = 500;
    self.canvasElement.width = 500;
    self.ctx = self.canvasElement.getContext('2d');
    self.ctx.fillStyle = 'red';

    self.parentElement.appendChild(self.gameScreenElement);
    self.renderFrame();

}

Game.prototype.playerMovement = function () {

    var self = this;

    self.keyDownHandler = function (event) {
        switch (event.keyCode) {
            case 39: // Right
                self.player.setDirection('right')
                self.player.setSpeed(2.5)
                break;

            case 37: // Left
                self.player.setDirection('left')
                self.player.setSpeed(2.5)
                break;

            case 38: // Arrow Up        
                self.player.setDirection('up')
                break;
        }
    }

    self.keyUpHandler = function (event) {
        switch (event.keyCode) {
            case 39: // Right
                self.player.setSpeed(0)
                break;

            case 37: // Left
                self.player.setSpeed(0)
                break;

        }
    }

    window.addEventListener('keydown', self.keyDownHandler);
    window.addEventListener('keyup', self.keyUpHandler);
}

Game.prototype.clearCanvas = function () {
    var self = this;

    self.ctx.clearRect(0, 0, 500, 500);
}

Game.prototype.draw = function (object) {
    var self = this;

    self.ctx.fillStyle = object.color;
    self.ctx.fillRect(object.x, object.y, object.w, object.h);
}

Game.prototype.renderFrame = function () {
    var self = this;

    self.player.update();
    self.clearCanvas();
    self.draw(self.player);
    self.draw(self.platform);
    self.draw(self.coin);
    self.draw(self.enemy);


    if (self.player.x == 472.5 && self.player.y == 480) {
        self.gameOverCallback();
    }


    if ((self.player.x + self.player.w) === self.coin.x && (self.player.y + (self.player.h - self.coin.h)) === self.coin.y && self.coin.w > 0) {
        self.coinCollisionDetected();
    }

    if (self.player.x === self.coin.x && (self.player.y + (self.player.h - self.coin.h)) === self.coin.y && self.coin.w > 0) {
        self.coinCollisionDetected();
    }

    if ((self.player.x + self.player.w) === self.enemy.x && self.player.y == self.enemy.y && self.enemy.w > 0) {
        self.enemyCollisionDetected();
    }

    window.requestAnimationFrame(function () {
        self.renderFrame();
    });

}

Game.prototype.coinCollisionDetected = function () {
    var self = this;

    self.coin.w = 0;
    self.coin.h = 0;

    self.score += 10;
    console.log(self.score);
}

Game.prototype.enemyCollisionDetected = function () {
    var self = this;

    self.player.x = 0;
    self.player.y = 480;

    self.score -= 10;
    console.log(self.score);
}

Game.prototype.gameOver = function (callback) {
    var self = this;

    self.gameOverCallback = callback;
}

Game.prototype.destroy = function () {
    var self = this;

    self.gameScreenElement.remove();
}