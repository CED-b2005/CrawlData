const cheerio = require('cheerio');
const fetchData = require("../../lib/funcs/fetchData");
const { randomId } = require("../../lib/funcs/logic");
const { record, upsertOne } = require("../../lib/pinecone/pinecone");

const { encoding_for_model } = require("tiktoken")
const enc = encoding_for_model("gpt-4"); // hoặc "gpt-3.5-turbo", tùy mô hình


const startup_StartupWheel = async() => {
    const url = "https://startupwheel.vn/vi/startup-tieu-bieu-2/";
    const response = await fetchData.get(url);
    var startupLink = [];

    const $ = cheerio.load(response);
    $(".lqd-cc-label-trigger").each(async(i, el) => {
        startupLink.push($(el).attr("href"))
    });

    for (let i = 0; i < startupLink.length; i++) {
        let content = ""
        const response = await fetchData.get(startupLink[i]);
        const $ = cheerio.load(response);
        const name = $("article").find("h1").text()
        $("article").find("h2, h3, h4, h5, h6, li, p").each((i, el) => {
            if ($(el).find("strong").text()) content += $(el).find("strong").text()
            content += $(el).text();
        })
        const tokens = enc.encode(content);

        console.log("time: " + i + ". Length: " + content.length + ". Token: " + tokens.length);

    }
    return "startup StartupWheel - success"
}

const startupDanang = async() => {
    const { chromium } = require('playwright');

    let response = await fetchData.get("https://startupdanang.vn/start-up")
    let $ = cheerio.load(response);
    let urls = []
    let startups = []
    $(".ptb-60.box-wp a.color-primary").each((i, el) => { urls.push($(el).attr("href")); });
    for (let i = 0; i < urls.length; i++) {
        let info = []
        response = await fetchData.get(urls[i]);
        $ = cheerio.load(response);
        const eventName = $(".bloc").find("h2 > span").text();
        $(".bloc").find('.project-item').each(async(i, el) => {
            const img = $(el).find("img").attr("src");
            const projectName = $(el).find(".card-bottom h2").text();
            const link = $(el).find(".card-bottom  > a").attr("href");
            info.push({ img, projectName, link })
        })
        startups.push({ eventName, info });
    }

    for (let i = 0; i < startups.length; i++) {
        for (let j = 0; j < startups[i].info.length; j++) {
            const url = startups[i].info[j].link;

            const browser = await chromium.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
            const html = await page.content();
            await browser.close();

            $ = cheerio.load(html);

            let description = $(".text-gray_500.typography-h5").text();
            let authors = [];

            $(".py-0.pt-8").find(".swiper-wrapper > div").each((i, el) => {
                const author = $(el).find(".text-center h4").text();
                const position = $(el).find(".text-center p").text();
                const description = $(el).find("div p.text-justify").text();
                // 
                authors.push({ author, position, description })
            });
            startups[i].info[j].description = description;
            startups[i].info[j].authors = authors;
            console.log(JSON.stringify(startups[i].info[j]).length)
        }
    }
    return startups;

}


module.exports = { startup_StartupWheel, startupDanang }