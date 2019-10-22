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

function drawGraph() {
	stroke(200);
	strokeWeight(5)

	let max_dist = generationWiseDistance.reduce(function(a, b) {
		return Math.max(a, b);
	});

	for (let i = 0; i < generationWiseDistance.length - 1; i++) {
		// if (gen_wise_dist[i]) {
			stroke(200);
			strokeWeight(1);
			line(20 + i, 250, 20 + i, 250 - (generationWiseDistance[i] / max_dist) * 150 );
		// }
	}

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
    population = new Population (POPULATION_SIZE, mutationRate, elitism, tournamentSize);
    population.boot(cities, temperature, coolingRate);
}

/**
 * Draw function. 
 */
function draw () {
    background (0);
    population.evolve();
    generationWiseDistance.push(population.tours[population.bestTourIndex].distanceCovered);
    drawGraph();

}