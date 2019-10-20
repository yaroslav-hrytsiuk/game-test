(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _GameMainMenu = require('states/GameMainMenu');

var _GameMainMenu2 = _interopRequireDefault(_GameMainMenu);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 800, 950, Phaser.CANVAS, 'content', null));

		_this.state.add('MainMenu', _GameMainMenu2.default, false);
		_this.state.start('MainMenu');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/GameMainMenu":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _GamePlayGame = require('states/GamePlayGame');

var _GamePlayGame2 = _interopRequireDefault(_GamePlayGame);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameMainMenu = function (_Phaser$State) {
    _inherits(GameMainMenu, _Phaser$State);

    function GameMainMenu() {
        _classCallCheck(this, GameMainMenu);

        return _possibleConstructorReturn(this, (GameMainMenu.__proto__ || Object.getPrototypeOf(GameMainMenu)).apply(this, arguments));
    }

    _createClass(GameMainMenu, [{
        key: 'preload',
        value: function preload() {
            this.load.image('background', '../test/images/backgrounds/background.jpg');
            this.load.image('donut', '../test/images/donut-main.png');
            this.load.image('logo', '../test/images/donuts_logo.png');
            this.load.image('button', '../test/images/btn-play.png');
            this.load.spritesheet('sfx', '../test/images/btn-sfx.png', 143, 140);
        }
    }, {
        key: 'create',
        value: function create() {
            this.add.sprite(0, 0, 'background');
            this.add.sprite(100, 20, 'logo');
            this.state.add('PlayGame', _GamePlayGame2.default, false);

            var donutImage = this.add.sprite(this.world.centerX, this.world.centerY, 'donut');
            donutImage.scale.setTo(0.8, 0.8);
            donutImage.anchor.set(0.5, 0.5);

            var btnStart = this.add.button(this.world.centerX, this.world.centerY + 350, 'button', this.clickPlay, this);
            btnStart.anchor.set(0.5, 0.5);

            var btnSfx = this.add.button(this.world.centerX - 300, this.world.centerY + 380, 'sfx', this.clickSfx, this, 0, 0, 1);
            btnSfx.anchor.set(0.5, 0.5);
        }
    }, {
        key: 'clickPlay',
        value: function clickPlay() {
            this.state.start('PlayGame');
        }
    }, {
        key: 'clickSfx',
        value: function clickSfx() {}
    }, {
        key: 'update',
        value: function update() {}
    }]);

    return GameMainMenu;
}(Phaser.State);

