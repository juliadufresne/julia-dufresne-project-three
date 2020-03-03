// Namespacing
const game = {};

// Start button
game.start = $('.start')


// COLLISION FUNCTION (modified from https://gist.github.com/jaxxreal/7527349 )
// Checks if any side of the character intersects with any side of the collider
// If they don't intersect - return false (all clear, keep playing)
// If they do intersect - return true (collision detected, game over)
game.checkCollision = function (enemy) {
    let x1 = game.character.offset().left;
    let y1 = game.character.offset().top;
    let h1 = game.character.outerHeight(true);
    let w1 = game.character.outerWidth(true);
    let b1 = y1 + h1;
    let r1 = x1 + w1;
    let x2 = $(enemy).offset().left;
    let y2 = $(enemy).offset().top;
    let h2 = $(enemy).outerHeight(true);
    let w2 = $(enemy).outerWidth(true);
    let b2 = y2 + h2;
    let r2 = x2 + w2;

    let characterAboveEnemy = b1 < y2;
    let enemyAboveCharacter = y1 > b2;
    let enemyLeftCharacterRight = r1 < x2;
    let enemyRightCharacterLeft = x1 > r2;

    // If the character and enemy are clear of eachother, keep going, collision is false
    if (enemyAboveCharacter || characterAboveEnemy || enemyLeftCharacterRight || enemyRightCharacterLeft) {
        return false;

    } else {
        // If the character and enemy collide, collision is true
        return true;
    }
}


// CHECK LEFT FUNCTION
// Checks if it is safe to continue moving left without intersecting with a wall
// On every keydown that goes left, the first thing that happens is updating the characters position
// If the updated position is less than or equal to where the left wall starts
// State that check left is false AKA cannot move anymore
// Otherwise, keep moving
game.checkLeft = function () {
    game.characterPosition = game.character.position();
    if (game.characterPosition.left <= 30) {
        return false;
    } else {
        return true;
    }
}


// CHECK RIGHT FUNCTION
// Checks if it is safe to continue moving right without intersecting with a wall
// On every keydown that goes right, the first thing that happens is updating the characters position
// If the updated position is less than or equal to where the right wall starts
// State that check left is false AKA cannot move anymore
// Otherwise, keep moving
game.checkRight = function () {
    game.characterPosition = game.character.position();
    if (game.characterPosition.left >= (game.gameAreaWidth - 90)) {
        return false;
    } else {
        return true;
    }
}


// No collision is happening on any colliders
game.noCollision = function () {
    return game.checkCollision(game.collider) === false && game.checkCollision(game.collider2) === false && game.checkCollision(game.collider3) === false && game.checkCollision(game.collider4) === false && game.checkCollision(game.collider5) === false && game.checkCollision(game.collider6) === false && game.checkCollision(game.collider7) === false && game.checkCollision(game.collider8) === false
}


// A collision is happening on any colliders
game.anyCollision = function () {
    return game.checkCollision(game.collider) === true || game.checkCollision(game.collider2) === true || game.checkCollision(game.collider3) === true || game.checkCollision(game.collider4) === true || game.checkCollision(game.collider5) === true || game.checkCollision(game.collider6) === true || game.checkCollision(game.collider7) === true || game.checkCollision(game.collider8) === true
}


// ANIMATES AND MOVES CHARACTERS WITH KEYBOARD
// Checks if its safe to move character (that it's not intersecting with wall or collider)
// Calls checkLeft(), checkRight(), checkCollision(), noCollision(), anyCollision()
// If the left key is clicked:
// The return value is stored in "safe" AKA if the character is hitting the wall it's false, if the character is not hitting the wall its true
// It is not hitting the wall AND check if the character is intersecting with the collider
// Continue to move right
// If it is hitting the wall
// Do nothing

// If the right key is clicked:
// The return value is stored in "safe" AKA if the character is hitting the wall it's false, if the character is not hitting the wall its true
// It is not hitting the wall AND check if the character is intersecting with the collider
// Continue to move right
// If it is hitting the wall or a collider
// Do nothing
game.moveChecker = function (e) {
    if (e.which === 37) {
        let safe = game.checkLeft();

        if (safe === true && game.noCollision()) {
            game.characterX = game.characterX - 20;
            game.character.css("--x", game.characterX + "px");
        } else {

        }
    } else if (e.which === 39) {
        let safe = game.checkRight();

        if (safe === true && game.noCollision()) {

            game.characterX = game.characterX + 20;
            game.character.css("--x", game.characterX + "px")
        } else {

        }
    }
}


// ANIMATES AND MOVES CHARACTERS WITH TOUCHSCREEN
game.touchMoveChecker = function (e) {
    const touchX = e.originalEvent.touches[0].pageX;
    const gameWidth = touchX - this.offsetLeft;

    if (gameWidth < 250) {
        let safe = game.checkLeft();

        if (safe === true && game.noCollision()) {
            game.characterX = game.characterX - 20;
            game.character.css("--x", game.characterX + "px");

        } else {
            // DO NOTHING
        }
    }

    if (gameWidth > 250) {
        let safe = game.checkRight();

        if (safe === true && game.noCollision()) {
            game.characterX = game.characterX + 20;
            game.character.css("--x", game.characterX + "px");

        } else {
            // DO NOTHING
        }
    }
};


