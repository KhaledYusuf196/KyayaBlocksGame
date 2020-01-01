// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:0 },
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
var playerControl;

var cursors;
function createPlayer(scene) {
    
}

function preload() {
    cursors = this.input.keyboard.createCursorKeys();


    console.log(this);
    this.load.image('sky', 'assets/sky.png');
    this.load.image('player', 'assets/playerPlatform.png');
    this.load.image('ball', 'assets/ball.png');
}

function create() {
    
    playerControl = {
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }
    cursors = this.input.keyboard.createCursorKeys();
    //this.keyboard.input.keyboard.addkey(Phaser.keyboard.A);

    this.add.image(400, 300, 'sky');
    ball = this.physics.add.image(400, 300, 'ball');
    players[0] = this.physics.add.image(400, 100, 'player');
    players[1] = this.physics.add.image(400, 500, 'player');
    ball.setCollideWorldBounds(true);
    players[0].setCollideWorldBounds(true);
    players[1].setCollideWorldBounds(true);
    ball.setBounce(0.2);
    ball.setVelocityY(-330);


    //this.createPlayer();
}

function update() {

    if (playerControl.left.isDown) {
        players[1].setVelocityX(-320);
    }
    else if (playerControl.right.isDown) {
        players[1].setVelocityX(320);
    } else {
        players[1].setVelocityX(0);
    }

   

    if (cursors.left.isDown)
    {
        players[0].setVelocityX(-320);

    }
    else if (cursors.right.isDown)
    {
        players[0].setVelocityX(320);
    

    }
    else
    {
        players[0].setVelocityX(0);
    

    }
  
}