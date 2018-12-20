class Game {

    constructor(settings) {
        this.gridWidth = settings.width;
        this.gridHeight = settings.height;

        this.size = settings.size; // Size of each block

        this.dropTimer = 0;
        this.fallingSpeed = 30; // Frames delay

        // Statistics
        this.level = 0; // Number of dropped pieces
        this.score = 0; // Arbitary
        this.lines = 0; // Number of lines cleared

        this.arena = new Arena(this.gridWidth, this.gridHeight, this.size);
        this.preview = new Preview(this.size);
        this.preview.enqueue(new Piece(this.gridWidth,this.size));
        this.falling = new Piece(this.gridWidth, this.size);

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
        this.preview.show();

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
        this.falling = this.preview.dequeue();
        this.preview.enqueue(new Piece(this.gridWidth, this.size));
        this.lastAction = "new"
        this.addLevel();
        if (this.arena.conflict(this.falling)) {
            // Game end
            this.arena = new Arena(this.gridWidth, this.gridHeight, this.size);
            this.level = 0;
            this.score = 0;
            this.lines = 0;
            this.fallingSpeed = 30;
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

    addLevel() {
        this.level += 1;
        if (this.level % 10 == 0) {
            this.fallingSpeed *= .9;
        }
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