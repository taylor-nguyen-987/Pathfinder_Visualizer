//A*, BFS, DFS helper function
function withinBounds(p) 
    {
        return p.getY() >= 0 && p.getY() < rows &&
                p.getX() >= 0 && p.getX() < cols;
    }

//A* and BFS helper function
function reconstruct_path(end) { //IN PROGRESS
    const path = [];
    let current = end; //might not include the last node
    path.push(end.getPosition());
    while(current.getPriorNode() != null) {
        path.push(current.getPriorNode().getPosition());
        current = current.getPriorNode();
    }
    return path.reverse();
}

//A* helper function
function manhattanDistance(p1, p2) {
    return Math.abs(p2.getX() - p1.getX()) + Math.abs(p2.getY() - p1.getY());
}

function inopenSet(openSet, neighbor) { 
    //returns true/false if neighbor is in the openSet
    for (const node of openSet) {
        if (node.getPosition() === neighbor.getPosition() && node.getPriorNode() == neighbor.getPriorNode()) {
            return true;
        }
    } 
    return false;

}

//A* helper function
function sortbyFscore(s1, s2) {
    return s1.getfScore()-s2.getfScore();
}

//Dijkstra helper function
function sortbyDist(s1, s2) {
    return s1.getdist()-s2.getdist();
}