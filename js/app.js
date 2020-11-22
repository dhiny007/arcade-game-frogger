// Enemy class containing the enemies that the player must avoid
var Enemy = function(x, y, moveSpeed) {

  this.sprite = 'images/enemy-bug.png'; // image of the enemy characters
  this.x = x; // assigns the x coordinate of the enemy image to the parameter x
  this.y = y; // assigns the y coordinate of the enemy image to the parameter y
  this.moveSpeed = moveSpeed; //assigns the moving speed of the enemy to the parameter moveSpeed
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
  //the below line is responsible for making the enemy objects move
  this.x += this.moveSpeed * dt;

  //if the enemy reaches the end of the window,make it come back to the start and start moving again
  if (this.x > 503) {
    this.x = 0;
  }
  this.collision(); //checks for collision between the player and enemy characters
};

// Method responsible for drawing the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// the Player class for storing the player characteristics
var Player = function(x, y) {
  this.sprite = 'images/char-boy.png'; // the image of the player character
  this.x = x; //gets the x coordinate of the player and assigns it to the parameter x
  this.y = y; //gets the y coordinate of the player and assings it to the character y
};
var count = 0; //variable used to count the number of times the player reaches the water
Player.prototype.update = function() {
  //perform the following if the player reaches the water  successfully
  if (this.y <= 0) {
    //the below two lines set the player character back to the starting position on reaching the water
    this.x = 200;
    this.y = 400;
    count++; //incrementing the count variable when player reacher the water
    if (count === 3) {
      //when count reaches 3,alert the following message to the user
      alert('Congratulations!! You did it!!');
      count = 0; // after alerting the message,set the value of count back to 0
    }
  }
};
//Method responsible for drawing the player character on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Instantiating the player and enemy objects
var player = new Player(200, 400);

var allEnemies = [
  new Enemy(50, 100, 200),
  new Enemy(110, 200, 100),
  new Enemy(200, 50, 300),
  new Enemy(200, 140, 200)
];

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//Method responsible for handling all the key press functionalities
Player.prototype.handleInput = function(keyControls) {
  //when the left key is pressed,move the character to the left
  if (keyControls == 'left') {
    if (this.x > 0) {
      this.x = this.x - 50;
    }
  }
  //When the right key is pressed,move the character to the right
  if (keyControls == 'right') {
    if (this.x < 400) {
      this.x = this.x + 50;
    }
  }
  //when the up key is pressed,move the character upwards
  if (keyControls == 'up') {
    if (this.y > 0) {
      this.y = this.y - 50;
    }
  }
  //when the down key is pressed,move the character downwards
  if (keyControls == 'down') {
    if (this.y < 400) {
      this.y = this.y + 50;
    }
  }
  console.log(keyControls);
};

Enemy.prototype.collision=function() {
  // check for collision between enemy and player
  if (
    player.y + 131 >= this.y + 90 &&
    player.x + 25 <= this.x + 88 &&
    player.y + 73 <= this.y + 135 &&
    player.x + 76 >= this.x + 11) {
    console.log('collided');
    player.x = 200;
    player.y = 400;
    count = 0; // set the count back to zero on collision with an enemy character
  }
};
