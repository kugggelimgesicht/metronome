import Timer from "./timer.js";

const tempoDisplay = document.getElementById('tempo');
const tempoText = document.getElementById('tempo-text');
const decreaseTempoBtn = document.getElementById('dec-tempo');
const increaseTempoBtn = document.getElementById('inc-tempo');
const tempoSlider = document.getElementById('slider');
const startStopBtn = document.getElementById('start-stop');
const substractBeats = document.getElementById('substract-beats');
const addBeats = document.getElementById('add-beats');
const measureCount = document.getElementById('measure-count');

let bpm = 140;
let bpMeasure = 4;
let count = 0;
const stressedBeat = new Audio('./assets/click1.mp3');
const unstressedBeat = new Audio('./assets/click2.mp3');
let isRunning = false;
let tempoTextString = 'Nice and Steady';
let updateMetronome = () => {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    switch (true) {
        case (bpm <= 40): {
            tempoTextString = 'Super Slow';
        };
        break;
    case (bpm > 40 && bpm < 80): {
        tempoTextString = 'Slow';
    };
    break;
    case (bpm > 80 && bpm < 120): {
        tempoTextString = 'Getting there';
    };
    break;
    case (bpm > 120 && bpm < 180): {
        tempoTextString = 'Nice and Steady';
    };
    break;
    case (bpm > 180 && bpm < 220): {
        tempoTextString = 'Rock n Roll';
    };
    break;
    case (bpm > 220 && bpm < 240): {
        tempoTextString = 'Funky Stuff';
    };
    break;
    case (bpm > 240 && bpm < 260): {
        tempoTextString = 'Relax, dude';
    };
    break;
    case (bpm > 260 && bpm <= 280): {
        tempoTextString = 'Eddie Van Halen';
    };
    break;
    }
    tempoText.textContent = tempoTextString;
}


const validateValue = () => {
    if (bpm > 280) {
        bpm = 280;
        updateMetronome();
    }
    if (bpm < 20) {
        bpm = 20;
        updateMetronome();

    } else {
        updateMetronome();
    }

}

function playClick() {
    if (count === bpMeasure) {
        count = 0;
    }
    if (count === 0) {
        stressedBeat.play();
        stressedBeat.currentTime = 0;
    } else {
        unstressedBeat.play();
        unstressedBeat.currentTime = 0;
    }
    count++
}
const metronome = new Timer(playClick, 60000 / bpm, {
    immediate: true
})
decreaseTempoBtn.addEventListener('click', () => {
    bpm--;
    validateValue();
});

increaseTempoBtn.addEventListener('click', () => {
    bpm++;
    validateValue();
});
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateMetronome();
});

substractBeats.addEventListener('click', () => {
    if (bpMeasure < 3) {
        return;
    }

    bpMeasure--;

    measureCount.textContent = bpMeasure;
    count = 0;



});
addBeats.addEventListener('click', () => {

    if (bpMeasure > 11) {
        return;
    }
    bpMeasure++;
    measureCount.textContent = bpMeasure;
    count = 0;

});
startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
})