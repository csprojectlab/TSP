/**
 * Find the distance travelled in a particular order and save it.
 * The swap function is the key here
 * We swap the vertices to make different shapes from the same point vectors
 * Making different shapes is governed by using lexicograhpic ordering. 
 */

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 400;
const CITY_COUNT = 5;

let cities = [];
let order = [];
let recordDistane;
let bestRoute;

function setup () {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    for (let i = 0; i < CITY_COUNT; i++) {
        let location = createVector (random(width), random(height));
        cities.push(location);  
    }
    recordDistance = calculateDistance (cities);
    bestRoute = cities.slice();
}


function draw () {
    background(0)

    // Draw ellipse as cities
    fill(255)
    drawCityPoints();

    // Draw white connecting lines
    stroke(255);
    strokeWeight(1);
    noFill();
    drawCityLines(cities);

    animateLines();     // Swapping is done in the function

    // Draw the best route a blue
    stroke(0, 0, 255);
    strokeWeight(2);
    noFill();
    drawCityLines(bestRoute);

    // Update the best
    let distance = calculateDistance (cities);
    if (distance < recordDistance) {
        recordDistance = distance;
        bestRoute = cities.slice();
    }
    //console.log(recordDistance)
}

function drawCityPoints () {
    for (let i = 0; i < CITY_COUNT; i++)
        ellipse (cities[i].x, cities[i].y, 8, 8);
}

function animateLines () {
    let i = floor (random(cities.length));
    let j = floor (random(cities.length));;
    swap (cities, i, j);
}

function drawCityLines (cities) {     
    beginShape();
    for (let i = 0; i < CITY_COUNT; i++)
        vertex (cities[i].x, cities[i].y);
    endShape();
}

function swap (array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function calculateDistance (points) {
    let sum = 0;
    for (let i = 0; i < points.length - 1; i++) {
        let distance = dist (points[i].x, points[i].y, points[i+1].x, points[i+1].y);
        sum += distance;
    }
    return sum;
}