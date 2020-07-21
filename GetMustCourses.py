import requests
import json
# BASE_URL = "http://registration.boun.edu.tr/scripts/departmentcourse.asp"
# data = {"department": "CIVIL ENGINEERING",
#         "program": "UNDERGRADUATE", 
#         "semester": "2017/2018-1"}
# a = requests.post(BASE_URL, data)
from selenium import webdriver
from selenium.webdriver.chrome.options import Options  
chrome_options = Options()
chrome_options.add_argument("--headless")

from bs4 import BeautifulSoup
driver = webdriver.Chrome("chromedriver",chrome_options= chrome_options)
driver.get("http://registration.boun.edu.tr/departmentalframe.asp")
departments = driver.find_elements_by_tag_name("option")[1:-4]
index = 0
count = len(departments)
course_dict = {}
while index < count:
    department = departments[index]
    departmentName = department.text
    department.click()
    versions = driver.find_element_by_name("semester").find_elements_by_tag_name("option")
    if len(versions) > 0:
        print(departmentName)
        driver.find_element_by_class_name("formb").click()
        soup = BeautifulSoup(driver.page_source,"html.parser")
        must_courses = soup.find_all("tr")[4:]
        courses = {"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[],"10":[],"11":[],"12":[]}
        for course in must_courses:
            abbreviation = course.contents[0].getText(strip=True)
            courseName = course.contents[1].getText(strip=True)
            semester = course.contents[2].getText(strip=True)
            courses[semester].append(abbreviation)
        course_dict[departmentName] = courses
    driver.get("http://registration.boun.edu.tr/departmentalframe.asp")
    departments = driver.find_elements_by_tag_name("option")[1:-4]
    index+=1
print(course_dict)
with open("src/must_courses.json","w+",encoding="utf8") as file:
    file.write("[" + json.dumps(course_dict,indent=2)+ "]")
    file.close()
driver.quit()