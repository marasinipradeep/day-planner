var currentDateEl = $("#currentDay")
var timeBlocksEl = $("#timeBlocks")
var newDayPlanner = JSON.parse(localStorage.getItem("dayPlanner"))

/*Creating the list of collections that are used for day planning time and task */
var dayPlanner = {
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
/* function to initialize date and day on the heading */
/*Used moment library Do gives 1st..31st  which is Day of month with ordinal*/
function init() {
    var currentDate = moment().format('dddd, MMMM Do');
    currentDateEl.text(currentDate)
    checkLocalStorage();
}

/*function that checks local storage to find collections otherwise creates a new and store in local storage */
function checkLocalStorage() {
    if (newDayPlanner !== null) {
        dayPlanner = newDayPlanner;
    }
    else {
        saveDayPlanner()
    }
}

/* Displaying UI (UserInterface) which has time slots, text area for inputs and save button for all */
/*The Background color of text area changes on condition of time which is past, present and future */

$.each(dayPlanner.listOfTask, function (index, item) {
    var blockDiv = $("<div>").addClass("row")
    var time = $("<h3>").addClass("col-3 hour").text(item.workTime).data("timeSlot", item.workTime)

    var schedule = $("<textarea/>").text(item.task).addClass("col-7").data("textAreaRow", index)
    if (dayPlanner.time[index] < moment().format("HH")) {
        schedule.addClass("past")
    }
    else if (dayPlanner.time[index] == moment().format("HH")) {
        schedule.addClass("present")
    }

    else if (dayPlanner.time[index] > moment().format("HH")) {
        schedule.addClass("future")
    }

    var saveButton = $("<button>").addClass("col-2 saveBtn fa fa-save").data("saveButton", index + 1)
    saveButton.on("click", function () {
        init();
        onButtonClickes(time, schedule, saveButton);
    })
    blockDiv.append(time, schedule, saveButton)
    timeBlocksEl.append(blockDiv)
})

/*When user clicks on save button compares the value of text area and save button if matches saves on local storages */
function onButtonClickes(time, schedule, saveButton) {
    event.preventDefault()
    if (saveButton.data("saveButton") - 1 === schedule.data("textAreaRow")) {
        var textAreaIndex = schedule.data("textAreaRow");
        dayPlanner.listOfTask[textAreaIndex].task = schedule.val();
        saveDayPlanner();
    }
}

/*function to save on local storage  */
function saveDayPlanner() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner))
}