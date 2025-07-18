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


condition = ["địa điểm", "khách mời", "diễn giả", "speaker", "sự kiện", "khởi nghiệp", "startup", "thời gian", "chương trình", "tin tức", "bài viết"]

collection = ""
def find_div_heading (element):
    children = element.find_all(recursive=False)
    for child in children:
        if child.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            print(child)
            return
        elif child.find_all(recursive=False):
            find_div_heading(child)
        else:
            return

for d in div:
    find_div_heading(d);