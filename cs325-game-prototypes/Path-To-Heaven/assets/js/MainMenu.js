BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = new Phaser.Sound(this, 'menu', 1, true);
		this.music.play();

		//this.add.sprite(0, 0, 'titlePage');
        this.background = this.game.add.sprite(0,0,'heaven');
		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.menuName = this.game.add.text(this.game.world.centerX, 0, 'Path To', { fontSize: '64px', fill: '#ffffff'});
		this.menuName.anchor.setTo(0.5,0);
	},

	update: function () {
        if(gameStarted){
            gameTimer = Math.floor(this.game.time.totalElapsedSeconds()) - gameTime;
        }
        if(!this.music.isPlaying){
            this.music.play();
        }
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Stage1');

	}

};