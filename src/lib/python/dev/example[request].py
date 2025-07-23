from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    # 1️⃣context of request
    request_context = p.request.new_context(
        base_url="https://example.com",  # base URL
        extra_http_headers={} #header content
    )

    # 2️⃣ JSON send to Server (dict Python)
    payload = {
        "username": "demo",
        "password": "123456"
    }

    # 3️⃣ method POST request
    response = request_context.post(
        "/api/login",  # auto base_url → https://example.com/api/login
        data=json.dumps(payload)  # JSON string
    )

    # 4️⃣ In kết quả trả về
    print("Status:", response.status)    # status: 200, 404,...
    print("Text:", response.text())      # response type = text
    print("JSON:", response.json())      # response type = dict (server response  JSON)

    # 5️⃣ close context
    request_context.dispose()
