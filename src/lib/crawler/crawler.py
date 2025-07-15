# import asyncio
# import sys
# from crawl4ai import *
# import os
# import json

# sys.stdout.reconfigure(encoding='utf-8')

# # collect variable from the prompt
# urlInput = sys.argv[1] if len(sys.argv) > 1 else "https://www.nbcnews.com/business"  #logic 3 in py
# filePath =  sys.argv[2] if len(sys.argv) > 2 else "crawler.json"

# async def main():
#     async with AsyncWebCrawler() as crawler:
#         result = await crawler.arun(url = urlInput)
        
#         # os.makedirs(os.path.dirname(filePath), exist_ok=True)
#         # with open(filePath, "w", encoding="utf-8") as f:
#         #     f.write(result.json())
#         print (result.json)

# if __name__ == "__main__": 
#     asyncio.run(main())


# import asyncio
# import sys
# from crawl4ai import *
# import os
# import json

# sys.stdout.reconfigure(encoding='utf-8')

# # collect variable from the prompt
# urlInput = sys.argv[1] if len(sys.argv) > 1 else "https://www.nbcnews.com/business"  #logic 3 in py
# filePath =  sys.argv[2] if len(sys.argv) > 2 else "crawler.json"

# async def main():
#     async with AsyncWebCrawler() as crawler:
#         result = await crawler.arun(url = urlInput)
#         with open(filePath, "w", encoding="utf-8") as f:
#             json.dump(result.json(), f, ensure_ascii=False, indent=2)
#         print (result.json())

# if __name__ == "__main__": 
#     asyncio.run(main())

import sys
import asyncio
from crawl4ai import *

sys.stdout.reconfigure(encoding='utf-8')

url = sys.argv[1] if len(sys.argv) > 1 else "https://www.nbcnews.com/business"  #logic 3 in py

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun( url= url, )
        print(result.html)

if __name__ == "__main__":
    asyncio.run(main())
    
#| Thuộc tính            | Kiểu dữ liệu       | Mô tả ngắn                                           |
# | --------------------- | ------------------ | ---------------------------------------------------- |
# | `result.markdown`     | `str`              | Nội dung bài viết chính dưới dạng Markdown           |
# | `result.title`        | `str`              | Tiêu đề trang hoặc bài viết                          |
# | `result.content`      | `str`              | Nội dung chính (plain text, không định dạng)         |
# | `result.html`         | `str`              | Nội dung HTML đã được render đầy đủ                  |
# | `result.url`          | `str`              | URL gốc đã crawl                                     |
# | `result.publish_date` | `str` / `datetime` | Ngày xuất bản nếu detect được từ metadata            |
# | `result.author`       | `str`              | Tên tác giả nếu có                                   |
# | `result.images`       | `List[str]`        | Danh sách các URL ảnh trong bài viết                 |
# | `result.tags`         | `List[str]`        | Danh sách tag hoặc từ khóa nếu có                    |
# | `result.summary`      | `str`              | Tóm tắt nội dung bài viết (auto-generated hoặc meta) |
# | `result.metadata`     | `dict`             | Thẻ meta, open graph, schema.org, v.v.               |
# | `result.raw_html`     | `str`              | HTML gốc lấy được trước khi render JavaScript        |
# | `result.text_blocks`  | `List[str]`        | Các đoạn văn bản chính được tách theo khối           |
# | `result.language`     | `str`              | Mã ngôn ngữ (VD: `'en'`, `'vi'`,...)                 |
# | `result.videos`       | `List[str]`        | Danh sách URL video nhúng nếu có                     |
# | `result.pdf_links`    | `List[str]`        | Các liên kết tới tệp PDF trong trang nếu có          |
# | --------------------- | ------------------ | ---------------------------------------------------- |