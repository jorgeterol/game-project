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
    self.platforms = [new Platform(200, 200), new Platform(280, 250), new Platform(80, 550), new Platform(180, 500), new Platform(380, 400), new Platform(500, 300), new Platform(600, 200), new Platform(640, 540), new Platform(100, 100)]
    self.coins = [new Coin(330, 575), new Coin(220, 175), new Coin(600, 175), new Coin(700, 575), new Coin(140, 75) ];
    self.enemies = [new Enemy(420, 575), new Enemy(250, 575), new Enemy(280, 225), new Enemy(635, 175), new Enemy(100, 75)];


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

    self.canvasElement.width = 800;
    self.canvasElement.height = 600;
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

    self.ctx.clearRect(0, 0, self.canvasElement.width, self.canvasElement.height);
}

Game.prototype.draw = function (object) {
    var self = this;

    self.ctx.fillStyle = self.player.color;
    self.ctx.fillRect(self.player.x, self.player.y, self.player.w, self.player.h);
    self.ctx.clearRect(self.player.x + 5, self.player.y + 5, 15, 15);
    

    self.coins.forEach(function (coin) {
        self.ctx.fillStyle = coin.color;
        self.ctx.drawImage(coin.img, coin.x, coin.y, coin.w, coin.h);
    })

    self.enemies.forEach(function (enemy) {
        self.ctx.fillStyle = enemy.color;
        self.ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    })

    self.platforms.forEach(function (platform) {
        self.ctx.fillStyle = platform.color;
        self.ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    })


}

Game.prototype.renderFrame = function () {
    var self = this;


    if (self.lives === 0) {
        return self.gameOverCallback();
    }

    if (self.coins.length === 0) {
        return self.gameWonCallback();
    }


    self.player.update();
    self.playerGroundCollision();
    self.platformCheckCollision();
    self.coinCheckCollision();
    self.enemyCheckCollision();


    self.clearCanvas();
    self.draw();

    self.scoreElement.innerText = self.score;
    self.livesElement.innerText = self.lives;


    window.requestAnimationFrame(function () {
        self.renderFrame();
    });

}

Game.prototype.playerGroundCollision = function () {
    var self = this;
    var rockBottom = self.canvasElement.height - self.player.h;

    if (self.player.y > rockBottom) {
        self.player.resetStatus();
        self.player.speedY = 0;
        self.player.y = rockBottom;
    }
}

Game.prototype.coinCheckCollision = function () {
    var self = this;

    self.coins.forEach(function (coin) {
        if ((self.player.x + self.player.w) === coin.x && (self.player.y + (self.player.h - coin.h)) === coin.y && coin.w > 0) {
            self.coinCollisionDetected(coin);

        }

        if ((coin.x + coin.w) === self.player.x && (self.player.y + (self.player.h - coin.h)) === coin.y && coin.w > 0) {
            self.coinCollisionDetected(coin);

        }

        if (self.player.x >= coin.x && self.player.x <= (coin.x + coin.w) && (self.player.y + (self.player.h - coin.h)) === coin.y) {
            self.coinCollisionDetected(coin);
        }
    })

}

Game.prototype.coinCollisionDetected = function (coin) {
    var self = this;

    self.coins.splice(self.coins.indexOf(coin), 1);

    self.score += 10;
}


Game.prototype.enemyCheckCollision = function () {
    var self = this;

    self.enemies.forEach(function (enemy) {
        if ((self.player.x + self.player.w) === enemy.x && self.player.y == enemy.y && enemy.w > 0) {
            self.enemyCollisionDetected();
        }


        if ((enemy.x + enemy.w) === self.player.x && (self.player.y + (self.player.h - enemy.h)) === enemy.y && enemy.w > 0) {
            self.enemyCollisionDetected();
        }


        if (self.player.x >= enemy.x && self.player.x <= (enemy.x + enemy.w) && (self.player.y + (self.player.h - enemy.h)) === enemy.y) {
            self.enemyCollisionDetected();
        }
    });

}

Game.prototype.enemyCollisionDetected = function () {
    var self = this;

    self.player.x = 0;
    self.player.y = self.canvasElement.height - self.player.h;

    self.score -= 5;
    self.lives -= 1;
}

Game.prototype.platformCheckCollision = function () {
    var self = this;

    self.platforms.forEach(function (platform) {
        if (self.player.y <= platform.y && self.player.y >= platform.y - self.player.h && self.player.speedY >= 0) {
            if (self.player.x + self.player.w > platform.x && self.player.x < platform.w + platform.x) {
                self.player.resetStatus();

                self.player.y = platform.y - self.player.h;
                self.player.speedY = 0;

            } else if ((self.player.x <= platform.x && self.player.x >= platform.x - self.player.x) || (self.player.x >= platform.x + platform.w && self.player.x <= platform.x + platform.w + self.player.w)) {
                self.player.grounded = false;
                self.player.jumping = true;
                self.player.speedY += self.player.gravity;
            }
        }
    });
}

Game.prototype.gameOver = function (callback) {
    var self = this;

    self.gameOverCallback = callback;
}

Game.prototype.winningCondition = function (coin) {
    return coin.w === 0;
}

Game.prototype.youWon = function (callback) {
    var self = this;

    self.gameWonCallback = callback;
}

Game.prototype.destroy = function () {
    var self = this;

    self.gameScreenElement.remove();
}