var canvas;
var context;
var canvasClicked = false;
var ball, ball2;
var dirty = false;
var selectedBall;

window.onload = init;

function init() {
    var body = document.querySelector('body');
    canvas = document.querySelector("#myCanvas");
    canvas.addEventListener('mousedown', pickUpBall);
    window.addEventListener('mouseup', dropBall);
    window.addEventListener('mousemove', moveBall);
    context = canvas.getContext("2d");
    ball = new Ball(context, 20, "red", canvas.width, canvas.height, 50,50);
    ball.reset();
    ball2 = new Ball(context, 50, "blue", canvas.width, canvas.height,300,300);
    ball2.reset();
    //draw(canvas.width/2,canvas.height/2);
}

function clear(){
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0, canvas.width, canvas.height);
}

function draw(x, y) {
    ball.reset(x,y);
    ball2.reset(x,y);
    selectedBall && selectedBall.draw(x,y);
}

//Only move when canvas is clicked, and mouse is within the balls x,y
function moveBall(evt) {
    if (!canvasClicked) return;
    var x = evt.x, y = evt.y;
    clear();
    draw(evt.x, evt.y);
}

function pickUpBall(e) {
    if (ball.isInBall(e.x, e.y)) {
        canvasClicked = true;
        selectedBall = ball;
    }
    else if (ball2.isInBall(e.x, e.y)) {
        selectedBall = ball2;
        canvasClicked = true;
    }
    else {
        selectedBall = null;
        canvasClicked = false;
    }
}

function dropBall() {
    canvasClicked = false;
}