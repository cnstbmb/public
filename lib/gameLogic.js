/**
 * Created by Чайковский on 05.06.2016.
 */

var GameGrid = {};
/**
 * Player's symbol checking at the horizontal line
 * @param x - horizontal coordinate
 * @param y - vertical coordinate
 * @param symbol - player
 * @returns {boolean}
 */
var checkHor = function(x, y, symbol){
    var match = 0;
    for(var i=0; i<5; i++){
        x++;
        if(match == 4){
            return true;
        }
        if(typeof GameGrid[y][x] == 'undefined'){
            break;
        }
        GameGrid[y][x] == symbol ? match++ : 0;
    }
};
/**
 * Player's symbol checking at the vertical line
 * @param x - horizontal coordinate
 * @param y - vertical coordinate
 * @param symbol - player
 * @returns {boolean}
 */
var checkVer = function(x, y, symbol){
    var match = 0;
    for(var i=0; i<5; i++){
        if(match == 4){
            return true;
        }
        y++;
        if(typeof GameGrid[y] == 'undefined'){
            break;
        }
        GameGrid[y][x] == symbol ? match++ : 0;
    }
};

/**
 * Player's symbol checking at the diagonal line from top to bottom
 * @param x - horizontal coordinate
 * @param y - vertical coordinate
 * @param symbol - player
 * @returns {boolean}
 */
var checkDiagDown = function(x, y, symbol){
    var match = 0;
    for(var i=0; i<5; i++){
        y++;
        x++;
        if(match == 4){
            return true;
        }
        if(typeof GameGrid[y] == 'undefined'){
            break;
        }
        GameGrid[y][x] == symbol ? match++ : 0;
    }
};

/**
 * Player's symbol checking at the diagonal line from bottom to top
 * @param x - horizontal coordinate
 * @param y - vertical coordinate
 * @param symbol - player
 * @returns {boolean}
 */
var checkDiagUp = function(x, y, symbol){
    var match = 0;
    for(var i=0; i<5; i++){
        y--;
        x++;
        if(match == 4){
            return true;
        }
        if(typeof GameGrid[y] == 'undefined'){
            break;
        }
        GameGrid[y][x] == symbol ? match++ : 0;
    }
};
/**
 * Check game progress
 * @returns {boolean|*}
 */
var checkGame = function(){
    var result;

    for(var y in GameGrid){
        for(var x in GameGrid[y]){
            var symbol = GameGrid[y][x];
            result = !!checkHor(x, y, symbol);
            if(result)return result;

            result = !!checkVer(x, y, symbol);
            if(result)return result;

            result = !!checkDiagDown(x, y, symbol);
            if(result)return result;

            result = !!checkDiagUp(x, y, symbol);
            if(result)return result;
        }
    }
};

/**
 * Save player step
 * @param x - horizontal coordinate
 * @param y - vertical coordinate
 * @param symbol - player
 * @returns {boolean|*}
 */
var saveStep = function(x, y, symbol){
    var lineY = GameGrid[y];
    !lineY ? lineY = {} : 0;
    lineY[x] = symbol;
    GameGrid[y] = lineY;
    return checkGame();
};

self.addEventListener('message', function(e){
    var x = e.data.x,
        y = e.data.y,
        symbol = e.data.symbol,
        result = saveStep(x, y, symbol);

    self.postMessage({'result': result, 'symbol': symbol});
}, false);