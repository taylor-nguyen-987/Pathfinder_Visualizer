class dfs { //Depth First Search

    constructor(path) {
        this.path = path;
    }

    getPath() {
        return this.path.reverse(); //the path is originally reversed
    }

    computePath(pos) {
        const rightP = new Point(pos.getX() +1, pos.getY());
        const bottomP = new Point(pos.getX(), pos.getY() + 1); //going down is positive!!!
        const topP = new Point(pos.getX(), pos.getY() - 1); //going up is negative!!!
        const leftP = new Point(pos.getX() - 1, pos.getY());
        var found = false;

        if (withinBounds(pos) && grid_vals[pos.getY()][pos.getX()] != "TREE" && grid_vals[pos.getY()][pos.getX()] != "SEARCHED") {

            if (grid_vals[pos.getY()][pos.getX()] == "NEST") { //if the current position is the goal
                this.path.push(pos);
                found = true;
            } else { //if it is not the goal
                //set this value as searched
                grid_vals[pos.getY()][pos.getX()] = "SEARCHED";
                found = this.computePath(rightP) || this.computePath(leftP) ||
                        this.computePath(bottomP) || this.computePath(topP);
                if (found == true) {
                    this.path.push(pos);
                }
            }

        }

        return found;
    }
}


class bfs { //Breadth First Search

    constructor(path) {
        this.path = path;
    }

    getPath() {
        return this.path;
    }

    computePath(pos) {
        var found = false;
        let last = new Node(null, null); //destination node

        var nodeQueue = [];

        nodeQueue.push(new Node(pos, null));

        while (nodeQueue != []) {
            let current = nodeQueue.shift(); //removing a variable or a const?

            if (grid_vals[current.getPosition().getY()][current.getPosition().getX()] == "NEST")
            {
                last = current;
                found = true;
                break;
            }
            else {
                if (grid_vals[current.getPosition().getY()][current.getPosition().getX()] != "SEARCHED") //if the current has not already been searched
                {
                    grid_vals[current.getPosition().getY()][current.getPosition().getX()] = "SEARCHED";


                    for (const neighbor of current.getNeighbors()) {
                        if (withinBounds(neighbor.getPosition()) &&
                                grid_vals[neighbor.getPosition().getY()][neighbor.getPosition().getX()] != "TREE" &&
                                grid_vals[neighbor.getPosition().getY()][neighbor.getPosition().getX()] != "SEARCHED") {
                            nodeQueue.push(neighbor);
                        }
                    }
                }
            }
        }

        this.path = reconstruct_path(last);

        return found;
    }
    
} 


class astar { //A Star
    constructor(path) {
        this.path = path;
    }

    getPath() {
        return this.path;
    }

    computePath(pos) {
        let openSet = new Array();
        let closedSet = new Array();
        var found = false;

        let end = new Point(13, 7);

        let start = new Node(pos, null);
        start.sethScore(manhattanDistance(pos, end)); //heuristic distance
        start.setgScore(0); //set gScore to be 0

        openSet.push(start);


        while (openSet.length != 0) {
            
            let current = openSet.shift(); //removes and retrieves the node with the lowest fScore from the openList

            if (grid_vals[current.getPosition().getY()][current.getPosition().getX()] == "NEST") {
                for (const p of reconstruct_path(current)) {
                    this.path.push(p);
                }
                found = true;
                break;
            }

            grid_vals[current.getPosition().getY()][current.getPosition().getX()] = "SEARCHED"; //mark as searched

            for (const neighbor of current.getNeighbors()) {

                if (withinBounds(neighbor.getPosition()) &&
                        grid_vals[neighbor.getPosition().getY()][neighbor.getPosition().getX()] != "TREE" &&
                        grid_vals[neighbor.getPosition().getY()][neighbor.getPosition().getX()] != "SEARCHED") { //check neighbors if valid

                    //Note that when the neighbor has been searched, it is in the closed set as well!

                    let new_gScore = current.getgScore() + 1; //distance from current node to start + distance from current node to adj node

                    if (new_gScore < neighbor.getgScore()) {
                        neighbor.setgScore(new_gScore);
                        let new_hScore = manhattanDistance(neighbor.getPosition(), end); //heuristic
                        neighbor.sethScore(new_hScore);
                        let new_fScore = neighbor.getgScore() + neighbor.gethScore();
                        neighbor.setfScore(new_fScore);
                        
                        if (!inopenSet(openSet, neighbor)) {
                            openSet.push(neighbor);
                        } 
                    }

                }
            }
            closedSet.push(current); //move current node to closedset

            openSet.sort(sortbyFscore); //sorts openSet from least to greatest fScore
            
        }

        return found;
    }
} 