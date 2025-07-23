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
div = soup.select("div")

def inspect_div(div):
   # collect all children of the div
    children = div.find_all(recursive=False)

    if children:
        # check if any child has a heading tag
        has_heading = any(child.name in ["h1", "h2", "h3", "h4", "h5", "h6"] for child in children)

        if has_heading:
            print("🔹 [has headings] Found headings in this div:")
            for child in children:
                tag = child.name
                tag_id = child.get("id", "")
                tag_class = " ".join(child.get("class", []))
                text = child.get_text(strip=True)
                src = child.get("src", "")
                alt = child.get("alt", "")

                print(f"🧩 Tag: <{tag}>\nid: {tag_id}\nclass: {tag_class}\ntext: {text}\n ")
    
    else:
        # if no children, print the div itself
        tag = div.name
        tag_id = div.get("id", "")
        tag_class = " ".join(div.get("class", []))
        print(f"⚠️ [NO CHILDREN] Tag: <{tag}> | id: {tag_id} | class: {tag_class} | html: {div} ")

for d in div:
    inspect_div(d);

# score 3 / 10 (good in hasHeadings)
# div = soup.select("div")
# for d in div:
#     print("div:", d)
#     hasHeadings = any(d.select(h) for h in ["h1", "h2", "h3", "h4", "h5", "h6"])
#     if hasHeadings:
#         for child in d.find_all(recursive=False):
#             print(child)
#         # for heading in headings:
#         #     print(f"{h.upper()}: {heading}")
#     print("\n\n")


# score 10 / 10 (will improve to better)
# div = soup.select("div")
# for d in div:
#     print("div:", d)
#     for h in ["h1", "h2", "h3", "h4", "h5", "h6"]:
#         headings = d.select(h)
#         for heading in headings:
#             print(f"{h.upper()}: {heading}")
#     print("\n\n")

# score 7 / 10
# div = soup.select("div")
# for d in div:
#     print(d, "\n\n")


# score 9 / 10
# for h in ["h1", "h2", "h3", "h4", "h5", "h6"]:
#     headings = soup.select(h)
#     for heading in headings:
#         print(f"{h.upper()}: {heading.text.strip()}")


# score 2 / 10
# title = soup.select_one("title")
# print(title)

# score 5 / 10
# meta = soup.select("meta")
# for m in meta:
#     print(m)

# score 10 / 10 (waiting)
# body = soup.select_one("body")
# print(body)
# print(body.text.strip())

# score 10 / 10 (waiting)
# speakers = soup.select(".box-guest")
# for sp in speakers:
#     print(sp.text.strip())
#     print(sp.select_one("img").get("src", ""))
