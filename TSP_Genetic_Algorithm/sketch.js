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
    for (let i = 0; i < POPULATION_COUNT; i++) {
        // Find distance of this particular order of cities
        let distance = calculateDistance(cities, population[i]);
        fitness[i] = distance;     // It should be inverse. 
    }    
}


function draw () {
   
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
