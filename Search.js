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
var courseJson;
var courses;
var backup_of_course_table_array;
var totalCredit = 0;
var totalCreditElement  = document.getElementById("TotalCredit");
totalCreditElement.innerHTML = "Credit: "+ totalCredit;
totalCreditElement.style.left = "20px";


readTextFile("2019-2020-2.json", function (text) {
	courseJson = JSON.parse(text)[0];
	
	courses = Object.keys(courseJson);
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
	let changes=document.getElementById("displayed_courses").style;
	changes.visibility="hidden";
	document.getElementById("displayed_courses").innerHTML = "";

}
let added_courses = new Array();



function remove_from_array(arr,item){
	var index=arr.indexOf(item);
	if (index > -1){
		arr.splice(index,1);
	}
}
function add_to_table(abbreviation){
	added_courses.push(abbreviation);
	Credit_List(abbreviation,true);
	let hours =  courseJson[abbreviation].Hours
		var days = ["M","T","W","Th","F"]
		for( i = 0; i < days.length;i++){
			var current_day_hours = hours[days[i]];
			for(j=0;j<current_day_hours.length;j++){
				var slot = current_day_hours[j]
				var column = i+1; 
				course_table_array[slot][column].innerHTML = abbreviation;
				((course_table_array[slot][column].style.fontSize = "small")) ;

			}
		}
	//update_course_table();

}

function Credit_List(abbreviation,add_or_remove){
	var course=courseJson[abbreviation];
	var course_li=document.getElementById("credits");
	if(add_or_remove){
		var new_li = document.createElement("li");
		new_li.id = "Credit"+abbreviation;
		new_li.innerHTML= abbreviation;
		var creditSpan = document.createElement("span");
		creditSpan.innerHTML= course.Credit;
		creditSpan.style.float ="right";
		creditSpan.style.marginRight ="10px";
		new_li.appendChild(creditSpan)
		course_li.appendChild(new_li);
		totalCredit += course.Credit;
	}
	else{
		course_li.removeChild(document.getElementById("Credit"+abbreviation));
		totalCredit -= course.Credit;
	}
	totalCreditElement.innerHTML = "Credit: " + totalCredit;

}
function remove_from_table(abbreviation){
	remove_from_array(added_courses, abbreviation);
	Credit_List(abbreviation,false)
	let hours =  courseJson[abbreviation].Hours
		var days = ["M","T","W","Th","F"]
		for( i = 0; i < days.length;i++){
			var current_day_hours = hours[days[i]];
			for(j=0;j<current_day_hours.length;j++){
				var slot = current_day_hours[j]
				var column = i+1; 
				course_table_array[slot][column].innerHTML = "";
			}
		}
	
}
function updateGrid() {
	var body = document.getElementById("displayed_courses")
	clearGrid();
	let changes=document.getElementById("displayed_courses").style;
	changes.visibility="visible";
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
		if(this.value == "Add"){
			add_to_table(this.id);
			this.value = "Remove";
		}
		else{
			remove_from_table(this.id);
			this.value = "Add";
		}
		//console.log(data[this.id]);
		
	}
	for (id in displayed_courses) {
		var abbreviation = displayed_courses[id];
		var course = courseJson[abbreviation];
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
		var tag4=document.createElement("td");
		var inputElement = document.createElement('input');
		tag4.appendChild(inputElement);
		course_row.appendChild(tag4);
		inputElement.type = "button";
		inputElement.value = "Add";
		inputElement.id = abbreviation;
		inputElement.className = "AddButton";
		inputElement.addEventListener('click', buttonFinder);
		body.appendChild(course_row);
	}
}
var rows_array=new Array();
rows_array=document.getElementsByTagName("table")[1].rows

var course_table_array=new Array();
Object.values(rows_array).forEach(rows => {
	var temp=new Array();
	Object.values(rows.cells).forEach(cell => {
		temp.push(cell);	
	})
	course_table_array.push(temp);
});
backup_of_course_table_array=[...course_table_array];

