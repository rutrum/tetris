class Game {

    constructor(settings) {
        this.gridWidth = settings.width;
        this.gridHeight = settings.height;
        this.center = {
            x: settings.width/2 * settings.size,
            y: settings.height/2 * settings.size,
        }

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

        this.dropShadow();

        this.gameEnd = false;
    }

    show() {

        if (this.gameEnd) {

            this.arena.show();
            this.falling.show();
            this.preview.show();

            // Draw transparent box behind text
            fill(color(15,15,15,200));
            rect(0, this.center.y - 70, this.gridWidth * this.size, 140);

            // Draw game over text
            fill(color(255,0,0));
            textFont('monospace');
            textSize(50);
            textAlign(CENTER, CENTER);
            text("GAME\nOVER", this.center.x, this.center.y);
        
        } else {
            
            // Drop piece
            this.dropTimer++;
            if (this.dropTimer >= this.fallingSpeed) {
                this.pressDown();
            }

            this.arena.show();
            this.shadow.show(true);
            this.falling.show();
            this.preview.show();
        }
    }

    dropShadow() {

        this.shadow = new Piece(this.gridWidth, this.size);
        this.shadow.xpos = this.falling.xpos;
        this.shadow.ypos = this.falling.ypos;
        this.shadow.letter = this.falling.letter;
        this.shadow.matrix = this.falling.matrix;

        while (this.arena.outOfBounds(this.shadow) === false && !this.arena.conflict(this.shadow)) {
            this.shadow.moveDown();
        }
        this.shadow.moveUp();
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
                break;
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
            this.gameEnd = true;
        }
        this.dropShadow();
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
        if (this.gameEnd) return;
        this.lastAction = "down";
        this.falling.moveDown();
        this.dropTimer = 0;
        this.checkForCollisions();
    }

    pressUp() {
        if (this.gameEnd) return;
        this.lastAction = "rotate";
        this.falling.rotate();
        this.checkForCollisions();
        this.dropShadow();
    }

    pressLeft() {
        if (this.gameEnd) return;
        this.lastAction = "left";
        this.falling.moveLeft();
        this.checkForCollisions();
        this.dropShadow();
    }

    pressRight() {
        if (this.gameEnd) return;
        this.lastAction = "right";
        this.falling.moveRight();
        this.checkForCollisions();
        this.dropShadow();
    }

    pressSpace() {
        if (this.gameEnd) return;
        this.dropPiece();
    }

    pressR() {
        if (this.gameEnd) {
            this.gameEnd = false;
            this.arena = new Arena(this.gridWidth, this.gridHeight, this.size);
            this.level = 0;
            this.score = 0;
            this.lines = 0;
            this.fallingSpeed = 30;
        }
    }

}