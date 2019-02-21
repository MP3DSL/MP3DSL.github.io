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

BasicGame.GameStage1.prototype = {

    create: function () {
    	this.background = this.game.add.sprite(0,0,'heaven');

		this.angel = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+100,'angel');
		this.angel.anchor.setTo(0.5,0.5);
		this.angel.scale.setTo(0.2,0.2);

		this.left = this.game.add.button(150,this.game.world.centerY,'left');
		this.left.anchor.setTo(0.5,0.5);
		this.left.inputEnabled = true;
		this.left.events.onInputDown.add(function() {this.leftPathCheck();}, this);

		this.right = this.game.add.sprite(630,this.game.world.centerY,'right');
		this.right.anchor.setTo(0.5,0.5);
		this.right.inputEnabled = true;
		this.right.events.onInputDown.add(function() {this.rightPathCheck();}, this);

		gameTimerText = this.game.add.text(0,0,'Time: 0', {fontSize: '24px', fill: '#00000'})
		if(!gameStarted){
			gameTime = Math.floor(this.game.time.totalElapsedSeconds());
    	}
    	gameStarted = true;
    },

    update: function () {
		gameTimerText.text = 'Time: ' + gameTimer;
		gameTimer = Math.floor(this.game.time.totalElapsedSeconds()) - gameTime;
    },

	leftPathCheck: function () {
		if(stage1 == 0){
			this.state.start('Stage2');
			this.game.sound.play('correct');
		}
		else{
			this.state.start('MainMenu');
			this.game.sound.play('nope');
		}
	},

	rightPathCheck: function () {
		if(stage1 == 0){
			this.state.start('MainMenu');
			this.game.sound.play('nope');
		}
		else{
			this.state.start('Stage2');
			this.game.sound.play('correct');
		}
	}
};