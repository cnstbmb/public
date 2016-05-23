/**
 * Created by Чайковский on 15.05.2016.
 */
var LEN = prompt('Задайте размеры игрового поля', 10);
var X = 'X';
var O = 'O';
var symbols = [X,O];

var player = false;

var buildTable = function(){
    var table = $('#tictac_table').find('tbody');
    for(var y=0; y<LEN; y++){
        var tr_y;
        tr_y = $("<tr>").attr('id', 'y_'+y);
        table.append(tr_y);
        for(var x=0; x<LEN; x++){
            var td_x;
            var divField;
            td_x = $('<td>').attr('id', 'x_'+x);
            divField = $('<div>').addClass('field').attr({'y':y, 'x':x});
            td_x.append(divField);
            $('#y_'+y).append(td_x);
        }
    }
};

var move = function(){
    player ? step(this, X) : step(this, O);
    player = !player;
    checkGame();
};

var step = function(field, symbol){
    var x = $(field).find('div').attr("x");
    var y = $(field).find('div').attr("y");
    $(field).addClass('checked').attr('x', x).attr('y', y).text(symbol).unbind('click');
};

var clickField = function(){
    $('td').click(move);
};

var chckDiagDwn = function(lines){
    var I = 0;

    var checkField = function(field, i, symbol){
        var x = parseInt($(field).attr('x'))+i;
        var y = parseInt($(field).attr('y'))-i;
        var div = $('[x='+x+'][y='+y+']');
        I++;
        if($(div).text() == symbol){
            I++;
            if(I==5) {
                alert('Выиграли '+symbol);
                $('td').unbind('click');
                return true;
            }
        }else{
            I = 0;
        }
    };

    $.each(symbols, function(num, symbol){
        $.each(lines, function(num, line){
            $.each(line, function(num, field){
                for (var i=0; i<LEN; i++ ) {
                    checkField(field, i, symbol);
                }
            });
        });
    });
};

var chckDiagUp = function(lines){
    var I = 0;

    var checkField = function(field, i, symbol){
        var x = parseInt($(field).attr('x'))+i;
        var y = parseInt($(field).attr('y'))+i;
        var div = $('[x='+x+'][y='+y+']');
        if($(div).text() == symbol){
            I++;
            if(I==5) {
                alert('Выиграли '+symbol);
                $('td').unbind('click');
                return true;
            }
        }else{
            I = 0;
        }
    };
    $.each(symbols, function(num, symbol){
        $.each(lines, function(num, line){
            $.each(line, function(num, field){
                for (var i=0; i<LEN; i++ ) {
                    checkField(field, i, symbol);
                }
            });
        });
    });
};

var checkGame = function(){
    var I = 0;

    var yField0 = $('[y=0]');
    var xField0 = $('[x=0]');
    var field0Arr = [yField0, xField0];

    var yFieldMax = $('[y='+(LEN-1)+']');
    var xFieldMax = xField0.sort(function(a,b){return a>b?-1:1;});
    var FieldMaxArr = [yFieldMax, xFieldMax];

    var checkLines = function(lines){
        $.each(symbols, function(num, symbol){
            $.each(lines, function(num, line){
                $.each(line, function (num, field){
                    if($(field).text() == symbol){
                        I++;
                        if(I==5) {
                            alert('Выиграли '+symbol);
                            $('td').unbind('click');
                            return true;
                        }
                    }else{
                        I = 0;
                    }
                });
            });
        });
    };
    
    for (var i=0; i<LEN; i++ ){
        var yField = $('[y='+i+']');
        var xField = $('[x='+i+']');
        var fieldArr = [xField, yField];
        checkLines(fieldArr);
    }

    chckDiagUp(field0Arr);
    chckDiagDwn(FieldMaxArr);
};

buildTable();
clickField();