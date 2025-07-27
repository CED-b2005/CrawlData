import sys, json
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

url = "https://davas.vc"

def payload(id: int, lang: str):
    return {
        "url": "get_investment",
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

def investmentFund_id (element:str, investmentFund_ids: []):
    investmentFund_ids.append({
        "name" : element.get_text().strip(),
        "id" :  element.get("data-id").strip()
    })
    return investmentFund_ids

def query_investmentFund_ids (html: str):
    soup = BeautifulSoup(html, "html.parser")
    investmentFund_ids = []
    parent = soup.select_one(".box-investment")
    for id in parent.select(".menu-ar"):
        investmentFund_ids = investmentFund_id(id, investmentFund_ids)
    return investmentFund_ids

def investmentFunds (investmentFundList:str, name:str,logo:str, img:str, description:str, end: bool):
    investmentFund = '{' + f'"name": "{name}"' + ',' + f'"logo": "{logo}"' + ',' + f'"img": "{img}"' + ',' + f'"description": "{description}"'  + '}'
    if (investmentFund != ""):
        investmentFundList += ","
    if not end: return investmentFundList + investmentFund
    else: return f'[{investmentFundList + investmentFund}]'

def request(investmentFund_ids, investmentFundList: str):
    with sync_playwright() as p:
        request_context = p.request.new_context(
            base_url=url,
            extra_http_headers={
                "X-Requested-With": "*/*",
            }
        )
        for index in range(len(investmentFund_ids)):
            response = request_context.post("/action.php", multipart=payload(investmentFund_ids[index]["id"], "vi"))
            html = response.text()
            soup = BeautifulSoup(html)

            images = soup.select("img")
            target = soup.select_one(".d-flex.flex-wrap.align-items-start.gap-16")

            name = investmentFund_ids[index]["name"]

            logo = images[0].get("src", "") if images else ""
            image = images[1].get("src", "") if len(images) > 1 else ""
            descriptions = ""
            for description in soup.select(".content p"):
                descriptions += description.get_text().replace("\n", " ") + " "
            investmentFundList = investmentFunds(investmentFundList, name, logo , image, descriptions.strip(), index >= len(investmentFund_ids)-1)
            
        request_context.dispose()

        return investmentFundList

investmentFund_ids = query_investmentFund_ids(use_browser())

investmentFundList = request(investmentFund_ids, "")

print(investmentFundList.replace(",", "", 1))