// IF THERE IS NO COLLISION, CONTINUE ANIMATING COLLIDERS EVER EIGHT SECONDS
// Checks if there is no collision SPECIFICALLY with a collider, continue animating the colliders
game.resetCollider = function () {
    if (game.collisionStatus === false) {
        game.collider.offset({ top: 0 });
        game.collider.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
        game.collider.animate({
            top: "+=1600"
        }, 8000, "linear", function () {
            // Animation complete.
            collider5();
        });

        game.collider2.offset({ top: 0 });
        game.collider2.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
        game.collider2.delay(2000).animate({
            top: "+=1600"
        }, 8000, "linear", function () {
            // Animation complete.
            collider6();
        });

        game.collider3.offset({ top: 0 });
        game.collider3.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
        game.collider3.delay(4000).animate({
            top: "+=1600"
        }, 8000, "linear", function () {
            // Animation complete.
            collider7();
        });

        game.collider4.offset({ top: 0 });
        game.collider4.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
        game.collider4.delay(6000).animate({
            top: "+=1600"
        }, 8000, "linear", function () {
            // Animation complete.
            collider8();
        });
    }
}

function collider5() {
    game.collider5.offset({ top: 0 });
    game.collider5.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
    game.collider5.animate({
        top: "+=1600"
    }, 8000, "linear", function () {
        // Animation complete.
    });
}

function collider6() {
    game.collider6.offset({ top: 0 });
    game.collider6.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
    game.collider6.animate({
        top: "+=1600"
    }, 8000, "linear", function () {
        // Animation complete.
    });
}

function collider7() {
    game.collider7.offset({ top: 0 });
    game.collider7.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
    game.collider7.animate({
        top: "+=1600"
    }, 8000, "linear", function () {
        // Animation complete.
    })
}

function collider8() {
    game.collider8.offset({ top: 0 });
    game.collider8.css('left', Math.floor(Math.random() * (game.gameAreaWidth - 85)))
    game.collider8.animate({
        top: "+=1600"
    }, 8000, "linear", function () {
        // Animation complete.
    })
}


// GAME OVER FUNCTION
// If there is a collision SPECIFICALLY with a collider, stop animation, game is over
// Use SweetAlert.js to notify game over, and give option to play again
// If play again is clicked, reload page which refreshes start button to play again
game.over = setInterval(function () {

    if (game.collisionStatus === false) {
        if (game.anyCollision() === true) {
            game.collisionStatus = true;
            game.collider.animate().stop();
            game.collider2.animate().stop();
            game.collider3.animate().stop();
            game.collider4.animate().stop();
            game.collider5.animate().stop();
            game.collider6.animate().stop();
            game.collider7.animate().stop();
            game.collider8.animate().stop();
            game.stopGameOver();
            swal({
                title: "Game over!",
                text: "Your hot air balloon got lost in the sky",
                button: "Play again  ☁️",
                closeOnClickOutside: false,
            }).then(() => {
                window.location.reload();
                window.scrollTo({
                    top: 1,
                    left: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}, 200);


// STOP INTERVAL ON GAME OVER
// If game is over, clear interval
game.stopGameOver = function () {
    clearInterval(game.over)
}


// CALL ALL NECESSARY FUNCTIONS AND EVENT LISTENERS TO MAKE GAME WORK IN INIT
// Animates colliders right off the bat
// Senses keystrokes and moves character accordingly
game.init = function () {

    // Character
    game.character = $(".character");

    // Colliders
    game.collider = $(".collider");
    game.collider2 = $(".collider2");
    game.collider3 = $(".collider3");
    game.collider4 = $(".collider4");
    game.collider5 = $(".collider5");
    game.collider6 = $(".collider6");
    game.collider7 = $(".collider7");
    game.collider8 = $(".collider8");

    // Checks x and y position of character
    game.characterPosition = game.character.position();

    // Updates character to move (sets starting point to zero)
    game.characterX = 0;

    // Sets collision to false right from the beginning
    game.collisionStatus = false;

    // Checks width of game area based on screen size
    game.gameAreaWidth = $('.gameArea').width();

    // Initiate keydown character to move
    $(document).on('keydown', game.moveChecker);

    // Initiate on touch character to move
    $(".gameArea").on('touchstart', game.touchMoveChecker);

    // Reset collider animation
    game.resetCollider();

    // Set interval for collider animations
    game.resetAnimation = setInterval(game.resetCollider, 16000);

}


// CALLS INIT 
// On click of start button, call animation function and sense if keys or touch is happening
// Disable start button
// If there is no collision (as checked with resetCollider()), run animation of the colliders again
game.startGame = function () {
    $(game.start).on('click', function () {
        game.init();
        $(this).prop('disabled', true);
        $('html, body').animate({
            scrollTop: $("main").offset().top
        }, 2000);
    });
}


// START GAME
// Start game in document ready
$(function () {
    game.startGame();
});