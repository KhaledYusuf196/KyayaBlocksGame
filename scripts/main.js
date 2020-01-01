// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var players = new Array(2);
var ball;

function createPlayer(scene) {
    
}

function preload() {
    console.log(this);
    this.load.image('sky', 'assets/sky.png');
    this.load.image('player', 'assets/playerPlatform.png');
    this.load.image('ball', 'assets/ball.png');
}

function create() {
    this.add.image(400, 300, 'sky');
    ball = this.physics.add.image(400, 300, 'ball');
    players[0] = this.physics.add.image(400, 100, 'player');
    players[1] = this.physics.add.image(400, 500, 'player');
    ball.setCollideWorldBounds(true);
    players[0].setCollideWorldBounds(true);
    players[1].setCollideWorldBounds(true);

    //this.createPlayer();
}

function update() {

}