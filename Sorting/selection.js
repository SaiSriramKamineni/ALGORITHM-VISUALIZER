// ===== SELECTION SORT ALGORITHM =====

// Audio effects
var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

// Get the selection sort button
const SelectionSortButton = document.querySelector(".btn-algorithm[data-algorithm='selection']");

// Add event listener for selection sort
if (SelectionSortButton) {
    SelectionSortButton.addEventListener('click', async function () {
        selectText.innerHTML = `Selection Sort..`;
        mouseclick.play();
        
        // Show description section
        const description = document.querySelector('#documentation-section');
        if (description) {
            description.style.display = 'block';
        }
        
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        
        await SelectionSort();
        
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

// ===== SELECTION SORT IMPLEMENTATION =====
async function SelectionSort() {
    const element = document.querySelectorAll(".bar");
    
    for (let i = 0; i < element.length; i++) {
        let smallest_element_index = i;
        element[i].style.background = 'rgb(250, 5, 54)';
        
        for (let j = i + 1; j < element.length; j++) {
            element[j].style.background = 'rgb(245, 212, 24)';
            await waitforme(delay);
            
            if (parseInt(element[j].style.height) < parseInt(element[smallest_element_index].style.height)) {
                if (smallest_element_index !== i) {
                    element[smallest_element_index].style.background = 'cyan';
                }
                smallest_element_index = j;
            } else {
                element[j].style.background = 'cyan';
            }
        }
        
        beep.play();
        await waitforme(delay);
        swapping(element[smallest_element_index], element[i]);
        element[smallest_element_index].style.background = 'cyan';
        element[i].style.background = 'rgb(0, 255, 0)';
    }
    
    selectText.innerHTML = `Sorting Complete!`;
    done.play();
}

// ===== EXPOSE ALGORITHM FOR GLOBAL ACCESS =====
window.selectionSort = SelectionSort;