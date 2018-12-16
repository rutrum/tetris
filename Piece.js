class Piece {

    constructor(x) {

        this.matrix = this.generatePiece();
        this.xpos = Math.floor((x-this.matrix.length)/2);
        this.ypos = 0;
        this.size = 30;

    }

    generatePiece() {
        this.rand = Math.floor(Math.random() * 7) + 1;
        var shape;
        if (this.rand === 1) {
            shape = [
                [1,0,0],
                [1,1,1],
                [0,0,0]
            ];
        } else if (this.rand === 2) {
            shape = [
                [0,0,1],
                [1,1,1],
                [0,0,0]
            ];
        } else if (this.rand === 3) {
            shape = [
                [1,1],
                [1,1]
            ];
        } else if (this.rand === 4) {
            shape = [
                [0,0,0],
                [0,1,1],
                [1,1,0]
            ];
        } else if (this.rand === 5) {
            shape = [
                [0,0,0],
                [1,1,0],
                [0,1,1]
            ];
        } else if (this.rand === 6) {
            shape = [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]
            ];
        } else if (this.rand === 7) {
            shape = [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ];
        }
        return shape;
    }

    rotate(direction) {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < i; j++) {
                [this.matrix[i][j],this.matrix[j][i]] =
                        [this.matrix[j][i],this.matrix[i][j]];
            }
        }
        this.matrix.forEach(row => row.reverse());
    }

    show() {
        strokeWeight(0);
        fill(getColor(this.rand));
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