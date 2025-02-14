class Particle {
  constructor (x, y, mass) {
    // Setup particle
    this.position = createVector(x,y)
    this.acceleration = createVector(0,0)
    this.velocity = createVector(0,0)
    this.mass = mass
    
    // Setup size of particle
    this.radius = Math.sqrt(this.mass / PI) * SCALE
    // Randomize color of particle
    this.color = color(random(0,255), random(0,255), random(0,255))
  }

  draw() {
    // Draw particle
    // Remove outlines
    noStroke()
    // Set fill to particle's color
    fill(this.color)
    // Draw particle
    ellipse(this.position.x, this.position.y, this.radius * 2)
  }

  applyForce(force) {
    // Apply force to particle
    // acceleration = force / mass
    this.acceleration.add(p5.Vector.div(force, this.mass))
  }

  physics(particle) {
    // Use particle
    // Doesn't apply to itself
    if (this == particle) return
    
    // Setting up the mass, radius, and distance
    let mass = this.mass * particle.mass
    let radius = this.radius + particle.radius
    let distance = this.position.dist(particle.position)
    
    // Doesn't apply if particles are touching
    if (distance <= radius) return
    
    // Universal Law of Gravity formula
    // force = G * mass1 * mass2 / distance ** 2
    let force = p5.Vector.sub(this.position, particle.position).setMag(G * mass / (distance ** 2))
    
    // Apply the force 
    particle.applyForce(force)
  }

  update() {
    // Update particle
    // Calculate change in acceleration
    let deltaVelocity = p5.Vector.mult(this.acceleration, deltaTime)
    
    //Adds acceleration to velocity
    this.velocity.set(this.velocity.add(deltaVelocity))
    
    // Adds velocity to position
    this.position.set(this.position.add(p5.Vector.mult(this.velocity, deltaTime)))
    
    // Reset acceleration to 0
    this.acceleration.set(0, 0)
  }}
