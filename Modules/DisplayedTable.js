import { add_to_table, remove_from_table } from "./CourseTable.js";
import { displayed_courses, courseJson, added_courses } from "../Main.js";

function clearGrid() {
  let changes = document.getElementById("displayed_courses").style;
  changes.visibility = "hidden";
  document.getElementById("displayed_courses").innerHTML = "";
}

function updateGrid() {
  var body = document.getElementById("displayed_courses");
  clearGrid();
  let changes = document.getElementById("displayed_courses").style;
  changes.visibility = "visible";
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
  var t = document.createElement("th");
  t.style.width = "10px";
  first_row.appendChild(t);
  body.appendChild(first_row);

  function buttonFinder() {
    if (this.value == "Add") {
      add_to_table(this.id);
      this.value = "Remove";
    } else {
      remove_from_table(this.id);
      this.value = "Add";
    }
  }

  function rowFinder() {
    add_to_table(this.id.split("Display").join(""), "Hover");
  }

  function rowclose() {
    remove_from_table(this.id.split("Display").join(""), "Hover");
  }
  for (var k = 0; k < displayed_courses.length; k++) {
    var conflictString = "";
    var abbreviation = displayed_courses[k];
    var course = courseJson[abbreviation];
    var course_row = document.createElement("tr");
    course_row.id = "Display" + abbreviation;
    course_row.addEventListener("mouseenter", rowFinder);
    course_row.addEventListener("mouseleave", rowclose);

    var tag1 = document.createElement("td");
    tag1.appendChild(document.createTextNode(abbreviation));
    course_row.appendChild(tag1);
    for (var added of added_courses) {
      if (added == abbreviation) {
        continue;
      }
      var added_course = courseJson[added];
      var count = 0;
      var days = ["M", "T", "W", "Th", "F"];
      for (var day of days) {
        if (course["Hours"] == null) {
            continue
        }
        for (var hour of course["Hours"][day]) {
          // My Hours
          if (added_course["Hours"][day].indexOf(hour) != -1) {
            count += 1;
          } // Addes's hour
        }
      }
      if (count > 0) {
        conflictString += "<br>" + count + " conflict(s) " + added;
        // console.log(course.Course_name + " conflicts " + count);
      }
    }

    var tag2 = document.createElement("td");
    tag2.appendChild(document.createTextNode(course.Course_name));
    var innerspan = document.createElement("span");
    innerspan.className = "conflict";
    innerspan.innerHTML = conflictString;
    tag2.appendChild(innerspan);
    // tag2.innerHTML = course.Course_name + " " + conflictString;
    course_row.appendChild(tag2);

    var tag3 = document.createElement("td");
    tag3.appendChild(document.createTextNode(course.Instructor_name));
    course_row.appendChild(tag3);
    var tag4 = document.createElement("td");
    var inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.id = abbreviation;
    inputElement.value = "Add";

    if (added_courses.indexOf(abbreviation) != -1) {
      inputElement.value = "Remove";
      inputElement.className ="AddedByButton";
    }

    inputElement.addEventListener("click", buttonFinder);
    tag4.appendChild(inputElement);
    // inputElement.className = "AddButton";
    course_row.appendChild(tag4);
    body.appendChild(course_row);
  }
}

export { updateGrid, clearGrid };
