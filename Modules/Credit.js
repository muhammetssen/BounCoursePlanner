
import {
  courseJson,
  totalCredit,
  changeCredit,
  totalCreditElement,
  added_courses
} from "../Main.js";
import { remove_from_table } from "./CourseTable.js";
function Credit_List(abbreviation, add_or_remove) {

  var course = courseJson[abbreviation];
  var course_li = document.getElementById("credits");
  if (add_or_remove) {
    if(added_courses.indexOf(abbreviation) != -1){
      return
    }
    var new_li = document.createElement("div");
    new_li.id = "Credit" + abbreviation;
    new_li.innerHTML = abbreviation + "    ";
    var creditSpan = document.createElement("span");
    creditSpan.style.backgroundColor = "lightblue";
    creditSpan.style.borderRadius = "20%";
    creditSpan.style.padding = "0px 5px 0px 5px";
    creditSpan.style.fontSize = "10px";

    creditSpan.innerHTML = "Cr: " + course.Credit;
    
    if (course.Credit > 0) {
      new_li.appendChild(creditSpan);
    }
    var inputElement = document.createElement("input");

    inputElement.type = "button";
    inputElement.value = "X";
    inputElement.className = "RemoveButton";

    inputElement.addEventListener("click", function () {
      remove_from_table(abbreviation);
    });

    new_li.appendChild(inputElement);
    course_li.appendChild(new_li);
    changeCredit(course.Credit);
  } else {
    if(added_courses.indexOf(abbreviation) != -1){
      return;
    }
    course_li.removeChild(document.getElementById("Credit" + abbreviation));
    changeCredit(-course.Credit);
  }
  totalCreditElement.innerHTML = "Credit: " + totalCredit;
}
export { Credit_List };
