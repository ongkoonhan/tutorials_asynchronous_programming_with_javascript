var is_running = false;
var time_elapsed = 0;
var update_interval = 0.01   // seconds

var time_display = document.getElementById("time_display");
var past_times = document.getElementById("past_times");


setUp();


function setUp(){

    // ### Start/Stop button

    var interval;
    var start_stop_button = document.getElementById("start_stop");
    start_stop_button.addEventListener('click', function(){
        if(!is_running){   // Start time
            interval = setInterval(function(){
                time_elapsed = time_elapsed + update_interval;
                time_display.innerHTML = time_elapsed.toFixed(2);
            },update_interval*1000)
            is_running = true;
        } else {   // Stop time
            clearInterval(interval);
            is_running = false;
        }
    });
    
    // ### Reset button

    var reset_button = document.getElementById("reset");
    reset_button.addEventListener('click', function(){
        clearInterval(interval);   // Stop time
        is_running = false;   
        time_elapsed = 0;
        time_display.innerHTML = "0";
        past_times.innerHTML = "";
    });

    // ### Record Time button

    var record_button = document.getElementById("record");
    record_button.addEventListener('click', function(){
        if(is_running){
            addRow(past_times, time_elapsed.toFixed(2));
        }
    });

    // ### Keyboard

    document.addEventListener('keydown', function(event){
        if(event.key == "s"){
            start_stop_button.click();
        } else if(event.key == "r"){
            reset_button.click();
        } else if(event.key == "t"){
            record_button.click();
        }
    });
}


function addRow(tableRef, value) {
    let newRow = tableRef.insertRow(-1);
    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode(value);
    newCell.appendChild(newText);
}