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
   
}
