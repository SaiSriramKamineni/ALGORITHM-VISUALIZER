/**
 * Searching Algorithm Visualizer - Core Functionality
 * Modern ES6+ implementation with improved error handling and performance
 */

// ===== CONSTANTS & CONFIGURATION =====
const CONFIG = {
    MIN_ARRAY_SIZE: 4,
    MAX_ARRAY_SIZE: 100,
    MIN_VALUE: 20,
    MAX_VALUE: 350,
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
    searchInput: document.querySelector('#searchingVal'),
    linearSearchBtn: document.querySelector('#linear_Search'),
    binarySearchBtn: document.querySelector('#binary_Search'),
    elementIndex: document.querySelector('#element-index'),
    stepCount: document.querySelector('#step-count')
};

// ===== STATE MANAGEMENT =====
let state = {
    array: [],
    arraySize: CONFIG.DEFAULT_SIZE,
    delay: CONFIG.BASE_DELAY - (CONFIG.DEFAULT_SPEED * CONFIG.SPEED_MULTIPLIER),
    isRunning: false,
    currentAlgorithm: null,
    stepCounter: 0
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
        elements.linearSearchBtn.disabled = isRunning;
        elements.binarySearchBtn.disabled = isRunning;
        elements.searchInput.disabled = isRunning;
        elements.generateBtn.disabled = isRunning;
        
        // Update visual feedback
        document.body.classList.toggle('search-running', isRunning);
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
    },
    
    /**
     * Validate search value
     */
    validateSearchValue: (value) => {
        const num = parseInt(value);
        return !isNaN(num) && num >= CONFIG.MIN_VALUE && num <= CONFIG.MAX_VALUE;
    },
    
    /**
     * Reset step counter
     */
    resetStepCounter: () => {
        state.stepCounter = 0;
        elements.stepCount.textContent = '0';
        elements.elementIndex.textContent = '-';
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
            bar.className = 'bars';
            bar.style.height = `${value}px`;
            bar.style.width = `${96 / array.length}vw`;
            bar.textContent = value;
            bar.setAttribute('data-index', index);
            bar.setAttribute('data-value', value);
            
            elements.mainBody.appendChild(bar);
        });
    },
    
    /**
     * Sort array for binary search (required for binary search to work)
     */
    sortArray: (array) => {
        return [...array].sort((a, b) => a - b);
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
     * Highlight element being examined
     */
    highlightElement: (index, color = 'rgb(250, 5, 54)') => {
        const bars = elements.mainBody.querySelectorAll('.bars');
        if (bars[index]) {
            bars[index].style.background = color;
        }
    },
    
    /**
     * Mark element as found
     */
    markFound: (index) => {
        const bars = elements.mainBody.querySelectorAll('.bars');
        if (bars[index]) {
            bars[index].style.background = 'rgb(0, 255, 0)';
            bars[index].style.color = '#ffffff';
        }
    },
    
    /**
     * Mark element as examined but not found
     */
    markExamined: (index) => {
        const bars = elements.mainBody.querySelectorAll('.bars');
        if (bars[index]) {
            bars[index].style.background = 'rgb(255, 0, 0)';
            bars[index].style.color = '#ffffff';
        }
    },
    
    /**
     * Reset all element colors
     */
    resetColors: () => {
        const bars = elements.mainBody.querySelectorAll('.bars');
        bars.forEach(bar => {
            bar.style.background = 'rgb(245, 212, 24)';
            bar.style.color = '#000000';
        });
    },
    
    /**
     * Update step counter
     */
    updateStepCounter: () => {
        state.stepCounter++;
        elements.stepCount.textContent = state.stepCounter;
    }
};

// ===== SEARCH ALGORITHMS =====
const searchAlgorithms = {
    /**
     * Linear Search Algorithm
     */
    linearSearch: async (array, searchValue) => {
        utils.resetStepCounter();
        
        for (let i = 0; i < array.length; i++) {
            // Highlight current element
            animationSystem.highlightElement(i);
            animationSystem.updateStepCounter();
            
            await animationSystem.wait(state.delay);
            
            if (array[i] === searchValue) {
                // Element found
                animationSystem.markFound(i);
                elements.elementIndex.textContent = `Index ${i}`;
                return i;
            } else {
                // Element not found at this position
                animationSystem.markExamined(i);
            }
        }
        
        // Element not found
        elements.elementIndex.textContent = 'Not found';
        return -1;
    },
    
    /**
     * Binary Search Algorithm
     */
    binarySearch: async (array, searchValue) => {
        utils.resetStepCounter();
        
        // Binary search requires sorted array
        const sortedArray = arrayManager.sortArray(array);
        arrayManager.createVisualArray(sortedArray);
        
        let left = 0;
        let right = sortedArray.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            // Highlight middle element
            animationSystem.highlightElement(mid);
            animationSystem.updateStepCounter();
            
            await animationSystem.wait(state.delay);
            
            if (sortedArray[mid] === searchValue) {
                // Element found
                animationSystem.markFound(mid);
                elements.elementIndex.textContent = `Index ${mid}`;
                return mid;
            } else if (sortedArray[mid] < searchValue) {
                // Search right half
                left = mid + 1;
                // Mark left half as examined
                for (let i = 0; i <= mid; i++) {
                    animationSystem.markExamined(i);
                }
            } else {
                // Search left half
                right = mid - 1;
                // Mark right half as examined
                for (let i = mid; i < sortedArray.length; i++) {
                    animationSystem.markExamined(i);
                }
            }
        }
        
        // Element not found
        elements.elementIndex.textContent = 'Not found';
        return -1;
    }
};

