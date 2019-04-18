BasicGame.GameStage1 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().

};

var flipped = true;
var demons;
var demonsSpawned = 0;
var spawnTimer;

BasicGame.GameStage1.prototype = {

    create: function () {
    	bgmusic = this.game.sound.play('music');
    	bgmusic.volume = musicVolume;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.background = this.game.add.sprite(0,0,'background');
		map = this.game.add.tilemap('environment');
		map.addTilesetImage('tileset');
		
		layer = map.createLayer(0);
		layer.resizeWorld();
		
		map.setCollisionBetween(2, 32);

		spawnpoint = this.game.add.sprite(200, 3850, 'spawnPoint');
		demons = this.game.add.group();
		demons.enableBody=true;
		spawnTimer = this.game.time.create(false);
		spawnTimer.loop(3000, spawn, this);
		spawnTimer.start();

		player = this.game.add.sprite(this.game.world.centerX, 3800, 'player');
		player.anchor.setTo(0.5,0.5);
		player.scale.setTo(0.2,0.2);
		
		this.game.physics.arcade.enable(player);
		player.body.tilePadding.set(1000);
		player.body.gravity.y = 900;
		player.body.collideWorldBounds=true;
		
		this.game.camera.follow(player);

		//\/\/\/Adding Keybindings\/\/\/\\
		w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);
		a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.A]);
		s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.S]);
		d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.D]);
		space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		this.game.input.mouse.capture = true;
    },

    update: function () {
    	player.body.velocity.x = 0;
    	var colliding = this.game.physics.arcade.collide(player,layer);
    	demons.forEach(function move(demon){
    		this.game.physics.arcade.moveToObject(demon, player, 140);
			if(demon.body.position.x < player.body.position.x && demon.scale.x > 0){
				demon.scale.x *= -1;
			}
			else if(demon.body.position.x > player.body.position.x && demon.scale.x < 0){
				demon.scale.x *= -1;
			}
			if(this.game.physics.arcade.collide(demons, player) || this.game.physics.arcade.collide(player, demons)){
				killDemon(player, demon);
				demonsSpawned--;
			}
    	}, this.game.physics.arcade, false, 200);
    	if(a.isDown){
    		if(flipped){
    			player.scale.x *= -1;
    			flipped = false;
    		}
    		player.body.position.x -= 20;
    	}
    	if(s.isDown){
    		player.body.velocity.y = 900;
    	}
    	if(d.isDown){
    		if(!flipped){
    			player.scale.x *= -1;
    			flipped = true;
    		}
    		player.body.position.x += 20;
    	}
    	if(space.isDown && colliding){
    		player.body.velocity.y = -1000;
    	}
		if(!bgmusic.isPlaying){
            bgmusic.play();
        }
    }
};

function spawn(){
	if(demonsSpawned<3){
		demon = demons.create(spawnpoint.x, spawnpoint.y, 'demon');
		demon.anchor.setTo(0.5,0.5);
    	demon.scale.setTo(0.2,0.2);
    	demon.scale.x *= -1;
    	demonsSpawned++;
	}
}

function killDemon(player, demon) {
	//demon.animations.play('die');
	//demon.events.onAnimationComplete(function(enemy) {
		demon.kill();
		demon.destroy();
		demons.remove(demon);
	//}, this);
}