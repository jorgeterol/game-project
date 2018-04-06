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
    var instructionButtonElement;
    var instructionsElement;

    function handleStartClick() {
        destroyTitleScreen();
        buildGameScreen();

    }

    function handleInstructionsClick() {
        buildInstructions();
    }

    function handleRemoveInstructionsClick(){
        instructionsElement.remove()
        instructionButtonElement.addEventListener('click', handleInstructionsClick);
    }

    function buildTitleScreen() {
        titleScreenElement = createHtml(`<div class="title-screen container">
            <div>
            <h1 class="big-title">Small Platformer</h1>
            </div>
            <div class="title-buttons">
            <button type="button" class="btn btn-outline-secondary btn-lg btn-block align-middle btn-start">Start Game</button>
            <button type="button" class="btn btn-outline-secondary btn-lg btn-block align-middle btn-instructions">Instructions</button>
            </div>`);

        mainContentElement.appendChild(titleScreenElement);

        startButtonElement = titleScreenElement.querySelector('.btn-start');
        startButtonElement.addEventListener('click', handleStartClick);

        instructionButtonElement = titleScreenElement.querySelector('.btn-instructions');
        instructionButtonElement.addEventListener('click', handleInstructionsClick);
        
    }

    function buildInstructions() {
        
        instructionsElement = createHtml(`<div class="instructions">
        <h3>- Collect all the Bitcoins.</h3>
        <h3>- Don't get hit by an enemy.</h3>
        <h3>- Moving left key: ⇦ </h3>
        <h3>- Moving right key: ⇨ </h3>
        <h3>- Jumping Key: ⇧ </h3>
        </div> `);
        
        titleScreenElement.appendChild(instructionsElement);
        instructionButtonElement.removeEventListener('click', handleInstructionsClick);
        instructionButtonElement.addEventListener('click', handleRemoveInstructionsClick);

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
    var game;

    function handleGameOverClick() {
        var self = this;

        destroyGameScreen();
        buildGameOverScreen();
    }

    function handleYouWonClick() {
        var self = this;

        destroyGameScreen();
        buildYouWonScreen();
    }

    function buildGameScreen() {

        game = new Game(mainContentElement, config);

        game.gameOver(handleGameOverClick);

        game.youWon(handleYouWonClick);

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
        <div class="big-title-score">
        <h1>Score: ` + game.score + `</h1>
        <h2>You died!</h2>
        </div>
        <button class="btn btn-outline-secondary btn-lg btn-block align-middle btn-restart">Restart Game</button>

        </div>`)

        mainContentElement.appendChild(gameOverScreen);

        restartButtonElement = gameOverScreen.querySelector('.btn-restart');
        restartButtonElement.addEventListener('click', handleRestartClick)

    }

    function destroyGameOverScreen() {
        gameOverScreen.remove();
        restartButtonElement.removeEventListener('click', handleRestartClick);
    }

    //  ------------------
    //  -- YOU WON SCREEN
    //  ------------------

    var youWonScreen;
    var restartYouWonButtonElement;

    function handleRestartWonClick() {
        destroyYouWonScreen();
        buildTitleScreen();
    }

    function buildYouWonScreen() {

        youWonScreen = createHtml(`<div class="you-won-screen container">
        <div class="big-title-score">
        <h1>Score: ` + game.score + `</h1>
        <h2>You Won!</h2>
        </div>
        <button class="btn btn-outline-secondary btn-lg btn-block align-middle btn-restart">Restart Game</button>
        </div>`)

        mainContentElement.appendChild(youWonScreen);

        restartYouWonButtonElement = youWonScreen.querySelector('.btn-restart');
        restartYouWonButtonElement.addEventListener('click', handleRestartWonClick)

    }

    function destroyYouWonScreen() {
        youWonScreen.remove();
        restartYouWonButtonElement.removeEventListener('click', handleRestartWonClick);
    }

    buildTitleScreen()
}


window.addEventListener('load', main);