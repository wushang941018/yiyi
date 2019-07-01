const GoodsModel = require("../models/GoodsModel.js");
const _ = require("lodash");
const fs = require("fs");
class Goods {
    static async search(ctx) {
        let id = ctx.params.id;
        try {
            let data = await GoodsModel.search(ctx, id);
            let obj = _.groupBy(data, item => {
                return item.id;
            });
            let res = _.map(obj, item => {
                let [first] = item;
                let goodItem = {
                    id: first.id,
                    desc: first.desc
                };
                let fileList = [];
                let caseList = [];
                _.forEach(item, ({ c_id, img_src, case_desc, type }) => {
                    let info = {
                        id: c_id,
                        src: ctx.MY_CONFIG.OUTER_NET_IP + img_src
                    };
                    if (type === 2) {
                        info.desc = case_desc;
                        info.src = JSON.parse(img_src).map(src => ctx.MY_CONFIG.OUTER_NET_IP + src);
                    }
                    type === 1 ? fileList.push(info) : caseList.push(info);
                });
                goodItem.fileList = fileList;
                goodItem.caseList = caseList;
                return goodItem;
            });
            ctx.body = {
                message: "success",
                payLoad: {
                    data: res
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
    static async add(ctx) {
        let { id, desc, fileList, caseList } = ctx.request.fields;
        let errorList = [];
        if (!id) errorList.push("id");
        if (!desc) errorList.push("desc");
        if (!fileList) errorList.push("fileList");
        if (!caseList) errorList.push("caseList");
        if (errorList.length) {
            ctx.body = {
                message: "error",
                errorMsg: `param ${errorList.join(" and ")} is required`
            };
            return false;
        }
        let infoList = [];
        fileList.forEach(item => {
            item.type = 1;
            infoList.push(item);
        });
        caseList.forEach(item => {
            item.type = 2;
            infoList.push(item);
        });
        let params = {
            id,
            desc,
            infoList
        };
        try {
            let data = await GoodsModel.add(ctx, params);
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
            let srcList = await GoodsModel.delete(ctx, id);

            _.forEach(srcList, ({ img_src }) => {
                ctx.deleteImg(img_src);
            });
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
module.exports = Goods;