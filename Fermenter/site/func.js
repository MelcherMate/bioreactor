var motorState = 0;
var airpumpState = 0;

// Function to toggle motorState
function toggleMotorState() {
    if (motorState === 0) {
        motorState = 1;
    } else {
        motorState = 0;
    }
    console.log("motorState value: " + motorState);
    
    var motorButton = document.getElementById("motorButton");
    if (motorState === 1) {
        motorButton.classList.add("green"); 
    } else {
        motorButton.classList.remove("green");
    }
    sendMotorAjaxRequest();
}

// Function to toggle airpumpState
function toggleAirpumpState(){
    if (airpumpState == 0){
        airpumpState = 1;
    } else {
        airpumpState = 0;
    }
    console.log("airpumpState value: " + airpumpState)

    var airpumpButton = document.getElementById("airpumpButton");
    if (airpumpState === 1) {
        airpumpButton.classList.add("green"); 
    } else {
        airpumpButton.classList.remove("green");
    }
    sendAirpumpAjaxRequest();
}

// Function to send motorState to server
function sendMotorAjaxRequest() {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/Fermenter/data_transfer/online_data_pull_motor",
        data: { motorState: motorState },
        success: function(response) {
            console.log("Motor AJAX sent Successfully");
        },
        error: function(xhr, status, error) {
            console.error("Error sending Motor AJAX", error);
        }
    });
}

// Function to send airpumpState to server
function sendAirpumpAjaxRequest() {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/Fermenter/data_transfer/online_data_pull_airpump",
        data: { airpumpState: airpumpState },
        success: function(response) {
            console.log("Airpump AJAX sent Successfully");
        },
        error: function(xhr, status, error) {
            console.error("Error sending Airpump AJAX", error);
        }
    });
}