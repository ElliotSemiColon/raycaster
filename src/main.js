import Scene from "/src/scene.js";
import Raycast from "/src/raycast.js"
//import LineSegment from "/src/line.js";
//import Point from "/src/point.js";

var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d"); 
window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let deltaTime = 0, lastTime = 0;
let mouseX, mouseY;
let dragging = false;
let scene = new Scene();
let raycast = new Raycast(150,150);
raycast.generateRays();
//console.log(raycast);
scene.initialise();


function getMouse(event){
    mouseX = event.clientX, mouseY = event.clientY;
}

//interaction handler
canvas.addEventListener('mousedown', (event) => {
    getMouse(event);
    scene.points.forEach(point =>{
        point.click({x: mouseX, y: mouseY});
    });
    dragging = true;
}); 
canvas.addEventListener('mousemove', (event) => {
    if(dragging){
        getMouse(event);
        scene.points.forEach(point =>{
            if(point.dragging){point.drag({x: mouseX, y: mouseY});}
        });
    }
});
canvas.addEventListener('mouseup', (event) => {
    getMouse(event);
    scene.points.forEach(point =>{
        point.dragging = false;
    });
    dragging = false;
}); 

function mainLoop(timestamp){
    deltaTime = timestamp - lastTime; //calculates delta time (frame time)
    lastTime = timestamp;

    raycast.position = {x: mouseX, y: mouseY};

    background();
    raycast.update();
    raycast.intersect(scene);
    //if(dragging){scene.update();}
    //scene.update();
    scene.draw(ctx);
    raycast.draw(ctx);
    requestAnimationFrame(mainLoop);
}

mainLoop();

function background(){
    ctx.fillStyle = '#2C2F33';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
