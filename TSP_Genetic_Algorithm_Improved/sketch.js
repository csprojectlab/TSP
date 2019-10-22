/**
 * Global variables. 
 */
const POPULATION_SIZE = 500;
const MAX_GENERATION = 700;
const CITIES_COUNT = 20;
const C_WIDTH = 1100;
const C_HEIGHT = 600;

var population,
    generationCount = 0;
    generationWiseDistance = [];

/**
 * Function returning cities array. 
 */
function generateCities () {
    let cities = [];
    for (let i = 0; i < CITIES_COUNT; i++) {
        let x = floor (random(C_WIDTH));
        let y = floor (random(C_HEIGHT))
        cities.push(new City (x, y));
    }
    return cities;  
}

/**
 * Setup function. 
 */
function setup () {
    createCanvas(C_WIDTH, C_HEIGHT);
    let cities = generateCities(),
        mutationRate = 0.03;
        elitism = true,
        tournamentSize = 10;
        temperature = 1000,
        coolingRate = 0.03;
}

/**
 * Draw function. 
 */
function draw () {
    background (0);
}