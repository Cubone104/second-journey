const express = require('express');
const app = express(); //expressをインスタンス化する
const taskRoute = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
require('dotenv').config();
app.use(express.json());

const PORT = 3000;

//ルーティング設計
app.use('/api/v1/tasks', taskRoute);
app.use(express.static('./public'));

//DBと接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);//envファイルに隠したものを引き出す process.env
        app.listen(process.env.PORT || PORT, console.log('サーバーが起動しました'));
    } catch (err) {
        console.log(err);
    }
};

start();

