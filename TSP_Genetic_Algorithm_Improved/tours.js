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
    add (ciites) {
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
}