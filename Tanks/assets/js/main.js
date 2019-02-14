var game = new Phaser.Game(1000, 500, Phaser.Auto)

//TankShooting
var bullet;
var tank;

//Lives
var p1Lives = 3;
var p2Lives = 3;
var p1LivesText;
var p2LivesText;
var winner = false;

//Timers
var gameTimer;
var gameTimerText;

//Keyboard Input
var w,a,s,d,q,e,f;
var i,j,k,l,u,o,h;

//Sound effects/music
var tankMoving;
var hit;
var fire;

var GameState = {
	preload: function(){
		game.load.image('p1', 'assets/RedTank(Hull).png');
		game.load.image('p2', 'assets/BlueTank(Hull).png');
		game.load.image('p1Gun', 'assets/RedTank(Gun).png');
		game.load.image('p2Gun', 'assets/BlueTank(Gun).png');
		game.load.image('bullet', 'assets/Bullet.png');
		game.load.image('field', 'assets/Field.png');
		game.load.image('sideWall', 'assets/SideWall.png');
		game.load.image('topWall', 'assets/TopWall.png');
		game.load.audio('tankMoving', 'assets/TankMoving.mp3');
		game.load.audio('tankFiring', 'assets/TankFiring.mp3');
		game.load.audio('hit', 'assets/RobloxDeathSoundEffect.mp3');
	},
	create: function(){
		//Add Sound
		tankMoving = game.sound.play('tankMoving');
		tankMoving.stop();
		
		//Adds arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//SetUp Background
		background = game.add.sprite(0,0,'field');
		
		//SetUp Wall Collision
		walls = game.add.group();
		walls.enableBody = true;
		sideWalls = game.add.group();
		sideWalls.enableBody = true;
		middleWall = game.add.group();
		middleWall.enableBody = true;
		bottomWall = game.add.group();
		bottomWall.enableBody = true;
		topWall = game.add.group();
		topWall.enableBody = true;
		var leftWall = sideWalls.create(0,0,'sideWall');
		leftWall.body.immovable = true;
		leftWall.body.bounce.setTo(1,1);
		var rightWall = sideWalls.create(1000-21,0,'sideWall');
		rightWall.body.immovable = true;
		rightWall.body.bounce.setTo(1,1);
		var top1 = topWall.create(0,0,'topWall');
		top1.body.immovable = true;
		top1.body.bounce.setTo(1,1);
		var bottom = bottomWall.create(0,500-21,'topWall');
		bottom.body.immovable = true;
		bottom.body.bounce.setTo(1,1);
		
		//Invisibile Boundary that tanks cannot cross
		invisibleBoundaries = game.add.group();
		invisibleBoundaries.enableBody = true;
		var invisibleWall = invisibleBoundaries.create(500-10,0,'sideWall');
		invisibleWall.body.immovable = true;
		invisibleWall.alpha = 0;
		
		//SetUp Players
		/*Player 1*/
		p1 = game.add.sprite(250,400,'p1');
		p1.anchor.setTo(0.5,0.5);
		p1.scale.setTo(0.5,0.5);
		p1Gun = game.add.sprite(250,375,'p1Gun');
		p1Gun.anchor.setTo(0.5,0.70);
		p1Gun.scale.setTo(0.5,0.5);
		p1Gun.y += 25;
		game.physics.arcade.enable(p1);
		p1.body.immovable = true;
		/*Player 2*/
		p2 = game.add.sprite(1000-250,400,'p2');
		p2.anchor.setTo(0.5,0.5);
		p2.scale.setTo(0.5,0.5);
		p2Gun = game.add.sprite(1000-250,375,'p2Gun');
		p2Gun.anchor.setTo(0.5,0.70);
		p2Gun.scale.setTo(0.5,0.5);
		p2Gun.y += 25;
		game.physics.arcade.enable(p2);
		p2.body.immovable = true;
		
		//SetUp Bullets
		bullet = game.add.weapon(30, 'bullet');
		bullet.onFire.add(function(){
		game.sound.play('tankFiring');
		});
		
		//\/\/\/Adding Keybindings\/\/\/\\
		/*Player 1*/
		w = game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);
		a = game.input.keyboard.addKey(Phaser.Keyboard.A);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.A]);
		s = game.input.keyboard.addKey(Phaser.Keyboard.S);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.S]);
		d = game.input.keyboard.addKey(Phaser.Keyboard.D);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.D]);
		q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.Q]);
		e = game.input.keyboard.addKey(Phaser.Keyboard.E);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.E]);
		f = game.input.keyboard.addKey(Phaser.Keyboard.F);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.F]);
		/*Player 2*/
		i = game.input.keyboard.addKey(Phaser.Keyboard.I);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.I]);
		j = game.input.keyboard.addKey(Phaser.Keyboard.J);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.J]);
		k = game.input.keyboard.addKey(Phaser.Keyboard.K);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.K]);
		l = game.input.keyboard.addKey(Phaser.Keyboard.L);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.L]);
		u = game.input.keyboard.addKey(Phaser.Keyboard.U);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.U]);
		o = game.input.keyboard.addKey(Phaser.Keyboard.O);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.O]);
		h = game.input.keyboard.addKey(Phaser.Keyboard.H);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.H]);

		//Create Live Board
		p1LivesText = game.add.text(5,0,'P1 Lives: 3', { fontSize: '32px', fill: '#ffffff'})
		p2LivesText = game.add.text(825,0,'3 :P2 Lives', { fontSize: '32px', fill: '#ffffff'})
		
		//Create Timer
		timer = game.time.create(false)
	},
	update: function(){
		var p1HitSideWall = game.physics.arcade.collide(p1, sideWalls);
		var p1HitTopWall = game.physics.arcade.collide(p1, topWall);
		var p1HitBottomWall = game.physics.arcade.collide(p1, bottomWall);
		var p1HitMiddleWall = game.physics.arcade.collide(p1, invisibleBoundaries);
		var p2HitSideWall = game.physics.arcade.collide(p2, sideWalls);
		var p2HitTopWall = game.physics.arcade.collide(p2, topWall);
		var p2HitBottomWall = game.physics.arcade.collide(p2, bottomWall);
		var p2HitMiddleWall = game.physics.arcade.collide(p2, invisibleBoundaries);
		p1.angle = 0;
		p2.angle = 0;
		
		if(!winner){
			//\/\/\/Controlls\/\/\/\\
			/*Player 1*/
			//Tank
			if(w.isDown && a.isDown && !p1HitSideWall && !p1HitTopWall){
				p1.y -= 1;
				p1Gun.y -= 1;
				p1.x -= 1;
				p1Gun.x -= 1;
				p1.angle = 45;
			}
			else if(w.isDown && d.isDown && !p1HitMiddleWall && !p1HitTopWall){
				p1.y -= 1;
				p1Gun.y -= 1;
				p1.x += 1;
				p1Gun.x += 1;
				p1.angle = 45;
			}
			else if(s.isDown && a.isDown && !p1HitSideWall && !p1HitBottomWall){
				p1.y += 1;
				p1Gun.y += 1;
				p1.x -= 1;
				p1Gun.x -= 1;
				p1.angle = 45;
			}
			else if(s.isDown && d.isDown && !p1HitMiddleWall && !p1HitBottomWall){
				p1.y += 1;
				p1Gun.y += 1;
				p1.x += 1;
				p1Gun.x += 1;
				p1.angle = 45;
			}
			else if(w.isDown && !p1HitTopWall){
				p1.y -= 1;
				p1Gun.y -= 1;
			}
			else if(a.isDown && !p1HitSideWall){
				p1.x -= 1;
				p1Gun.x -= 1;
			}
			else if(s.isDown && !p1HitBottomWall){
				p1.y += 1;
				p1Gun.y += 1;
			}
			else if(d.isDown && !p1HitMiddleWall){
				p1.x += 1;
				p1Gun.x += 1;
			}
			//cannon
			if(q.isDown){
				p1Gun.angle -= 1;
			}
			if(e.isDown){
				p1Gun.angle += 1;
			}
			/*Player 2*/
			//Tank
			if(i.isDown && j.isDown && !p2HitMiddleWall && !p2HitTopWall){
				p2.y -= 1;
				p2Gun.y -= 1;
				p2.x -= 1;
				p2Gun.x -= 1;
				p2.angle = 45;
			}
			else if(i.isDown && l.isDown && !p2HitSideWall && !p2HitTopWall){
				p2.y -= 1;
				p2Gun.y -= 1;
				p2.x += 1;
				p2Gun.x += 1;
				p2.angle = 45;
			}
			else if(k.isDown && j.isDown && !p2HitMiddleWall && !p2HitBottomWall){
				p2.y += 1;
				p2Gun.y += 1;
				p2.x -= 1;
				p2Gun.x -= 1;
				p2.angle = 45;
			}
			else if(k.isDown && l.isDown && !p2HitSideWall && !p2HitBottomWall){
				p2.y += 1;
				p2Gun.y += 1;
				p2.x += 1;
				p2Gun.x += 1;
				p2.angle = 45;
			}
			else if(i.isDown && !p2HitTopWall){
				p2.y -= 1;
				p2Gun.y -= 1;
			}
			else if(j.isDown && !p2HitMiddleWall){
				p2.x -= 1;
				p2Gun.x -= 1;
			}
			else if(k.isDown && !p2HitBottomWall){
				p2.y += 1;
				p2Gun.y += 1;
			}
			else if(l.isDown && !p2HitSideWall){
				p2.x += 1;
				p2Gun.x += 1;
			}
			//cannon
			if(u.isDown){
				p2Gun.angle -= 1;
			}
			if(o.isDown){
				p2Gun.angle += 1;
			}
		}
		//\/\/\/GamePlay\/\/\/\\
		//Bullets
		var bulletHitTopWall = game.physics.arcade.collide(bullet.bullets, topWall);
		var bulletHitSideWall = game.physics.arcade.collide(bullet.bullets, sideWalls);
		var bulletHitBottomWall = game.physics.arcade.collide(bullet.bullets, bottomWall);
		var bulletHitP1 = game.physics.arcade.collide(bullet.bullets, p1);
		var bulletP1Overlap = game.physics.arcade.overlap(bullet.bullets, p1);
		var bulletHitP2 = game.physics.arcade.collide(bullet.bullets, p2);
		var bulletP2Overlap = game.physics.arcade.overlap(bullet.bullets, p2);
		
		if(f.isDown && !winner){
			tank = 1;
			shoot();
		}
		if(h.isDown && !winner){
			tank = 2;
			shoot();
		}
		if(bulletHitP1 && !bulletP1Overlap){
			tank = 1;
			shot();
		}
		if(bulletHitP2 && !bulletP2Overlap){
			tank = 2;
			shot();
		}
		
		//Sound
		if((w.isDown || q.isDown || e.isDown || a.isDown || s.isDown || d.isDown || u.isDown || i.isDown || o.isDown || j.isDown || k.isDown || l.isDown) && !tankMoving.isPlaying){
			tankMoving = game.sound.play('tankMoving');
		}
		
		//Winning
		if(/*p1Lives>p2Lives || */p2Lives==0 && !winner){
			winner = true;
			game.add.text(200, 200, 'PLAYER 1 WINS!!!', { fontSize: '68px', fill: '#ffffff'})
			bullet.destroy();
		}
		else if(p1Lives==0 && !winner){
			winner = true;
			game.add.text(200, 200, 'PLAYER 2 WINS!!!', { fontSize: '68px', fill: '#ffffff'})
			bullet.destroy();
		}
	}
}

function shoot(){
	bullet.bulletCollideWorldBounds = true;
	bullet.bulletRotateToVelocity = true;
	bullet.bulletKillType = 1;
	bullet.bulletLifespan = 2200;
	bullet.bulletSpeed = 350;
	bullet.fireRate = 1000;
	if(tank == 1){
		bullet.fireAngle = p1Gun.angle-90;
		bullet.trackSprite(p1Gun, 0, 0);
		bullet.fire();
	}
	if(tank == 2){
		bullet.fireAngle = p2Gun.angle-90;
		bullet.trackSprite(p2Gun, 0, 0);
		bullet.fire();
	}
}
function shot(){
	hit = game.sound.play('hit');
	if(tank == 1){
		p1Lives--;
		p1LivesText.text = 'P1 Lives: ' + p1Lives;
	}
	if(tank == 2){
		p2Lives--;
		p2LivesText.text = 'P2 Lives: ' + p2Lives;
	}
}

game.state.add('GameState', GameState)
game.state.start('GameState')
