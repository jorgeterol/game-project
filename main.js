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
            <div>
            <h1 class="big-title">Tiny Platform</h1>
            </div>
            <div class="title-buttons">
            <button type="button" class="btn btn-outline-secondary btn-lg btn-block align-middle btn-start">Start Game</button>
            <button type="button" class="btn btn-outline-secondary btn-lg btn-block align-middle btn-instructions">Instructions</button>
            </div>`);

        mainContentElement.appendChild(titleScreenElement);

        startButtonElement = titleScreenElement.querySelector('.btn-start');
        startButtonElement.addEventListener('click', handleStartClick);

        // instructionButtonElement = titleScreenElement.querySelector('btn-instructions');
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

        game.gameOver(handleGameOverClick);

    }

    function destroyGameScreen() {

        game.destroy();

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