const { exec } = require("child_process");
const path = require("path");

const crawl4AI = (url, type, res, ) => {

    exec(`python ./src/lib/python/crawl4AI/crawl4AI-1.py ${url} ${type}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error({ error: `exec error: ${error}`, stderr: `stderr: ${stderr}` });
            return;
        }
        res.send(stdout);
    });
}

module.exports = crawl4AI;