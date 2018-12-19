var game;

function setup() {
    createCanvas(300, 600);
    frameRate(60);
    game = new Game();

    document.addEventListener('keydown', event => {
        if (event.keyCode === 40 || event.keyCode === 68) {
            game.pressDown();
        } else if (event.keyCode === 37 || event.keyCode === 83) {
            game.pressLeft();
        } else if (event.keyCode === 39 || event.keyCode === 70) {
            game.pressRight();
        } else if (event.keyCode === 38 || event.keyCode === 69) {
            game.pressUp();
        } else if (event.keyCode === 32) {
            game.pressSpace();
        }
    });
}

function draw() {
    background(230);
    game.show();
}