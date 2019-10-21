function calculateFitness () {
    for (let i = 0; i < POPULATION_COUNT; i++) {
        // Find distance of this particular order of cities
        let distance = calculateDistance(cities, population[i]);
        fitness[i] = 1 / (distance + 1);     // It should be inverse. 
        if (distance < bestDistance) {
            bestDistance = distance;
            bestRoute = population[i];
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
    let newPopulation = [];
    for (let i = 0; i < POPULATION_COUNT; i++) {
        let order = pickOne(population, fitness);
        mutate (order, 0.01);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

function mutate (arr, mutationRate) {
    let indexF = floor(random(arr.length));
    let indexS = floor(random(arr.length));
    swap (arr, indexF, indexS);
}

function swap (array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}