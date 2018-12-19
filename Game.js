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
            this.pressDown();
        }

        this.arena.show();
        this.falling.show();

    }

    checkForLineClear() {
        var cleared = this.arena.sweepLines();
        if (cleared > 0) {
            this.score += Math.pow(2,cleared)*100;
            this.lines += cleared;
        }
    }

    checkForCollisions() {
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
            } else if (this.lastAction == "down") {
                this.falling.moveUp();
                this.arena.addPiece(this.falling);
                this.newFalling();
            } else if (this.lastAction == "rotate") {
                // Just undo the rotation
                this.falling.rotate("counter");
            }
            conflicted = this.arena.conflict(this.falling);
        }
    }

    newFalling() {
        this.checkForLineClear();
        this.falling = new Piece(this.gridWidth);
        this.lastAction = "new"
        this.level += 1;
        if (this.arena.conflict(this.falling)) {
            this.arena = new Arena(this.gridWidth, this.gridHeight);
        }
    }

    dropPiece() {
        while (this.arena.outOfBounds(this.falling) === false && !this.arena.conflict(this.falling)) {
            this.falling.moveDown();
        }
        this.lastAction = "down";
        this.dropTimer = 0;
        this.checkForCollisions();
    }

    pressDown() {
        this.lastAction = "down";
        this.falling.moveDown();
        this.dropTimer = 0;
        this.checkForCollisions();
    }

    pressUp() {
        this.lastAction = "rotate";
        this.falling.rotate();
        this.checkForCollisions();
    }

    pressLeft() {
        this.lastAction = "left";
        this.falling.moveLeft();
        this.checkForCollisions();
    }

    pressRight() {
        this.lastAction = "right";
        this.falling.moveRight();
        this.checkForCollisions();
    }

    pressSpace() {
        this.dropPiece();
    }

}