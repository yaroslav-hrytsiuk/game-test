import GameMainMenu from 'states/GameMainMenu';


class Game extends Phaser.Game {

	constructor() {
		super(800, 950, Phaser.CANVAS, 'content', null);
		this.state.add('MainMenu', GameMainMenu, false);
		this.state.start('MainMenu');
	}
}


new Game();
