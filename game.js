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
    self.coin = new Coin(250, 485);
    self.coin2 = new Coin(200, 485);
    self.enemy = new Enemy(320, 480);
    self.enemy2 = new Enemy(100, 480);

    self.gameOverCallback = null;
    self.gameWonCallback = null;

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
                self.player.setSpeed(5)
                break;

            case 37: // Left
                self.player.setDirection('left')
                self.player.setSpeed(5)
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

    if (self.score === 20) {
        return self.gameWonCallback();
    }

    self.player.update();
    self.clearCanvas();
    self.draw(self.player);
    self.draw(self.platform);
    self.draw(self.coin);
    self.draw(self.coin2);
    self.draw(self.enemy);
    // self.draw(self.enemy2);
    // self.enemy.movement();
    self.scoreElement.innerText = self.score;
    self.livesElement.innerText = self.lives;

    self.coinCheckCollision(self.player, self.coin);
    self.coinCheckCollision(self.player, self.coin2);

    self.enemyCheckCollision(self.player, self.enemy);
    // self.enemyCheckCollision(self.player, self.enemy2);

    self.platformCheckCollision(self.player, self.platform);


    window.requestAnimationFrame(function () {
        self.renderFrame();
    });

}

Game.prototype.coinCheckCollision = function (player, coin) {
    var self = this;

    if ((player.x + player.w) === coin.x && (player.y + (player.h - coin.h)) === coin.y && coin.w > 0) {
        self.coinCollisionDetected(coin);

    }

    if (player.x === coin.x && (player.y + (player.h - coin.h)) === coin.y && coin.w > 0) {
        self.coinCollisionDetected(coin);
    }
}

// Game.prototype.playerGroundCollision = function (player) {
//     var self = this;

//     if ((player.y + player.h) === 500) {
//         self.coinCollisionDetected(coin);
//     }


// }

// Game.prototype.playerGroundCollision = function (player) {
//     var self = this;

//     if ((player.y + player.h) === 500) {
//         self.coinCollisionDetected(coin);
//     }


// }

Game.prototype.coinCollisionDetected = function (coin) {
    var self = this;

    coin.w = 0;
    coin.h = 0;

    self.score += 10;
}


Game.prototype.enemyCheckCollision = function (player, enemy) {
    var self = this;

    if ((player.x + player.w) === enemy.x && player.y == enemy.y && enemy.w > 0) {
        self.enemyCollisionDetected(enemy);
    }

}

Game.prototype.enemyCollisionDetected = function (enemy) {
    var self = this;

    self.player.x = 0;
    self.player.y = 480;

    self.score -= 5;
    self.lives -= 1;
}

Game.prototype.platformCheckCollision = function (player, platform) {
    var self = this;

    if (player.y === (platform.y + platform.h) && player.x > platform.x && player.x === (platform.x + platform.w)) {
        player.y = platform.y - player.h;
        player.x = platform.x;
        player.jumping = false;
    }

}

Game.prototype.platformCollisionDetected = function () {
    var self = this;

    console.log('now');

}


Game.prototype.gameOver = function (callback) {
    var self = this;

    self.gameOverCallback = callback;
}

Game.prototype.youWon = function (callback) {
    var self = this;

    self.gameWonCallback = callback;
}

Game.prototype.destroy = function () {
    var self = this;

    self.gameScreenElement.remove();
}