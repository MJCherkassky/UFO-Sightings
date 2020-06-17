// from data.js
var tableData = data;

console.log(tableData);

// // YOUR CODE HERE!

var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var resetbtn = d3.select("reset-btn");
var columns = ["datetime","city","state","country","shape","durationMinutes","comments"];

var populate = (dataInput) => {
    dataInput.forEach(ufo_sightings => {
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufo_sightings[column]))
    });
}

populate(data);

button.on("click", () => {
    d3.event.preventDefault();
    var inputDate = inputField1.property("value").trim();
    var inputCity = inputField2.property("value").toLowerCase().trim();

    var filterDate = data.filter(data => data.datetime === inputDate);
    console.log(filterDate);
    var filterCity = data.filter(data => data.city === inputCity);
    console.log(filterCity);
    var filterData = data.filter(data => data.datetime === inputDate && inputCity === inputCity);
    console.log(filterData);

    tbody.html("");
    let response = {
        filterData, filterCity, filterDate
    }
    
    if (response.filterData.length !== 0) {
        populate(filterData);
    }
    
    else if (response.filterData.length === 0 && ((response.filterCity.lengh !== 0 || response.filterDate.length !== 0))){
            populate(filterCity) || populate(filterDate);
    }

    else {
        tbody.append("tr").append("td").text("No Results Found.");
    }

});

resetbtn.on("click", () => {
    tbody.html("");
    populate(data);
    console.log("Table Reset.")
})
// function handleSubmit() {
//     d3.event.preventDefault();
//     var date = d3.select("#datetime").node().value;
//     console.log(date);
//     var city = d3.select("")
// }

  