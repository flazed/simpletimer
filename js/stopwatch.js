start_btn[2].addEventListener('click', () => {
    start_btn[2].classList.toggle('active');
    if(start_btn[2].classList.contains('active')) {
        start_btn[2].querySelector('span').textContent = 'Stop';
        stopwatch = setInterval(setStopwatch, 10);
    } else {
        start_btn[2].querySelector('span').textContent = 'Start';
        clearInterval(stopwatch);
    }
});

function setStopwatch() {
    s.textContent = +s.textContent + 1;
    if(+s.textContent+10 >= 100) {
        s.textContent = '00';
        if(+m.textContent+1 < 10) {
            m.textContent = '0'+(+m.textContent+1);
        } else {
            if(+m.textContent+1 == 60) {
                m.textContent = '00';
                if(+h.textContent+1 < 10) {
                    h.textContent = '0'+(+h.textContent+1);
                } else {
                    h.textContent = +h.textContent+1;
                }
            } else {
                m.textContent = +m.textContent+1;
            }
        }
    }
}