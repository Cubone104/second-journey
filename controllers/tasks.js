const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const allTask = await Task.find({});
        res.status(200).json(allTask);
    } catch (err) {
        res.status(500).json(err);
    };
};

const createTask = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    };
};

const getSingleTask = async (req, res) => {
       try {
        const singleTask = await Task.findOne({_id: req.params.id});//ランダムなidを取得するreq.params.id
        if(!singleTask) {
            return res.status(404).json(`_id:${req.params.id}は存在しません`);
        };
        res.status(200).json(singleTask);
    } catch (err) {
        res.status(500).json(err);
    };
};

const updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body,
            {
                new: true, //デフォルトはfalseになっている。変更後を表示させる
            }
        );//ランダムなidを取得するreq.params.id
        if(!updateTask) {
            return res.status(404).json(`_id:${req.params.id}は存在しません`);
        };
        res.status(200).json(updateTask);
    } catch (err) {
        res.status(500).json(err); 
    };
};

const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });//ランダムなidを取得するreq.params.id
        if(!deleteTask) {
            return res.status(404).json(`_id:${req.params.id}は存在しません`);
        };
        res.status(200).json(deleteTask);
    } catch (err) {
        res.status(500).json(err); 
    };  
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};
