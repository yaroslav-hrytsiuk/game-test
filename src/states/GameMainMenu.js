import GamePlayGame from 'states/GamePlayGame';

class GameMainMenu extends Phaser.State {
    preload() {
        this.load.image('background', '../test/images/backgrounds/background.jpg')
        this.load.image('donut', '../test/images/donut-main.png');
        this.load.image('logo', '../test/images/donuts_logo.png');
        this.load.image('button', '../test/images/btn-play.png');
        this.load.spritesheet('sfx', '../test/images/btn-sfx.png', 143, 140);
    }
    create() {
        this.add.sprite(0, 0, 'background');
        this.add.sprite(100, 20, 'logo');
        this.state.add('PlayGame', GamePlayGame, false);
        
        let donutImage = this.add.sprite(this.world.centerX, this.world.centerY, 'donut');
        donutImage.scale.setTo(0.8, 0.8);
        donutImage.anchor.set(0.5, 0.5);

        let btnStart = this.add.button(this.world.centerX, this.world.centerY + 350, 'button', this.clickPlay, this);
        btnStart.anchor.set(0.5, 0.5);

        let btnSfx = this.add.button(this.world.centerX - 300, this.world.centerY + 380, 'sfx', this.clickSfx, this, 0, 0, 1);
        btnSfx.anchor.set(0.5, 0.5);
    }

    clickPlay() {
        this.state.start('PlayGame');
    }

    clickSfx() {

    }
    update() {

    }
}

export default GameMainMenu;
