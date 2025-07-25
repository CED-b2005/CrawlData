import sys, json, requests
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

url = "https://davas.vc"

def use_browser ():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        page.wait_for_timeout(1500)
        html = page.content()
        page.close()
        return html

def startups (startupList:str, company_logo:str, project_name:str, description:str, end:bool):
    startup = '{' + f'"company_logo": "{company_logo}"' + ',' + f'"project_name": "{project_name}"' + ',' + f'"description": "{description}"' + '}'
    if (startupList != ""):
        startupList += ","
    if not end: return startupList + startup
    else: return f'[{startupList + startup}]'

html = use_browser()
soup = BeautifulSoup(html, "html.parser")
targets = soup.select(".view-info.box-startup.wow.fadeInUp")

startupList = ""
for index in range(len(targets)):
    target = targets[index]
    company_logo = target.select_one(".ll").get("src", "")
    project_name = target.select_one(".fs-24.font-title").get_text().strip()
    description = target.select_one(".mt-8.lines3").get_text().strip().replace('"', "'").replace("\n", " ")
    startupList = startups(startupList, company_logo, project_name, description, index>=len(targets)-1)

print(startupList)