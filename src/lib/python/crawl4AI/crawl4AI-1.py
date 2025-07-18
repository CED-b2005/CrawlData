import asyncio
from crawl4ai import *

async def main():
    async with AsyncWebCrawler() as crawler:
        url = "https://ai.pydantic.dev/sitemap.xml"
        result = await crawler.arun(url,)
        print(result.markdown)

if __name__ == "__main__":
    asyncio.run(main())