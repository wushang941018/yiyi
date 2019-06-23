const path = require('path');
module.exports = {
    // 连接数据库信息
    DB_HOST: "172.17.0.9",
    DB_PORT: 3306,
    DB_USER: "yiyi",
    DB_PASS: "shenzhenyiyi",
    DB_NAME: "yiyi",

    // 服务器监听端口
    PORT: 5666,

    HTTP_ROOT: "http://localhost:5666",
    UPLOAD_DIR: path.resolve(__dirname, "./static/upload")
};