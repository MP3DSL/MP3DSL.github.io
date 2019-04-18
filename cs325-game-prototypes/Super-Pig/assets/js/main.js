var game = new Phaser.Game(1024, 800, Phaser.Auto)

//Keybindings
var a,d,space;

var map;
var layer;

var bgmusic;

var GameState = {
	preload: function(){
		game.load.tilemap('environment', 'assets/environment.csv', null, Phaser.Tilemap.TILED_CSV);
		game.load.image('tileset', 'assets/TileSet.png');
		game.load.image('sp', 'assets/superpig.png');
		game.load.audio('hit', 'assets/RobloxDeathSoundEffect.mp3');
		game.load.audio('music', 'assets/backgroundmusic.mp3');
	},
	create: function(){
		this.background = this.game.add.sprite(0,0,'background');
		bgmusic = game.sound.play('music');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		map = game.add.tilemap('environment');
		map.addTilesetImage('tileset');
		
		layer = map.createLayer(0);
		layer.resizeWorld();
		
		map.setCollisionBetween(1, 32);

		player = game.add.sprite(game.world.centerX, 10050, 'sp');
		player.anchor.setTo(0.5,0.5);
		player.scale.setTo(0.5,0.5);
		
		game.physics.arcade.enable(player);
		player.body.tilePadding.set(1000);
		player.body.gravity.y = 1;
		player.body.collideWorldBounds=true;
		
		game.camera.follow(player);
		//\/\/\/Adding Keybindings\/\/\/\\
		a = game.input.keyboard.addKey(Phaser.Keyboard.A);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.A]);
		d = game.input.keyboard.addKey(Phaser.Keyboard.D);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.D]);
		space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);		
	},
	update: function(){
		if(!bgmusic.isPlaying)
			bgmusic.play();
		var colliding = game.physics.arcade.collide(player,layer);
		player.body.velocity.x = 0;
		player.body.velocity.y = 959;
		if(space.isDown){
			player.body.velocity.y = -959;
		}
		if(a.isDown){
			player.body.velocity.x = -959;
		}
		if(d.isDown){
			player.body.velocity.x = 959;
		}
		if(player.body.position.y<10000 && colliding){
			game.sound.play('hit');
			player.body.position.y = 10050
		}
	}
}

game.state.add('GameState', GameState)
game.state.start('GameState')
