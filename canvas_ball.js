function Ball(context, radius, color, xBoundary, yBoundary, startX, startY){
    this.context = context;
    this.radius = radius;
    this.color = color;
    this.xBoundary = xBoundary;
    this.yBoundary = yBoundary;
    this.x = startX;
    this.y = startY;
}

Ball.prototype.draw = function(x, y){
    this.x = x;
    this.y = y;
    if (this.isOutOfXBounds(x)) this.x = this.handleOutOfXBounds(x);
    if (this.isOutOfYBounds(y)) this.y = this.handleOutOfYBounds(y);    

    //if (this.outOfBounds(this.x,this.y)) return;
    var oldStyle = this.context.fillStyle;
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.x, this.y, this.radius,0, 360, false);
    this.context.fill();
    this.context.fillStyle = oldStyle;
}

Ball.prototype.isOutOfXBounds = function(x){
    console.log("Current X Position: "+x);
    return x-this.radius < 0 || x+this.radius > this.xBoundary ;
}

Ball.prototype.handleOutOfXBounds = function(x){
    if (x-this.radius < 0) return this.radius;
    if (x+this.radius > this.xBoundary) return this.xBoundary-this.radius;
}

Ball.prototype.handleOutOfYBounds = function(y){
    if (y-this.radius < 0) return this.radius;
    if (y+this.radius > this.yBoundary) return this.yBoundary-this.radius;
}

Ball.prototype.isOutOfYBounds = function(y) {
    console.log("Current Y Position: "+y);
    return y-this.radius < 0 || y+this.radius > this.yBoundary
}

Ball.prototype.isInBall = function(x, y) {
    return (Math.pow((x - this.x),2) + Math.pow((y - this.y),2)) < Math.pow(this.radius,2);
}

Ball.prototype.reset = function(){
    this.draw(this.x, this.y);
}