var tpiece;
var game;
var score;
var level;
var lines;

function setup() {
    //background(200);
    createCanvas(300, 600);
    frameRate(60);
    clr = color(255, 0, 0);
    game = new Arena(10,20);
    newPiece();
    score = 0;
    level = 0;
    lines = 0;
}

var dropTimer = 0;
var dropCap = 60;
var dropCapRate = .99;
var lastAction;

function draw() {
    background(230);

    dropTimer++;
    if (dropTimer >= dropCap) {
        dropTimer = 0;
        tpiece.moveDown();
        lastAction = "down";
    }

    isOut = game.outOfBounds(tpiece);

    while (isOut) {
        console.log(isOut);
        if (isOut == "left") {
            tpiece.moveRight();
        } else if (isOut == "right") {
            tpiece.moveLeft();
        } else if (isOut == "bottom") {
            tpiece.moveUp();
            game.addPiece(tpiece);
            newPiece();
        }
        isOut = game.outOfBounds(tpiece);
    }

    if (game.conflict(tpiece)) {
        if (lastAction == "down") {
            tpiece.moveUp();
            game.addPiece(tpiece);
            newPiece();
        } else if (lastAction === "left") {
            tpiece.moveRight();
        } else if (lastAction === "right") {
            tpiece.moveLeft();
        }
    }

    var cleared = game.sweepLines();
    if (cleared > 0) {
        score += Math.pow(2,cleared)*100;
        lines += cleared;
    }

    game.show();
    tpiece.show();
    updateStats();

}

function updateStats() {
    document.querySelector("#score").innerHTML = score;
    document.querySelector("#lines").innerHTML = lines;
    document.querySelector("#level").innerHTML = level;
}

function dropPiece() {
    while (game.outOfBounds(tpiece) === false && !game.conflict(tpiece)) {
        tpiece.moveDown();
    }
    lastAction = "down";
}

function newPiece() {
    tpiece = new Piece(game.mWidth);
    level += 1;
    dropCap *= dropCapRate;
    if (game.conflict(tpiece)) {
        game = new Arena();
        score = 0;
        level = 0;
        lines = 0;
    }
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 40 || event.keyCode === 68) {
        lastAction = "down";
        tpiece.moveDown();
        dropTimer = 0;
    } else if (event.keyCode === 37 || event.keyCode === 83) {
        lastAction = "left";
        tpiece.moveLeft();
    } else if (event.keyCode === 39 || event.keyCode === 70) {
        lastAction = "right";
        tpiece.moveRight();
    } else if (event.keyCode === 90 || event.keyCode === 69) {
        tpiece.rotate(); 
    } else if (event.keyCode === 38) {
        dropPiece();
    }
});