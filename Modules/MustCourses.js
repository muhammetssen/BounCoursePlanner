var mustCoursesJson;
var selectedDepartment;
var MustCourses;
var selectedSemester = 0;
var listedMusts = {};
$.getJSON("../src/must_courses.json", function (data) {
  mustCoursesJson = data[0];
  updateDropDown(data);
});
function updateDropDown() {
  var dropdown = document.getElementById("DepartmentsDropDown");
  for (var department of Object.keys(mustCoursesJson)) {
    var temp = document.createElement("option");
    temp.value = department;
    temp.text = department;
    dropdown.appendChild(temp);
  }
}

document.getElementById("DepartmentsDropDown").onchange = SelectDepartment;
document.getElementById("SemesterDropDown").onchange = SelectSemester;
function SelectSemester(e) {
  var selected_index = e.target.selectedIndex;
  selectedSemester = parseInt(e.target[selected_index].value);
  ListMustCourses();
}

function SelectDepartment(e) {
  var selected_index = e.target.selectedIndex;
  selectedDepartment = e.target[selected_index].value;
  ListMustCourses();
  //   selectedMustCourses = mustCoursesJson[selectedDepartment][selectedSemester];
  //   console.log(selectedMustCourses);
}
function ListMustCourses() {
    if (selectedSemester == 0 || !selectedDepartment) {
    return;
  }
  MustCourses = mustCoursesJson[selectedDepartment][selectedSemester];
  var list = document.getElementById("MustCoursesSpan");
  list.innerHTML = "";
  document.getElementById("MustCoursesList").style.visibility = "visible";
  MustCourses.forEach((course) => {
      course = course.split(" ").join("");
    var temp = document.createElement("li");
    temp.innerHTML = course;
    list.appendChild(temp);
    listedMusts[course] = temp;
  });
}

function coloring(abbreviation,add_or_remove){
    abbreviation = abbreviation.split(".")[0];
    console.log(abbreviation);
    
    if(Object.keys(listedMusts).indexOf(abbreviation) != -1){
        if (add_or_remove){
            console.log("add");
            listedMusts[abbreviation].style.color = "#00ff00";
        }
        else{
            console.log("remove");
            listedMusts[abbreviation].style.color = "black";
        
        }
    }
}

export { updateDropDown,coloring};
