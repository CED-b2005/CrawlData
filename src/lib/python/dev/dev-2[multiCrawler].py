# from playwright.sync_api import sync_playwright
# from bs4 import BeautifulSoup
# import sys
# sys.stdout.reconfigure(encoding='utf-8');

# class Query:
#     def __init__(self, queryInfo: str):
#         self.queryName = ""
#         self.valueName = ""
#         self.byType = ""
#         self.convert(queryInfo)
#     def convert(self, queryInfo: str):
#         inputDataArray = queryInfo.split("[一]");

#         self.queryName = inputDataArray[0]
#         self.valueName = inputDataArray[1]
#         self.byType = inputDataArray[2]

# class Queries:
#     def __init__(self, queriesInfo):
#         self.name = ""        
#         self.parent = ""
#         self.queries = []
#         self.nextPage = ""
#         self.convert(queriesInfo)

#     def convert (self, queriesInfo: str):
#         inputDataArray = queriesInfo.split("[三]")

#         self.name = inputDataArray[0]
#         self.parent = inputDataArray[1]
#         queryInfos = inputDataArray[2]
#         self.nextPage = inputDataArray[3]
#         for queryInfo in queryInfos.split("[二]"):
#             if queryInfo:
#                 self.queries.append(Query(queryInfo))

# class InputData:
#     url = ""
#     queries = []
#     def __init__(self):
#         try:
#             self.url = sys.argv[1] if sys.argv[1] else ""
#             inputData =  sys.argv[2] if sys.argv[1] else ""
#             self.convert(inputData)
#         except (Exception):
#             return
#     def convert (self, inputData: str):
#         inputDataArray = inputData.replace("空", " ").split("[四]")
#         if inputDataArray:
#             for queriesInfo in inputDataArray:
#                 if queriesInfo:
#                     self.queries.append(Queries(queriesInfo)) 

# class Property:
#     def __init__(self, key: str, value:str):
#         self.key = key
#         self.value = value.replace('"', '\"').replace('\\', '\\\\')
#     def json(self):
#         return f'"{self.key}" : "{self.value}"'

# class Element:
#     def __init__(self):
#         self.properties = ""
#     def addProperty (self, property: str, end: bool):
#         if not end:
#             self.properties += property + ","
#         else:
#             self.properties += property
#     def json(self):
#         return "{" + self.properties + "}"  # return json string of properties

# def results (data:str):
#     return f"{ {data} }"

# def result (name:str, data:str, end:bool):
#     if not end:
#         return f"\"{name}\": [{data}],"
#     return f"\"{name}\": [{data}]"

# inputData = InputData()


# with sync_playwright() as p:
#     browser = p.chromium.launch()
#     page = browser.new_page()
#     page.goto(inputData.url)
#     page.wait_for_timeout(3000)  # đợi JS load
#     html = page.content()
#     browser.close()

# soup = BeautifulSoup(html, "html.parser")
# data = ""
# for qsIndex in range(len(inputData.queries)):
#     queries = inputData.queries[qsIndex]
#     targets = soup.select(queries.parent);
#     if targets:
#         elements = "";
#         for tsIndex in range(len(targets)):
#             element = Element()
#             target = targets[tsIndex]
#             for qIndex in range(len(queries.queries)):
#                 query = queries.queries[qIndex]
#                 value = target.select_one(query.queryName) if target.select_one(query.queryName) else ""
#                 if value:
#                     if query.byType == "text":
#                         value = value.text.strip()
#                     else:
#                         value = value.get(query.byType, "")
#                 property = Property(query.valueName, value)
#                 element.addProperty(property.json(), qIndex >= len(queries.queries)-1)
#             elements += element.json()
#             if (tsIndex < len(targets)-1):
#                 elements += ","
#         data += result(queries.name, elements, qsIndex >= len(inputData.queries)-1)
# print(results(data))


from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import sys
sys.stdout.reconfigure(encoding='utf-8');

class Query:
    def __init__(self, queryInfo: str):
        self.queryName = ""
        self.valueName = ""
        self.byType = ""
        self.convert(queryInfo)
    def convert(self, queryInfo: str):
        inputDataArray = queryInfo.split("[一]");

        self.queryName = inputDataArray[0]
        self.valueName = inputDataArray[1]
        self.byType = inputDataArray[2]

class Queries:
    def __init__(self, queriesInfo):
        self.name = ""        
        self.parent = ""
        self.queries = []
        self.nextPage = ""
        self.convert(queriesInfo)

    def convert (self, queriesInfo: str):
        inputDataArray = queriesInfo.split("[三]")

        self.name = inputDataArray[0]
        self.parent = inputDataArray[1]
        queryInfos = inputDataArray[2]
        self.nextPage = inputDataArray[3]
        for queryInfo in queryInfos.split("[二]"):
            if queryInfo:
                self.queries.append(Query(queryInfo))

class InputData:
    url = ""
    queries = []
    def __init__(self):
        try:
            self.url = sys.argv[1] if sys.argv[1] else ""
            inputData =  sys.argv[2] if sys.argv[1] else ""
            self.convert(inputData)
        except (Exception):
            return
    def convert (self, inputData: str):
        inputDataArray = inputData.replace("空", " ").split("[四]")
        if inputDataArray:
            for queriesInfo in inputDataArray:
                if queriesInfo:
                    self.queries.append(Queries(queriesInfo)) 

class Property:
    def __init__(self, key: str, value:str):
        self.key = key
        self.value = value.replace('"', '\"').replace('\\', '\\\\')
    def json(self):
        return f'"{self.key}" : "{self.value}"'

class Element:
    def __init__(self):
        self.properties = ""
    def addProperty (self, property: str, end: bool):
        if not end:
            self.properties += property + ","
        else:
            self.properties += property
    def json(self):
        return "{" + self.properties + "}"  # return json string of properties

def results (data:str):
    return f"{ {data} }"

def result (name:str, data:str, end:bool):
    if not end:
        return f"\"{name}\": [{data}],"
    return f"\"{name}\": [{data}]"

inputData = InputData()

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(inputData.url)
    page.wait_for_timeout(3000)  # đợi JS load

    data = ""
    for qsIndex in range(len(inputData.queries)):
        queries = inputData.queries[qsIndex]
        elements = ""

        while True:
            html = page.content()
            soup = BeautifulSoup(html, "html.parser")
            targets = soup.select(queries.parent)
            if not targets:
                break

            for tsIndex in range(len(targets)):
                element = Element()
                target = targets[tsIndex]
                for qIndex in range(len(queries.queries)):
                    query = queries.queries[qIndex]
                    value = target.select_one(query.queryName)
                    if value:
                        if query.byType == "text":
                            value = value.text.strip()
                        else:
                            value = value.get(query.byType, "")
                    else:
                        value = ""
                    property = Property(query.valueName, value)
                    element.addProperty(property.json(), qIndex >= len(queries.queries)-1)
                if (elements != "" and tsIndex == 0):
                     elements += ","
                elements += element.json()
                if tsIndex < len(targets)-1:
                    elements += ","

            # Xử lý chuyển trang nếu có nextPage
            next_button = page.query_selector_all(queries.nextPage)
            next_button = next_button[-2]
            if next_button and next_button.is_enabled():
                next_button.click()
                page.wait_for_timeout(2000)  # đợi trang load
            else:
                break  # không còn nút nextPage hoặc không click được

        data += result(queries.name, elements, qsIndex >= len(inputData.queries)-1)
    
    browser.close()

print(results(data))
