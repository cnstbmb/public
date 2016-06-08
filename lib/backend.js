/**
 * Created by Чайковский on 05.06.2016.
 */

var GameGrid = {};

var saveStep = function(x, y, symbol){
    var lineY = GameGrid[y];
    !lineY ? lineY = {} : 0;
    lineY[x] = symbol;
    GameGrid[y] = lineY;
    return checkGame();
};

var checkGame = function(){

    var result;

    var checkDiagDwn = function(x, y, sym){
        var match = 0;
        for(var i=0; i<5; i++){
            if(match == 4)return 1;
            x++;
            y++;
            if(typeof GameGrid[y] == 'undefined')break;
            GameGrid[y][x] == sym ? match++ : 0;
        }
    };
    var checkDiagUp = function(x, y, sym){
        var match = 0;
        for(var i=0; i<5; i++){
            if(match == 4)return 1;
            x++;
            y--;
            if(typeof GameGrid[y] == 'undefined')break;
            GameGrid[y][x] == sym ? match++ : 0;
        }
    };

    var checkHor = function(x, y, sym){
        var match = 0;
        for(var i=0; i<5; i++){
            if(match == 4)return 1;
            x++;
            GameGrid[y][x] == sym ? match++ : 0;
        }
    };

    var checkVer = function(x, y, sym){
        var match = 0;
        for(var i=0; i<5; i++){
            if(match == 4)return 1;
            y++;
            if(typeof GameGrid[y] == 'undefined')break;
            GameGrid[y][x] == sym ? match++ : 0;
        }
    };

    for(var y in GameGrid){
        for(var x in GameGrid[y]){
            var symbol = GameGrid[y][x];
            result = checkHor(x, y, symbol) ? 1 : 0;
            if(result)return result;

            result = checkVer(x, y, symbol) ? 1 : 0;
            if(result)return result;

            result = checkDiagDwn(x, y, symbol) ? 1 : 0;
            if(result)return result;

            result = checkDiagUp(x, y, symbol) ? 1 : 0;
            if(result)return result;
        }
    }
};