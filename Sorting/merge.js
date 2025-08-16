// ===== MERGE SORT ALGORITHM =====
// Merged sort is basically based on DIVIDE AND CONQUER RULE
// First we have to divide the whole array into smaller parts.
// a. si --> mid and another one is b. mid+1 --> ei
// Then we have to follow this steps until we get a single elements
// then we have to sort that individual arrays
// then put it into an empty array which is a merged array and a sorted array too
// this is the conquer step and thus we can easily do the merge sort

// Audio effects
var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

// Get the merge sort button
const MergeSortButton = document.querySelector(".btn-algorithm[data-algorithm='merge']");

// Add event listener for merge sort
if (MergeSortButton) {
    MergeSortButton.addEventListener('click', async function () {
        selectText.innerHTML = `Merge Sort..`;
        mouseclick.play();
        
        // Show description section
        const description = document.querySelector('#documentation-section');
        if (description) {
            description.style.display = 'block';
        }
        
        let element = document.querySelectorAll('.bar');
        let si = 0;
        let ei = parseInt(element.length) - 1;
        
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();

        await MergeSort(element, si, ei);
        selectText.innerHTML = `Sorting Complete!`;
        done.play();
        
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

// ===== MERGE SORT IMPLEMENTATION =====
async function MergeSort(element, low, high) {
    if (low < high) {
        const mid = Math.floor((low + high) / 2);
        await MergeSort(element, low, mid);
        await MergeSort(element, mid + 1, high);
        await Merge(element, low, mid, high);
    }
}

async function Merge(element, low, mid, high) {
    const a1 = mid - low + 1;
    const a2 = high - mid;
    let left = new Array(a1);
    let right = new Array(a2);

    for (let i = 0; i < a1; i++) {
        await waitforme(delay);
        beep.play();
        element[low + i].style.background = 'red';
        left[i] = element[low + i].style.height;
    }

    for (let i = 0; i < a2; i++) {
        await waitforme(delay);
        beep.play();
        element[mid + 1 + i].style.background = 'yellow';
        right[i] = element[mid + 1 + i].style.height;
    }
    await waitforme(delay);

    let i = 0, j = 0, k = low;
    while (i < a1 && j < a2) {
        beep.play();
        await waitforme(delay);
        if (parseInt(left[i]) <= parseInt(right[j])) {
            if ((a1 + a2) === element.length) {
                element[k].style.background = 'rgb(0,255,0)';
            } else {
                element[k].style.background = 'lightgreen';
            }
            element[k].style.height = left[i];
            i++;
            k++;
        } else {
            if ((a1 + a2) === element.length) {
                element[k].style.background = 'rgb(0,255,0)';
            } else {
                element[k].style.background = 'lightgreen';
            }
            element[k].style.height = right[j];
            j++;
            k++;
        }
    }
    
    while (i < a1) {
        beep.play();
        await waitforme(delay);
        if ((a1 + a2) === element.length) {
            element[k].style.background = 'rgb(0,255,0)';
        } else {
            element[k].style.background = 'lightgreen';
        }
        element[k].style.height = left[i];
        i++;
        k++;
    }

    while (j < a2) {
        beep.play();
        await waitforme(delay);
        if ((a1 + a2) === element.length) {
            element[k].style.background = 'rgb(0,255,0)';
        } else {
            element[k].style.background = 'lightgreen';
        }
        element[k].style.height = right[j];
        j++;
        k++;
    }
}

// ===== EXPOSE ALGORITHM FOR GLOBAL ACCESS =====
window.mergeSort = MergeSort;

