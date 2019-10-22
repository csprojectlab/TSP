/**
 * Population class. 
 */
class Population {
    constructor (population_size, mutation_rate, dominance, tournament_size) {
        this.size = population_size;
        this.mutationRate = mutation_rate;
        this.elitisim = dominance;
        this.tournamentSize = tournament_size;
        this.tours = [];
        this.bestFitnessValue = 0;
        this.bestTourIndex = 0;
    }

    /**
     * boot function. 
     * High temperature means: energetically accept the less fit journies. 
     * Cooling rate decreases the temperature to accept fewer less fit journies. 
     */
    boot (cities, temp_rature, cooling_rate) {
        let currentJourney = new Journey(cities.length),
            currentJourneyFitness = 0,
            newJourney;
            newJourneyFitness = 0,
            fitnessDiff = 0,
            temperature = temp_rature,
            coolingRate = cooling_rate;
        currentJourney.add(shuffle(cities));    // Adding a random tour to the journey. 
        this.tours.push(currentJourney);
        // Adding tours to the population(creating random tour population)
        while (this.tours.length < this.size) {     
            newJourney = new Journey(cities.length);   // Simply creating object without cities. 
            newJourney.add(shuffle(cities))         // Adding a random tour. 
            // Calculating fitness for evaluation of best journey till now. 
            currentJourneyFitness = currentJourney.fitness();
            newJourneyFitness = newJourney.fitness();
            if (newJourneyFitness > currentJourneyFitness) {        // Adding and updating. 
                this.tours.push(newJourney);
                currentJourney = newJourney;
            } else {
                fitnessDiff = currentJourneyFitness - newJourneyFitness;
                if (this.acceptanceProbability(fitnessDiff, temperature) > Math.random())
                    this.tours.push(newJourney);
            }
            temperature *= 1 - coolingRate;
        }   // end of while loop. 
    }

    /**
     * accept probability function. 
     * Returning Euler's exponential value. 
     */
    acceptanceProbability (fitness_difference, temperature) {
        return Math.exp(fitness_difference / temperature);
    }

    /**
     * Finding fittest from all the tours. 
     */
    fittest () {
        let fittestJouney = this.tours[0],
            fittestvalue = this.tours[0].fitness();
            fitValue = 0;
        this.bestTourIndex = 0;
        for (let i = 1; i < this.tours.length; i++) {
            fitValue = this.tours[i].fitness();
            if (fitValue > fittestValue) {
                fittestValue = fitValue;
                fittestJouney = this.tours[i];
                this.bestTourIndex = i;
            }
        }
        this.bestFitnessValue = fittestValue;
    }
}