// ===== SEARCH RUNNER =====
const searchRunner = {
    /**
     * Run a search algorithm
     */
    run: async (algorithmName, searchValue) => {
        if (state.isRunning) {
            utils.showNotification('Search already running!', 'warning');
            return;
        }
        
        if (!utils.validateSearchValue(searchValue)) {
            utils.showNotification('Please enter a valid search value between 20-350', 'error');
            return;
        }
        
        try {
            utils.updateUI(true);
            state.currentAlgorithm = algorithmName;
            
            // Reset previous results
            utils.resetStepCounter();
            animationSystem.resetColors();
            
            // Run the selected algorithm
            let result;
            if (algorithmName === 'linear') {
                result = await searchAlgorithms.linearSearch(state.array, searchValue);
            } else if (algorithmName === 'binary') {
                result = await searchAlgorithms.binarySearch(state.array, searchValue);
            }
            
            // Show result notification
            if (result !== -1) {
                utils.showNotification(`Element found at index ${result}!`, 'success');
            } else {
                utils.showNotification('Element not found in array', 'info');
            }
            
        } catch (error) {
            console.error(`Error running ${algorithmName} search:`, error);
            utils.showNotification(`Error running ${algorithmName} search`, 'error');
        } finally {
            utils.updateUI(false);
            state.currentAlgorithm = null;
        }
    },
    
    /**
     * Stop current search
     */
    stop: () => {
        if (state.isRunning) {
            utils.updateUI(false);
            animationSystem.resetColors();
            utils.showNotification('Search stopped', 'info');
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
            utils.showNotification('Please wait for current search to finish', 'warning');
            return;
        }
        
        arrayManager.createNewArray(state.arraySize);
        utils.showNotification('New array generated!', 'info');
    },
    
    /**
     * Handle linear search button click
     */
    onLinearSearch: () => {
        const searchValue = parseInt(elements.searchInput.value);
        searchRunner.run('linear', searchValue);
    },
    
    /**
     * Handle binary search button click
     */
    onBinarySearch: () => {
        const searchValue = parseInt(elements.searchInput.value);
        searchRunner.run('binary', searchValue);
    },
    
    /**
     * Handle search input enter key
     */
    onSearchInputEnter: (event) => {
        if (event.key === 'Enter') {
            const searchValue = parseInt(elements.searchInput.value);
            if (utils.validateSearchValue(searchValue)) {
                // Auto-run linear search on Enter
                searchRunner.run('linear', searchValue);
            }
        }
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
        elements.linearSearchBtn.addEventListener('click', eventHandlers.onLinearSearch);
        elements.binarySearchBtn.addEventListener('click', eventHandlers.onBinarySearch);
        elements.searchInput.addEventListener('keypress', eventHandlers.onSearchInputEnter);
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isRunning) {
                searchRunner.stop();
            }
        });
        
        console.log('Searching Visualizer initialized successfully');
        
    } catch (error) {
        console.error('Error initializing Searching Visualizer:', error);
        utils.showNotification('Error initializing application', 'error');
    }
};

// ===== EXPORTS FOR ALGORITHM FILES =====
window.searchingUtils = {
    animationSystem,
    utils,
    state,
    arrayManager
};

// ===== LEGACY SUPPORT FUNCTIONS =====
// These functions are needed for the original algorithm files to work

// Legacy delay function - initialize after state is set
window.delay = CONFIG.BASE_DELAY - (CONFIG.DEFAULT_SPEED * CONFIG.SPEED_MULTIPLIER);

// Legacy waitcount function
window.waitcount = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Legacy disable/enable functions
window.disableSortingBtn = () => {
    elements.linearSearchBtn.disabled = true;
    elements.binarySearchBtn.disabled = true;
    elements.searchInput.disabled = true;
};

window.enableSortingBtn = () => {
    elements.linearSearchBtn.disabled = false;
    elements.binarySearchBtn.disabled = false;
    elements.searchInput.disabled = false;
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
window.searchText = document.querySelector('.selected') || { innerHTML: '' };

// ===== STARTUP =====
document.addEventListener('DOMContentLoaded', init);

// ===== PUBLIC API =====
window.SearchingVisualizer = {
    createNewArray: arrayManager.createNewArray,
    runSearch: searchRunner.run,
    stopSearch: searchRunner.stop,
    getState: () => ({ ...state }),
    getConfig: () => ({ ...CONFIG })
};






