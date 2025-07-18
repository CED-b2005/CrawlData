from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
from bs4 import BeautifulSoup
import time, json, sys
sys.stdout.reconfigure(encoding='utf-8');

# identify data query (queryName@valueName@byType)
class Query:
    queryName: str
    valueName: str
    byType: str

    def __init__(self, dataInput: str):
        self.convert(dataInput)

    def convert(self, dataInput: str):
        splitData = dataInput.split("@");
        self.queryName = splitData[0]
        self.valueName = splitData[1]
        self.byType = splitData[2]

# identify data return
class Property:
    key: str
    value: str
    def __init__(self, key: str, value:str):
        self.key = key
        self.value = value
    def json(self):
        return '"{0}" : "{1}"'.format(self.key, self.value)

# total properties for each element
class Element:
    properties: str
    def __init__(self):
        self.properties = ""
    def addProperty (self, property: str):
        self.properties += property + ", "
    def json(self):
        return "{" + self.properties + "}"  # return json string of properties
    
# because data from input is String so need to convert to type Array <Query>
def convertInput(inputData: str):
    propertyQueries = []
    inputData = inputData.split(";");
    for property in inputData:
        propertyQuery = Query(property.strip());
        propertyQueries.append(propertyQuery);
    return propertyQueries;

# get 3 value from command (extremely important)
url = sys.argv[1] if len(sys.argv) > 1 else ""  
parent = sys.argv[2].replace("/", " ") if len(sys.argv) > 2 else "" 
inputData = sys.argv[3].replace("/", " ") if len(sys.argv) > 3 else []
nextPage = sys.argv[4].replace("/", " ") if len(sys.argv) > 4 else ""

# print(f"URL: {url}, Parent: {parent}, InputData: {inputData}, NextPage: {nextPage}")

# convert inputData to type Query[] (per element)
propertyQueries = convertInput(inputData)

# create browser to run
options = webdriver.ChromeOptions()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

# to set data from url (crawl web)
driver.get(url)
time.sleep(4);

# data will return
results = [] # is array contain elements (type string json)

# collect data from web by parent (DOM element)
def extract_targets_from_page():
    soup = BeautifulSoup(driver.page_source, "html.parser")

    #all target need to be collected
    targets = soup.select(parent)
    for target in targets: #per target <=> element, will collect the properties each element
        element = Element()
        for propertyQuery in propertyQueries: #per propertyQuery <=> query (queryName, byType)
            # queryName is the selector, byType is the attribute to get value
            value = target.select_one(propertyQuery.queryName) if target.select_one(propertyQuery.queryName) else ""
            if value:
                if propertyQuery.byType == "text":
                    value = value.text.strip()
                elif propertyQuery.byType == "src":
                    value = value.get("src", "")
                elif propertyQuery.byType == "alt":
                    value = value.get("alt", "")
                else:
                    value = value.get(propertyQuery.byType, "")
            property = Property(propertyQuery.valueName, value) # create a property with key and value
            element.addProperty(property.json()) # add property to element
        results.append(element.json()) # add element to results

# Crawl first page
extract_targets_from_page()
while True:
    try:
        goNext = driver.find_element(By.CSS_SELECTOR, nextPage)
        if goNext.is_enabled():
            goNext.click()
            time.sleep(3)  # wait for the page to load
            extract_targets_from_page()
        else:
            break
    except (NoSuchElementException, ElementClickInterceptedException):
        break

driver.quit()

# print the results as JSON
print(results);
# print(json.dumps(results, ensure_ascii=False, indent=2))