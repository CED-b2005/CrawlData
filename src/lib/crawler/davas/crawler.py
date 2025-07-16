from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
from bs4 import BeautifulSoup
import json
import time

# Khởi tạo trình duyệt
options = webdriver.ChromeOptions()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

url = "https://surfdanang.zone/"
driver.get(url)
time.sleep(3)

speakers = []

def extract_speakers_from_page():
    soup = BeautifulSoup(driver.page_source, "html.parser")
    cards = soup.select("#guest-list .box-guest")
    for card in cards:
        name_tag = card.select_one("h3")
        position_tag = card.select_one("p")
        img_tag = card.select_one("img")

        if name_tag and img_tag:
            speakers.append({
                "name": name_tag.text.strip(),
                "position": position_tag.text.strip() if position_tag else "",
                "avatar": img_tag.get("src"),
                "alt_name": img_tag.get("alt", "")
            })

# Crawl trang đầu tiên
extract_speakers_from_page()

while True:
    try:
        next_button = driver.find_element(By.CSS_SELECTOR, ".page-btn.btn-next.show")
        if next_button.is_enabled():
            next_button.click()
            time.sleep(2)  # Đợi trang mới load xong
            extract_speakers_from_page()
        else:
            break
    except (NoSuchElementException, ElementClickInterceptedException):
        break

driver.quit()

unique_speakers = [dict(t) for t in {tuple(d.items()) for d in speakers}]
print(unique_speakers)

# # Ghi ra file JSON
# with open("./surfdanang_all_speakers.json", "w", encoding="utf-8") as f:
#     json.dump(unique_speakers, f, ensure_ascii=False, indent=2)

# print(f" Đã crawl được {len(unique_speakers)} speakers từ tất cả các trang của SURF Đà Nẵng.")
