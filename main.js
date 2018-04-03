//  Create the HTML structure 

'use strict'

function createHtml(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

function main() {

    var mainContentElement = document.getElementById('main-content');

    //  ------------------
    //  -- TITLE SCREEN
    //  ------------------

    var titleScreenElement;
    var startButtonElement;

    function handleStartClick() {
        destroyTitleScreen();
        buildGameScreen();
        // mainGame();
    }

    function buildTitleScreen() {
        titleScreenElement = createHtml(`<div class="title-screen container">
        <div class="big-title">
        <h1>Tiny Platformer</h1>
        </div>
        <div class="title-buttons">
        <div class="btn-start-div">
        <button class="btn-start">Start Game</button>
        </div>
        <div class="btn-instructions-div">
        <button class="btn-instructions">Instructions</button>
        </div>
        </div>
        </div>`);

        mainContentElement.appendChild(titleScreenElement);

        startButtonElement = titleScreenElement.querySelector('.btn-start');
        startButtonElement.addEventListener('click', handleStartClick);

        // instructionButtonElement = titleScreenElement.querySelector('button-instruction');
        // instructionButtonElement.addEventListener('click',);

    }

    function destroyTitleScreen() {
        titleScreenElement.remove();
        startButtonElement.removeEventListener('click', handleStartClick);
    }

    //  ------------------
    //  -- GAME SCREEN
    //  ------------------

    var gameScreenElement;
    var gameOverButtonElement; // DELETE

    function handleGameOverClick() {
        destroyGameScreen();
        buildGameOverScreen();
    }

    function buildGameScreen() {
        var game;

        game = new Game(mainContentElement);
        var player = new Player();
        var platform = new Platform();
        
        game.createGame();
        game.updateCanvas(player, platform);
        player.move();

    }

    function destroyGameScreen() {
        gameScreenElement.remove();
        // game.gameOverButtonElement.removeEventListener('click', handleGameOverClick);
    }

    //  ------------------
    //  -- GAME-OVER SCREEN
    //  ------------------

    var gameOverScreen;
    var restartButtonElement;

    function handleRestartClick() {
        destroyGameOverScreen();
        buildTitleScreen();
    }

    function buildGameOverScreen() {

        gameOverScreen = createHtml(`<div class="game-over-screen container">
        <h1>Score: X</h1>
        <button class="btn-restart">Restart Game</button>
        </div>`)

        mainContentElement.appendChild(gameOverScreen);

        restartButtonElement = gameOverScreen.querySelector('.btn-restart');
        restartButtonElement.addEventListener('click', handleRestartClick)

    }

    function destroyGameOverScreen() {
        gameOverScreen.remove();
        restartButtonElement.removeEventListener('click', handleRestartClick);
    }

    buildTitleScreen()
}

window.addEventListener('load', main);