const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// /api/v1/tasksからタスクを読み込む
const showTasks= async () => {
    try {
        //自作APIをたたく
        const { data: tasks } = await axios.get('/api/v1/tasks');
             // ↑tasksの中でもdataだけ出力している

        //タスクが一つもない時
            //console.log(tasks.length);
        if (tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
            return;
        };

        //タスクを出力
        const allTasks = tasks.map((task) => {
                            //  ↑map関数は一つずつ取り出すことができる
           const { completed, _id, name } = task;

           return `<div class="single-task ${completed && "task-completed"}">
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                    <!-- 編集リンク-->
                     <a href="./edit.html?id=${_id}" class="edit-link">
                        <i class="fas fa-edit"></i>
                     </a>
                     <!-- ゴミ箱リンク-->
                      <button type="button" class="delete-btn" data-id="${_id}">
                         <i class="fas fa-trash"></i>
                      </button>
                </div>
             </div>`;
        })
        .join(''); // カンマ（区切り）を取り除く関数
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();

// タスクを追加する
formDOM.addEventListener('submit', async (event) => {
    event.preventDefault(); //ページのリロードをしない
    const name = taskInputDOM.value;
    try {
        await axios.post('/api/v1/tasks', { name:name });
                                           //↑ models/Task.js内のname
        showTasks();
        taskInputDOM.value = ''; //追加ボタンを押した後、placeholder内の文字を空にする
        formAlertDOM.style.display = 'block';//出現させる
        formAlertDOM.textContent = 'タスクを追加しました。';
        formAlertDOM.classList.add('text-success')
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = 'タスクは20文字以内で入力してください。'
    }
    // 3秒後に消える
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success')
    }, 3000);
});


//タスクを削除する
tasksDOM.addEventListener('click', async (event) => {
    const element = event.target;
    // console.log(element.parentElement); //親要素の取得
    if(element.parentElement.classList.contains('delete-btn')){
                                //↑ classにdelete-btnが含まれているならば
        const id = element.parentElement.dataset.id;
        // console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});