exports.default = GameMainMenu;

},{"states/GamePlayGame":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameOver = function (_Phaser$Text) {
    _inherits(GameOver, _Phaser$Text);

    function GameOver() {
        _classCallCheck(this, GameOver);

        return _possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
    }

    _createClass(GameOver, [{
        key: 'preload',
        value: function preload() {
            this.load.image('gameOver', '../test/images/timeup.png');
        }
    }, {
        key: 'create',
        value: function create() {
            this.add.sprite(0, 0, 'background');
            this.add.sprite(175, 100, 'gameOver');
            var btnStart = this.add.button(this.world.centerX, this.world.centerY + 350, 'button', this.clickPlay, this);
            btnStart.anchor.set(0.5, 0.5);
        }
    }, {
        key: 'clickPlay',
        value: function clickPlay() {
            this.state.start('MainMenu');
        }
    }]);

    return GameOver;
}(Phaser.Text);

exports.default = GameOver;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _GameOver = require('states/GameOver');

var _GameOver2 = _interopRequireDefault(_GameOver);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GamePlayGame = function (_Phaser$State) {
    _inherits(GamePlayGame, _Phaser$State);

    function GamePlayGame() {
        _classCallCheck(this, GamePlayGame);

        return _possibleConstructorReturn(this, (GamePlayGame.__proto__ || Object.getPrototypeOf(GamePlayGame)).apply(this, arguments));
    }

    _createClass(GamePlayGame, [{
        key: 'preload',
        value: function preload() {
            var donutSize = 92;
            this.load.spritesheet('donuts', '../test/images/game/gems-main.png', donutSize, donutSize);
            this.load.image('score', '../test/images/bg-score.png');
            this.load.image('hand', '../test/images/game/hand.png');
        }
    }, {
        key: 'create',
        value: function create() {
            var donutSize = 92,
                fieldSize = 7,
                donutColors = 6,
                swapSpeed = 200,
                fallSpeed = 200,
                destroySpeed = 200,
                fastFall = true,
                _this = this,
                moveX = 75,
                moveY = 250;

            var gameArray = [],
                removeMap = [],
                donutGroup = void 0,
                selectedDonut = void 0,
                canPick = true,
                hand = void 0,
                count = 0,
                handTween = void 0;
            this.add.sprite(0, 0, 'background');
            this.add.sprite(350, 10, 'score');
            this.state.add('GameOver', _GameOver2.default, false);

            //Creating timer
            this.startTime = new Date();
            this.totalTime = 70;
            this.timeElapsed = 0;
            this.createTimer();
            this.gameTimer = _this.time.events.loop(100, function () {
                _this.updateTimer();
            });

            //Creating score counter
            var score = 0;
            var scoreText = this.add.text(610, 110, '0', { font: '48px Fredoka One', fill: '#fff' });
            scoreText.anchor.setTo(0.5);

            function collectScore(arg) {
                score += arg * 10;
                scoreText.text = score;
            }

            function createField() {
                donutGroup = _this.add.group();
                donutGroup.position.x = moveX;
                donutGroup.position.y = moveY;
                for (var i = 0; i < fieldSize; i++) {
                    gameArray[i] = [];
                    for (var j = 0; j < fieldSize; j++) {
                        var donut = _this.add.sprite(donutSize * j + donutSize / 2, donutSize * i + donutSize / 2, 'donuts');
                        donut.anchor.set(0.5);
                        donutGroup.add(donut);
                        do {
                            var randomColor = _this.rnd.between(0, donutColors - 1);
                            donut.frame = randomColor;
                            gameArray[i][j] = {
                                donutColor: randomColor,
                                donutSprite: donut
                            };
                        } while (isMatch(i, j));
                    }
                }
                selectedDonut = null;
                hand = _this.add.sprite(0, 0, 'hand');
                hand.anchor.set(0.5);
                hand.visible = false;
            }

            function showHint() {
                var matchFound = false;
                for (var i = 0; i < fieldSize - 1; i++) {
                    for (var j = 0; j < fieldSize - 1; j++) {
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
                var tmp = gameArray[row1][col1];
                gameArray[row1][col1] = gameArray[row2][col2];
                gameArray[row2][col2] = tmp;
            }

            function donutSelect(e) {
                if (canPick) {
                    hand.visible = false;
                    handTween.stop();
                    var row = Math.floor((e.worldY - moveY) / donutSize),
                        col = Math.floor((e.worldX - moveX) / donutSize),
                        pickedDonut = gemAt(row, col);
                    if (pickedDonut != -1) {
                        if (selectedDonut == null) {
                            pickedDonut.donutSprite.scale.setTo(1.2);
                            pickedDonut.donutSprite.bringToTop();
                            selectedDonut = pickedDonut;
                            _this.input.addMoveCallback(donutMove);
                        } else {
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
                    var distX = pX - selectedDonut.donutSprite.x - moveX,
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
                    }if (deltaRow + deltaCol != 0) {
                        var pickedDonut = gemAt(getDonutRow(selectedDonut) + deltaRow, getDonutCol(selectedDonut) + deltaCol);
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
                var fromColor = donut1.donutColor,
                    fromSprite = donut1.donutSprite,
                    toColor = donut2.donutColor,
                    toSprite = donut2.donutSprite;
                gameArray[getDonutRow(donut1)][getDonutCol(donut1)].donutColor = toColor;
                gameArray[getDonutRow(donut1)][getDonutCol(donut1)].donutSprite = toSprite;
                gameArray[getDonutRow(donut2)][getDonutCol(donut2)].donutColor = fromColor;
                gameArray[getDonutRow(donut2)][getDonutCol(donut2)].donutSprite = fromSprite;
                var donut1Tween = _this.add.tween(gameArray[getDonutRow(donut1)][getDonutCol(donut1)].donutSprite).to({
                    x: getDonutCol(donut1) * donutSize + donutSize / 2,
                    y: getDonutRow(donut1) * donutSize + donutSize / 2
                }, swapSpeed, Phaser.Easing.Linear.None, true);
                var donut2Tween = _this.add.tween(gameArray[getDonutRow(donut2)][getDonutCol(donut2)].donutSprite).to({
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
                for (var i = 0; i < fieldSize; i++) {
                    for (var j = 0; j < fieldSize; j++) {
                        if (isMatch(i, j)) {
                            return true;
                        }
                    }
                }

                return false;
            }

            function handleMatches() {
                removeMap = [];
                for (var i = 0; i < fieldSize; i++) {
                    removeMap[i] = [];
                    for (var j = 0; j < fieldSize; j++) {
                        removeMap[i].push(0);
                    }
                }
                handleHorizontalMatches();
                handleVerticalMatches();
                destroyDonut();
            }

            function handleVerticalMatches() {
                for (var i = 0; i < fieldSize; i++) {
                    var colorStreak = 1,
                        currentColor = -1,
                        startStreak = 0;
                    for (var j = 0; j < fieldSize; j++) {
                        if (gemAt(j, i).donutColor == currentColor) {
                            colorStreak++;
                        }
                        if (gemAt(j, i).donutColor != currentColor || j == fieldSize - 1) {
                            if (colorStreak >= 3) {
                                collectScore(colorStreak);
                                switch (colorStreak) {
                                    case 3:
                                        for (var k = 0; k < colorStreak; k++) {
                                            removeMap[startStreak + k][i]++;
                                        }break;
                                    case 4:
                                        for (var _k = 0; _k < fieldSize; _k++) {
                                            removeMap[_k][i]++;
                                        }break;
                                    default:
                                        for (var _k2 = 0; _k2 < fieldSize; _k2++) {
                                            for (var l = 0; l < fieldSize; l++) {
                                                if (gemAt(_k2, l).donutColor == currentColor) {
                                                    removeMap[_k2][l]++;
                                                }
                                            }
                                        }break;
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
                for (var i = 0; i < fieldSize; i++) {
                    var colorStreak = 1,
                        currentColor = -1,
                        startStreak = 0;
                    for (var j = 0; j < fieldSize; j++) {
                        if (gemAt(i, j).donutColor == currentColor) {
                            colorStreak++;
                        }
                        if (gemAt(i, j).donutColor != currentColor || j == fieldSize - 1) {
                            if (colorStreak >= 3) {
                                collectScore(colorStreak);
                                switch (colorStreak) {
                                    case 3:
                                        for (var k = 0; k < colorStreak; k++) {
                                            removeMap[i][startStreak + k]++;
                                        }break;
                                    case 4:
                                        for (var _k3 = 0; _k3 < fieldSize; _k3++) {
                                            removeMap[i][_k3]++;
                                        }break;
                                    default:
                                        for (var _k4 = 0; _k4 < fieldSize; _k4++) {
                                            for (var l = 0; l < fieldSize; l++) {
                                                if (gemAt(_k4, l).donutColor == currentColor) {
                                                    removeMap[_k4][l]++;
                                                }
                                            }
                                        }break;
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
                var destroyed = 0;
                for (var i = 0; i < fieldSize; i++) {
                    for (var j = 0; j < fieldSize; j++) {
                        if (removeMap[i][j] > 0) {
                            var destroyTween = _this.add.tween(gameArray[i][j].donutSprite).to({
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
                var fallen = 0,
                    restart = false;
                for (var i = fieldSize - 2; i >= 0; i--) {
                    for (var j = 0; j < fieldSize; j++) {
                        if (gameArray[i][j] != null) {
                            var fallTiles = holesBelow(i, j);
                            if (fallTiles > 0) {
                                if (!fastFall && fallTiles > 1) {
                                    fallTiles = 1;
                                    restart = true;
                                }
                                var donut2Tween = _this.add.tween(gameArray[i][j].donutSprite).to({
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
                                });
                                gameArray[i + fallTiles][j] = {
                                    donutSprite: gameArray[i][j].donutSprite,
                                    donutColor: gameArray[i][j].donutColor
                                };
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
                var replenished = 0,
                    restart = false;
                for (var j = 0; j < fieldSize; j++) {
                    var emptySpots = holesInCol(j);
                    if (emptySpots > 0) {
                        if (!fastFall && emptySpots > 1) {
                            emptySpots = 1;
                            restart = true;
                        }
                        for (var i = 0; i < emptySpots; i++) {
                            var donut = _this.add.sprite(donutSize * j + donutSize / 2, -(donutSize * (emptySpots - 1 - i) + donutSize / 2), 'donuts');
                            donut.anchor.set(0.5);
                            donutGroup.add(donut);
                            var randomColor = _this.rnd.between(0, donutColors - 1);
                            donut.frame = randomColor;
                            gameArray[i][j] = {
                                donutColor: randomColor,
                                donutSprite: donut
                            };
                            var donut2Tween = _this.add.tween(gameArray[i][j].donutSprite).to({
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
                                            if (count <= 3) {
                                                showHint();
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            }

            function holesBelow(row, col) {
                var result = 0;
                for (var i = row + 1; i < fieldSize; i++) {
                    if (gameArray[i][col] == null) {
                        result++;
                    }
                }
                return result;
            }

            function holesInCol(col) {
                var result = 0;
                for (var i = 0; i < fieldSize; i++) {
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
    }, {
        key: 'update',
        value: function update() {
            var _this = this;
            if (_this.timeElapsed >= _this.totalTime) {
                this.state.start('GameOver');
            }
        }
    }, {
        key: 'createTimer',
        value: function createTimer() {
            var _this = this;
            _this.timeLabel = _this.add.text(75, 75, "00:00", { font: "72px Fredoka One", fill: "#9fbdf1" });
        }
    }, {
        key: 'updateTimer',
        value: function updateTimer() {
            var _this = this;
            var currentTime = new Date();
            var timeDifference = _this.startTime.getTime() - currentTime.getTime();
            _this.timeElapsed = Math.abs(timeDifference / 1000);
            var timeRemaining = _this.totalTime - _this.timeElapsed;
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = Math.floor(timeRemaining) - 60 * minutes;
            var result = minutes < 10 ? "0" + minutes : minutes;
            result += seconds < 10 ? ":0" + seconds : ":" + seconds;
            _this.timeLabel.text = result;
        }
    }]);

    return GamePlayGame;
}(Phaser.State);

exports.default = GamePlayGame;

},{"states/GameOver":3}]},{},[1])
//# sourceMappingURL=game.js.map
