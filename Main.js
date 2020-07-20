import {updateDropDown} from "./Modules/MustCourses.js";
import { updateGrid, clearGrid } from "./Modules/DisplayedTable.js";
var courseJson;
var courses;
$.getJSON("src/2019-2020-2.json", function (data) {
  courseJson = data[0];
  courses = Object.keys(courseJson);
});
var totalCredit = 0;
export { courseJson, totalCredit, totalCreditElement };

var totalCreditElement = document.getElementById("TotalCredit");
totalCreditElement.innerHTML = "Credit: " + totalCredit;
totalCreditElement.style.left = "20px";

var searchBarText = "";
var searchBar = document.getElementById("SearchBox");
var colors = [
  "#0074D9",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#FF4136",
  "#AAAAAA",
  "#DDDDDD",
];
export { colors };

var displayed_courses;
document.getElementById("SearchBox").onkeyup = function () {
  searchBarText = searchBar.value.split(" ").join("");
  if (searchBarText.length < 2) {
    clearGrid();
    return;
  }
  displayed_courses = courses.filter(
    (course) =>
      searchBarText.toUpperCase() ==
      course.substring(0, searchBarText.length).split(" ").join("")
  );
  updateGrid();
};

let added_courses = new Array();
export { added_courses, displayed_courses };

function remove_from_array(arr, item) {
  var index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
function changeCredit(delta) {
  totalCredit += delta;
}
export { changeCredit, remove_from_array };

var rows_array = new Array();
rows_array = document.getElementsByTagName("table")[1].rows;

var course_table_array = new Array();
Object.values(rows_array).forEach((rows) => {
  var temp = new Array();
  Object.values(rows.cells).forEach((cell) => {
    temp.push(cell);
  });
  course_table_array.push(temp);
});

export { course_table_array };

