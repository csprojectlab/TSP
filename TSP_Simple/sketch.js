const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const CITY_COUNT = 5;

let cities = [];


function setup () {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    for (let i = 0; i < CITY_COUNT; i++) {
        let location = createVector (random(width), random(height));
        cities.push(location);  
    }
}


function draw () {
    background(0)
    fill(255)
    drawCities();
}

function drawCities () {
    for (let i = 0; i < CITY_COUNT; i++)
        ellipse (cities[i].x, cities[i].y, 8, 8);
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < CITY_COUNT; i++)
        vertex (cities[i].x, cities[i].y);
    endShape();
}