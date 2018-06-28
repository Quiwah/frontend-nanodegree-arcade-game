// Variables applied to each of our instances go here,
// we've provided one for you to get started

// Orcas from left side
let Orca = function(x, y, speed) {
    this.x = x;
    this.y = 70;
    this.speed = Math.floor(Math.random() * 400);
    // The image/sprite for our orcas, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/orca.png';
};
// Seals from right side
let Seal = function(x, y, speed) {
    this.x = x;
    this.y = 245;
    this.speed = Math.floor(Math.random() * 250);
    this.sprite = 'images/seal.png';
};

// Update the obstacle's position, required method for game
// Parameter: dt, a time delta between ticks
Orca.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -100;
    }
    this.x += this.speed * dt;

    // When the ferry hit an orca, it goes back and lives lose 1 life
    if (ferry.x <= this.x + 100 && ferry.x >= this.x &&
    ferry.y <= this.y && 20 + ferry.y >= this.y) {
        lives--;
        let currentLives = document.getElementById('life');
        currentLives.innerHTML = lives;
        ferry.reset();
    }
}

Seal.prototype.update = function(dt) {
    if (this.x < -80) {
        this.x = 550;
    }
    this.x -= this.speed * dt;

    // When the ferry hit an seal, it goes back and lives lose 1 life
    if (ferry.x <= this.x && 65 + ferry.x >= this.x &&
        ferry.y <= this.y && 70 + ferry.y >= this.y) {
            lives--;
            currentLives = document.getElementById('life');
            currentLives.innerHTML = lives;
            ferry.reset();
        }
}

// Draw the obstacles and items on the screen
Orca.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Seal.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Ferry class with an update(), render() and a handleInput() method.
var Ferry = function(x, y) {
    this.x = 200;
    this.y = 390;
    this.sprite = 'images/ferry.png';
}

// Prevent the ferry to go out from the canvas
Ferry.prototype.update = function() {
    switch(true){
        case this.x < 10:
            this.x = 0;
            break;
        case this.x > 400:
            this.x = 400;
            break;
        default:
            this.x = this.x;
            break;
    }
    switch(true){
        // When the ferry reach to the top...
        case this.y < 30:
            // ...add 1 to the point
            currentPoint++;
            let point = document.getElementById('point');
            point.innerHTML = currentPoint;
            // ...the ferry returns to the original location
            this.reset();
            break;
        case this.y > 391:
            this.y = 390;
            break;
        // Prevent the ferry to be strand
        case this.y > 350:
        this.x = 200;
        break;
    }
    // Game completed!
    if(currentPoint === 10) {
        //display the modal
        document.querySelector('.goodnews').style.display = 'block';
    }
    // Game over
    if(lives === 0) {
        //display the modal
        document.querySelector('.badnews').style.display = 'block';
    }
}

Ferry.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

const direction = '';

Ferry.prototype.handleInput = function(direction) {
    switch(direction){
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 85;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 85;
            break;
        }
}

// Default position for the ferry
Ferry.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
}

// Place all obstacle objects in an array called allObstacles
const allObstacles = [];

for (var i = 0; i < 3; i++) {
    let orca = new Orca(-100, i);
    let seal = new Seal(550, i);
    allObstacles.push(orca, seal);
}

// Place the ferry object in a variable called ferry
let ferry = new Ferry();

// This listens for key presses and sends the keys to your
// Ferry.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    ferry.handleInput(allowedKeys[e.keyCode]);
});

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
    location.reload();
}