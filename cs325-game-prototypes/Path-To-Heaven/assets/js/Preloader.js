BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

	var stage1 = null;
	var stage2 = null;
	var stage3 = null;
	var stage4 = null;
	var stage5 = null;

	var winMsg = null;

	var gameTimerText = null;
	var gameStarted = null;
	var gameTime = null;
	var gameWon = null;
};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlePage', 'assets/title.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		//this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
        this.load.image( 'logo', 'assets/phaser.png' );
        this.load.image('angel', 'assets/angel.png');
        this.load.image('heaven', 'assets/heaven.jpg');
        this.load.image('left', 'assets/left.png');
        this.load.image('right', 'assets/right.png');
        this.load.audio('nope', 'assets/Nope.mp3');
        this.load.audio('menu', 'assets/HolySoundEffect.mp3');
        this.load.audio('correct', 'assets/DoorBell.mp3');
        
        stage1 = (Math.random() < 0.5 ? 0:1);
        stage2 = (Math.random() < 0.5 ? 0:1);
        stage3 = (Math.random() < 0.5 ? 0:1);
        stage4 = (Math.random() < 0.5 ? 0:1);
        stage5 = (Math.random() < 0.5 ? 0:1);

        gameStarted = false;
        gameTimer = 0;
        gameTime = 0;
        gameWon = false;
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (/*this.cache.isSoundDecoded('titleMusic') && */this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};