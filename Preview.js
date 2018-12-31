class Preview {

    constructor(size) {
        this.size = size / 2;
    }

    dequeue() {
        this.piece.size = 30;
        return this.piece;
    }

    enqueue(piece) {
        this.piece = piece;
        this.piece.size = this.size;
    }

    show() {
        strokeWeight(0);
        fill(getColor(this.piece.letter));
        const s = this.size;
        for (let i = 0; i < this.piece.matrix.length; i++) {
            for (let j = 0; j < this.piece.matrix[i].length; j++) {
                if (this.piece.matrix[i][j]) {
                    rect((1+j)*s,(1+i)*s,s,s);
                }
            }
        }
    }


}