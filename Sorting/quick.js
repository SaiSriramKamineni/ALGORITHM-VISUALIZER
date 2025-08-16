// ===== QUICK SORT ALGORITHM =====

// Audio effects
var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

// Get the quick sort button
const QuickSortButton = document.querySelector(".btn-algorithm[data-algorithm='quick']");

// Add event listener for quick sort
if (QuickSortButton) {
    QuickSortButton.addEventListener('click', async function () {
        selectText.innerHTML = `Quick Sort..`;
        mouseclick.play();
        
        // Show description section
        const description = document.querySelector('#documentation-section');
        if (description) {
            description.style.display = 'block';
        }
        
        let element = document.querySelectorAll('.bar');
        let low = 0;
        let high = element.length - 1;
        
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        
        await quickSort(element, low, high);
        selectText.innerHTML = `Sorting Complete!`;
        done.play();
        
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

// ===== QUICK SORT IMPLEMENTATION =====
async function partition(element, low, high) {
    beep.play();
    let i = low - 1;
    element[high].style.background = 'red';
    
    for (let j = low; j <= high - 1; j++) {
        beep.play();
        element[j].style.background = 'yellow';
        await waitforme(delay);

        if (parseInt(element[j].style.height) < parseInt(element[high].style.height)) {
            beep.play();
            i++;
            swapping(element[i], element[j]);

            element[i].style.background = 'orange';
            if (i != j) element[j].style.background = 'orange';

            await waitforme(delay);
        } else {
            beep.play();
            element[j].style.background = 'pink';
        }
    }
    
    i++;
    await waitforme(delay);
    swapping(element[i], element[high]);

    element[high].style.background = 'pink';
    element[i].style.background = 'green';
    element[i].style.color = 'white';

    await waitforme(delay);

    for (let k = 0; k < element.length; k++) {
        beep.play();
        if (element[k].style.background != 'green')
            element[k].style.background = 'cyan';
    }

    return i;
}

async function quickSort(element, low, high) {
    if (low < high) {
        beep.play();
        let pivot_index = await partition(element, low, high);
        await quickSort(element, low, pivot_index - 1);
        await quickSort(element, pivot_index + 1, high);
    } else {
        if (low >= 0 && high >= 0 && low < element.length && high < element.length) {
            beep.play();
            element[high].style.background = 'green';
            element[low].style.background = 'green';
            element[high].style.color = 'white';
            element[low].style.color = 'white';
        }
    }
}

// ===== EXPOSE ALGORITHM FOR GLOBAL ACCESS =====
window.quickSort = quickSort;