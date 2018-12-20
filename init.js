var game;

function setup() {
    // Call from DOM all user settings
    let settings = {
        width: 15,
        height: 15,
        size: 30,
    }
    createCanvas(settings.width * settings.size, settings.height * settings.size);
    frameRate(60);
    game = new Game(settings);

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

    // update statistics
    document.querySelector("#score").innerHTML = game.score;
    document.querySelector("#lines").innerHTML = game.lines;
    document.querySelector("#speed").innerHTML = game.fallingSpeed;
    document.querySelector("#level").innerHTML = game.level;
}