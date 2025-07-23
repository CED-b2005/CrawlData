import sys, json
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8');

def convert(data: str) -> str:
    pairs = data.split("二")
    json_parts = []
    for pair in pairs:
        key, value = pair.split("一")
        json_parts.append(f'"{key}": "{value}"')
    return "{" + ", ".join(json_parts) + "}"

def inputProm():
    try:
        url = sys.argv[1]
        data = json.loads(convert(sys.argv[2]))
        if (url and data):
            return [url, data]
        else:
            return False
    except:
        return False

data = inputProm()       

if (data):
    with sync_playwright() as p:
        request_context = p.request.new_context(
            base_url = data[0],
            extra_http_headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "*/*",
                "Referer": f"{data[0]}",
                "Origin":  f"{data[0]}",
                "X-Requested-With": "XMLHttpRequest"
            }
        )
        response = request_context.post("/action.php", multipart=data[1])

        html = response.text()
        request_context.dispose()

        soup = BeautifulSoup(html, "html.parser")



