/**
 * Journey class. 
 */
class Journey {
    constructor (number_of_cities) {
        this.cities = new Array(number_of_cities);      // Create an empty array of size equal to number of ciites. 
        this.distanceCovered = 0;
    }

    /**
     * Add function
     */
    add (cities) {
        this.cities = cities;
    }

    /**
     * Shuffle function. 
     * Using a shuffling algorithm approach. 
     */
    shuffle () {
        let length = this.cities.length;
        while (length > 0) {
            let index = floor (random (1) * length);
            length--;
            this.swap (index, length);
        }
    }

    /**
     * Swap function. 
     */
    swap (i, j) {
        let temp = this.cities[i];
        this.cities[i] = this.cities[j];
        this.cities[j] = temp;
    }

    /**
     * distance function to return the distance of this journey. 
     */
    distance () {
        let totalDistance = 0,
            dist = 0;
        for (let i = 0; i < this.cities.length - 1; i++) {
            dist = this.cities[i].distanceFrom(this.cities[i + 1]);
            totalDistance += dist;
        }
        return totalDistance;
    }

    /**
     * fitness function to calculate fitness of journey. 
     * Based on distance. 
     */
    fitness () {
        let dist = this.distance ();
        this.distanceCovered = dist;
        return (1 / dist);
    }

    /**
     * contains function. 
     * Searching the city in specified range. 
     */
    contains (city, start_position, end_position) {
        let flag = true;
        for (let i = 0; i < this.cities.length; i++) {
            if (i < start_position || i > end_position) {
                if (this.cities[i].position.x == city.position.x && this.cities[i].position.y == city.position.y) {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    }

    /**
     * Crossover function. 
     */
    crossover (otherTour) {
        let newTour = new Journey(otherTour.cities.length),
            startPosition = floor (random() * this.cities.length),
            endPosition = floor (random() * this.cities.length),
            tourCounter = 0,
            newCities = [];
        if (startPosition > endPosition) {
            let temp = startPosition;
            startPosition = endPosition;
            endPosition = temp;
        }
        for (let i = 0; i < otherTour.cities.length; i++) {
            if (!this.contains(otherTour.cities[i], startPosition, endPosition))
                newCities.push(otherTour.cities[i]);
        }
        for (let i = startPosition; i <= endPosition; i++)
            newCities.push(this.cities[i]);
        newTour.add(newCities);
        return newTour;
    }

    /**
     * Mutation function. 
     */
    mutate (mutation_rate) {
        let randomIndex = 0;
        for (let i = 0; i < this.cities.length; i++) {
            if (random (1) < mutation_rate) {
                randomIndex = floor (random(1) * this.cities.length);
                this.swap(i, randomIndex);
            }
        }
    }
}