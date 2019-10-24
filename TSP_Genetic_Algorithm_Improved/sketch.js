/**
 * Global variables. 
 */
const POPULATION_SIZE = 50,
      MAX_GENERATION = 10000,
      CITIES_COUNT = 20,
      C_WIDTH = 1100,
      C_HEIGHT = 650,
      TOURNAMENT_SIZE = 10,
      TEMPERATURE = 1000,
      COOLING_RATE = 0.03,
      MUTATION_RATE = 0.03;
var population,
    generationCount = 0;
    generationWiseDistance = [];

/**
 * Function returning cities array. 
 */
function generateCities () {
    let cities = [];
    for (let i = 0; i < CITIES_COUNT; i++) {
        let x = floor (random(10, C_WIDTH / 2 - 10));
        let y = floor (random(10, C_HEIGHT / 2 - 10))
        cities.push(new City (x, y));
    }
    return cities;  
}

function drawGraph() {
	stroke(0, 0, 255);
    strokeWeight(1)
    let max_dist = generationWiseDistance.reduce((x, y) => Math.max(x, y)),
        offset = 0;
	for (let i = 0; i < generationWiseDistance.length - 1; i++) {
        line(20 + offset, 300, 20 + offset, 300 - (generationWiseDistance[i] / max_dist) * 250 );	
        offset++;	
        if (i == 1040) {
            offset = 20;
            generationWiseDistance = [];
        }
    }
}

/**
 * Setup function. 
 */
function setup () {
    createCanvas(C_WIDTH, C_HEIGHT);    
    let cities = generateCities(),
        mutationRate = MUTATION_RATE;
        elitism = true,
        tournamentSize = TOURNAMENT_SIZE;
        temperature = TEMPERATURE,
        coolingRate = COOLING_RATE;
    population = new Population (POPULATION_SIZE, mutationRate, elitism, tournamentSize);
    population.boot(cities, temperature, coolingRate);
}

/**
 * Draw function. 
 */
function draw () {
    generationCount++;
    background (0);
    population.evolve();
    generationWiseDistance.push(population.tours[population.bestTourIndex].distanceCovered);

    fill(255);
    stroke(255);
    strokeWeight(5);
    line (0, height / 2, width, height / 2);
    line (width / 2, 0, width / 2, height / 2)
    // Draw the best route.
    textSize(20);
    noStroke();
    fill(255, 255, 150)
    text("Best Route:", 10, 20)
    population.drawBestRoute();

    push();
        translate(0, height / 2);
        textSize(25)
        fill(0, 255, 255)
        text ("Distance Graph", (width / 2) - 60, 40);
        drawGraph();
    pop();

    push ();
        translate(width / 2, 0);
        fill(255, 255, 0);
        noStroke();
        textSize(20);
        let offset = 20;
        fill(255, 0, 0)
        text ("TSP: GENETIC PARAMETERS", 120, offset);
        fill(255, 255, 0)
        text ("Population: " + POPULATION_SIZE, 20, (offset += 30));
        text ("Cities: " + CITIES_COUNT, 20, (offset += 30));
        text ("Tournament Size: " + TOURNAMENT_SIZE, 20, (offset += 30));
        text ("Temperature: " + TEMPERATURE, 20, (offset += 30));
        text ("Cooling Rate: " + COOLING_RATE, 20, (offset += 30));
        text ("Mutation Rate: " + MUTATION_RATE, 20, (offset += 30));
        text ("Generation: " + generationCount + " / " + MAX_GENERATION, 20, (offset += 30));
        text ("Best Fitness: " + population.bestFitnessValue, 20, (offset += 30));
        text ("Best Distance: " + population.tours[population.bestTourIndex].distanceCovered, 20, (offset += 30));
        
    pop();
    
    if (generationCount == MAX_GENERATION)
        noLoop();

}