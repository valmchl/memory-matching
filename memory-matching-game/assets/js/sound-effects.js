function soundEffects() {
    const audioClick = new Audio('./assets/audio/se_click.mp3');
    const audioPop = new Audio('./assets/audio/se_pop.mp3');
    const audioSwipe = new Audio('./assets/audio/se_swipe.mp3');
    const audioSwoop = new Audio('./assets/audio/se_swoop.mp3');
    const audioTwinkle = new Audio('./assets/audio/se_twinkle.mp3');


    function click() {
        audioClick.play()
    };

    return {
        click
    };
}

export { soundEffects }