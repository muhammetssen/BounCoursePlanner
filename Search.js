function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

//usage:
var data;
var courses;

readTextFile("2019-2020-2.json", function (text) {
	//text = text.replace("Lab","mehmet");
	//console.log(data[0]['AD 488.01']);

	data = JSON.parse(text)[0];
	//console.log(data)
	courses = Object.keys(data);
});
var searchBarText = "";
document.getElementById('SearchBox').onkeyup = function () {
	var searchBar = document.getElementById('SearchBox')
	searchBarText = searchBar.value.split(" ").join("");
	if (searchBarText.length < 2) {
		clearGrid();
		return;
	}
	console.log(searchBarText);

	displayed_courses = courses.filter
		(
			course => searchBarText.toUpperCase() == course.substring(0, searchBarText.length).split(" ").join("")
		);
	updateGrid();
	console.log(displayed_courses.length);

};

function clearGrid() {
	document.getElementById("displayed_courses").innerHTML = "";
}
function updateGrid() {
	var body = document.getElementById("displayed_courses")
	clearGrid();
	var first_row = document.createElement("tr");
	var string1 = "Abbreviation";
	var string2 = "Course Name";
	var string3 = "Instructor name";
	var tag1 = document.createElement("th");
	var tag2 = document.createElement("th");
	var tag3 = document.createElement("th");
	tag1.appendChild(document.createTextNode(string1));
	tag2.appendChild(document.createTextNode(string2));
	tag3.appendChild(document.createTextNode(string3));
	first_row.appendChild(tag1);
	first_row.appendChild(tag2);
	first_row.appendChild(tag3);
	body.appendChild(first_row);

	function buttonFinder() {
		console.log(data[this.id])
		//console.log(this.id);
		//console.log(button.parentElement);
	}
	for (id in displayed_courses) {
		var abbreviation = displayed_courses[id];
		var course = data[abbreviation];
		//var innerText = abbreviation+ " "+ course.Course_name + " "+JSON.stringify(course.Hours)     ;
		var course_row = document.createElement("tr");

		var tag1 = document.createElement("td");
		tag1.appendChild(document.createTextNode(abbreviation));
		course_row.appendChild(tag1);

		var tag2 = document.createElement("td");
		tag2.appendChild(document.createTextNode(course.Course_name));
		course_row.appendChild(tag2);

		var tag3 = document.createElement("td");
		tag3.appendChild(document.createTextNode(course.Instructor_name));
		course_row.appendChild(tag3);

		var inputElement = document.createElement('input');
		course_row.appendChild(inputElement);
		inputElement.type = "button";
		inputElement.text = "Add";
		inputElement.id = abbreviation;
		inputElement.addEventListener('click', buttonFinder);

		body.appendChild(course_row);
	}
}