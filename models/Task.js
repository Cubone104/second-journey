const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String, //文字列
        required: [true, 'タスク名を入れてください。'],//必ず〜する
        trim: true, //空白削除
        maxlength: [20, 'タスク名は20文字以内で入力してください。']
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
