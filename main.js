document.addEventListener('DOMContentLoaded', () => {
    const add_task_button = document.getElementById('add_task_button');
    const task_input = document.getElementById('task_input');
    const todo_board = document.getElementById('todo_board');
    
    add_task_button.addEventListener('click', () => {
        const task_text = task_input.value;
        if (task_text) {
            addTask(task_text, todo_board);
            task_input.value = '';
        }
    });
    
    function addTask(task_text, board) {
        const task_id = `task-${Date.now()}`;
        const task = document.createElement('div');
        task.classList.add('task');
        task.setAttribute('draggable', true);
        task.setAttribute('id', task_id);
        task.innerHTML = `<div class="task-title">${task_text}</div>`;
        task.addEventListener('dragstart', handle_drag_start);
        task.addEventListener('dragend', handle_drag_end);
        board.appendChild(task);
    }
    
    function handle_drag_start(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.effectAllowed = 'move';
        event.target.classList.add('dragging');
    }
    
    function handle_drag_end(event) {
        event.target.classList.remove('dragging');
    }
    
    const boards = document.querySelectorAll('.board');
    
    boards.forEach(board => {
        board.addEventListener('dragover', handle_drag_over);
        board.addEventListener('drop', handle_drop);
    });
    
    function handle_drag_over(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }
    
    function handle_drop(event) {
        event.preventDefault();
        const task_id = event.dataTransfer.getData('text/plain');
        const task = document.getElementById(task_id);
        const board = event.target.closest('.board');
        
        if (board && task) {
            board.appendChild(task);
        }
    }
});
