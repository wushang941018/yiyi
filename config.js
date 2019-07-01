const path = require('path');
const DEV_CONFIG = {
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_USER: "root",
    DB_PASS: "123456",
    DB_NAME: "yiyi"
};
const PRO_CONFIG = {
    // 连接数据库信息
    DB_HOST: "172.17.0.9",
    DB_PORT: 3306,
    DB_USER: "yiyi",
    DB_PASS: "shenzhenyiyi",
    DB_NAME: "yiyi"
};

const OS = process.env.OS;

const IS_WINDOWS = OS && OS.toLowerCase().includes("windows");

const DB_CONFIG = IS_WINDOWS ? DEV_CONFIG : PRO_CONFIG;

module.exports = {
    ...DB_CONFIG,

    // 服务器监听端口
    PORT: 5666,

    TINIFY_KEY: "znXiiFlylfivtQ4fi5BDJi0Hl6ao2stX",

    OUTER_NET_IP: "http://118.25.122.145:5666",

    HTTP_ROOT: "http://localhost:5666",
    UPLOAD_DIR: path.resolve(__dirname, "./static/upload")
};