/**
 * Created by Чайковский on 15.05.2016.
 */
var LEN = 10;
var X = 'X';
var O = 'O';
var player = false;

var buildTable = function(){
    var table = $('#tictac_table').find('tbody');
    for(var y=0; y<LEN; y++){
        var tr_y;
        tr_y = document.createElement('tr');
        $(tr_y).attr('id', 'y_'+y);
        table.append(tr_y);
        for(var x=0; x<LEN; x++){
            var td_x;
            var divField;
            td_x = document.createElement('td');
           $(td_x).attr('id', 'x_'+x);
            divField = document.createElement('div');
            $(divField).addClass('field').attr({'y':y, 'x':x});
            $(td_x).append(divField);
            $('#y_'+y).append(td_x);
        }
    }
};

var move = function(){
    player ? step(this, X) : step(this, O);
    player = !player;
};

var step = function(field, symbol){
    var x = $(field).find('div').attr("x");
    var y = $(field).find('div').attr("y");
    $(field).addClass('checked').text(symbol).unbind('click');
    saveStep(x, y, symbol) ? endGame(symbol) : 0;
};

var endGame = function(symbol){
    $('td').unbind('click');
    alert('Выиграли '+symbol);
};

var clickField = function(){
    $('td').click(move);
};

buildTable();
clickField();