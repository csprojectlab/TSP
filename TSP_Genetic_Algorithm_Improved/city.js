/**
 * City class. 
 */
class City {
    constructor (x, y) {
        this.position = createVector(x, y);
    }

    /**
     * Function returning distance from another city. 
     */
    distanceFrom(otherCity) {
        let otherPosition = otherCity.position;
        let distance = this.position.dist(otherPosition);
        return distance;
    }
}