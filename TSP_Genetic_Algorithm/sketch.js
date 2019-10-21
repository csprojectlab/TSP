// Genetic algorithm to solve the travelling salesman problem 
/**
 * 
 */
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 600;
const CITY_COUNT = 10;
const POPULATION_COUNT = 10;

let cities = [];
let recordDistane;
let bestRoute;
let bestDistance = Infinity;
let population = [];
let fitness = [];

function setup () {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    let order = [];
    for (let i = 0; i < CITY_COUNT; i++) {
        let location = createVector (random(width), random(height/2));
        cities.push(location); 
        order[i] = i;
    }
    for (let i = 0; i < POPULATION_COUNT; i++) {
        population[i] = shuffle(order);
    }    
}


function draw () {
   background(0)
   calculateFitness();
   normalizeFitness();
}

function calculateDistance (points, mapping) {
    let sum = 0;
    for (let i = 0; i < mapping.length - 1; i++) {
        let cityA = points[mapping[i]];
        let cityB = points[mapping[i+1]];
        let distance = dist (cityA.x, cityA.y, cityB.x, cityB.y);
        sum += distance;
    }
    return sum;
}
