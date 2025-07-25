import sys, json
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

url = "https://surfdanang.zone"

def payload(id: int, lang: str):
    return {
        "url": "get_program",
        "id": str(id),
        "lang": lang
    }

def use_browser ():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        page.wait_for_timeout(1500)
        html = page.content()
        page.close()
        return html

def day_id (element:str, days_ids: []):
    data = element.get_text().strip()
    days_ids.append({
        "time" : data[:6],
        "day" : data[6:],
        "id" :  element.get("data-id").strip()
    })
    return days_ids

def query_days_ids (html: str):
    soup = BeautifulSoup(html, "html.parser")
    days_ids = []
    for id in soup.select(".btn-day.text-color-grd-2"):
        days_ids = day_id(id, days_ids)
    return days_ids

def request(days_ids, html: []):
    with sync_playwright() as p:
        request_context = p.request.new_context(
            base_url=url,
            extra_http_headers={
                "X-Requested-With": "*/*",
            }
        )
        for day_id in days_ids:
            response = request_context.post("/action.php", multipart=payload(day_id["id"], "vi"))
            html.append(response.text())
        request_context.dispose()
        return html

def details (detailList:str, timeLine:str, title:str, end: bool):
    detail = '{' + f'"timeLine": "{timeLine}"' + ',' + f'"title": "{title}"' + '}'
    if (detailList != ""):
        detailList += ","
    if not end: return detailList + detail
    else: return f'[{detailList + detail}]'

def events (eventList:str, day_id, details:str, end:bool):
    event = '{' + f'"time": "{day_id["time"]}"' + ',' + f'"day": "{day_id["day"]}"' + ',' + f'"details":  {details}' + '}'
    if (eventList != ""):
        eventList += ","
    if not end: return eventList + event
    else: return f'[{eventList + event}]'

days_ids = query_days_ids(use_browser())

eventList = ""
html =  request(days_ids, [])
for html_index in range(len(html)):
    soup = BeautifulSoup(html[html_index], "html.parser")
    targets = soup.select(".box-program")
    detailList = ""
    for index in range(len(targets)):
        target = targets[index]
        timeLine = target.select_one(".fs-16.text-color-grd-2.fw-6").get_text().strip()
        title = target.select_one(".fs-24.font-title").get_text().strip()
        detailList = details(detailList, timeLine, title, index >= len(targets)-1)
    eventList = events(eventList, days_ids[html_index], detailList, html_index >= len(html)-1)

print(eventList)
