document.querySelector('#dark-mode-toggle').addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('darkmode', isDarkMode);

    //updating mobile bar status

    document.querySelector('meta[name="theme-color"').setAttribute('content', isDarkMode ? '#1a1a2e' : '#FFF');
})

//intial values

//screens
const start_screen = document.querySelector('#start-screen');
const game_screen  = document.querySelector('#game-screen');
const pause_screen = document.querySelector('#pause-screen');

//------//
const cells = document.querySelectorAll('.main-grid-cell');

const name_input = document.querySelector('#input-name');

const player_name = document.querySelector('#player-name');
const game_level  = document.querySelector('#game-level');
const game_time   = document.querySelector('#game-time');

let level_index = 0;
let level = CONSTANT.LEVEL[level_index];
let timer = null;
let seconds = 0;
let pause = false;

document.querySelector('#btn-continue').addEventListener('click', () => {
    if (name_input.value.trim().length > 0) {
        loadSudoku();
        startGame();
    } else {
        name_input.classList.add('input-err');
        setTimeout(() => {
            name_input.classList.remove('input-err');
            name_input.focus();
        }, 500);
    }
});

const getGameInfo = () => JSON.parse(localStorage.getItem('game'));

//adding spaces for each 9 cells of group of 3*3

const initGameGrid = () => {
    let index = 0;
    for(let i=0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        let row = Math.floor(i/CONSTANT.GRID_SIZE);
        let col = i% CONSTANT.GRID_SIZE;

        if(row === 2 || row === 5) cells[index].style.marginBottom = '10px';
        if(col === 2 || col === 5) cells[index].style.marginRight  = '10px';
        index++;
    }
}

const setPlayerName = (name) => localStorage.setItem('player_name', name);
const getPlayerName = () => localStorage.getItem('player_name');
const showTime = (seconds) => new Date(seconds* 1000).toISOString().substr(11,8);

const initSudoku = () => {
    //generating sudoku game
    
}

const startGame = () => {
    start_screen.classList.remove('active');
    game_screen.classList.add('active');

    //setting name to the game screen
    player_name.innerHTML = name_input.value.trim();
    setPlayerName(name_input.value.trim());

    //level display on game screen
    game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index];

    seconds = 0;
    //timer
    timer = setInterval(() => {
        if(!pause) {
            seconds = seconds + 1;
            game_time.innerHTML = showTime(seconds);
        }
    }, 1000);
}

const returnStartScreen = () => {
    clearInterval(timer);
    pause = false;
    seconds = 0;
    start_screen.classList.add('active');
    game_screen.classList.remove('active');
    pause_screen.classList.remove('active');
    game_time.innerHTML = "00:00:00";
}

// button events

document.querySelector('#btn-level').addEventListener('click', (e) => {
    level_index = level_index + 1 > CONSTANT.LEVEL.length - 1 ? 0 : level_index + 1;
    level = CONSTANT.LEVEL[level_index];
    e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index];
});

document.querySelector('#btn-play').addEventListener('click', () => {
    if (name_input.value.trim().length > 0) {
        startGame();
    } else {
        name_input.classList.add('input-err');
        setTimeout(() => {
            name_input.classList.remove('input-err');
            name_input.focus();
        }, 500);
    }
});

document.querySelector('#btn-pause').addEventListener('click', () => {
    pause_screen.classList.add('active');
    pause = true;
})

document.querySelector('#btn-resume').addEventListener('click', () => {
    pause_screen.classList.remove('active');
    pause = false;
})

document.querySelector('#btn-new-game').addEventListener('click', () => {
    returnStartScreen();
})

// ----------------- //

const init = () => {
    const darkmode = JSON.parse(localStorage.getItem('darkmode'));
    // console.log(darkmode);
    document.body.classList.add(darkmode ? "dark" : 'light');
    document.querySelector('meta[name="theme-color"').setAttribute('content', darkmode ? '#1a1a2e' : '#FFF');
    
    const game = getGameInfo();

    document.querySelector('#btn-continue').style.display = game ? 'grid' : 'none';

    initGameGrid();
    //setting player name if already exists

    if (getPlayerName())
    {
        name_input.value = getPlayerName();
    } else {
        name_input.focus();
    }

}

init();