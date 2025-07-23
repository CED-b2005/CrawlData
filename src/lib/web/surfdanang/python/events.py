import sys, json
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

url = "https://surfdanang.zone"

def payload(page: int, lang: str):
    return {
        "url": "get_program",
        "page": str(page),
        "lang": lang
    }

