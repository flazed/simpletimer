let timerData;
let timerT;

start_btn[1].addEventListener('click', () => {
    start_btn[1].classList.toggle('active');
    if(start_btn[1].classList.contains('active')) {
        start_btn[1].querySelector('span').textContent = 'Stop';
        if(checkTimer()) {
            timerData = getMs();
            timerT = setInterval(setTimerT, 1000);
        } else {
            warnW.classList.add('warnW-active');
            warning.classList.add('warn-active');

            document.querySelector('.timer').classList.add('warning-container');
            
            htmlTimer.classList.add('warning-container');
            start_btn[1].dispatchEvent(clickEvent);
        }
    } else {
        start_btn[1].querySelector('span').textContent = 'Start';
        clearInterval(timerT);
    }
});

function setTimerT() {
    let data = getTimerT();

    if(data.tH < 10) {
        h.textContent = '0'+data.tH;
    } else {
        h.textContent = data.tH;
    }

    if(data.tM < 10) {
        m.textContent = '0'+data.tM;
    } else {
        m.textContent = data.tM;
    }

    if(data.tS < 10) {
        s.textContent = '0'+data.tS;
    } else {
        s.textContent = data.tS;
    }       
}

function getMs() {
    if(+h.textContent == 0 && +m.textContent == 0 && +s.textContent == 0) {
        let dateNow = new Date(),
            dateEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours()+getValues()[0], new Date().getMinutes()+getValues()[1], new Date().getSeconds()+getValues()[2]),
            ms = Math.abs(dateNow - dateEnd),
            sec = Math.abs(Math.floor(ms/1000%60)),
            min = Math.abs(Math.floor(ms/1000/60%60)),
            hour = Math.abs(Math.floor(ms/1000/60/60));
        
        return [
            hour,
            min,
            sec+1,
        ]
    } else {
        hour = +h.textContent;
        min = +m.textContent;
        sec = +s.textContent;

        return [
            hour,
            min,
            sec,
        ]
    }
}

function getTimerT() {
    if(timerData[0] == 0 && timerData[1] == 0 && timerData[2] == 0) {
        h.textContent = '00';
        start_btn[1].dispatchEvent(clickEvent);
    } else if(timerData[2]-1 == 0 && timerData[1] > 0) {
        timerData[2] = 60;
        if(timerData[1] -= 1 == 0 && timerData[0] > 0) {
            timerData[1] -= 1;
            timerData[2] -= 1;
        } else {
            timerData[1] -= 1;
        }
    } else {
        timerData[2] -= 1;
    }
    let tH = timerData[0],
        tM = timerData[1],
        tS = timerData[2];

    return {
        tH,
        tM,
        tS
    }
}

function checkTimer() {
    let date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), getValues()[0], getValues()[1], getValues()[2]);
    if(date != 'Invalid Date' && (getValues()[0] != 0 || getValues()[1] != 0 || getValues()[2] != 0)) {
        return true
    } else {
        return false
    }
}

function getValues() {
    return [+document.querySelector('#hT').value, +document.querySelector('#minT').value, +document.querySelector('#secT').value]
}