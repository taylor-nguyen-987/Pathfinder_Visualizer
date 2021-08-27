//Variables for setting up the grid
var cols = 20;
var rows = 15;
var TILE_SIZE = 32;
var grid_vals = new Array();

//Animating the path
var drawPath = false;
var path = new Array();
var count = 0;

//Buttons
let d; //dfs
let b; //bfs
let a; //astar
let c; //clear grid

let begin; //starting point
let end; //ending point

function make2Darray(rows, cols) { 
    //Empty 2D array AKA our grid
    var arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

function initialize_grid() {
    //Setting up the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid_vals[i][j] = "BACKGROUND";
        }
    }

    grid_vals[end.getY()][end.getX()] = "NEST"; //nest

    for (let col = 2; col < 9; col++)
        {
            grid_vals[8][col] = "TREE";
        }


    for (let row = 2; row < 8; row++) //side hallway1
        {
            grid_vals[row][row + 5] = "TREE";
        }

    for (let row = 3; row<=8; row++) //side hallway 2
        {
            grid_vals[row][row+2] = "TREE";
        }

    for (let col = 7; col <= 17; col++)
        {
            grid_vals[2][col] = "TREE";
        }

    for (let row = 2; row<=5;row++) {
            grid_vals[row][17] = "TREE";
        }

    for (let row = 8; row <= 12; row++)
        {
            grid_vals[row][17] = "TREE";
        }

    for (let row = 8; row < 12; row++)
        {
            grid_vals[row][19 - row] = "TREE";
        }

    for (let col=13; col<= 15; col++)
        {
            grid_vals[5][col] = "TREE";
        }
    grid_vals[8][16] = "TREE";
    grid_vals[6][15] = "TREE";
    grid_vals[7][15] = "TREE";

    for (let col = 0; col < 8; col++)
        {
            grid_vals[11][col] = "TREE";
        }
    for (let col = 14; col<=16; col++)
        {
            grid_vals[12][col]= "TREE";
        }

    grid_vals[13][9] = "TREE";
    grid_vals[14][9] = "TREE";
    for (let col = 10; col <= 12; col++)
        {
            grid_vals[13][col]="TREE";
        }
}

function setup() {

    createCanvas(640,480);
    obstacle = loadImage("imgs/oak.png")
    start = loadImage("imgs/bird.png")
    goal = loadImage("imgs/nest.png")


    grid = make2Darray(rows, cols);
    grid_vals = grid; //array of rows

    d=createButton("Depth First Search");
    d.mousePressed(depth);

    b=createButton("Breadth First Search");
    b.mousePressed(breadth);

    a=createButton("A* Search");
    a.mousePressed(Astar);

    c=createButton("Clear Grid");
    c.mousePressed(clearing);

    begin = new Point(2, 3);
    end = new Point(13, 7);

    initialize_grid();
    frameRate(20);

  }
  
function draw() {
    background(211, 211, 211);
    draw_grid();
    
    grid_vals[begin.getY()][begin.getX()] = "BIRD"; //keep animating bird as starting point
    
    draw_path(this.path);

}

function draw_grid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        
            draw_tile(i, j);
            
        }
    }
}

function draw_tile(i, j) { //i is row and j is column
    switch (this.grid_vals[i][j]) {
        case "BIRD": //bird
            image(start, j*TILE_SIZE, i*TILE_SIZE);
            break;
        case "NEST": //nest
            //rect(j*TILE_SIZE, i*TILE_SIZE, 32, 32);
            image(goal, j*TILE_SIZE, i*TILE_SIZE);
            break;
        case "BACKGROUND": //background
            fill(211, 211, 211);
            rect(j*TILE_SIZE, i*TILE_SIZE, 32, 32);
            break;
        case "TREE": //obstacle
            image(obstacle, j*TILE_SIZE, i*TILE_SIZE);
            break;
        case "SEARCHED": //searched
            //background
            fill(211, 211, 211);
            rect(j*TILE_SIZE, i*TILE_SIZE, 32, 32);

            //searched tile
            fill(47, 79, 79);
            rect(j * TILE_SIZE + TILE_SIZE / 4,
                    i * TILE_SIZE + TILE_SIZE / 4,
                    TILE_SIZE / 2, TILE_SIZE / 2);
            break;

    }
}


function draw_path(path) {
    if (drawPath) {

        if (count != path.length-1) { //animating the path step by step

            for (let i=0; i<=count; i++) {
                fill(255, 215, 0);
                rect(path[i].getX() * TILE_SIZE + TILE_SIZE * 3 / 8,
                        path[i].getY() * TILE_SIZE + TILE_SIZE * 3 / 8,
                        TILE_SIZE / 4, TILE_SIZE / 4);
            }
            count++;
        } else { //the whole path is animated
            for (let j = 0; j<path.length; j++) {
                fill(255, 215, 0);
                rect(path[j].getX() * TILE_SIZE + TILE_SIZE * 3 / 8,
                        path[j].getY() * TILE_SIZE + TILE_SIZE * 3 / 8,
                        TILE_SIZE / 4, TILE_SIZE / 4);
            }
        }
    }
} 

function depth() {
    count = 0;
    path = new Array(); //clear current path
    initialize_grid();

    const searching = new dfs(path);
    searching.computePath(begin);

    path = searching.getPath();

    drawPath = true;
}

function breadth() {
    count = 0;
    path = new Array();
    initialize_grid();

    const searching = new bfs(path);
    searching.computePath(begin);

    path = searching.getPath();
    
    drawPath = true;
}

function Astar() {
    count = 0;
    path = new Array();
    initialize_grid();

    const searching = new astar(path);
    searching.computePath(begin);

    path = searching.getPath();
    
    drawPath = true;
}

function clearing() {
    drawPath = false;
    count = 0;
    path = [];
    initialize_grid();
}