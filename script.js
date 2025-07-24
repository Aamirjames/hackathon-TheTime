let tasks = [];
let editTaskId = null;

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const deadlineInput = document.getElementById('deadline').value;

    if (!taskName || !deadlineInput) {
        alert("Please enter both task name and deadline.");
        return;
    }

    const deadline = new Date(deadlineInput).getTime();

    if (editTaskId !== null) {
        // Edit mode
        const task = tasks.find(t => t.id === editTaskId);
        if (task) {
            task.name = taskName;
            task.deadline = deadline;
            if (task.interval) clearInterval(task.interval);
        }
        editTaskId = null;
    } else {
        // Add mode
        const task = {
            name: taskName,
            deadline: deadline,
            id: Date.now() + Math.random(),
        };
        tasks.push(task);
    }
    renderTasks();
    document.getElementById('taskName').value = '';
    document.getElementById('deadline').value = '';
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '';
    tasks.forEach((task, idx) => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'taskDisplay';
        taskDiv.id = 'task-' + task.id;

        // Numbering
        let number = document.createElement('span');
        number.setAttribute('role', 'number');
        number.style.fontWeight = 'bold';
        number.textContent = (idx + 1) + '. ';
        taskDiv.appendChild(number);

        // Task info
        let info = document.createElement('span');
        info.id = 'info-' + task.id;
        info.className = 'task-info';
        taskDiv.appendChild(info);

        // Controls with icons
        let controls = document.createElement('div');
        controls.className = 'task-controls';
        controls.innerHTML = `
            <button class="icon-btn edit" title="Edit Task" onclick="editTask(${task.id})">✏️</button>
            <button class="icon-btn remove" title="Remove Task" onclick="removeTask(${task.id})">🗑️</button>
        `;
        taskDiv.appendChild(controls);

        container.appendChild(taskDiv);
        startCountdown(task, info);
    });
}

function startCountdown(task, element) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = task.deadline - now;
        if (timeLeft <= 0) {
            element.innerHTML = `✅ <span style="color: red;">${task.name}</span> is Due Now!`;
            clearInterval(task.interval);
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            element.innerHTML = `📝 <strong>${task.name}</strong><br>⏳ Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    updateCountdown();
    if (task.interval) clearInterval(task.interval);
    task.interval = setInterval(updateCountdown, 1000);
}

function removeTask(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
        if (tasks[idx].interval) clearInterval(tasks[idx].interval);
        tasks.splice(idx, 1);
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('taskName').value = task.name;
        document.getElementById('deadline').value = new Date(task.deadline).toISOString().slice(0,16);
        editTaskId = id;
    }
}
