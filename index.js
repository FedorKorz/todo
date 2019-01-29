var id = 0;

function getElem(id) {
    return document.getElementById(`task_${id}`);
}

function q(node, elem) {
    return node.querySelector(elem);
}

function addTask(status, taskName, taskDescr) {
    let board = q(document, `${status} .board`);
    let task = document.createElement('div');
    
    task.setAttribute('id', `task_${ id }`);
    task.setAttribute('board', `${ status }`);

    task.innerHTML = `<div class="task">
                            <div class="task-name" contentEditable="true" data-text="Name of task">${ taskName || ''}</div>
                            <div class="task-description" contentEditable="true" data-text="Description">${ taskDescr || ''}</div>
                            <div class="task-options">
                                <span class="task-delete">Delete</span>
                                <span class="task-move">
                                <span>Move</span>
                            <ul class="task-move-drop" style="display: none;">
                                <li>to do</li>
                                <li>in-process</li>
                            </ul>
                            </span>
                            </div>
                        </div>`;

    board.appendChild(task.cloneNode(true)); 
    q(board, `#task_${id} .task-delete`).setAttribute("onclick", `removeTask(${ id })`);
    id++;
}

function removeTask(id) {
   getElem(id).remove();
}

function sortTasks(column) {
    let tasks = [];
    let taskElems = q(document, `${column} .board`); 
    let taskLenght = q(document, (`${column} .board`)).childElementCount; 
   
    for (let i = 0; i < taskLenght; i++) {
        let taskInfo = taskElems.children[i];
        tasks.push({
            id: taskInfo.getAttribute('id'),
            taskName: q(taskInfo, '.task-name').textContent,
            taskDescr: q(taskInfo, '.task-description').textContent,
        });
    }
 
    tasks.sort((a, b) => {
        if (a.taskName > b.taskName) { return 1 };
        if (a.taskName < b.taskName) { return -1 };
        return 0;
    });

   taskElems.innerHTML = '';

    for (let i = 0; i < taskLenght; i++) {
        addTask(column, tasks[i].taskName, tasks[i].taskDescr);
    }
   
}