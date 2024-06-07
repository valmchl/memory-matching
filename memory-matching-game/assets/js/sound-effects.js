function soundEffects() {
    
    // SFX Files
    const audioBuzzer = new Audio('./assets/audio/se_buzzer.mp3')
    const audioChord = new Audio('./assets/audio/se_chord.mp3');
    const audioClick = new Audio('./assets/audio/se_click.mp3');
    const audioPop = new Audio('./assets/audio/se_pop.mp3');
    const audioSwipe = new Audio('./assets/audio/se_swipe.mp3');
    const audioSwoop = new Audio('./assets/audio/se_swoop.mp3');
    const audioTwinkle = new Audio('./assets/audio/se_twinklesparkle.mp3');

    // Buzzer SFX (when time runs out)
    function buzzer() {
        audioBuzzer.play();
    }
    
    // Chord SFX (when player wins)
    function chord() {
        audioChord.load();
        audioChord.play();
    }

    // Click SFX (when clicking through levels)
    function click() {
        audioClick.load();
        audioClick.play();
    };

    // Pop SFX (when board resets)
    function pop() {
        audioPop.play();
    }

    // Swipe SFX (when player clicks card)
    function swipe() {
        audioSwipe.load();
        audioSwipe.play();
    }

    // Swoop SFX (when unmatched cards flip back over)
    function swoop() {
        audioSwoop.play();
    }

    // Twinkle SFX (when cards are matched)
    function twinkle() {
        audioTwinkle.load();
        audioTwinkle.play();
    }

    return {
        buzzer,
        chord,
        click,
        pop,
        swipe,
        swoop,
        twinkle
    };
}

export { soundEffects }