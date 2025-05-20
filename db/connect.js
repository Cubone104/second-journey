const mongoose = require('mongoose');

const connectDB = (url) => {
                // ↑ここで指定した引数はapp.jsのDBと接続connectDB()にあたる
    return mongoose
    .connect(url)
    .then(() => console.log('データベースと接続中・・・'))
    .catch((err) => console.log(err));
};

module.exports = connectDB;

