from playwright.sync_api import sync_playwright
import sys
sys.stdout.reconfigure(encoding='utf-8');


with sync_playwright() as p:
    request_context = p.request.new_context(
        base_url="https://surfdanang.zone",
        extra_http_headers={
            "Cookie": "PHPSESSID=9llkc4o32rgkumgklkuskias13",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Accept": "*/*",
            "Referer": "https://davas.vc/",  # 👈 nếu trang yêu cầu
            "Origin": "https://davas.vc",
            "X-Requested-With": "XMLHttpRequest"  # 👈 thường dùng trong XHR
        }
    )

    form_data = {
        "page": "1",
        "menu_id": "2",
        "lang": "vi",
        "url": "get_list_guest"
    }

    response = request_context.post("/action.php", multipart=form_data)

    print(response.json()["html"])

    request_context.dispose()
