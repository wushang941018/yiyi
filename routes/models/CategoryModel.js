class CategoryModel {
    static async search({ db }) {
        let data = await db.query(`SELECT * FROM category_table`);
        return data;
    }

    static async addOne({ db }, name) {
        let data = await db.query(`INSERT INTO category_table(name) VALUE(?)`, name);
        return data;
    }
    static async addTwo({ db }, { id, children }) {
        debugger;
        children = children.map(item => {
            return `(${id}, "${item.name}", "${item.src}")`;
        })
        let str = children.join(",");
        let data = await db.query(`INSERT INTO category_table(p_id, name, img_src) VALUE ${str}`);
        return data;
    }
    static async addOneAndTwo({ db }, { name, children}) {
        let res = await db.query(`INSERT INTO category_table( name) VALUE(?)`, name);
        let id = res.insertId;
        children = children.map(item => {
            return `(${id}, "${item.name}", "${item.src}")`;
        })
        let str = children.join(",");
        let data = await db.query(`INSERT INTO category_table( p_id, name, img_src) VALUE ${str}`);
        return data;
    }
}
module.exports = CategoryModel;
