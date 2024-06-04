// modals.js

// Initialize modals
function initModals() {
    // Modal variables
    const winModal = document.querySelector('#winModal');
    const winClose = document.querySelector('#winClose');
    const winRestart = document.querySelector('.win-restart');
    const timeUpModal = document.querySelector('#timeUpModal');
    const timeUpClose = document.querySelector('#timeUpClose');
    const timeUpRestart = document.querySelector('.timeup-restart');

    // Show time up modal
    function showTimeUpModal() {
        timeUpModal.style.display = 'block';
    }

    // Show win modal
    function showWinModal() {
        winModal.style.display = 'block';
    }

    // Close modals
    function closeModals() {
        timeUpModal.style.display = 'none';
        winModal.style.display = 'none';
        
        if(typeof restart === 'function') {
            restart();
        }
    }

    // Event listeners
    timeUpClose.addEventListener('click', closeModals);
    winClose.addEventListener('click', closeModals);

    timeUpRestart.addEventListener('click', () => {
        closeModals();
        if(typeof restart === 'function') {
            restart();
        }
    });

    winRestart.addEventListener('click', () => {
        closeModals();

        if(typeof restart === 'function') {
            restart();
        }
    });

    // Close modals if clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === timeUpModal) {
            closeModals();
        } else if (event.target === winModal) {
            closeModals();
        }
    });

    return {
        showTimeUpModal,
        showWinModal,
        closeModals
    };
}

export { initModals };