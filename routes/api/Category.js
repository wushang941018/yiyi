let CategoryModel = require('../models/CategoryModel');
const fnNameObj = {
    1: "addOne",
    2: "addTwo",
    3: "addOneAndTwo"
};
class Category {
    static async search(ctx) {
        try {
            let data = await CategoryModel.search(ctx);
            let payLoad = [];
            let childrenList = [];
            data.forEach(item => {
                item.img_src = ctx.MY_CONFIG.OUTER_NET_IP + (item.img_src || "/upload/upload_6ee63c36e0aa099442a57e0b7e2dba38.jpg");
                if (item.p_id !== 0) return childrenList.push(item);
                item.children = [];
                payLoad.push(item);
            });

            childrenList.forEach(item => {
                let children = payLoad.filter(p_item => p_item.id === item.p_id)[0].children;
                children.push(item);
            });
            ctx.body = {
                message: "success",
                payLoad: {
                    data: payLoad
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
        let { type, name } = ctx.request.fields;
        let errorList = [];
        if (!type) errorList.push("type");
        if (type !== 2 && !name) errorList.push("name");
        if (errorList.length) {
            ctx.body = {
                message: "error",
                errorMsg: `param ${errorList.join(" and ")} is required`
            };
            return false;
        }
        let fnName = fnNameObj[type];
        await Category[fnName](ctx);
    }

    static async addOne(ctx) {
        let { name } = ctx.request.fields;
        try {
            let data = await CategoryModel.addOne(ctx, name);
            ctx.body = {
                message: 'success',
                payLoad: data
            }
        } catch (e) {
            ctx.body = {
                message: "error",
                errorMsg: e.message
            };
        }
    }

    static async addTwo(ctx) {debugger;
        let { id, children } = ctx.request.fields;
        let errorList = [];
        if (!id) errorList.push("id");
        if (!children) errorList.push("children");
        if (errorList.length) {
            ctx.body = {
                message: "error",
                payLoad: `param ${errorList.join(" and ")} is required when type = 3`
            };
            return false;
        }
        let params = { id, children };
        try {
            debugger;
            let data = await CategoryModel.addTwo(ctx, params);
            ctx.body = {
                message: 'success',
                payLoad: data
            }
        } catch (e) {
            ctx.body = {
                message: "error",
                errorMsg: e.message
            };
        }
    }

    static async addOneAndTwo(ctx) {
        let { name, children } = ctx.request.fields;
        let errorList = [];
        if (!name) errorList.push("name");
        if (!children) errorList.push("children");
        if (errorList.length) {
            ctx.body = {
                message: "error",
                payLoad: `param ${errorList.join(" and ")} is required when type = 2`
            };
            return false;
        }
        let params = { name, children }
        try {
            let data = await CategoryModel.addOneAndTwo(ctx, params);
            ctx.body = {
                message: 'success',
                payLoad: data
            }
        } catch (e) {
            ctx.body = {
                message: "error",
                errorMsg: e.message
            };
        }
    }
}

module.exports = Category;
