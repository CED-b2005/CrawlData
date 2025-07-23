import sys, json
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

url = "https://surfdanang.zone"
page = 1

def payload(page: int, lang: str):
    return {
        "url": "get_list_guest",
        "page": str(page),
        "menu_id": "2",
        "lang": lang
    }
def request (html: str):
    page = 1
    with sync_playwright() as p:
        request_context = p.request.new_context(
            base_url=url,
            extra_http_headers={
                    "X-Requested-With": "*/*",
            }
        )
        while True:
            response = request_context.post("/action.php", multipart=payload(page, "vi"))
            speakers = response.json()["html"]
            if (speakers):
                html += speakers
                page+=1
            else:
                request_context.dispose()
                return html
def speakers (speakerList:str, name:str, img:str, position:str, end: bool):
    speaker = '{' + f'"name": "{name}"' + ',' + f'"img": "{img}"' + ',' + f'"position": "{position}"'  + '}'
    if (speakerList != ""):
        speakerList += ","
    if not end: return speakerList + speaker
    else: return f'[{speakerList + speaker}]'

html = request("")
soup = BeautifulSoup(html, "html.parser")

targets = soup.select(".box-guest.s_avt")

speakerList = ""
for index in range(len(targets)):
    target = targets[index]
    name = target.select_one("h3").get_text().strip()
    img = target.select_one("img").get("src", "")
    position = target.select_one("p").get_text().strip()
    speakerList = speakers(speakerList, name, img, position, index>=len(targets)-1)

print(speakerList)