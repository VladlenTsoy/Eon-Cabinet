const TaskSound = require('assets/sounds/anzan.ogg');

const taskSound = new Audio(TaskSound);

/**
 *
 * @param output
 * @param setting
 */
export const playingSound = (output: any, setting: any) => {
    if (output) {
        if (setting.sound === 'basic') {
            taskSound.currentTime = 0;
            taskSound.playbackRate = 1;
            taskSound.play();
        } else if (setting.sound === 'en' || setting.sound === 'ru') {
            let msg = new SpeechSynthesisUtterance(output);

            if (window.speechSynthesis.getVoices().length !== 0) {
                if (window.speechSynthesis.getVoices()[0].name.includes('Microsoft')) {
                    let speed = parseInt(setting.length) === 3 ? 8 : 4;
                    msg.rate = setting.time <= 1 ? speed / setting.time : 3;
                    // msg.rate = parseInt(setting.length) === 3 ? 8 / setting.time : setting.time < 1 ? 4 / setting.time : 3;
                } else {
                    let speed = parseInt(setting.length) === 3 ? 3.5 : 2.5;
                    msg.rate = setting.time <= 1 ? speed / setting.time : 1.5;
                }

                msg.lang = setting.sound === 'en' ? 'en-US' : 'ru-RU';
                window.speechSynthesis.speak(msg);
                const timeout = setTimeout(() => window.speechSynthesis.cancel(), setting.time * 850);

                return () => {
                    clearTimeout(timeout);
                }
            }
        }
    }
};