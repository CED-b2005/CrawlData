const cheerio = require('cheerio');
const fetchData = require("../../funcs/fetchData")

const { speakerPayload, eventsPayload } = require("./payloads");
const { speaker, project, detail } = require("./objects");

const url = "https://surfdanang.zone/";
const request = url + "action.php";

const headers = {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "accept-encoding": "*/*",
    "accept": "*/*"
}

const titleCrawler = async() => {
    let response = await fetchData.get(url);
    let $ = cheerio.load(response);
    const name = $("title").text();
    const title = $(".box-wp.ptb-80").find("h2").text();
    const description = $(".box-wp.ptb-80").find(".content").text();
    return {
        "name": name,
        "title": title,
        "description": description,
    }
}

const speakerCrawler = async() => {
    let id = 1
    let html = ""
    let speakerList = [];
    while (true) {
        const response = await fetchData.post(request, speakerPayload(id), headers)
        if (response.html != "") {
            html += response.html;
            id += 1;
        } else break
    }

    const $ = cheerio.load(html);
    $(".box-guest.s_avt").each((i, element) => {
        const name = $(element).find("h3").text()
        const img = ($(element).find("img").attr("src"))
        const position = $(element).find("p").text()
        speakerList.push(speaker(name, img, position))
    })
    return speakerList
}

const eventCrawler = async() => {
    let response = await fetchData.get(url);
    let $ = cheerio.load(response);
    let id_events = [];
    let eventList = [];
    $(".btn-day.text-color-grd-2").each((i, element) => {
        const id = $(element).attr("data-id");
        id_events.push(id);
    });

    for (let i = 0; i < id_events.length; i++) {
        response = await fetchData.post(request, eventsPayload(id_events[i]), headers)
        const $ = cheerio.load(response);
        const date = $(".container-program.mt-24").attr("data-local");
        $(".box-program").each((i, element) => {
            const title = $(element).find(".fs-24.font-title").text();
            const timeline = $(element).find(".colu-time p").text();
            const place = $(element).find(".colu-info>div>p").text();
            eventList.push(detail(date, timeline, title, place));
        });
    }
    return eventList;

}

const projectCrawler = async() => {
    let response = await fetchData.get(url);
    let $ = cheerio.load(response);
    let projectList = [];
    $(".con-new.ptb-40").each((i, element) => {
        const title = $(element).find("h2").text();
        $(element).find(".box-news").each((j, el) => {
            const name = $(el).find("h3").text();
            const img = $(el).find("img").attr('data-src');
            const description = $(el).find(".lines2.fs-14.mb-8").text().trim();
            const link = $(el).find("a").attr("href");
            projectList.push(project(title, name, img, link, description));
        });
    });
    return projectList;
}

const otherCrawler = async() => {
    let response = await fetchData.get(url);
    let $ = cheerio.load(response);
    let infoList = [];
    $("#governing").find('.box-unit.text-center-webkit.mt-40.wow.fadeIn').each((i, element) => {
        let title = $(element).find('h2').text();
        let contents = $(element).find("p").text()
        if (contents) {
            infoList.push({
                "title": title,
                "host": contents
            })
        } else {
            contents = [];
            $(element).find('img').each((j, el) => {
                contents.push($(el).attr('data-src'))
            })
            infoList.push({
                "title": title,
                "imgs": contents
            })
        }
    })

    return infoList
}


module.exports = { titleCrawler, speakerCrawler, eventCrawler, projectCrawler, otherCrawler };