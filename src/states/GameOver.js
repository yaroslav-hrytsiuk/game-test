
class GameOver extends Phaser.Text {

    preload() {
        this.load.image('gameOver', '../test/images/timeup.png');
    }
    create() {
        this.add.sprite(0, 0, 'background');
        this.add.sprite(175, 100, 'gameOver');
        let btnStart = this.add.button(this.world.centerX, this.world.centerY + 350, 'button', this.clickPlay, this);
        btnStart.anchor.set(0.5, 0.5);
    }
    clickPlay() {
        this.state.start('MainMenu');
    }
}

export default GameOver;