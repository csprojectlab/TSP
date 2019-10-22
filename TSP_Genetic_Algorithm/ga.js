function calculateFitness () {
    let currentRecord = Infinity;
    for (let i = 0; i < POPULATION_COUNT; i++) {
        // Find distance of this particular order of cities
        let distance = calculateDistance(cities, population[i]);
        fitness[i] = 1 / (distance + 1);     // It should be inverse. 
        if (distance < bestDistance) {      // Updating the best from entire population
            bestDistance = distance;
            bestRoute = population[i];
        }
        if (distance < currentRecord) {     // Updating the best from current population
            currentRecord = distance;
            currentBest = population[i];
        }
    }    
}

function normalizeFitness () {
    let sum = 0;
    for (let i = 0; i < POPULATION_COUNT; i++) 
        sum += fitness[i];
    for (let i = 0; i < POPULATION_COUNT; i++)
        fitness[i] = fitness[i] / sum;    
}

function pickOne (population, fitness) {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - fitness[index];
        index++;
    }
    index--;
    return population[index].slice();       // Make a copy of it
}

function nextGeneration () {
    currentGeneration++;
    if (currentGeneration == GENERATION_COUNT) {
        noLoop();
        console.log("Finished")
    }
    let newPopulation = [];
    for (let i = 0; i < POPULATION_COUNT; i++) {
        let orderA = pickOne(population, fitness);
        let orderB = pickOne(population, fitness);
        let order = crossOver(orderA, orderB);
        mutate (order, MUTATION_RATE);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

function mutate (arr, mutationRate) {
    for (let i = 0; i < CITY_COUNT; i++) {
        if (random(1) < mutationRate) {
            let indexF = floor(random(arr.length));
            let indexS = (indexF + 1) % arr.length;     // Take the next one
            swap (arr, indexF, indexS);
        }    
    }
}

// We have to get rid of invalid cross over as well
function crossOver (motherOrder, fatherOrder) {
    // This algorithm has a name that I don't know ?????
    let start = floor(random(motherOrder.length));
    let end = floor(random(start + 1, motherOrder.length))
    let newOrder = motherOrder.slice(start, end);
    for (let i = 0; i < fatherOrder.length; i++) {
        let city = fatherOrder[i];
        if (!newOrder.includes(city)) {     // If city is not already there
            newOrder.push(city)
        }
    }
    return newOrder;
 }

function swap (array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}