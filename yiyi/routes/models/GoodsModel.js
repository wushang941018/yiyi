class Goods {
    static async search({ db }, id) {
        let data = await db.query(`
        SELECT list.id, list.desc, info.id AS c_id, info.img_src, info.case_desc, info.type 
        FROM goods_list_table list INNER JOIN goods_info_table info ON list.id = info.p_id AND list.p_id = ?;`, id);
        return data;
    }
    static async add({ db }, { id, desc, infoList }) {
        let res = await db.query(
            `INSERT INTO goods_list_table(\`desc\`, p_id) VALUES(?, ?);`,
            [desc, id]
        );
        let p_id = res.insertId;
        let list = infoList.map(({ type, src, desc }) => {
            return `(${type}, '${src instanceof Array ? JSON.stringify(src) : src}', "${
                desc ? desc : ""
            }", ${p_id})`;
        });
        let data = await db.query(
            `INSERT INTO goods_info_table(type, img_src, case_desc, p_id) VALUES ${list.join(
                ","
            )};`
        );
        return data;
    }
    static async delete(ctx, id) {
        let res = await ctx.db.query(
            `SELECT * FROM goods_list_table WHERE id = ? AND is_delete = 0;`,
            id
        );
        if (!res.length) {
            throw Error("该数据不存在");
            return "该数据不存在";
        }
        let srcList = await ctx.db.query(
            `SELECT img_src FROM goods_info_table WHERE p_id = ?;`,
            id
        );
        await ctx.db.query(`DELETE FROM goods_info_table WHERE p_id = ?;`, id);
        await ctx.db.query(`DELETE FROM goods_list_table WHERE id = ?;`, id);
        return srcList;
    }
}
module.exports = Goods;