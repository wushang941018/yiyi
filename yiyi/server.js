const Koa = require('koa');
const body = require('koa-better-body');
const statics = require('koa-static');
const config = require('./config.js');
const routes = require('./routes')

const server = new Koa();
const path = require('path');
const fs = require("fs");
server.listen(config.PORT);
const staticPath = './static'
server.use(
    body({
        uploadDir: config.UPLOAD_DIR,
        keepExtensions: true
    })
);
server.use(statics(path.join(__dirname, staticPath)));
server.use(async(ctx, next) => {
    try {
        ctx.set("Access-Control-Allow-Origin", "*");
        await next();

        if (!ctx.body) {
            ctx.response.status = 404;
        }
    } catch (e) {
        ctx.response.status = 500;
    }
});

server.use(routes);

server.context.db = require("./libs/database");

server.context.MY_CONFIG = config;

server.context.deleteImg = config;

function deleteImg(imgName) {
    let filePath = path.join(__dirname, "./static/" + imgName);
    fs.unlink(filePath, err => {
        if (err) throw err;
    });
}