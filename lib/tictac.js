/**
 * Created by Чайковский on 15.05.2016.
 */
var LEN = 10;

var player = false;

function buid_table(){
    var table = $('#tictac_table').find('tbody');
    for(var y=0; y<LEN; y++){
        var tr_y;
        tr_y = "<tr id=\"y_" + y + "\"></tr>";
        table.append(tr_y);
        for(var x=0; x<LEN; x++){
            var td_x;
            td_x = "<td width='20' height='20' ' id=\"x_" + x + "\">" +
                "<div class='field' y=" + y + " x =" + x + " id=\"a_" + y + "_" + x + "\"></div>" +
                "</td>";
            $('#y_'+y).append(td_x);
        }
    }
}

function move(){
    player ? set_o(this) : set_x(this);
    player = !player;
    check_game();
}

function set_o(field){
    var id = $(field).attr("id");
    var x = $(field).find('div').attr("x");
    var y = $(field).find('div').attr("y");
    $(field).html("<div class='checked' x=" + x + " y =" + y + " id=\"O_"+id+"\">O</div>");
    $(field).unbind('click');
}

function set_x(field){
    var id = $(field).attr("id");
    var x = $(field).find('div').attr("x");
    var y = $(field).find('div').attr("y");
    $(field).html("<div class='checked' x=" + x + " y =" + y + " id=\"X_"+id+"\">X</div>");
    $(field).unbind('click');
}

function click_on_field(){
    $('td').click(move);
}

function check_game(){
    var I = 0;

    function check_line(line, element){
        $.each(line, function (num, field){
            if($(field).text() == element){
                I++;
                if(I==5) {
                    alert('Выйграли '+element);
                    $('td').unbind('click');
                }
            }else{
                I = 0;
            }
        });
    }
    for (var i=0; i<LEN; i++ ){
        var yfield = $('[y='+i+']');
        var xfield = $('[x='+i+']');
        check_line(yfield, 'X');
        check_line(yfield, 'O');
        check_line(xfield, 'X');
        check_line(xfield, 'O');
    }
}


