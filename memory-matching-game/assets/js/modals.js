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
    function closeModals(restartCallback) {
		timeUpModal.style.display = 'none';
		winModal.style.display = 'none';
        
		if (typeof restartCallback === 'function') {
			restartCallback();
		}
	}

    // Event listeners
	timeUpClose.addEventListener('click', () => closeModals(window.currentRestart));
	winClose.addEventListener('click', () => closeModals(window.currentRestart));

	timeUpRestart.addEventListener('click', () => {
		closeModals(window.currentRestart);
	});

	winRestart.addEventListener('click', () => {
		closeModals(window.currentRestart);
	});

	window.addEventListener('click', (event) => {
		if (event.target === timeUpModal || event.target === winModal) {
			closeModals(window.currentRestart);
		}
	});

    return {
        showTimeUpModal,
        showWinModal,
        closeModals
    };
}

export { initModals };