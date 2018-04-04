//  Data structures etc

'use strict'

function Game(parentElement) {
    var self = this;

    self.parentElement = parentElement;
    self.gameScreenElement = null;
    self.scoreElement = null;
    self.livesElement = null;

    self.canvasElement;
    self.ctx = null;

    self.player = new Player();
    self.platform = new Platform();
    self.coin = new Coin(250,488);
    self.enemy = new Enemy();

    self.gameOverCallback = null;

    self.score = 0;
    self.lives = 3;

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
    <p class="score">
    <span class="label">SCORE : </span>
    <span class="value"></span>
    </p>
    <p class="lives">
    <span class="label">LIVES : </span>
    <span class="value"></span>
    </p>
    </div>
    <div class="main">
    <div>
    <canvas id="canvas-id"></canvas>
    </div>
    </div>
    <div class="footer">
    </div>
    </div>`)


    self.canvasElement = self.gameScreenElement.querySelector('#canvas-id')
    self.scoreElement = self.gameScreenElement.querySelector('.score .value')
    self.livesElement = self.gameScreenElement.querySelector('.lives .value')

    self.canvasElement.height = 500;
    self.canvasElement.width = 500;
    self.ctx = self.canvasElement.getContext('2d');
    self.ctx.fillStyle = 'red';

    self.parentElement.appendChild(self.gameScreenElement);

}

Game.prototype.playerMovement = function () {

    var self = this;

    self.keyDownHandler = function (event) {
        switch (event.keyCode) {
            case 39: // Right
                self.player.setDirection('right')
                self.player.setSpeed(7.5)
                break;

            case 37: // Left
                self.player.setDirection('left')
                self.player.setSpeed(7.5)
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

    if (self.lives === 0) {
       return self.gameOverCallback();
    }

    self.player.update();
    self.clearCanvas();
    self.draw(self.player);
    self.draw(self.platform);
    self.draw(self.coin);
    self.draw(self.enemy);
    // self.enemy.movement();
    self.scoreElement.innerText = self.score;
    self.livesElement.innerText = self.lives;




    if ((self.player.x + self.player.w) === self.coin.x && (self.player.y + (self.player.h - self.coin.h)) === self.coin.y && self.coin.w > 0) {
        self.coinCollisionDetected();
    }

    if (self.player.x === self.coin.x && (self.player.y + (self.player.h - self.coin.h)) === self.coin.y && self.coin.w > 0) {
        self.coinCollisionDetected();
    }

    if ((self.player.x + self.player.w) === self.enemy.x && self.player.y == self.enemy.y && self.enemy.w > 0) {
        self.enemyCollisionDetected();
    }

    if (self.player.x === self.platform.x) {
        self.platformCollisionDetected();
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
}

Game.prototype.enemyCollisionDetected = function () {
    var self = this;

    self.player.x = 0;
    self.player.y = 480;

    self.score -= 5;
    self.lives -= 1;
}

Game.prototype.platformCollisionDetected = function () {
    var self = this;

    console.log('now');

}

Game.prototype.gameOver = function (callback) {
    var self = this;

    self.gameOverCallback = callback;
}

Game.prototype.destroy = function () {
    var self = this;

    self.gameScreenElement.remove();
}

Game.prototype.onGameOver = function () {
    var self = this;

    return
}

