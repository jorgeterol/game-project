//  Data structures etc

'use strict'

function Game(parentElement, config) {
    var self = this;

    self.parentElement = parentElement;
    self.gameScreenElement = null;
    self.scoreElement = null;
    self.livesElement = null;

    self.canvasElement;
    self.ctx = null;


    self.player = new Player();
    self.platforms = config.platforms.map(function(item) {
        return new Platform(item.x, item.y, item.w, item.fades)
    });
    self.coins = config.coins.map(function(item) {
        return new Coin(item.x, item.y);
    });
    self.enemies = config.enemies.map(function(item) {
        return new Enemy(item.x, item.y);
    });


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
                self.player.jump()
                self.currentPlatform = null;
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


    self.player.draw(self.ctx);

    self.coins.forEach(function (coin) {
        coin.draw(self.ctx);
    })

    self.enemies.forEach(function (enemy) {
        enemy.draw(self.ctx);
    })

    self.platforms.forEach(function (platform) {
        platform.draw(self.ctx);
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

    self.platforms.forEach(function (platform) {
        platform.update();
    });

    self.player.update();

    self.playerGroundCollision();
    self.platformCheckCollision();
    self.purgePlatforms();
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
        self.player.resetStatus(rockBottom);
    }
}

Game.prototype.coinCheckCollision = function () {
    var self = this;

    self.coins.forEach(function (coin) {
        if ((self.player.x + self.player.w) === coin.x && (self.player.y - (self.player.h - coin.h)) === coin.y) {
            self.coinCollisionDetected(coin);

        } else if ((coin.x + coin.w) === self.player.x && (self.player.y - (self.player.h - coin.h)) === coin.y) {
            self.coinCollisionDetected(coin);

        } else if (self.player.x + self.player.w > coin.x && self.player.x + self.player.w <= coin.x + coin.w && (self.player.y - (self.player.h - coin.h)) === coin.y) {
            self.coinCollisionDetected(coin);

        } else if (coin.x + coin.w > self.player.x && coin.x + coin.w <= self.player.x + self.player.w && (self.player.y - (self.player.h - coin.h)) === coin.y) {
            self.coinCollisionDetected(coin);
        }
    })

}

Game.prototype.coinCollisionDetected = function (coin) {
    var self = this;
    var indexOfCoin = self.coins.indexOf(coin);

    self.coins.splice(indexOfCoin, 1);

    self.score += 10;
}


Game.prototype.enemyCheckCollision = function () {
    var self = this;

    self.enemies.forEach(function (enemy) {
        if ((self.player.x + self.player.w) === enemy.x && (self.player.y - (self.player.h - enemy.h)) === enemy.y) {
            self.enemyCollisionDetected(enemy);

        } else if ((enemy.x + enemy.w) === self.player.x && (self.player.y - (self.player.h - enemy.h)) === enemy.y) {
            self.enemyCollisionDetected(enemy);

        } else if (self.player.x + self.player.w > enemy.x && self.player.x + self.player.w <= enemy.x + enemy.w && (self.player.y - (self.player.h - enemy.h)) === enemy.y) {
            self.enemyCollisionDetected(enemy);

        } else if (enemy.x + enemy.w > self.player.x && enemy.x + enemy.w <= self.player.x + self.player.w && (self.player.y - (self.player.h - enemy.h)) === enemy.y) {
            self.enemyCollisionDetected(enemy);
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

    if (self.currentPlatform) {
        var playerOffPlatform = self.player.x + self.player.w <= self.currentPlatform.x || self.player.x >= self.currentPlatform.x + self.currentPlatform.w;
        if (self.currentPlatform.gone || playerOffPlatform) {
            self.player.fall();
            self.currentPlatform.setCollided(false);
            self.currentPlatform = null;
        }
    }

    if (!self.currentPlatform) {
        self.platforms.forEach(function (platform) {
            if (self.player.collidesWithPlatform(platform)) {
                self.player.resetStatus(platform.y - self.player.h);
                platform.setCollided(true);
                self.currentPlatform = platform;
            }
        });
    }
}

Game.prototype.purgePlatforms = function () {
    var self = this;

    self.platforms = self.platforms.filter(function (platform) {
        return !platform.gone;
    });
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