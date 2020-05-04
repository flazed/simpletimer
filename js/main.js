let h = document.querySelector('#timer-hours'),
    m = document.querySelector('#timer-minutes'),
    s = document.querySelector('#timer-seconds');

const htmlTimer = document.querySelector('#timer');

const dateTimer = document.querySelector('.date-timer');

const warning = document.querySelector('.warning');
const warnW = document.querySelector('.warn-window');

const start_btn = document.querySelectorAll('.start-btn');
const reset_btn = document.querySelectorAll('.reset-btn');

const clickEvent = new CustomEvent('click');

const fullSCR = document.querySelector('#fullSCR');

let timer;
let newTime;

// Date math
function getTimer() {
    let dateNow = new Date(),
        dateEnd = new Date(newTime[0], newTime[1], newTime[2], newTime[3], newTime[4], newTime[5]),
        ms = dateEnd - dateNow,
        sec = Math.floor(ms/1000%60),
        min = Math.floor(ms/1000/60%60),
        hour = Math.floor(ms/1000/60/60);
        // console.log(dateEnd);
    return {
        hour,
        min,
        sec
    }
}

// HTML timer display
function setTimer() {
    let timer = getTimer();
    
    if(timer.hour < 10) {
        h.textContent = '0' + timer.hour;
    } else {
        h.textContent = timer.hour;
    }

    if(timer.min < 10) {
        m.textContent = '0' + timer.min;
    } else {
        m.textContent = timer.min;
    }

    if(timer.sec < 10) {
        s.textContent = '0' + timer.sec;
    } else {
        s.textContent = timer.sec;
    }

    if(h.textContent == '00' & m.textContent == '00' & s.textContent == '00') {
        start_btn[0].dispatchEvent(clickEvent);
    }
}

// Build  data from inputs
function buildDate() {
    let yInput = +document.querySelector('#y').value,
        mInput = +document.querySelector('#m').value,
        dInput = +document.querySelector('#d').value,
        hInput = +document.querySelector('#h').value,
        minInput = +document.querySelector('#min').value;
    let values = !yInput & !mInput & !dInput & !hInput & !minInput;
    // console.log(!!values, !!hInput, !!yInput);

    if(!yInput || yInput < new Date().getFullYear()) {
        yInput = new Date().getFullYear();
    }

    if(!mInput) {
        mInput = new Date().getMonth();
    } else {
        mInput-=1;
    }
    
    if(values) {
        dInput = new Date().getDate()+1;
    } else if(!dInput) {
        dInput = new Date().getDate();
    }

    newTime = [
        yInput,
        mInput,
        dInput,
        hInput,
        minInput,
        0
    ]
}

// Check correct date
function check() {
    if(new Date(newTime[0], newTime[1], newTime[2], newTime[3], newTime[4], newTime[5]) > new Date()) {
        return true;
    } else {
        return false;
    }
}

// addEventListener's

    // Start/Stop timer
start_btn[0].addEventListener('click', () => {
    start_btn[0].classList.toggle('active');
    if(start_btn[0].classList.contains('active')) {
        start_btn[0].querySelector('span').textContent = 'Stop';
        buildDate();
        if(check()) {
            timer = setInterval(setTimer, 0);
        } else {
            warnW.classList.add('warnW-active');
            warning.classList.add('warn-active');

            dateTimer.classList.add('warning-container');
            
            htmlTimer.classList.add('warning-container');
            start_btn[0].dispatchEvent(clickEvent);
        }
    } else {
        start_btn[0].querySelector('span').textContent = 'Start';
        clearInterval(timer);
    }
});

    // Reset timer
reset_btn.forEach(element => {
    resetClick(element);
});

function resetClick(btn) {
    btn.addEventListener('click', () => {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(function(i) {
            i.value = "";
        })

        h.textContent = "00";
        m.textContent = "00"; 
        s.textContent = "00";

        start_btn.forEach( btn => {
            if(btn.classList.contains('active')) {
                btn.dispatchEvent(clickEvent);
            }
        });
    });
}

    // Remove warn window
warnW.addEventListener('click', () => {
    warnW.classList.remove('warnW-active');
    warning.classList.remove('warn-active');
    dateTimer.classList.remove('warning-container');
    document.querySelector('.timer').classList.remove('warning-container');
    htmlTimer.classList.remove('warning-container');
});

    // Fullscrean timer
fullSCR.addEventListener('click', () => {
    htmlTimer.classList.toggle('timer--full');
    modes.forEach((i) => {
        document.querySelector('.'+i.dataset.mode).classList.toggle('container--full');
    });
});

    // Modes
modes.forEach((i) => {
    i.addEventListener('click', (evt) => {
        setMode(evt);
        swapModeContainer(evt);
    });
});

function swapModeContainer(evt) {
    modes.forEach((i) => {
        document.querySelector('.'+i.dataset.mode).classList.add('scr--disable');
        document.querySelector('.'+i.dataset.mode).classList.remove('scr--able');
    });

    if(evt.target.dataset.mode == 'stopwatch') {
        htmlTimer.classList.add('stopwatch-mode');
    } else {
        htmlTimer.classList.remove('stopwatch-mode');
    }

    document.querySelector('.'+event.target.dataset.mode).classList.remove('scr--disable');
    document.querySelector('.'+event.target.dataset.mode).classList.add('scr--able');
}