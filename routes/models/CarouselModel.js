class CarouselModel {
    static async search(ctx, id) {
        let data = await ctx.db.query(`SELECT * FROM carousel_table WHERE type = ? AND is_delete = 0;`, id);
        return data;
    }

    static async add(ctx, {name, src, type}) {
        let data = await ctx.db.query(`INSERT INTO carousel_table(name, img_src, type) VALUE(?,?,?);`, [name, src, type ]);
        return data;
    }

    static async delete(ctx, id) {
        let res = await ctx.db.query(`SELECT * FROM carousel_table WHERE id = ? AND is_delete = 0;`, id);;
        if (!res.length) {
            throw Error("该数据不存在");
            return "该数据不存在";
        }
        let data = await ctx.db.query(`DELETE FROM carousel_table WHERE id = ?;`, [id]);
        return res[0].img_src;
    }
}

module.exports = CarouselModel;