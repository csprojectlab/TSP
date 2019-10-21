function calculateFitness () {
    for (let i = 0; i < POPULATION_COUNT; i++) {
        // Find distance of this particular order of cities
        let distance = calculateDistance(cities, population[i]);
        fitness[i] = distance;     // It should be inverse. 
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