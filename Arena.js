class Arena {

    constructor(w, h) {
        
        this.mHeight = h;
        this.mWidth = w;

        this.size = 30;

        this.matrix = this.generateMatrix();
        console.log(this.matrix);

    }

    generateMatrix() {
        var matrix = [];

        for (let i = 0; i < this.mHeight; i++) {
            var row = [];
            for (let j = 0; j < this.mWidth; j++) {
                row[j] = 0;
            }
            matrix[i] = row;
        }

        return matrix;
    }

    addPiece(p) {
        for (let i = 0; i < p.matrix.length; i++) {
            for (let j = 0; j < p.matrix[i].length; j++) {
                if (p.matrix[i][j] !== 0) {
                    this.matrix[p.ypos + i][p.xpos + j] = p.rand;
                }
            }
        }
    }

    conflict(p) {
        for (let i = 0; i < p.matrix.length; i++) {
            for (let j = 0; j < p.matrix[i].length; j++) {
                if (p.matrix[i][j] !== 0 
                    && this.matrix[p.ypos + i][p.xpos + j] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    sweepLines() {
        var linesCleared = 0;
        for (let i = 0; i < this.mHeight; i++) {
            var full = true;
            for (let j = 0; j < this.mWidth; j++) {
                if (this.matrix[i][j] === 0) {
                    full = false;
                    break;
                }
            }
            if (full) {
                const row = this.matrix.splice(i, 1)[0].fill(0);
                this.matrix.unshift(row);
                linesCleared++;
            }
        }
        return linesCleared;    
    }

    outOfBounds(p) {
        for (let i = 0; i < p.matrix.length; i++) {
            for (let j = 0; j < p.matrix[i].length; j++) {
                if (p.matrix[j][i] !== 0) {
                    if (i + p.xpos >= this.mWidth) {
                        return "right";
                    } else if (i + p.xpos < 0) {
                        return "left";
                    } else if (j + p.ypos >= this.mHeight) {
                        return "bottom";
                    }
                }
            }
        }
        return false;
    }

    show() {
        strokeWeight(0);
        const s = this.size;
        for (let i = 0; i < this.mHeight; i++) {
            for (let j = 0; j < this.mWidth; j++) {
                fill(getColor(this.matrix[i][j]));
                rect(j*s,i*s,s,s);
            }
        }
    }

    

}