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

class Contents:
    def __init__(self):
        self.timeLine = ""
        self.contents = ""

    def addContent(self, content: str):
        if self.contents != "":
            self.contents += "空"
        self.contents += content
    
    def json(self):
        json_string = '{' + '"timeLine"' + ':' + f'"{self.timeLine}"' + ','
        json_string += '"contents"' + ':' + f'"{self.contents}"' + '}'
        return json_string

class Title:
    def __init__(self):
        self.time = ""
        self.title = ""
        self.place = ""
        self.contentsList = ""
    
    def addContents(self, contents: str):
        if self.contentsList:
            self.contentsList += ","
        self.contentsList += contents.replace('"', '\"');

    def json(self):
        json_string = '{' + '"time"' + ':' + f'"{self.time}"' + ','
        json_string += '"title"' + ':' + f'"{self.title}"' + ','
        json_string += '"place"' + ':' + f'"{self.place}"' + ','
        json_string += '"contentsList"' + ':' + '[' + f'{self.contentsList}' + ']' + '}'
        return json_string
    
def info(json_string):
    return '[' + json_string + ']'
            

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

        programs = soup.select(".box-program")
        titles = ""
        
        for program in programs:
            
            title = Title()

            title.time = program.select_one(".fs-16.text-color-grd-2.fw-6").get_text()
            title.title = program.select_one("h3").get_text()
            title.place = program.select_one(".colu-info p").get_text()

            tbody = program.select_one("tbody")
            trs = tbody.select("tr")
            for tr in trs:
                contents = Contents()
                contentsElement = tr.select("td")
                for i in range (len(contentsElement)):
                    if (i == 0):
                        contents.timeLine = contentsElement[0].get_text()
                    else:
                        contents.addContent(contentsElement[i].get_text())
                title.addContents(contents=contents.json())
                contents.contents = ""
            if (titles):
                titles+=","
            titles+=title.json()

        print(f'[{titles}]')

        # print(program)
        # print(titleTime)
        # print(titleTitle)
        # print(titlePlace)




