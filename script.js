// javascrip code for fucntionality
let timer;

function addTask() {
    clearInterval(timer); // Clear previous countdown
    const taskName = document.getElementById('taskName').value;
    const deadlineInput = document.getElementById('deadline').value;

    if (!taskName || !deadlineInput) {
        alert("Please enter both task name and deadline.");
        return;
    }

    const deadline = new Date(deadlineInput).getTime();
    const taskDisplay = document.getElementById('taskDisplay');

    timer = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = deadline - now;

        if (timeLeft <= 0) {
            clearInterval(timer);
            taskDisplay.innerHTML = `✅ <span style="color: red;">${taskName}</span> is Due Now!`;
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            taskDisplay.innerHTML = `
        📝 <strong>${taskName}</strong><br>
        ⏳ Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s
      `;
        }
    }, 1000);
}
