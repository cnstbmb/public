/**
 * Created by Чайковский on 15.05.2016.
 */
var LEN = 10,
    X = 'X',
    O = 'O',
    player = false,
    gameWorker = new Worker('/lib/gameLogic.js');

/**
 * Event Listener - send data (x coordinate, y coordinate, player symbol) and save step
 */
gameWorker.addEventListener('message', function(e){
    var result = e.data.result,
        symbol = e.data.symbol;
    result ? endGame(symbol) : 0;
}, false);

/**
 * Build game grid
 */
var buildTable = function(){
    var table = $('#tictacTable').find('tbody'),
        trY,
        trX,
        divField;
    for(var y=0; y<LEN; y++){
        trY = document.createElement('tr');
        $(trY).attr('id', 'y'+y);
        table.append(trY);
        for(var x=0; x<LEN; x++){
            trX = document.createElement('td');
           $(trX).attr('id', 'x'+x);
            divField = document.createElement('div');
            $(divField).addClass('field').attr({'y':y, 'x':x});
            $(trX).append(divField);
            $('#y'+y).append(trX);
        }
    }
};

/**
 * Make the move player
 */
var move = function(){
    player ? step(this, X) : step(this, O);
    player = !player;
};

/**
 * Make player step
 * @param field - game field
 * @param symbol - player
 */
var step = function(field, symbol){
    var x = $(field).find('div').attr("x"),
        y = $(field).find('div').attr("y");
    $(field).addClass('checked').text(symbol).unbind('click');
    gameWorker.postMessage({'x':x, 'y':y, 'symbol': symbol});
};

/**
 * End game
 * @param symbol - player
 */
var endGame = function(symbol){
    $('td').unbind('click');
    alert('Выиграли '+symbol);
};
/**
 * Set a symbol of the player on the field
 */
var clickField = function(){
    $('td').click(move);
};

buildTable();
clickField();