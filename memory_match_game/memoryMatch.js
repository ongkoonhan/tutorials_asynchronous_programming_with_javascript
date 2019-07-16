//global variables go here:

var clickedArray = [];

// Timer variables
var interval;
var started = false;
var time = 0;


var ready = true;
var numCompleted = 0;


//execute functions here:
setUp();


//function definitions go here:

function setUp(){
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];
        
        cell.addEventListener("mouseenter", function(){   // Change to orange when mouse hovers over
            if(this.completed == false && this.clicked == false)
                this.style.background = "orange";
        });

        cell.addEventListener("mouseleave", function(){   // Revert to blue when mouse leaves
            if(this.completed == false && this.clicked == false)
                this.style.background = "blue";
        });

        cell.addEventListener('click', function(){
            if(ready == false)   // No action if not ready
                return;

            startTimer();

            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }

            if(clickedArray.length == 2){   // Check the pair that has been clicked
                if(clickedArray[0].value == clickedArray[1].value){   //if a matching pair is found
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);
                    clickedArray = [];   // Reset 
                    if(numCompleted == 8){   // Terminate
                        alert("You won in " + time + " seconds!");   // Popup
                        clearInterval(interval);   // Stop timer
                    }
                }
                else{   //if a matching pair is not found
                    ready = false;
                    // Freeze grid for 0.5 sec to allow users time to see the grid value
                    document.getElementById("gridTable").style.border = "5px solid red";   // Freeze colour
                    setTimeout(function(){   //after a 500ms delay
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);
                        clickedArray = [];
                        ready = true;
                        document.getElementById("gridTable").style.border = "5px solid black";   // Unfreeze colour
                    }, 500);
                }
            }
        });
        
    }

    document.addEventListener('keydown', function(event){   // Numberpad
        if(event.key > 0 && event.key < 10 ){
            grid[event.key - 1].click();   // Click on cell
        }
    });

    document.getElementById('restart').addEventListener('click', function(){
        location.reload();
    });

}

function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;   // Display cell's html value
    cell.clicked = true;
}

function startTimer(){
    if (started == false){
        interval = setInterval(function(){   // Update html timer display every 1 sec
            time++;
            document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
        },1000)
        started = true;
    }
}

function hide(cell){
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
}


function randomAnswers(){
    var answers = [1,1,2,2,3,3,4,4,5];
    answers.sort(function(item){
        return .5 - Math.random();   // random comparison values
    })
    return answers;
}