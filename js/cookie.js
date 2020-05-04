let modes = document.querySelectorAll('.panel i');
let bodyTimer = document.querySelector('#timer');

checkMode();

function setMode(evt) {
    modes.forEach((i) => {
        if(evt.target == i) {
            evt.target.classList.add('mode--active');
        } else {
            i.classList.remove('mode--active');
        }

        if(i.classList.contains('mode--active')) {
            document.cookie = 'mode='+i.dataset.mode;
        }
    });
}

function getMode(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkMode() {
    mode = getMode('mode');
    if(mode != undefined) {
        modes.forEach((i) => {
            if(i.dataset.mode == mode) {
                i.classList.add('mode--active')
            }
            document.querySelector('.'+i.dataset.mode).classList.add('scr--disable');
            document.querySelector('.'+i.dataset.mode).classList.remove('scr--able');
        });

        if(mode == 'stopwatch') {
            bodyTimer.classList.add('stopwatch-mode');
        } else {
            bodyTimer.classList.remove('stopwatch-mode');
        }

        document.querySelector('.'+mode).classList.remove('scr--disable');
        document.querySelector('.'+mode).classList.add('scr--able');
    } else {
        modes[0].classList.add('mode--active');
    }
}