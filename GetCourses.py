def number_seperator(number_text,ikili,results ,imlec=0,sayilar_array=[]):
    if imlec == len(number_text):
        if ikili == 0:
            results.append(sayilar_array.copy())
        return 
    added_num = number_text[imlec]
    sayilar_array.append(added_num)
    number_seperator(number_text,ikili,results,imlec+1,sayilar_array)
    sayilar_array.pop()
    if imlec +2 <= len(number_text):
        added_num = number_text[imlec:imlec+2]
        sayilar_array.append(added_num)
        number_seperator(number_text,ikili-1,results,imlec+2,sayilar_array)
        sayilar_array.pop()
def get_hours(days_text,hours_text):
    days_text = days_text.replace('Th','P')
    possibilities = []
    number_seperator(hours_text,len(hours_text)-len(days_text),possibilities)
    index = 0
    while index < len(possibilities):
        case = possibilities[index]
        for e in case:
            if len(e) == 2 and e[0]!= '1':
                possibilities.remove(case)
                index-=1
                break
        index+=1
    for case in possibilities:
        days_dict = {'M':[],'T':[],'W':[],'P':[],'F':[]}
        control = True
        for index,hour in enumerate(case):
            eklenecek = int(hour)
            if len(days_dict[days_text[index]]) == 0:
                days_dict[days_text[index]].append(eklenecek)
            elif days_dict[days_text[index]][-1] < eklenecek:
                days_dict[days_text[index]].append(eklenecek) 
            else:
                control = False
        if control:
            days_dict["Th"] = days_dict["P"]
            days_dict.__delitem__("P")
            backup = days_dict["F"]
            days_dict.__delitem__("F")
            days_dict["F"] = backup
            return (days_dict)
