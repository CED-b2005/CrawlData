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

# score ? / 10 
body = soup.select_one("body")
div = [];

for element in body.find_all(recursive=False):
    if element.name == "div":
        div.append(element)


for d in div:
    hasHeading = d.select("h1, h2, h3, h4, h5, h6")
    if not hasHeading:
        div.remove(d) 

children = []
for d in div:
    dChildren = d.find_all(recursive=False)
    for child in dChildren:
        if child.select("h1, h2, h3, h4, h5, h6"):
            children.append(child)

for child in children:
    print(f"🔹 [has headings] Found headings in this div: \n{child}\n")

# success collect all divs with headings
# dev-5 will find elements with same class or id and count of children