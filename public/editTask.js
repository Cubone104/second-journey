const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const editFormDOM = document.querySelector('.single-task-form');
const formAlertDOM = document.querySelector('.form-alert');
const taskCompletedDOM = document.querySelector('.task-edit-completed');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

console.log(id);
//一つのタスクを取得する
const showTask = async () => {
    try {
        const { data:task } = await axios.get(`/api/v1/tasks/${id}`)
        const {_id, completed, name} = task;
        taskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        // 完了チェックボックスにチェックが入ったままにする
        if (completed) {
            taskCompletedDOM.checked = true;
        }
    }catch {
        console.log(err);
    }
};

showTask();


// タスクを編集する
editFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
        try {
            const taskName = taskNameDOM.value //タスクの名前を取得
            taskCompleted = taskCompletedDOM.checked; //チェックボックスがtrue/falseを取得する
            const {data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
                name: taskName,
                completed: taskCompleted, //true/falseを切り変える
            });
            formAlertDOM.style.display = 'block';
            formAlertDOM.textContent = '編集に成功しました。';
            formAlertDOM.classList.add('text-success');
            setTimeout(() => {
                formAlertDOM.style.display = 'none';
                formAlertDOM.classList.remove('text-success');
            }, 3000);
        } catch (err) {
            console.log(err);
        }
});