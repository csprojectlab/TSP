/**
 * Find the distance travelled in a particular order and save it.
 * The swap function is the key here
 * We swap the vertices to make different shapes from the same point vectors
 * Making different shapes is governed by using lexicograhpic ordering. 
 */

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 600;
const CITY_COUNT = 10;

let cities = [];
let order = [];
let recordDistane;
let bestRoute;
let count = 0;
let totalPermutations;

function setup () {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    for (let i = 0; i < CITY_COUNT; i++) {
        let location = createVector (random(width), random(height/2));
        cities.push(location); 
        order[i] = i; 
    }
    recordDistance = calculateDistance (cities);
    bestRoute = order.slice();
    totalPermutations = factorial(CITY_COUNT)
}


function draw () {
    background(0)
    // frameRate(5)
    // Draw ellipse as cities
    fill(255)
    drawCityPoints();

    // Draw white connecting lines
    stroke(0, 255, 0);
    strokeWeight(1);
    noFill();
    drawCityLines(order);

    //animateLines();     // Swapping is done in the function

    // Draw the best route a blue
    push();
    translate(0, height / 2)
    stroke(0, 0, 255);
    strokeWeight(2);
    noFill();
    drawCityLines(bestRoute);
    fill(0, 222, 0)
    noStroke();
    drawCityPoints();
    pop();

    // Update the best
    let distance = calculateDistance (cities);
    if (distance < recordDistance) {
        recordDistance = distance;
        bestRoute = order.slice();
    }
    translate(0, 0)
    textSize(16);
    let s = 'Lexical Order: ';
    for (let i = 0; i < order.length; i++)
        s += order[i];
    fill(0,255,0);
    text(s, 20, 20)

    nextOrder();
    
    fill(255, 0, 0)
    noStroke();
    let percent = (count / totalPermutations) * 100;
    text(nf(percent, 0, 2) + "% completed", 20, height - 20)
}

// Function to calculate the next lexical order. 
function nextOrder () {
    count++;
    // Step: 1
    let maxI = -1;    // This is pointing to an index. 
    for (let i = 0; i < order.length - 1; i++)
        if (order[i] < order[i + 1])
            maxI = i;
    if (maxI == -1) {
        noLoop();
        console.log('This was the last one.')
    }
    // Step: 2
    let maxJ = -1;
    for (let j = 0; j < order.length; j++)
        if (order[maxI] < order[j])
            maxJ = j;
    // Step: 3
    swap(order, maxI, maxJ);
    // Step: 4
    let endArray = order.splice(maxI + 1);
    endArray.reverse();
    order = order.concat(endArray);   
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

function drawCityLines (mapArray) {     
    beginShape();
    for (let i = 0; i < mapArray.length; i++) {
        let n = mapArray[i];       // Order becomes a lookup for index of city. 
        vertex (cities[n].x, cities[n].y);
    }
    endShape();
}

function swap (array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function calculateDistance (points) {
    let sum = 0;
    for (let i = 0; i < order.length - 1; i++) {
        let cityA = points[order[i]];
        let cityB = points[order[i+1]];
        let distance = dist (cityA.x, cityA.y, cityB.x, cityB.y);
        sum += distance;
    }
    return sum;
}

function factorial (n) {
    if (n == 1)
        return 1;
    return n * factorial(n - 1);
}