/**
 * Created by Чайковский on 15.05.2016.
 */
var X_LEN = 20;
var Y_LEN = 20;

function buid_table(){
    var table = $('#tictac_table').find('tbody');
    for(var x=0; x<X_LEN; x++){
        //console.log('x='+x);
        var tr_x;
        tr_x = "<tr id=\"x_" + x + "\"></tr>";
        table.append(tr_x);
        for(var y=0; y<Y_LEN; y++){
            //console.log('y='+y);
            var td_y;
            td_y = "<td width='20' height='20' ' id=\"y_" + y + "\">" +
                "<div class='field' id=\"a_" + x + "_" + x + "\"></div>" +
                "</td>";
            $('#x_'+x).append(td_y);
        }
    }
}

function set_o(){
    check_game();
    console.log(this);
    var id = $(this).attr("id");
    $(this).html("<div class='checked' id=\""+id+"\">O</div>");
}

function click_on_field(){
    $('td').click(set_o);
}

function check_game(){
    console.log('check_game')
}
