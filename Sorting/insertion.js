// ===== INSERTION SORT ALGORITHM =====

// Audio effects
var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

// Get the insertion sort button
const InsertionSortButton = document.querySelector(".btn-algorithm[data-algorithm='insertion']");

// Add event listener for insertion sort
if (InsertionSortButton) {
    InsertionSortButton.addEventListener('click', async function () {
        selectText.innerHTML = `Insertion Sort..`;
        mouseclick.play();
        
        // Show description section
        const description = document.querySelector('#documentation-section');
        if (description) {
            description.style.display = 'block';
        }
        
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        
        await InsertionSort();
        
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

// ===== INSERTION SORT IMPLEMENTATION =====
async function InsertionSort() {
    const element = document.querySelectorAll('.bar');
    element[0].style.background = 'cyan';
    
    for (let i = 1; i < element.length; i++) {
        let j = i - 1;
        let p = element[i].style.height;
        element[i].style.background = 'rgb(250, 5, 54)';
        await waitforme(delay);

        while (j >= 0 && (parseInt(element[j].style.height) > parseInt(p))) {
            element[j].style.background = 'rgb(9, 102, 2)';
            element[j + 1].style.height = element[j].style.height;
            j--;
            beep.play();
            await waitforme(delay);

            for (let k = i; k >= 0; k--) {
                element[k].style.background = 'rgb(3, 252, 11)';
            }
        }
        
        element[j + 1].style.height = p;
        element[i].style.background = 'rgb(3, 252, 11)';
    }
    
    selectText.innerHTML = `Sorting Complete!`;
    done.play();
}

// ===== EXPOSE ALGORITHM FOR GLOBAL ACCESS =====
window.insertionSort = InsertionSort;
