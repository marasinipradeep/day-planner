//$(document).ready(function () {

var currentDateEl = $("#currentDay")
var timeBlocksEl = $("#timeBlocks")
var newDayPlanner = JSON.parse(localStorage.getItem("dayPlanner"))

var dayPlanner = {
    // timeSlots: ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    time: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    listOfTask: [
        {
            workTime: "9AM",
            task: ""
        },
        {
            workTime: "10AM",
            task: ""
        },
        {
            workTime: "11AM",
            task: ""
        },
        {
            workTime: "12AM",
            task: ""
        },
        {
            workTime: "1PM",
            task: ""
        },
        {
            workTime: "2PM",
            task: ""
        },
        {
            workTime: "3PM",
            task: ""
        },
        {
            workTime: "4PM",
            task: ""
        },
        {
            workTime: "5PM",
            task: ""
        },
    ]

}

init();
function init() {
    var currentDate = moment().format('dddd, MMMM Do');
    currentDateEl.text(currentDate)
    checkLocalStorage();
   // populateDayPlanner()
}

function checkLocalStorage() {

    if (newDayPlanner !== null) {
        dayPlanner = newDayPlanner;
    }
    else {
        saveDayPlanner()
    }
}

/* Displaying UI (UserInterface) which has time slots, text area for inputs and save button for all */

$.each(dayPlanner.listOfTask, function (index, item) {
    var blockDiv = $("<div>")
    blockDiv.addClass("row")
    var time = $("<h3>").addClass("col-3 hour").text(item.workTime)

    time.data("timeSlot", item.workTime)

    var schedule = $("<textarea/>").text(item.task)
    schedule.addClass("col-8 textareas")
    schedule.attr("id", item.workTime)
    schedule.attr("value", index)
    schedule.data("textAreaRow", index)
    // console.log( schedule.data("textAreaRow"))

    if (dayPlanner.time[index] < moment().format("HH")) {

        schedule.addClass("past")
    }
    else if (dayPlanner.time[index] == moment().format("HH")) {

        schedule.addClass("present")
    }

    else if (dayPlanner.time[index] > moment().format("HH")) {
        schedule.addClass("future")
    }

    var saveButton = $("<button>")
    saveButton.addClass("col-1 saveBtn fa fa-save")
    saveButton.data("saveButton", index + 1)

    // console.log( saveButton.data("saveButton"))

    saveButton.on("click", function () {
        init();
        onButtonClickes(time, schedule, saveButton);
    })
    blockDiv.append(time, schedule, saveButton)
    timeBlocksEl.append(blockDiv)

})

function onButtonClickes(time, schedule, saveButton) {
    event.preventDefault()
    if (saveButton.data("saveButton") - 1 === schedule.data("textAreaRow")) {
        // console.log("inside comparison")
        var textAreaIndex = schedule.data("textAreaRow");
        dayPlanner.listOfTask[textAreaIndex].task = schedule.val();
        saveDayPlanner();

       // populateDayPlanner(schedule, saveButton)
    }
    
    //  populateDayPlanner(schedule);
}


function saveDayPlanner() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner))
}

// function populateDayPlanner() {

//     // newDayPlanner.listOfTask.forEach(function(item){
//     //     var textAreaIndex = schedule.data("textAreaRow");
//     //     dayPlanner.listOfTask[textAreaIndex].task = schedule.val(item);
//     // })


//}




