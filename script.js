let tasks = [];

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const deadlineInput = document.getElementById('deadline').value;

    if (!taskName || !deadlineInput) {
        alert("Please enter both task name and deadline.");
        return;
    }

    const deadline = new Date(deadlineInput).getTime();
    const task = {
        name: taskName,
        deadline: deadline,
        id: Date.now() + Math.random(),
    };
    tasks.push(task);
    renderTasks();
    document.getElementById('taskName').value = '';
    document.getElementById('deadline').value = '';
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '';
    tasks.forEach(task => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'taskDisplay';
        taskDiv.id = 'task-' + task.id;
        container.appendChild(taskDiv);
        startCountdown(task, taskDiv);
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
    task.interval = setInterval(updateCountdown, 1000);
}
