class Piece {

    constructor(x, s) {

        const letters = ['J','L','O','S','Z','I','T']
        this.rando = Math.floor(Math.random() * 7);
        this.letter = letters[this.rando]
        this.rando++

        this.matrix = this.generatePiece();
        this.xpos = Math.floor((x-this.matrix.length)/2);
        this.ypos = 0;
        this.size = s;

    }

    generatePiece() {
        let shape
        if (this.letter === 'J') {
            shape = [
                [1,0,0],
                [1,1,1],
                [0,0,0]
            ];
        } else if (this.letter === 'L') {
            shape = [
                [0,0,1],
                [1,1,1],
                [0,0,0]
            ];
        } else if (this.letter === 'O') {
            shape = [
                [1,1],
                [1,1]
            ];
        } else if (this.letter === 'S') {
            shape = [
                [0,0,0],
                [0,1,1],
                [1,1,0]
            ];
        } else if (this.letter === 'Z') {
            shape = [
                [0,0,0],
                [1,1,0],
                [0,1,1]
            ];
        } else if (this.letter === 'I') {
            shape = [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]
            ];
        } else if (this.letter === 'T') {
            shape = [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ];
        }
        return shape;
    }

    rotate(direction) {
        const len = this.matrix.length;
        if (direction === "counter") {
            this.matrix.forEach(row => row.reverse());
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < i; j++) {
                    [this.matrix[i][j],this.matrix[j][i]] =
                            [this.matrix[j][i],this.matrix[i][j]];
                }
            }
        } else {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < i; j++) {
                    [this.matrix[i][j],this.matrix[j][i]] =
                            [this.matrix[j][i],this.matrix[i][j]];
                }
            }
            this.matrix.forEach(row => row.reverse());
        }
    }

    show(shadow) {
        strokeWeight(0);
        let theColor = getColor(this.letter);
        if (shadow) {
            theColor.setAlpha(100);
        }
        fill(theColor)
        const s = this.size;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j]) {
                    rect((this.xpos+j)*s,(this.ypos+i)*s,s,s);
                }
            }
        }
    }

    moveDown() {
        this.ypos++;
    }

    moveUp() {
        this.ypos--;
    }

    moveLeft() {
        this.xpos--;
    }

    moveRight() {
        this.xpos++;
    }

}