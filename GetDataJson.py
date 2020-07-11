from GetCourses import get_hours
import requests
import json
from bs4 import BeautifulSoup

with open("donems.txt","r") as file:
    donems = file.read().split("\n")
with open("departments.txt","r") as file:
    departments= file.read().split("\n")

for donem in donems:
    courses = {}
    for department in departments[:2]:
        print(department)
        words = department.split(":")
        params = {
            'donem':donem,
            'kisaadi':words[0],
            'bolum':words[1][1:]
        }
        url = " http://registration.boun.edu.tr/scripts/sch.asp"
        response = requests.get(url,params)
        soup = BeautifulSoup(response.text,'html.parser')
        course_list = (soup.find_all("tr",{'class':['schtd','schtd2','schtd labps']}))
        last_used = ""
        for course in course_list:
            content = course.find_all("td")
            abbreviation = content[0].getText(strip=True).replace(" ","")
            course_name = content[2].getText(strip=True)
            if course_name == 'LAB':
                abbreviation = last_used + 'Lab' 
            elif course_name == 'P.S.':
                abbreviation = last_used + 'PS'
            else:
                last_used = abbreviation 
            abbreviation = abbreviation.replace(" ","")
            credit = content[3].getText(strip=True)
            ects = content[4].getText(strip=True)
            teacher_name = content[5].getText(strip=True)
            days = content[6].getText(strip=True)
            hours = content[7].getText(strip=True)
            places = content[8].getText(strip=True)
            temp_dict= {
                "Course_name":course_name,
                "Credit":credit,
                'Ects':ects,
                'Instructor_name':teacher_name,
                'Hours': get_hours(days,hours),
                'Places':places
            }
            courses[abbreviation] = temp_dict
#            courses.append(temp_dict)
    with open(f"{donem.replace('/','-')}.json","w+",encoding="utf8") as file:
            file.write("["+json.dumps(courses,indent=2)+"]")
            file.close()
