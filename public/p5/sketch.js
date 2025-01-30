// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let particles = [];

// Making sure pairs of particles are not checked twice
let checkedPairs = new Set();
let palette = [
  [11, 106, 136],
  [45, 197, 244],
  [112, 50, 126],
  [146, 83, 161],
  [164, 41, 99],
  [236, 1, 90],
  [240, 99, 164],
  [241, 97, 100],
  [248, 158, 79],
  [252, 238, 33],
];

function setup() {
  createCanvas(600, 80);
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let mass = random(4, 10);
    particles.push(new Particle(x, y, mass, i));
  }
}

function draw() {
  background(0);

  // Create a quadtree
  let boundary = new Rectangle(width / 2, height / 2, width, height);
  let qtree = new QuadTree(boundary, 4);
  checkedPairs.clear();

  // Insert all particles
  for (let particle of particles) {
    let point = new Point(particle.position.x, particle.position.y, particle);
    qtree.insert(point);
  }

  for (let i = 0; i < particles.length; i++) {
    let particleA = particles[i];
    let range = new Circle(
      particleA.position.x,
      particleA.position.y,
      particleA.r * 2
    );

    // Check only nearby particles based on quadtree
    let points = qtree.query(range);
    for (let point of points) {
      let particleB = point.userData;
      if (particleB !== particleA) {
        let idA = particleA.id;
        let idB = particleB.id;
        let pair = idA < idB ? `${idA},${idB}` : `${idB},${idA}`;
        if (!checkedPairs.has(pair)) {
          particleA.collide(particleB);
          checkedPairs.add(pair);
        }
      }
    }
  }

  for (let particle of particles) {
    particle.update();
    particle.edges();
    particle.show();
  }

  if (frameCount % 120 == 0) {
    console.log(frameRate());
  }
}
