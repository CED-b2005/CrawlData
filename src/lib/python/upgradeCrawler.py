from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import sys, json

import sys

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

def extract_targets_from_page(page, parent, propertyQueries):
    soup = BeautifulSoup(page.content(), "html.parser")

    targets = soup.select(parent)
    for target in targets:
        element = Element()
        for propertyQuery in propertyQueries:
            selected = target.select_one(propertyQuery.queryName)
            value = ""
            if selected:
                if propertyQuery.byType == "text":
                    value = selected.get_text(strip=True)
                elif propertyQuery.byType == "src":
                    value = selected.get("src", "")
                elif propertyQuery.byType == "alt":
                    value = selected.get("alt", "")
                else:
                    value = selected.get(propertyQuery.byType, "")
            prop = Property(propertyQuery.valueName, value)
            element.addProperty(prop.json())
        results.append(element.json())

# 🧠 Cấu hình crawl với Playwright
def crawl_with_playwright(start_url, parent, propertyQueries, nextPageSelector):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(start_url)

        while True:
            extract_targets_from_page(page, parent, propertyQueries)

            try:
                # Kiểm tra nút next
                next_button = page.query_selector(nextPageSelector)
                if next_button and next_button.is_enabled():
                    next_button.click()
                    page.wait_for_timeout(3000)  # đợi load (có thể đổi thành wait_for_selector nếu chắc chắn)
                else:
                    break
            except Exception as e:
                print("⚠️ Không tìm thấy nút next hoặc lỗi:", e)
                print(next_button)
                break

        browser.close()

url = sys.argv[1]
parent = sys.argv[2].replace("/", " ")
inputData = sys.argv[3].replace("/", " ")
propertyQueries = convertInput(inputData)
nextPage = sys.argv[4].replace("/", " ")

results = []

if False:
# if url == "https://davas.vc":
    print ({
        "url" : url,
        "parent" : parent,
        "properties": propertyQueries,
        "nextPage" : nextPage
    })
else:
    if (url and parent and propertyQueries):
        crawl_with_playwright(url, parent, propertyQueries, nextPage)
        print(results)