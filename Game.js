class Game {

    constructor() {
        this.gridWidth = 10;
        this.gridHeight = 20;

        this.resolution = 30; // Size of each block

        this.dropTimer = 0;
        this.fallingSpeed = 30; // Frames delay

        // Statistics
        this.level = 0; // Number of dropped pieces
        this.score = 0; // Arbitary
        this.lines = 0; // Number of lines cleared

        this.arena = new Arena(this.gridWidth, this.gridHeight);
        this.falling = new Piece(this.gridWidth);

        this.gameEnd = false;
    }

    show() {

        // Drop piece
        this.dropTimer++;
        if (this.dropTimer >= this.fallingSpeed) {
            this.dropTimer = 0;
            this.falling.moveDown();
            this.lastAction = "down";
        }

        // Move this conflicted and out of bounds to event listeners, that's why game sometimes breaks

        var outOfBounds = this.arena.outOfBounds(this.falling);
        while (outOfBounds) {
            if (outOfBounds == "left") {
                this.falling.moveRight();
            } else if (outOfBounds == "right") {
                this.falling.moveLeft();
            } else if (outOfBounds == "bottom") {
                this.falling.moveUp();
                this.arena.addPiece(this.falling);
                this.newFalling();
            }
            outOfBounds = this.arena.outOfBounds(this.falling);
        }

        var conflicted = this.arena.conflict(this.falling);
        while (conflicted) {
            if (this.lastAction == "left") {
                this.falling.moveRight();
            } else if (this.lastAction == "right") {
                this.falling.moveLeft();
            } if (this.lastAction == "down") {
                this.falling.moveUp();
                this.arena.addPiece(this.falling);
                this.newFalling();
            }
            conflicted = this.arena.conflict(this.falling);
        }

        var cleared = this.arena.sweepLines();
        if (cleared > 0) {
            this.score += Math.pow(2,cleared)*100;
            this.lines += cleared;
        }
        
        this.arena.show();
        this.falling.show();
        this.updateStats();

    }

    newFalling() {
        this.falling = new Piece(this.gridWidth);
        this.lastAction = "new"
        this.level += 1;
        if (this.arena.conflict(this.falling)) {
            this.arena = new Arena(this.gridWidth, this.gridHeight);
        }
    }

    updateStats() {
        document.querySelector("#score").innerHTML = score;
        document.querySelector("#lines").innerHTML = lines;
        document.querySelector("#level").innerHTML = level;
    }

    dropPiece() {
        while (this.arena.outOfBounds(this.falling) === false && !this.arena.conflict(this.falling)) {
            this.falling.moveDown();
        }
        this.lastAction = "down";
    }

    pressDown() {
        this.lastAction = "down";
        this.falling.moveDown();
        this.dropTimer = 0;
    }

    pressUp() {
        this.falling.rotate();
    }

    pressLeft() {
        this.lastAction = "left";
        this.falling.moveLeft();
    }

    pressRight() {
        this.lastAction = "right";
        this.falling.moveRight();
    }

    pressSpace() {
        this.dropPiece();
    }

}