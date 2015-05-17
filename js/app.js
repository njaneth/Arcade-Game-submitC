// Enemies our player must avoid
var Enemy = function(X, Y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.x = X;
	this.y = Y;
	this.rspeed = Math.floor(Math.random() * 5) * 100; //set random speed for bugs
	this.box = {}; //image rectangle  
};

Enemy.prototype.reset = function() {
	this.x = 0; //send enemy to set point
	this.rspeed = Math.floor(Math.random() * 5) * 100;
	var rows = [60, 140, 230]; // row positions for the Enemies 
	this.y = rows[Math.floor(Math.random() * 3)]; //Random exit row for the enemies
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt, player) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	this.speed = 200 * (dt) + this.rspeed; //add the random speed to enemy
	this.x += this.speed * dt; //return the enemy to set point if reaches the canvas border
	if (this.x > 50) { // Gives diferents speeds to the enemy
		this.rspeed = Math.floor(Math.random() * 10) * 150;
	} else {
		this.rspeed = Math.floor(Math.random() * 2) * 80;
	}
	if (this.x > 500) { // set the enemy at the start point again when reaches the end of the canvas
		this.reset();
	}

	//set the enemy box size
	this.box.x1 = this.x + 10;
	this.box.x2 = this.box.x1 + 97;
	this.box.y1 = this.y + 86;
	this.box.y2 = this.box.y1 + 69;

	if (collision(this.box, player.box)) { // Check the collision
		CollisionDetected();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(ctx) {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
	this.sprite = 'images/char-boy.png';
	//set the initial position of the player
	this.x = 200;
	this.y = 400;
	this.box = {}; //image rectangle
};

Player.prototype.update = function() {
	//set the player box size
	this.box.x1 = this.x + 25;
	this.box.x2 = this.box.x1 + 67;
	this.box.y1 = this.y + 73;
	this.box.y2 = this.box.y1 + 75;
	//Reset the player when this reach the water
	if (this.y === -15) {
		alert("Congratulations!! You reached the water!! Play again");
		this.reset();
	}
};

Player.prototype.render = function(ctx) { //draw the player on the game
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
	switch (e) {
		case "up":
			if (this.y >= 20) {
				this.y = this.y - 83;
			} break;
		case "down":
			if (this.y <= 380) {
				this.y = this.y + 83;
			} break;
		case "left":
			if (this.x >= 10) {
				this.x = this.x - 101;
			} break;
		case "right":
			if (this.x <= 380) {
				this.x = this.x + 101;
			} break;
	}
};

Player.prototype.reset = function() { //Player start point
	this.x = 200;
	this.y = 400;
};

function CollisionDetected() { // reset the position of the player when the collision is detected
	player.reset();
}

//check the x and y for collision between player and enemy
function collision(b1, b2) {
	var nocollide = (b2.x1 > b1.x2) || (b1.x1 > b2.x2) || (b2.y1 > b1.y2) || (b1.y1 > b2.y2); // case where there is not a collision
	return (!(nocollide)); //We denied the previous cases and everything else is a collision      
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var rows = [60, 140, 230];
var allEnemies = [new Enemy(0, rows[Math.floor(Math.random() * 3)]), new Enemy(0, rows[Math.floor(Math.random() * 3)]), new Enemy(0, rows[Math.floor(Math.random() * 3)])];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});