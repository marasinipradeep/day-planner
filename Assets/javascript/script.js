var jumbtronEl = $("#jumbotronBox")
var currentDateEl = $("#currentDay")
var timeBlocksEl = $("#timeBlocks")

init();
renderTimeBlock();

function init() {
    var gatDate = getTodaysDate();
    jumbtronEl.text("hello day planner")
    currentDateEl.text(gatDate)
}

function getTodaysDate() {
    var d = new Date();
    var day = d.getDate();

    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var week = weekdays[d.getDay()]

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months [d.getMonth()];
    

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
    var strTime = hours  + ampm;
    return strTime;
  }
  
function renderTimeBlock(event) {
   

    var times = ["9AM","10AM","11AM","12AM","1PM","2PM","3PM","4PM","5PM"]
    var presentTime = formatAMPM(new Date)
    times.forEach(function (item, index){
    var blockDiv = $("<div>")
    blockDiv.addClass("row")
    var time = $("<h3>").addClass("col-2 hour").text(item)
    console.log("item : "  +item + " index : "  +index)
  
    console.log("present time : " +presentTime)

    var schedule = $("<textarea>").addClass("col-8 ")

    if(times[0] === "9AM"){
        schedule.addClass("future")
     }
     
    var save = $("<button>").addClass("col-2 saveBtn fa fa-save")
    blockDiv.append(time, schedule, save)
    $("#timeBlocks").append(blockDiv)
})
}




