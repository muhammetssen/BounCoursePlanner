import { Credit_List } from "./Credit.js";
import {
  added_courses,
  courseJson,
  colors,
  course_table_array,
  remove_from_array,
} from "../Main.js";
import { coloring } from "./MustCourses.js";
import { updateGrid } from "./DisplayedTable.js";
function add_to_table(abbreviation, caller_element = "Button") {
  if (added_courses.indexOf(abbreviation) != -1 && caller_element != "Button") {
    return;
  }
  var className = "CourseTable";
  if (caller_element == "Button") {
    document.getElementById(abbreviation).className = "AddedByButton";
    coloring(abbreviation, true);
    updateGrid();
  }
  Credit_List(abbreviation, true);
  var list = document.getElementsByClassName(
    "Hover" + className + abbreviation
  );
  let count = list.length;
  if (count > 0 && caller_element == "Button") {
    for (let i = 0; i < count; i++) {
      list[0].className = className + abbreviation;
    }
    return;
  }
  added_courses.push(abbreviation);
  let hours = courseJson[abbreviation].Hours;
  let places = courseJson[abbreviation].Places.split("|");
  var color = colors[Math.floor(Math.random() * colors.length)];
  var days = ["M", "T", "W", "Th", "F"];
  for (var i = 0; i < days.length; i++) {
    var current_day_hours = hours[days[i]];
    for (var j = 0; j < current_day_hours.length; j++) {
      var slot = current_day_hours[j];
      var column = i + 1;
      var selected_slot = course_table_array[slot][column]; //= abbreviation;
      var newSpan = document.createElement("div");
      var className = "CourseTable";
      if (caller_element == "Hover") {
        className = "Hover" + className;
      }
      let place = places.shift();
      newSpan.className = className + abbreviation;
      newSpan.innerHTML =
        abbreviation + "<br>" + (place == undefined ? "" : place);
      newSpan.style.backgroundColor = color;
      //newSpan.style.position = "absolute";
      newSpan.id = "CourseInfo";
      newSpan.style.fontSize = "small";
      selected_slot.appendChild(newSpan);
    }
  }
}

function remove_from_table(abbreviation, caller_element = "Button") {
  if (
    caller_element == "Hover" &&
    document.getElementById(abbreviation).className == "AddedByButton"
  ) {
    return;
  }
  remove_from_array(added_courses, abbreviation);
  Credit_List(abbreviation, false);
  if (caller_element == "Button") {
    updateGrid();
    coloring(abbreviation, false);
  }
  document.getElementById(abbreviation).value = "Add";
  var className = "CourseTable";
  if (caller_element == "Hover") {
    className = "Hover" + className;
  }
  var list = document.getElementsByClassName(className + abbreviation);
  var count = list.length;
  for (var i = 0; i < count; i++) {
    var elementToBeRemoved = list[0];
    elementToBeRemoved.parentElement.removeChild(elementToBeRemoved);
  }
}

export { add_to_table, remove_from_table };
