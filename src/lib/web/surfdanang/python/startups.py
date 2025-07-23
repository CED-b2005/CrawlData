import sys, json
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

url = "https://surfdanang.zone"

def use_browser ():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        page.wait_for_timeout(1500)
        html = page.content()
        page.close()
        return html

def startups (startupList:str, product_img:str, company_logo:str, project_name:str, description:str, end:bool):
    startup = '{' + f'"product_img": "{product_img}"' + ',' + f'"company_logo": "{company_logo}"' + ',' + f'"project_name": "{project_name}"' + ',' + f'"description": "{description}"' + '}'
    if (startupList != ""):
        startupList += ","
    if not end: return startupList + startup
    else: return f'[{startupList + startup}]'

html = use_browser()
soup = BeautifulSoup(html, "html.parser")

targets = soup.select(".box-news.d-flex.flex-column.swiper-slide")

startupList = ""
for index in range(len(targets)):
    target = targets[index]
    product_img = target.select_one(".ll").get("src", "")
    company_logo = target.select_one(".f-shrink-0.f-grow-1.mt-8.logo img").get("src", "")
    project_name = target.select_one(".fs-20.font-title.lines2").get_text().strip()
    description = target.select_one(".lines2.fs-14.mb-8").get_text().strip().replace('"', "'")
    startupList = startups(startupList, product_img, company_logo, project_name, description, index>=len(targets)-1)

print(startupList)