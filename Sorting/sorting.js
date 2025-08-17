/**
 * Sorting Algorithm Visualizer - Core Functionality
 * Modern ES6+ implementation with improved error handling and performance
 */

// ===== CONSTANTS & CONFIGURATION =====
const CONFIG = {
    MIN_ARRAY_SIZE: 4,
    MAX_ARRAY_SIZE: 100,
    MIN_VALUE: 20,
    MAX_VALUE: 370,
    DEFAULT_SIZE: 64,
    DEFAULT_SPEED: 5,
    SPEED_MULTIPLIER: 100,
    BASE_DELAY: 525
};

// ===== DOM ELEMENTS =====
const elements = {
    sizeSlider: document.querySelector('#size_slider'),
    sizeValue: document.querySelector('#size_value'),
    speedSlider: document.querySelector('#speed_slider'),
    speedValue: document.querySelector('#speed_value'),
    generateBtn: document.querySelector('#generate'),
    mainBody: document.querySelector('#mainbody'),
    algorithmBtns: document.querySelectorAll('.btn-algorithm')
};

// ===== STATE MANAGEMENT =====
let state = {
    array: [],
    arraySize: CONFIG.DEFAULT_SIZE,
    delay: CONFIG.BASE_DELAY - (CONFIG.DEFAULT_SPEED * CONFIG.SPEED_MULTIPLIER),
    isRunning: false,
    currentAlgorithm: null
};

// ===== UTILITY FUNCTIONS =====
const utils = {
    /**
     * Generate a random integer between min and max (inclusive)
     */
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    /**
     * Sleep function for animation delays
     */
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    /**
     * Update UI state
     */
    updateUI: (isRunning) => {
        state.isRunning = isRunning;
        
        // Update button states
        elements.algorithmBtns.forEach(btn => {
            btn.disabled = isRunning;
            btn.classList.toggle('disabled', isRunning);
        });
        
        // Update slider states
        elements.sizeSlider.disabled = isRunning;
        elements.generateBtn.disabled = isRunning;
        
        // Update visual feedback
        document.body.classList.toggle('algorithm-running', isRunning);
    },
    
    /**
     * Show notification message
     */
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    /**
     * Validate array size
     */
    validateArraySize: (size) => {
        return Math.max(CONFIG.MIN_ARRAY_SIZE, Math.min(CONFIG.MAX_ARRAY_SIZE, size));
    }
};

