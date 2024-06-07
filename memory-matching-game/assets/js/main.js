import { soundEffects } from "./sound-effects.js";
const { click } = soundEffects();

// Toggle Game Difficulty
window.onload = () => {
    const tab_switchers = document.querySelectorAll('[data-switcher]');

    // toggle game page when difficulty is clicked
    for (let i = 0; i < tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;

        // toggle text color for current difficulty level when clicked
        tab_switcher.addEventListener('click', () => {
            click();
            document.querySelector('.options .level.current-level').classList.remove('current-level');
            tab_switcher.parentNode.classList.add('current-level');

            SwitchPage(page_id);
        });
    }
}

// Toggle difficulty page
function SwitchPage(page_id) {
    // console.log(page_id);
    const current_page = document.querySelector('.game-container .memory-game.is-active');
    current_page.classList.remove('is-active');

    const next_page = document.querySelector(`.game-container .memory-game[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
}
