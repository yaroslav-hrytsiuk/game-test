import GameOver from 'states/GameOver';

class GamePlayGame extends Phaser.State {
    preload() {
        const donutSize = 92;
        this.load.spritesheet('donuts', '../test/images/game/gems-main.png', donutSize, donutSize);
        this.load.image('score', '../test/images/bg-score.png');
        this.load.image('hand', '../test/images/game/hand.png');

    }
    create() {
        const donutSize = 92,
            fieldSize = 7,
            donutColors = 6,
            swapSpeed = 200,
            fallSpeed = 200,
            destroySpeed = 200,
            fastFall = true,
            _this = this,
            moveX = 75,
            moveY = 250;

        let gameArray = [],
            removeMap = [],
            donutGroup,
            selectedDonut,
            canPick = true,
            hand,
            count = 0,
            handTween;
        this.add.sprite(0, 0, 'background');
        this.add.sprite(350, 10, 'score');
        this.state.add('GameOver', GameOver, false);

        //Creating timer
        this.startTime = new Date();
        this.totalTime = 70;
        this.timeElapsed = 0;
        this.createTimer();
        this.gameTimer = _this.time.events.loop(100, function () {
            _this.updateTimer();
        })

        //Creating score counter
        let score = 0;
        let scoreText = this.add.text(610, 110, '0', { font: '48px Fredoka One', fill: '#fff' });
        scoreText.anchor.setTo(0.5);

        function collectScore(arg) {
            score += arg * 10;
            scoreText.text = score;
        }

        function createField() {
            donutGroup = _this.add.group();
            donutGroup.position.x = moveX;
            donutGroup.position.y = moveY;
            for (let i = 0; i < fieldSize; i++) {
                gameArray[i] = [];
                for (let j = 0; j < fieldSize; j++) {
                    let donut = _this.add.sprite(donutSize * j + donutSize / 2, donutSize * i + donutSize / 2, 'donuts');
                    donut.anchor.set(0.5);
                    donutGroup.add(donut);
                    do {
                        let randomColor = _this.rnd.between(0, donutColors - 1);
                        donut.frame = randomColor;
                        gameArray[i][j] = {
                            donutColor: randomColor,
                            donutSprite: donut
                        }
                    } while (isMatch(i, j));
                }
            }
            selectedDonut = null;
            hand = _this.add.sprite(0, 0, 'hand');
            hand.anchor.set(0.5);
            hand.visible = false;
        }

        function showHint() {
            let matchFound = false;
            for (let i = 0; i < fieldSize - 1; i++) {
                for (let j = 0; j < fieldSize - 1; j++) {
                    tmpSwap(i, j, i + 1, j);
                    if (matchInBoard()) {
                        hand.visible = true;
                        hand.x = gameArray[i + 1][j].donutSprite.x + 16 + moveX;
                        hand.y = gameArray[i + 1][j].donutSprite.y + 70 + moveY;
                        handTween = _this.add.tween(hand).to({
                            y: hand.y + 100
                        }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
                        matchFound = true;
                    }
                    tmpSwap(i, j, i + 1, j);
                    if (matchFound) {
                        return;
                    }
                    tmpSwap(i, j, i, j + 1);
                    if (matchInBoard()) {
                        hand.visible = true;
                        hand.x = gameArray[i][j + 1].donutSprite.x + 16 + moveX;
                        hand.y = gameArray[i][j + 1].donutSprite.y + 70 + moveY;
                        handTween = _this.add.tween(hand).to({
                            x: hand.x + 100
                        }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
                        matchFound = true;
                    }
                    tmpSwap(i, j, i, j + 1);
                    if (matchFound) {
                        return;
                    }
                }
            }
        }

        function tmpSwap(row1, col1, row2, col2) {
            let tmp = gameArray[row1][col1];
            gameArray[row1][col1] = gameArray[row2][col2];
            gameArray[row2][col2] = tmp;
        }

        function donutSelect(e) {
            if (canPick) {
                hand.visible = false;
                handTween.stop();
                let row = Math.floor((e.worldY - moveY) / donutSize),
                    col = Math.floor((e.worldX - moveX) / donutSize),
                    pickedDonut = gemAt(row, col);
                if (pickedDonut != -1) {
                    if (selectedDonut == null) {
                        pickedDonut.donutSprite.scale.setTo(1.2);
                        pickedDonut.donutSprite.bringToTop();
                        selectedDonut = pickedDonut;
                        _this.input.addMoveCallback(donutMove);
                    }
                    else {
                        if (areTheSame(pickedDonut, selectedDonut)) {
                            selectedDonut.donutSprite.scale.setTo(1);
                            selectedDonut = null;
                        } else {
                            if (areNext(pickedDonut, selectedDonut)) {
                                selectedDonut.donutSprite.scale.setTo(1);
                                swapDonut(selectedDonut, pickedDonut, true);
                            } else {
                                selectedDonut.donutSprite.scale.setTo(1);
                                pickedDonut.donutSprite.scale.setTo(1.2);
                                selectedDonut = pickedDonut;
                                _this.input.addMoveCallback(donutMove);
                            }
                        }
                    }
                }
            }
        }

        function donutDeselect(e) {
            _this.input.deleteMoveCallback(donutMove);
        }

        function donutMove(event, pX, pY) {
            if (event.id == 0) {
                let distX = pX - selectedDonut.donutSprite.x - moveX,
                    distY = pY - selectedDonut.donutSprite.y - moveY,
                    deltaRow = 0,
                    deltaCol = 0;
                if (Math.abs(distX) > donutSize / 2) {
                    if (distX > 0) {
                        deltaCol = 1;
                    } else {
                        deltaCol = -1;
                    }
                } else {
                    if (Math.abs(distY) > donutSize / 2) {
                        if (distY > 0) {
                            deltaRow = 1;
                        } else {
                            deltaRow = -1;
                        }
                    }
                } if (deltaRow + deltaCol != 0) {
                    let pickedDonut = gemAt(getDonutRow(selectedDonut) + deltaRow, getDonutCol(selectedDonut) + deltaCol);
                    if (pickedDonut != -1) {
                        selectedDonut.donutSprite.scale.setTo(1);
                        swapDonut(selectedDonut, pickedDonut, true);
                        _this.input.deleteMoveCallback(donutMove);
                    }
                }
            }
        }

        function swapDonut(donut1, donut2, swapBack) {
            canPick = false;
            let fromColor = donut1.donutColor,
                fromSprite = donut1.donutSprite,
                toColor = donut2.donutColor,
                toSprite = donut2.donutSprite;
            gameArray[getDonutRow(donut1)][getDonutCol(donut1)].donutColor = toColor;
            gameArray[getDonutRow(donut1)][getDonutCol(donut1)].donutSprite = toSprite;
            gameArray[getDonutRow(donut2)][getDonutCol(donut2)].donutColor = fromColor;
            gameArray[getDonutRow(donut2)][getDonutCol(donut2)].donutSprite = fromSprite;
            let donut1Tween = _this.add.tween(gameArray[getDonutRow(donut1)][getDonutCol(donut1)].donutSprite).to({
                x: getDonutCol(donut1) * donutSize + donutSize / 2,
                y: getDonutRow(donut1) * donutSize + donutSize / 2
            }, swapSpeed, Phaser.Easing.Linear.None, true);
            let donut2Tween = _this.add.tween(gameArray[getDonutRow(donut2)][getDonutCol(donut2)].donutSprite).to({
                x: getDonutCol(donut2) * donutSize + donutSize / 2,
                y: getDonutRow(donut2) * donutSize + donutSize / 2
            }, swapSpeed, Phaser.Easing.Linear.None, true);
            donut2Tween.onComplete.add(function () {
                if (!matchInBoard() && swapBack) {
                    swapDonut(donut1, donut2, false);
                } else {
                    if (matchInBoard()) {
                        handleMatches();
                    } else {
                        canPick = true;
                        selectedDonut = null;
                    }
                }
            });
        }

        function areNext(donut1, donut2) {
            return Math.abs(getDonutRow(donut1) - getDonutRow(donut2)) + Math.abs(getDonutCol(donut1) - getDonutCol(donut2)) == 1;
        }

        function areTheSame(donut1, donut2) {
            return getDonutRow(donut1) == getDonutRow(donut2) && getDonutCol(donut1) == getDonutCol(donut2);
        }

        function gemAt(row, col) {
            if (row < 0 || row >= fieldSize || col < 0 || col >= fieldSize) {
                return -1;
            }
            return gameArray[row][col];
        }

        function getDonutRow(donut) {
            return Math.floor(donut.donutSprite.y / donutSize);
        }

        function getDonutCol(donut) {
            return Math.floor(donut.donutSprite.x / donutSize);
        }

        function isHorizontalMatch(row, col) {
            return gemAt(row, col).donutColor == gemAt(row, col - 1).donutColor && gemAt(row, col).donutColor == gemAt(row, col - 2).donutColor;
        }

        function isVerticalMatch(row, col) {
            return gemAt(row, col).donutColor == gemAt(row - 1, col).donutColor && gemAt(row, col).donutColor == gemAt(row - 2, col).donutColor;
        }

        function isMatch(row, col) {
            return isHorizontalMatch(row, col) || isVerticalMatch(row, col);
        }

        function matchInBoard() {
            for (let i = 0; i < fieldSize; i++) {
                for (let j = 0; j < fieldSize; j++) {
                    if (isMatch(i, j)) {
                        return true;
                    }
                }
            }
            
            return false;
        }

        function handleMatches() {
            removeMap = [];
            for (let i = 0; i < fieldSize; i++) {
                removeMap[i] = [];
                for (let j = 0; j < fieldSize; j++) {
                    removeMap[i].push(0);
                }
            }
            handleHorizontalMatches();
            handleVerticalMatches();
            destroyDonut();
        }

        function handleVerticalMatches() {
            for (let i = 0; i < fieldSize; i++) {
                let colorStreak = 1,
                    currentColor = -1,
                    startStreak = 0;
                for (let j = 0; j < fieldSize; j++) {
                    if (gemAt(j, i).donutColor == currentColor) {
                        colorStreak++;
                    }
                    if (gemAt(j, i).donutColor != currentColor || j == fieldSize - 1) {
                        if (colorStreak >= 3) {
                            collectScore(colorStreak);
                            switch (colorStreak) {
                                case 3: for (let k = 0; k < colorStreak; k++) {
                                    removeMap[startStreak + k][i]++;
                                } break;
                                case 4: for (let k = 0; k < fieldSize; k++) {
                                    removeMap[k][i]++;
                                } break;
                                default: for (let k = 0; k < fieldSize; k++) {
                                    for (let l = 0; l < fieldSize; l++) {
                                        if (gemAt(k, l).donutColor == currentColor) {
                                            removeMap[k][l]++;
                                        }
                                    }
                                } break;
                            }
                        }
                        startStreak = j;
                        colorStreak = 1;
                        currentColor = gemAt(j, i).donutColor;
                    }
                }
            }
        }

        function handleHorizontalMatches() {
            for (let i = 0; i < fieldSize; i++) {
                let colorStreak = 1,
                    currentColor = -1,
                    startStreak = 0;
                for (let j = 0; j < fieldSize; j++) {
                    if (gemAt(i, j).donutColor == currentColor) {
                        colorStreak++;
                    }
                    if (gemAt(i, j).donutColor != currentColor || j == fieldSize - 1) {
                        if (colorStreak >= 3) {
                            collectScore(colorStreak);
                            switch (colorStreak) {
                                case 3:
                                    for (let k = 0; k < colorStreak; k++) {
                                        removeMap[i][startStreak + k]++;
                                    } break;
                                case 4:
                                    for (let k = 0; k < fieldSize; k++) {
                                        removeMap[i][k]++;
                                    } break;
                                default:
                                    for (let k = 0; k < fieldSize; k++) {
                                        for (let l = 0; l < fieldSize; l++) {
                                            if (gemAt(k, l).donutColor == currentColor) {
                                                removeMap[k][l]++;
                                            }
                                        }
                                    } break;
                            }
                        }
                        startStreak = j;
                        colorStreak = 1;
                        currentColor = gemAt(i, j).donutColor;
                    }
                }
            }
        }

        function destroyDonut() {
            let destroyed = 0;
            for (let i = 0; i < fieldSize; i++) {
                for (let j = 0; j < fieldSize; j++) {
                    if (removeMap[i][j] > 0) {
                        let destroyTween = _this.add.tween(gameArray[i][j].donutSprite).to({
                            alpha: 0
                        }, destroySpeed, Phaser.Easing.Linear.None, true);
                        destroyed++;
                        destroyTween.onComplete.add(function (donut) {
                            donut.destroy();
                            destroyed--;
                            if (destroyed == 0) {
                                makeDonutFall();
                                if (fastFall) {
                                    replenishField();
                                }
                            }
                        });
                        gameArray[i][j] = null;
                    }
                }
            }
        }

        function makeDonutFall() {
            let fallen = 0,
                restart = false;
            for (let i = fieldSize - 2; i >= 0; i--) {
                for (let j = 0; j < fieldSize; j++) {
                    if (gameArray[i][j] != null) {
                        let fallTiles = holesBelow(i, j);
                        if (fallTiles > 0) {
                            if (!fastFall && fallTiles > 1) {
                                fallTiles = 1;
                                restart = true;
                            }
                            let donut2Tween = _this.add.tween(gameArray[i][j].donutSprite).to({
                                y: gameArray[i][j].donutSprite.y + fallTiles * donutSize
                            }, fallSpeed, Phaser.Easing.Linear.None, true);
                            fallen++;
                            donut2Tween.onComplete.add(function () {
                                fallen--;
                                if (fallen == 0) {
                                    if (restart) {
                                        makeDonutFall();
                                    } else {
                                        if (!fastFall) {
                                            replenishField();
                                        }
                                    }
                                }
                            })
                            gameArray[i + fallTiles][j] = {
                                donutSprite: gameArray[i][j].donutSprite,
                                donutColor: gameArray[i][j].donutColor
                            }
                            gameArray[i][j] = null;
                        }
                    }
                }
            }
            if (fallen == 0) {
                replenishField();
            }
        }

        function replenishField() {
            let replenished = 0,
                restart = false;
            for (let j = 0; j < fieldSize; j++) {
                let emptySpots = holesInCol(j);
                if (emptySpots > 0) {
                    if (!fastFall && emptySpots > 1) {
                        emptySpots = 1;
                        restart = true;
                    }
                    for (let i = 0; i < emptySpots; i++) {
                        let donut = _this.add.sprite(donutSize * j + donutSize / 2, -(donutSize * (emptySpots - 1 - i) + donutSize / 2), 'donuts');
                        donut.anchor.set(0.5);
                        donutGroup.add(donut);
                        let randomColor = _this.rnd.between(0, donutColors - 1);
                        donut.frame = randomColor;
                        gameArray[i][j] = {
                            donutColor: randomColor,
                            donutSprite: donut
                        }
                        let donut2Tween = _this.add.tween(gameArray[i][j].donutSprite).to({
                            y: donutSize * i + donutSize / 2
                        }, fallSpeed, Phaser.Easing.Linear.None, true);
                        replenished++;
                        donut2Tween.onComplete.add(function () {
                            replenished--;
                            if (replenished == 0) {
                                if (restart) {
                                    makeDonutFall();
                                } else {
                                    if (matchInBoard()) {
                                        _this.time.events.add(250, handleMatches);
                                    } else {
                                        canPick = true;
                                        selectedDonut = null;
                                        count++;
                                        if(count <= 3){
                                            showHint();
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
            }
        }

        function holesBelow(row, col) {
            let result = 0;
            for (let i = row + 1; i < fieldSize; i++) {
                if (gameArray[i][col] == null) {
                    result++;
                }
            }
            return result;
        }

        function holesInCol(col) {
            let result = 0;
            for (let i = 0; i < fieldSize; i++) {
                if (gameArray[i][col] == null) {
                    result++;
                }
            }
            return result;
        }

        canPick = true;
        createField();
        showHint();
        this.input.onDown.add(donutSelect);
        this.input.onUp.add(donutDeselect);
    }

    update() {
        let _this = this;
        if (_this.timeElapsed >= _this.totalTime) {
            this.state.start('GameOver');
        }
    }

    createTimer() {
        let _this = this;
        _this.timeLabel = _this.add.text(75, 75, "00:00", { font: "72px Fredoka One", fill: "#9fbdf1" });
    }
    updateTimer() {
        let _this = this;
        let currentTime = new Date();
        let timeDifference = _this.startTime.getTime() - currentTime.getTime();
        _this.timeElapsed = Math.abs(timeDifference / 1000);
        let timeRemaining = _this.totalTime - _this.timeElapsed;
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = Math.floor(timeRemaining) - (60 * minutes);
        let result = (minutes < 10) ? "0" + minutes : minutes;
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
        _this.timeLabel.text = result;

    }
}


export default GamePlayGame;