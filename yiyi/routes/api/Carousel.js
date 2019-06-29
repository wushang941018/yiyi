const CarouselModel = require('../models/CarouselModel');
const fs = require('fs');
class Carousel {
    /**
     * 获取首页轮播图
     * @param ctx id         轮播图类型 1、首页轮播 2、首页类目轮播
     *
     * @returns  成功返回轮播数据，失败返回错误信息
     */

    static async search(ctx) {
            let { id } = ctx.params;
            try {
                let data = await CarouselModel.search(ctx, id);
                data.forEach(item => {
                    item.img_src = ctx.MY_CONFIG.OUTER_NET_IP + item.img_src;
                });
                ctx.body = {
                    message: "success",
                    payLoad: {
                        data: data
                    }
                };
            } catch (e) {
                ctx.body = {
                    message: "error",
                    errorMsg: e.message,
                    payLoad: {
                        data: []
                    }
                };
            }
        }
        /**
         * 添加首页轮播图
         * @param ctx id         轮播图类型 1、首页轮播 2、首页类目轮播
         * @param ctx file       图片文件
         * @returns  成功返回添加成功信息，失败返回错误信息
         */
    static async add(ctx) {
        let { id } = ctx.params;
        let { file, name } = ctx.request.fields;
        let params = {
            type: id,
            src: file,
            name
        };
        try {
            let data = await CarouselModel.add(ctx, params);
            ctx.body = {
                message: "success",
                payLoad: data
            };
        } catch (e) {
            ctx.body = {
                message: "error",
                errorMsg: e.message
            };
        }
    }
    static async delete(ctx) {
        let { id } = ctx.params;
        try {
            let src = await CarouselModel.delete(ctx, id);
            ctx.deleteImg(src);
            ctx.body = {
                message: "success",
                payLoad: "删除成功"
            };
        } catch (e) {
            ctx.body = {
                message: "error",
                errorMsg: e.message
            };
        }
    }
}
module.exports = Carousel;