const CompanyModel = require('../models/CompamyModel');
class Company {
    static async search(ctx) {
        try {
            let data = await CompanyModel.search(ctx);
            data = data[0];
            let payLoad = {};
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    let value = data[key];
                    let newKey = key.replace(/\_(\w)/g, s => s.slice(1).toUpperCase());
                    payLoad[newKey] = value;
                }
            }

            ctx.body = {
                message: "success",
                payLoad: payLoad
            }
        } catch (e) {
            ctx.body = {
                message: "error",
                errorMsg: e.message,
                payLoad: {}
            };
        }
    }
    static async update(ctx) {
        let fields = ctx.request.fields;
        let params = [];
        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {
                let newKey = key.replace(/[A-Z]/g, s => '_' + s.toLowerCase());
                params.push(`${newKey} = \"${fields[key]}\"`);
            }
        }
        try {
            let data = await CompanyModel.update(ctx, params);
            ctx.body = {
                message: "success",
                payLoad: data
            };
        } catch (e) {
            console.log(e);
            ctx.body = {
                message: "error",
                errorMsg: e.message,
                payLoad: {}
            };
        }
    }
}
module.exports = Company;
