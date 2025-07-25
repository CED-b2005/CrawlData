import asyncio, sys
from crawl4ai import *

sys.stdout.reconfigure(encoding='utf-8');

url = sys.argv[1] if len(sys.argv) > 1 else ""  
type = sys.argv[2] if len(sys.argv) > 2 else "" 

async def main():
    async with AsyncWebCrawler() as crawler:
        # url = "https://ai.pydantic.dev/sitemap.xml"
        # url = "https://surfdanang.zone"
        result = await crawler.arun(url,)
        if(type == "json"):
            print(result.json)
        elif type == "markdown":
            print(result.markdown)
        elif type == "html":
            print(result.html)

if __name__ == "__main__":
    asyncio.run(main())