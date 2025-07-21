from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://surfdanang.zone/")
    page.wait_for_timeout(3000)  # đợi JS load
    html = page.content()
    browser.close()

soup = BeautifulSoup(html, "html.parser")

body = soup.select_one("body")

class Element:
    name: str
    content: str
    src: str
    
    def __init__ (self, element):
        self.name = element.name
        self.content = element.get_text()
        self.src = element.get("src", "")

    def  json(self):
        return {
            "name": self.name,
            "content": self.content,
            "src": self.src
        }
def maxHeading (body):
    if body.select("h1"):
        return "h1"
    elif body.select("h2"):
        return "h2"
    elif body.select("h3"):
        return "h3"
    elif body.select("h4"):
        return "h4"
    elif body.select("h5"):
        return "h5"
    elif body.select("h6"):
        return "h6"
    else:
        False
        
print(maxHeading(body))

elements = []
queries = []

bodyChildrenElement = body.find_all(recursive=False);
for child in bodyChildrenElement:
    if (child.name != "script"):
        elements.append(child)

def selectorAll (dom, queries):
    element = Element(dom)
    queries.append(element.json())
    children = dom.find_all(recursive=False);
    if children:
        for child in children:
            selectorAll(child, queries)

for element in elements:
    selectorAll(element, queries)

print(queries)


# print(container)