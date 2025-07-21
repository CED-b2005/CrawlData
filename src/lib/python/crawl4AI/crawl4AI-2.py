import asyncio
from typing import List
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
import requests
from xml.etree import ElementTree
import re
from urllib.parse import urlparse

async def crawl_sequential(urls: List[str]):
    print("\n=== Sequential Crawling with Session Reuse ===")

    browser_config = BrowserConfig(
        headless=True,
        #For better performance in Docker or low-memory environments
        extra_args=["--disable-gpu","--disable-dev-shm-usage", "--no-sandbox", ]
    )

    crawl_config = CrawlerRunConfig(
        markdown_generator=DefaultMarkdownGenerator()
    )

    # Create the crawler (opens a browser session)
    crawler = AsyncWebCrawler(config=browser_config)
    await crawler.start()

    try:
        session_id = "session1"
        for url in urls:
            result = await crawler.arun(
                url,
                config=crawl_config,
                session_id=session_id
            )
            if result:
                print(f"Successfully crawled {url}")
                # E.g check markdown length
                print(f"Markdown length: {len(result.markdown.raw_markdown)}")
                
                parsed_url = urlparse(url)
                safe_path = re.sub(r'[^\w\-_.]', '_', parsed_url.netloc + parsed_url.path.strip('/'))
                filename = f"E:/crawl-webs/{safe_path or 'index'}.json"

                print(result.json, "\n\n")
                # write the result to a file
            #     with open(filename, "w", encoding="utf-8") as f:
            #         f.write(str(result.json))

            #     print(f"Saved result to {filename}")
            # else:
            #     print(f"Failed to crawl {url}: {result.error_message}")
    finally:
        # After all URLs are processed, close the crawler (and browser session)
        await crawler.close()
    
def get_pydantic_ai_docs_urls():
    """
    Fetches all URLs from the Pydantic AI documentation.
    Uses the sitemap (https://ai.pydantic.dev/sitemap.xml) to get all URLs.

    Returns:
        List[str]: list  of all URLs.
    """
    sitemap_url = "https://surfdanang.zone/sitemap.xml"
    try:
        response = requests.get(sitemap_url)
        response.raise_for_status()

        #Parse the XML
        root = ElementTree.fromstring(response.content)

        #Extract all URLs from the sitemap
        # The namespace is usually defined in root element
        namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = [loc.text for loc in root.findall('.//ns:loc', namespace)]

        return urls
    except Exception as e:
        print(f"Error fetching sitemap: {e}")
        return []
    
async def main():
    urls = get_pydantic_ai_docs_urls()
    if urls:
        print(f"Found {len(urls)} URLs to crawl in the Pydantic AI sitemap.")
        await crawl_sequential(urls)
    else:
        print("No URLs found to crawl.")
    
if __name__ == "__main__":
    asyncio.run(main())

