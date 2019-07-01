class CompanyModel {
    static async search({ db }) {
        let data = await db.query('SELECT * FROM company_info_table;');
        return data;
    }
    static async update({ db }, params) {
        await db.query(`UPDATE company_info_table set ${params.join(",")};`);
        let data = await db.query("SELECT * FROM company_info_table;");
        return data[0];
    }
}
module.exports = CompanyModel;