const bodyColor = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');


const changeColorBtn = {
    intervalId: null,
    start() {
            stopBtn.disabled = false;
            startBtn.disabled = true;
           
        const changeBodyColor = bodyColor.style.backgroundColor;
        
        this.intervalId = setInterval(() => {
            bodyColor.style.backgroundColor = `#${Math.floor(
              Math.random() * 16777215
            ).toString(16)}`;
        }, 1000);
    },
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        stopBtn.disabled = true;
        startBtn.disabled = false;
    },
};

startBtn.addEventListener('click', () => {
    changeColorBtn.start();
});
stopBtn.addEventListener('click', () => {
    changeColorBtn.stop();
});

