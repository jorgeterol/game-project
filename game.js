//  Data structures etc

'use strict'

function mainGame() {

    function Character() {
        this.x = 0;
        this.y = 480;
        this.w = 20;
        this.h = 20;
        this.speedX = 10;
        this.speedY = -5;
        this.bottom = true;

    }

    function Platform() {
        this.x = 100;
        this.y = 380;
        this.w = 60;
        this.h = 10;

    }

    var character = new Character();
    var platform = new Platform();

    var gravity = 0.1;

    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');

    // ******************
    // ******************
    // FRAME FUNCTION
    // ******************
    // ******************

    function frame() {

        // CLEAR CANVAS

        function clearCanvas() {
            ctx.clearRect(0, 0, 500, 500);
        }

        // DRAWING CANVAS

        function draw(object) {
            ctx.fillRect(object.x, object.y, object.w, object.h);
        }

        // UPDATING CANVAS

        function updateCanvas() {
            clearCanvas();
            draw(character);
            draw(platform);

            if (character.bottom == false) {
                jump()
            }
        }


        updateCanvas()

        window.requestAnimationFrame(frame);

    }

    function keyHandler(event) {
        switch (event.keyCode) {
            case 39: // Right
                moveRight();
                break;

            case 37: // Left
                moveLeft();
                break;

            case 38: // Arrow Up        
                // THE ARROW UP IS FOR JUMPING, WE NEED TO RECREATE SOME KIND OF "GRAVITY", THE ARROW DOWN IT'S NOT USEFUL I THINK.
                jump();
                break;
        }
    }


    window.addEventListener('keydown', keyHandler) // Not sure if window is the best option.


    // ******************
    // ******************
    // MOVING FUNCTIONS
    // ******************
    // ******************

    function moveRight() {

        if (character.x <= 470) { //470 BECAUSE THE WIDHT OF THE CANVAS IS 500 AND IT NEED TO STOP BEFORE REACHING THE END. THE COORDENATES START AT THE TOP RIGHT OF THE SQUARE. 
            character.x += character.speedX;
        }

    }

    function moveLeft() {
        if (character.x >= 10) { //SAME HERE WITH 10.
            character.x -= character.speedX;
        }
    }

    function jump() {
        var rockBottom = 500 - character.h;

        if (character.y > rockBottom) {
            character.bottom = true;

            character.y = rockBottom;
            character.speedY = -5;

        } else {
            character.bottom = false;

            character.speedY += gravity;
            character.y += character.speedY;

        }
    }    

    window.requestAnimationFrame(frame);

}

// window.addEventListener('load', mainGame); It's in main.js