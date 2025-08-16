// ===== BUBBLE SORT ALGORITHM =====

// Audio effects
var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

// Get the bubble sort button
const BubbleSortButton = document.querySelector(".btn-algorithm[data-algorithm='bubble']");

// Add event listener for bubble sort
if (BubbleSortButton) {
    BubbleSortButton.addEventListener('click', async function () {
        mouseclick.play();
        selectText.innerHTML = `Bubble Sort..`;
        
        // Show description section
        const description = document.querySelector('#documentation-section');
        if (description) {
            description.style.display = 'block';
        }
        
        console.log('Bubble sort');
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        
        await BubbleSort();
        
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

// ===== BUBBLE SORT IMPLEMENTATION =====
async function BubbleSort() {
    const element = document.querySelectorAll('.bar');
    
    for (let i = 0; i < element.length - 1; i++) {
        for (let j = 0; j < element.length - i - 1; j++) {
            element[j].style.background = 'rgb(250, 5, 54)';
            element[j + 1].style.background = 'rgb(250, 5, 54)';
            
            if (parseInt(element[j].style.height) > parseInt(element[j + 1].style.height)) {
                await waitforme(delay);
                swapping(element[j], element[j + 1]);
                beep.play();
            }
            
            element[j].style.background = 'rgb(245, 212, 24)';
            element[j + 1].style.background = 'rgb(245, 212, 24)';
        }
        
        element[element.length - 1 - i].style.background = 'rgb(0, 255, 0)';
    }
    
    element[0].style.background = 'rgb(0, 255, 0)';
    done.play();
    selectText.innerHTML = `Sorting Complete!`;
}

// ===== EXPOSE ALGORITHM FOR GLOBAL ACCESS =====
window.bubbleSort = BubbleSort; 