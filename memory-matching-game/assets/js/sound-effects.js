function soundEffects() {
    
    // SFX Files
    const audioClick = new Audio('./assets/audio/se_click.mp3');
    const audioPop = new Audio('./assets/audio/se_pop.mp3');
    const audioSwipe = new Audio('./assets/audio/se_swipe.mp3');
    const audioSwoop = new Audio('./assets/audio/se_swoop.mp3');
    const audioTwinkle = new Audio('./assets/audio/se_twinklesparkle.mp3');

    // Click SFX
    function click() {
        audioClick.load();
        audioClick.play();
    };

    // Pop SFX
    function pop() {
        audioPop.play();
    }

    // Swipe SFX
    function swipe() {
        audioSwipe.load();
        audioSwipe.play();
    }

    // Swoop SFX
    function swoop() {
        audioSwoop.play();
    }

    // Twinkle SFX
    function twinkle() {
        audioTwinkle.load();
        audioTwinkle.play();
    }

    return {
        click,
        pop,
        swipe,
        swoop,
        twinkle
    };
}

export { soundEffects }