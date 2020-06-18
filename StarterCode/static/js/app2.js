var tableData = data;

// Create a table that shows the data in data.js
// Make sure you have a column for date/time, city, state, country, shape, and comment.



var tbody = d3.select("tbody"); // Get reference to table body
var columns = ["datetime","city","state","country","shape", "durationMinutes","comments"] //Create an array of your column headers based on the Object tree
var button = d3.select("#filter-btn");
var resetbtn = d3.select("#reset-btn");
var dateFilter = d3.select("#datetime");
var cityFilter = d3.select("#city");
var stateFilter = d3.select("#state");
var shapeFilter = d3.select( "#shape");
var durationFilter = d3.select("#duration");


console.log(data); // View data for tree names/directory

// Create a function that populates a table from data.js that appends table rows into individual cells with information from each column header you created
var populate = (dataInput) => {
    dataInput.forEach(ufoSighting => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSighting[column]))
    });
}

populate(data);

// Create a filter function that allows you to filter by date that executes everytime the "Filter Table" button is clicked
button.on("click", () => {
 //Stop from auto refresh
    d3.event.preventDefault();
// Convert/normalize all your entries and save entries for later data filter usage
    var inputDate = dateFilter.property("value").trim()
    var inputCity = cityFilter.property("value").toLowerCase().trim()
    var inputState = stateFilter.property("value").toLowerCase().trim()
    var inputShape = shapeFilter.property("value").toLowerCase().trim()
    var inputDuration = durationFilter.property("value").toLowerCase().trim()
// Use your saved input criteria to use as a filter on the data set
    var filterDate = data.filter(data => data.datetime === inputDate);
    console.log(filterDate);
    var filterCity = data.filter(data => data.city === inputCity);
    console.log(filterCity);
    var filterState = data.filter(data => data.state === inputState);
    console.log(filterState)
    var filterShape = data.filter(data => data.shape === inputShape);
    console.log(filterShape);
    var filterDuration = data.filter(data => data.durationMinutes === inputDuration);
    console.log(filterDuration);
    var filterData = data.filter(data => data.datetime === inputDate && inputCity === data.city && inputState === data.state && data.shape === inputShape && data.durationMinutes === inputDuration);
    console.log(filterData);
// save filter response in one Object
    tbody.html("");
    let response = {
        filterData, filterCity, filterDate, filterState, filterShape, filterDuration
    }
// If statement to re-run populate function with filter inputs
    if (response.filterData.length !== 0) {
        populate(filterData);
    }
    else if (response.filterData.length === 0 && 
        ((response.filterCity.lengh !== 0 || response.filterDate.length !== 0 || response.filterState.length !==0 || response.filterShape.length !==0 || response.filterDuration !==0))){
        populate(filterCity) || populate(filterDate) || populate(filterState) || populate(filterShape) || populate(filterDuration);
    }

    else {
        tbody.append("tr").append("td").text("No Results Found.");
    }
});
// Clear filter fields and repopulate with original unfiltered table data
resetbtn.on("click", () => {
    tbody.html("");
    populate(data);
    console.log("Table Reset.")
})