// ===== ARRAY MANAGEMENT =====
const arrayManager = {
    /**
     * Generate a new random array
     */
    generateArray: (size) => {
        const validatedSize = utils.validateArraySize(size);
        const newArray = [];
        
        for (let i = 0; i < validatedSize; i++) {
            newArray.push(utils.randomInt(CONFIG.MIN_VALUE, CONFIG.MAX_VALUE));
        }
        
        return newArray;
    },
    
    /**
     * Create visual representation of array
     */
    createVisualArray: (array) => {
        // Clear existing array
        elements.mainBody.innerHTML = '';
        
        // Create bars for each element
        array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${value}px`;
            bar.style.width = `${96 / array.length}vw`;
            bar.textContent = value;
            bar.setAttribute('data-index', index);
            bar.setAttribute('data-value', value);
            bar.style.color = '#000000'; // Ensure text is visible
            
            elements.mainBody.appendChild(bar);
        });
    },
    
    /**
     * Update array visualization
     */
    updateVisualArray: (array) => {
        const bars = elements.mainBody.querySelectorAll('.bar');
        
        array.forEach((value, index) => {
            if (bars[index]) {
                bars[index].style.height = `${value}px`;
                bars[index].textContent = value;
                bars[index].setAttribute('data-value', value);
            }
        });
    },
    
    /**
     * Create new array (main function)
     */
    createNewArray: (size) => {
        state.arraySize = utils.validateArraySize(size);
        state.array = arrayManager.generateArray(state.arraySize);
        arrayManager.createVisualArray(state.array);
    }
};

// ===== ANIMATION SYSTEM =====
const animationSystem = {
    /**
     * Wait for specified delay (used in algorithms)
     */
    wait: async (delay) => {
        await utils.sleep(delay);
    },
    
    /**
     * Highlight elements during comparison
     */
    highlightElements: (indices, color = 'rgb(250, 5, 54)') => {
        const bars = elements.mainBody.querySelectorAll('.bar');
        indices.forEach(index => {
            if (bars[index]) {
                bars[index].style.background = color;
            }
        });
    },
    
    /**
     * Reset element colors
     */
    resetColors: () => {
        const bars = elements.mainBody.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.background = 'rgb(245, 212, 24)';
        });
    },
    
    /**
     * Mark element as sorted
     */
    markSorted: (index, color = 'rgb(0, 255, 0)') => {
        const bars = elements.mainBody.querySelectorAll('.bar');
        if (bars[index]) {
            bars[index].style.background = color;
        }
    },
    
    /**
     * Swap two elements visually and in array
     */
    swapElements: async (array, i, j) => {
        // Visual swap
        const bars = elements.mainBody.querySelectorAll('.bar');
        const tempHeight = bars[i].style.height;
        const tempText = bars[i].textContent;
        
        bars[i].style.height = bars[j].style.height;
        bars[i].textContent = bars[j].textContent;
        bars[j].style.height = tempHeight;
        bars[j].textContent = tempText;
        
        // Array swap
        [array[i], array[j]] = [array[j], array[i]];
        
        // Update data attributes
        bars[i].setAttribute('data-value', array[i]);
        bars[j].setAttribute('data-value', array[j]);
        
        // Wait for animation
        await animationSystem.wait(state.delay);
    }
};

// ===== ALGORITHM RUNNER =====
const algorithmRunner = {
    /**
     * Run a sorting algorithm
     */
    run: async (algorithmName, algorithmFunction) => {
        if (state.isRunning) {
            utils.showNotification('Algorithm already running!', 'warning');
            return;
        }
        
        try {
            utils.updateUI(true);
            state.currentAlgorithm = algorithmName;
            
            // Create a copy of the array to work with
            const workingArray = [...state.array];
            
            // Run the algorithm
            await algorithmFunction(workingArray);
            
            // Mark all elements as sorted
            const bars = elements.mainBody.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                animationSystem.markSorted(index);
            });
            
            utils.showNotification(`${algorithmName} completed successfully!`, 'success');
            
        } catch (error) {
            console.error(`Error running ${algorithmName}:`, error);
            utils.showNotification(`Error running ${algorithmName}`, 'error');
        } finally {
            utils.updateUI(false);
            state.currentAlgorithm = null;
        }
    },
    
    /**
     * Stop current algorithm
     */
    stop: () => {
        if (state.isRunning) {
            utils.updateUI(false);
            animationSystem.resetColors();
            utils.showNotification('Algorithm stopped', 'info');
        }
    }
};

// ===== EVENT HANDLERS =====
const eventHandlers = {
    /**
     * Handle array size change
     */
    onSizeChange: () => {
        const newSize = parseInt(elements.sizeSlider.value);
        state.arraySize = utils.validateArraySize(newSize);
        elements.sizeValue.textContent = state.arraySize;
        
        // Generate new array with new size
        arrayManager.createNewArray(state.arraySize);
    },
    
    /**
     * Handle speed change
     */
    onSpeedChange: () => {
        const newSpeed = parseInt(elements.speedSlider.value);
        state.delay = CONFIG.BASE_DELAY - (newSpeed * CONFIG.SPEED_MULTIPLIER);
        elements.speedValue.textContent = newSpeed;
    },
    
    /**
     * Handle generate new array
     */
    onGenerateNewArray: () => {
        if (state.isRunning) {
            utils.showNotification('Please wait for current algorithm to finish', 'warning');
            return;
        }
        
        arrayManager.createNewArray(state.arraySize);
        utils.showNotification('New array generated!', 'info');
    }
};

// ===== INITIALIZATION =====
const init = () => {
    try {
        // Set initial values
        elements.sizeSlider.value = state.arraySize;
        elements.speedSlider.value = CONFIG.DEFAULT_SPEED;
        elements.sizeValue.textContent = state.arraySize;
        elements.speedValue.textContent = CONFIG.DEFAULT_SPEED;
        
        // Generate initial array
        arrayManager.createNewArray(state.arraySize);
        
        // Add event listeners
        elements.sizeSlider.addEventListener('input', eventHandlers.onSizeChange);
        elements.speedSlider.addEventListener('input', eventHandlers.onSpeedChange);
        elements.generateBtn.addEventListener('click', eventHandlers.onGenerateNewArray);
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isRunning) {
                algorithmRunner.stop();
            }
        });
        
        console.log('Sorting Visualizer initialized successfully');
        
    } catch (error) {
        console.error('Error initializing Sorting Visualizer:', error);
        utils.showNotification('Error initializing application', 'error');
    }
};

// ===== EXPORTS FOR ALGORITHM FILES =====
window.sortingUtils = {
    animationSystem,
    utils,
    state
};

// ===== LEGACY SUPPORT FUNCTIONS =====
// These functions are needed for the original algorithm files to work

// Legacy delay function - initialize after state is set
window.delay = CONFIG.BASE_DELAY - (CONFIG.DEFAULT_SPEED * CONFIG.SPEED_MULTIPLIER);

// Legacy waitforme function
window.waitforme = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Legacy swapping function
window.swapping = (el1, el2) => {
    // Store temporary values
    const tempHeight = el1.style.height;
    const tempText = el1.textContent;
    const tempValue = el1.getAttribute('data-value');
    
    // Swap heights (visual representation)
    el1.style.height = el2.style.height;
    el1.textContent = el2.textContent;
    el1.setAttribute('data-value', el2.getAttribute('data-value'));
    
    el2.style.height = tempHeight;
    el2.textContent = tempText;
    el2.setAttribute('data-value', tempValue);
    
    // Ensure the text is visible and properly positioned
    el1.style.color = '#000000';
    el2.style.color = '#000000';
};

// Legacy disable/enable functions
window.disableSortingBtn = () => {
    elements.algorithmBtns.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });
};

window.enableSortingBtn = () => {
    elements.algorithmBtns.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('disabled');
    });
};

window.disableSizeSlider = () => {
    elements.sizeSlider.disabled = true;
};

window.enableSizeSlider = () => {
    elements.sizeSlider.disabled = false;
};

window.disableNewArrayBtn = () => {
    elements.generateBtn.disabled = true;
};

window.enableNewArrayBtn = () => {
    elements.generateBtn.disabled = false;
};

// Legacy selectText reference
window.selectText = document.querySelector('.selected') || { innerHTML: '' };

// ===== STARTUP =====
document.addEventListener('DOMContentLoaded', init);

// ===== PUBLIC API =====
window.SortingVisualizer = {
    createNewArray: arrayManager.createNewArray,
    runAlgorithm: algorithmRunner.run,
    stopAlgorithm: algorithmRunner.stop,
    getState: () => ({ ...state }),
    getConfig: () => ({ ...CONFIG })
};
