// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var targets = [];
var game = new Phaser.Game(config);
var players = new Array(2);
var ball;
var playerControl;

var scoreText;

var cursors;
function preload() {
    cursors = this.input.keyboard.createCursorKeys();
    playerControl = {
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    console.log(this);
    this.load.image('sky', 'assets/sky.png');
    this.load.image('player', 'assets/character.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('network', 'assets/network.png');

    this.load.spritesheet('girl', 
    'ch.png',
    { frameWidth: 32, frameHeight: 48 }
);
}

function create() {
  
    cursors = this.input.keyboard.createCursorKeys();
    //this.keyboard.input.keyboard.addkey(Phaser.keyboard.A);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.add.image(400, 300, 'sky');
    ball = this.physics.add.image(400, 300, 'ball').setScale(0.5);
    players[0] = this.physics.add.sprite(400, 100, 'girl');
    players[1] = this.physics.add.image(400, 500, 'player').setScale(0.1);
    ball.setCollideWorldBounds(true);
    players[0].setCollideWorldBounds(true);
    players[1].setCollideWorldBounds(true);
    ball.setBounce(1);
    players[0].setBounce(.5);
    players[1].setBounce(.5);

    ball.setVelocityY(-330);
    this.physics.add.overlap(ball, players, pushBall, null, this);
    // players[0].setTint(0xff0000);
    // players[1].setTint(0x0000ff);
    players[0].score = 0;
    players[1].score = 0;


    targets[0] = this.physics.add.staticImage(400, 0, 'network').setScale(0.5).refreshBody();
    targets[1] = this.physics.add.staticImage(400, 600, 'network').setScale(0.5).refreshBody();

    this.physics.add.overlap(ball, targets[0], () => { score(1) }, null, this);
    this.physics.add.overlap(ball, targets[1], () => { score(0) }, null, this);
    
    //console.log(targets[0].scale = {x:2, y:1});
    scoreText = this.add.text(16, 16, 'Red 0 - 0 Blue', { fontSize: '32px', fill: '#000' });


    

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



    if (cursors.left.isDown) {
        players[0].setVelocityX(-320);

    }
    else if (cursors.right.isDown) {
        players[0].setVelocityX(320);


    }
    else {
        players[0].setVelocityX(0);
    }

}

function pushBall(ball, player) {
    var direction = {
        x: ball.x - player.x,
        y: ball.y - player.y,
    };
    normal = [direction.x / Math.sqrt(direction.x * direction.x + direction.y * direction.y), direction.y / Math.sqrt(direction.x * direction.x + direction.y * direction.y)]
    ball.body.velocity.x = 1000 * normal[0];
    ball.body.velocity.y = 1000 * normal[1];
    console.log(direction);
}

function score(scorer) {
    players[scorer].score++;
    ball.x = 400;
    ball.y = 300;
    if (scorer == 1){
        ball.setVelocityY(-100);
        ball.setVelocityX(0);
    }
        
    else {
        ball.setVelocityY(100);
        ball.setVelocityX(0);
    }

    scoreText.setText("Red " + players[0].score + " - " + players[1].score + " Blue");
        
}