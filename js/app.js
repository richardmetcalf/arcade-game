// Enemies our player must avoid
var Enemy = function (level = 1) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Enemies start on a random stone row, a random distance across the screen.
    this.x = -1 + 7 * Math.random();
    this.y = 1 + Math.floor(3 * Math.random());

    // Speed. Faster on harder levels!
    this.speed = 1 + (level - 1) / 5;
};

Enemy.prototype.update = function (dt) {
    this.x += dt * this.speed;
    if (this.x >= 5) {
        this.x = -1;
    }
    if (this.collidesWithPlayer()) {
        reset();
    }
};

Enemy.prototype.collidesWithPlayer = function () {
    return player.y === this.y && this.x - player.x < 0.8 && player.x - this.x < 0.8;
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 25);
};

var Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.moveToStart();
};

Player.prototype.moveToStart = function () {
    this.x = 2;
    this.y = 5;
};

Player.prototype.update = function (dt) {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 25);
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            this.x = Math.max(0, this.x - 1);
            break;
        case 'up':
            this.y = Math.max(0, this.y - 1);
            break;
        case 'right':
            this.x = Math.min(4, this.x + 1);
            break;
        case 'down':
            this.y = Math.min(5, this.y + 1);
            break;
    }
};

Player.prototype.isWin = function () {
    return this.y === 0;
};

let allEnemies = [];
let player = new Player();
let level = 1;

function reset(advanceLevel) {
    level = advanceLevel ? level + 1 : 1;
    document.querySelector('.level').textContent = level;
    player.moveToStart();
    allEnemies = [];
    for (let i = 0; i < level; i++) {
        allEnemies.push(new Enemy(level));
    }
}

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    if (player.isWin()) {
        reset(advancdLevel = true);
    }
});

reset();
