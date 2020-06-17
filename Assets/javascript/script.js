$(document).ready(function () {

    var currentDateEl = $("#currentDay")
    var timeBlocksEl = $("#timeBlocks")

    init();

    var dayPlanner = {
        timeSlots: ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"],
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


    function init() {
        var currentDate = moment().format('dddd, MMMM Do');
        currentDateEl.text(currentDate)

        var newDayPlannerObject = JSON.parse(localStorage.getItem("dayPlanner"))

        if (newDayPlannerObject) {
            dayPlanner = newDayPlannerObject;
        }

        saveDayPlanner();
        populateDayPlanner();
    }



    /* Displaying UI (UserInterface) which has time slots, text area for inputs and save button for all */

    $.each(dayPlanner.timeSlots, function (index, item) {
        var blockDiv = $("<div>")
        blockDiv.addClass("row")

        var time = $("<h3>").addClass("col-3 hour").text(item)
        time.data("number", item)

        var schedule = $("<textarea/>")
        schedule.addClass("col-8")
        schedule.data("textAreaRow", index)
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
        saveButton.data("number", index + 1)

        saveButton.on("click", function () {
            onButtonClickes(time, schedule, saveButton);
        })
        blockDiv.append(time, schedule, saveButton)
        timeBlocksEl.append(blockDiv)

    })

    function onButtonClickes(time, schedule, saveButton) {

        event.preventDefault()
        var textAreaIndex = schedule.data("textAreaRow");
        dayPlanner.listOfTask[textAreaIndex].task = schedule.val();
        saveDayPlanner();
        populateDayPlanner(schedule);
    }


    function saveDayPlanner() {
        localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner))
    }

    function populateDayPlanner(schedule) {


        $.each(dayPlanner.listOfTask, function (index, item,) {

            // console.log((item.workTime))
            // console.log((item.task))

            // item.workTime.val(item.task);
            

        })
    }
});

