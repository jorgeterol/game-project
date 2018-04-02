//  Create the HTML structure 

'use strict'

function createHtml(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

function main() {

    var mainContentElement = document.getElementById('main-content');

    // -- TITLE SCREEN

    var titleScreenElement;
    var startButtonElement;

    function handleStartClick() {
        destroyTitleScreen();
        buildGameScreen();
        mainGame();
    }

    function buildTitleScreen() {
        titleScreenElement = createHtml(`<div class="title-screen container">
            <div>
            <h1 class="big-title">Tiny Platformer</h1>
            </div>
            <div class="title-buttons">
            <button class="btn-start">Start Game</button>
            <button class="btn-instructions">Instructions</button>
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

    // GAME SCREEN

    var gameScreenElement;
    var gameOverButtonElement; // DELETE

    function handleGameOverClick() {
        destroyGameScreen();
        buildGameOverScreen();
    }

    function buildGameScreen() {

        gameScreenElement = createHtml(`<div class="game-screen container">
            <div class="header">
            </div>
            <div class="main">
                <div>
                    <button class="btn-game-over">Game over</button>
                </div>
                <div>
                    <canvas id="canvas" width="500" height="500"></canvas>
                </div>
            </div>
            <div class="footer">
            </div>
        </div>`)

        mainContentElement.appendChild(gameScreenElement);

        gameOverButtonElement = gameScreenElement.querySelector('.btn-game-over')
        gameOverButtonElement.addEventListener('click', handleGameOverClick) //I'm adding a game over button just for testing purposes. Delete when everything works.

    }

    function destroyGameScreen() {
        gameScreenElement.remove();
        gameOverButtonElement.removeEventListener('click', handleGameOverClick);
    }


    // GAME-OVER SCREEN

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