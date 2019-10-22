// Genetic algorithm to solve the travelling salesman problem 
/**
 * The things with higher fitness are supposed to be picked more often
 * The things with lower fitness are supposed to be picked less often
 * Deciding on more often and less often is completely probabilistic
 */
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 700;
const CITY_COUNT = 16;
const POPULATION_COUNT = 1000;
const GENERATION_COUNT = 10000;
const GRAPH_BORDER = 20;    // Pixels left from side
const MAX_GENERATION_DISTANCE_DATA = 960;   
const MUTATION_RATE = 0.01;

let cities = [];
let recordDistane;
let bestRoute;      // Best in entire population till now
let bestDistance = Infinity;
let currentBest;        // Best in the current population
let population = [];
let fitness = [];
let generationWiseDistance = [];   // Saving the best distance among the populations
let currentGeneration = 1;

function setup () {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    let order = [];
    for (let i = 0; i < CITY_COUNT; i++) {
        let location = createVector (random(width / 2), random(height/2));
        cities.push(location); 
        order[i] = i;
    }
    for (let i = 0; i < POPULATION_COUNT; i++) {
        population[i] = shuffle(order);
    }    
}


function draw () {
   background(0)
   calculateFitness();
   normalizeFitness();
   visualizeDistance(bestDistance);

   nextGeneration();
   fill(100);
   stroke(255);
   for (let i = 0; i < cities.length; i++)
        ellipse(cities[i].x, cities[i].y, 8, 8)
   noFill();
   strokeWeight(1)
   stroke(0, 255, 0)
   beginShape();
   for (let i = 0; i < bestRoute.length; i++) {
        let index = bestRoute[i];
        vertex (cities[index].x, cities[index].y);
   }
   endShape();

   push();
        translate(width / 2 + 20, 0);
        stroke(255)
        strokeWeight(4)
        line(0, 0, 0, height / 2)   // Separation line
        fill(210);
        stroke(0, 255, 0)
        for (let i = 0; i < cities.length; i++)
            ellipse(cities[i].x, cities[i].y, 8, 8)
        strokeWeight(2)
        // fill(210)
        noFill();
        stroke(255)
        beginShape();
        for (let i = 0; i < currentBest.length; i++) {
            let index = currentBest[i];
            vertex (cities[index].x, cities[index].y);
        }
        endShape();
   pop();
   let percent = (currentGeneration / GENERATION_COUNT) * 100;
   textSize(16);
   noStroke();
   fill(0, 255, 0);
   push ()
        translate(0, height / 2);
        text ("Population: " + POPULATION_COUNT, 20, 20);
        text ("Best Distance: " + nf(bestDistance, 0, 2), 160, 20);
        text ("Total Generations: " + GENERATION_COUNT, 340, 20);
        text ("Cities: " + CITY_COUNT, 540, 20);
        fill(255, 0, 0)
        text (nf(percent, 0, 2) + "% completed", 20, 40);
   pop();
}

// Visualize the distance in the form of bars
function visualizeDistance(distance) {    
    if (generationWiseDistance.length == MAX_GENERATION_DISTANCE_DATA)
        generationWiseDistance = [];
    push();
        translate(0, height / 2)        
        stroke(255);
        strokeWeight(4);
        line (0, 0, width, 0);     // White separation line
        // Mapping the distance to barLength to fill the graph space
        let barLength = map (distance, 1, 4000, 0, height / 2);
        generationWiseDistance.push(barLength);   // Saving the distance for graphical view
        stroke(150);
        strokeWeight(0.5)
        for (let i = 0; i < generationWiseDistance.length; i++) {
            line (GRAPH_BORDER + i, height / 2, GRAPH_BORDER + i, (height / 2) - generationWiseDistance[i]);
        }
        fill(0,255,255)
        noStroke();
        printPath();        // Function printing the best route
    pop();
}

function printPath () {
    let printHeight = 60;
    let textWidth = 105;
    textSize(16);
    text("Path: ", 20, printHeight);
    printHeight += 20;
    let offset = 0;
    for (let i = 0; i < bestRoute.length; i++) {
        let city = cities[bestRoute[i]];
        text ("("+nf(city.x,0,1)+","+nf(city.y,0,1)+")", 20 + ((offset++)*textWidth), printHeight);
        if (offset == 9) {
            offset = 0;
            printHeight += 20;
        }
    }
}

function calculateDistance (points, mapping) {
    let sum = 0;
    for (let i = 0; i < mapping.length - 1; i++) {
        let cityA = points[mapping[i]];
        let cityB = points[mapping[i+1]];
        let distance = dist (cityA.x, cityA.y, cityB.x, cityB.y);
        sum += distance;
    }
    return sum;
}
