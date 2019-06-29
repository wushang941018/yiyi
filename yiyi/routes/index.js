const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const router = new Router();

const Carousel = require('./api/Carousel');
const Company = require('./api/Company');
const Category = require('./api/Category');
const Goods = require("./api/Goods");

// 公司信息
router.get("/company/", Company.search);
router.put("/company/", Company.update);

// 首页轮播
router.get("/carousel/:id", Carousel.search);
router.post("/carousel/:id", Carousel.add);
router.delete("/carousel/:id", Carousel.delete);

// 类目
router.get("/category", Category.search);
router.post("/category", Category.add);

// 产品
router.get("/goods/:id", Goods.search);
router.post("/goods", Goods.add);
router.delete("/goods/:id", Goods.delete);

//上传文件获取路径
router.post("/upload", ctx => {
    let { file } = ctx.request.fields;
    let src = file[0].path.replace(/\\/g, '/');
    src = src.substr(src.indexOf('/upload/'))
    ctx.body = {
        message: "success",
        payLoad: src
    }
});

module.exports = router.routes();