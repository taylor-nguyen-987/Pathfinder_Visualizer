class Point { //Point class
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}


class Node { //Node class
    constructor(position, prior) {
        this.position = position;
        this.prior = prior;
        this.fScore = Infinity;
        this.gScore = Infinity;
        this.hScore = Infinity;
    }

    getPosition() {
        return this.position;
    }
    getPriorNode() {
        return this.prior;
    }

    getgScore() {return this.gScore;}
    gethScore() {
        return this.hScore;
    }
    getfScore() {
        return this.fScore;
    }
    setgScore(gScore) {
        this.gScore = gScore;
    }
    sethScore(hScore) {
        this.hScore = hScore;
    }
    setfScore(fScore) {
        this.fScore = fScore;
    }
    
    getNeighbors() {
        const rightN = new Node(new Point(this.position.getX() + 1, this.position.getY()), this);
        const bottomN = new Node(new Point(this.position.getX(), this.position.getY() + 1), this);
        const topN = new Node(new Point(this.position.getX(), this.position.getY() - 1), this);
        const leftN = new Node(new Point(this.position.getX() - 1, this.position.getY()), this);

        var neighbors = []; 
        neighbors.push(rightN);
        neighbors.push(bottomN);
        neighbors.push(topN);
        neighbors.push(leftN);

        return neighbors;
    }
    
}