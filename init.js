var game;

function setup() {
    // Call from DOM all user settings
    let settings = {
        width: 10,
        height: 20,
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

    // Load records from local storage
    // Or create an empty one if its not there
    const record = localStorage.getItem("record");
    if (record !== null) {
        document.querySelector("#recscore").innerHTML = record.score;
        document.querySelector("#reclines").innerHTML = record.lines;
        document.querySelector("#reclevel").innerHTML = record.level;
    } else {
        localStorage.setItem("record", JSON.stringify({
            score: 0,
            lines: 0,
            level: 0,
        }));
    }
}

function draw() {
    background(230);
    game.show();

    // update statistics
    document.querySelector("#score").innerHTML = game.score;
    document.querySelector("#lines").innerHTML = game.lines;
    document.querySelector("#speed").innerHTML = Math.trunc(game.fallingSpeed);
    document.querySelector("#level").innerHTML = game.level;

    let record = JSON.parse(localStorage.getItem("record"));

    if (game.score > record.score) {
        record.score = game.score;
        record.lines = game.lines;
        record.level = game.level;
        localStorage.setItem("record", JSON.stringify(record));
    }

    document.querySelector("#recscore").textContent = record.score;
    document.querySelector("#reclines").textContent = record.lines;
    document.querySelector("#reclevel").textContent = record.level;
}