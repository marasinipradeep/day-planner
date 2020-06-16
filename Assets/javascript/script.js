$(document).ready(function () {

    var jumbtronEl = $("#jumbotronBox")
    var currentDateEl = $("#currentDay")
    var timeBlocksEl = $("#timeBlocks")

    init();

    var dayPlanner = {
        timeSlots: [9, 10, 11, 12, 1, 2, 3, 4, 5],
        timeType: ["AM", "PM"],
        listOfTask: [],
        timeWithTimeType: function () {
            var newTimeSlot = []
            for (var i = 0; i < 4; i++) {
                var newTimeAM = this.timeSlots[i] + this.timeType[0]
                newTimeSlot.push(newTimeAM)
            }
            for (var j = 4; j < this.timeSlots.length; j++) {
                var newTimePM = this.timeSlots[j] + this.timeType[1]
                newTimeSlot.push(newTimePM)
            }
            console.log(newTimeSlot)
            return newTimeSlot
        }
    }


    /* Displaying UI (UserInterface) which has time slots, text area for inputs and save button for all */


   $.each(dayPlanner.timeWithTimeType(), function (index, item) {
        var blockDiv = $("<div>")
        blockDiv.addClass("row")
        blockDiv.data("number", index)
       // console.log("I am row : " + blockDiv.data("number"))
        var time = $("<h3>").addClass("col-3 hour").text(item)
        var schedule = $("<input>").addClass("col-8 future").data("number", index)

        var saveButton = $("<button>")
        saveButton.addClass("col-1 saveBtn fa fa-save")
        saveButton.data("number", index)
       // saveButton.attr("id","button-"+index)
        console.log("I am save Button : " + saveButton.data("number"))
        blockDiv.append(time, schedule, saveButton)
        timeBlocksEl.append(blockDiv)

    })

    $(".saveBtn").each(function(event) {
        
       // event.preventDefault()
       
       // var getButtonValue = $("button").data("number");

        console.log("inside save button clicked :"+$("button").data("number"))

      //  localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner))

    })



    function init() {
        var gatDate = getTodaysDate();
        currentDateEl.text(gatDate)
    }

    function getTodaysDate() {
        var d = new Date();
        var day = d.getDate();

        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var week = weekdays[d.getDay()]

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[d.getMonth()];


        var output = week + ", " + month + " " +
            (day < 10 ? '0' : '') + ordinal_suffix_of(day)
        return output
    }
    /*Creating  suffix to addd on date day */
    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }
    function formatAMPM(date) {
        var hours = date.getHours();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var strTime = hours + ampm;
        return strTime;
    }

    

    function getListOfAllDayPlanning() {

        var messageZero = localStorage.getItem("storeMessageZero")
        var messageOne = localStorage.getItem("storeMessageOne")
        // var getDatAttribute = $("textarea");
        // getDatAttribute = $(this).val();
        // if(getDatAttribute==="0"){
        //     console.log(getDatAttribute)
        // $('textarea').html(messageZero)
        // }
        $('textarea').html(messageZero, messageOne)


    }

});