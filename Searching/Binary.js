// ===== BINARY SEARCH ALGORITHM =====

console.log('Binary Search Algorithm');

// Audio effects
var findingAudio = new Audio('Finding.mp3');
var findedAudio = new Audio('Finded.mp3');
var mouseclick = new Audio('Mouseclick.mp3');

// Get the binary search button
const binarySearchBtn = document.querySelector('#binary_Search');

// Add event listener for binary search
if (binarySearchBtn) {
    binarySearchBtn.addEventListener('click', async () => {
        console.log('Binary Search clicked');
        mouseclick.play();
        
        // Show description section
        const description = document.querySelector('#documentation-section');
        if (description) {
            description.style.display = 'block';
        }
        
        const array1 = document.querySelectorAll('.bars');
        let Array = [];
        array1.forEach((element) => {
            Array.push(element);
        });

        const val = document.querySelector('#searchingVal').value;
        if (val != '') {
            searchText.innerHTML = `Binary Searching..`;
            
            // Sort array for binary search
            await sorting(Array);
            await Arrange(Array);
            
            console.log(parseInt(val));

            disableSortingBtn();
            disableSizeSlider();
            disableNewArrayBtn();
            
            var ind = await binarySearch(Array, Array.length, parseInt(val));
            
            const index = document.querySelector('#element-index');
            if (index) {
                if (ind != -1) {
                    searchText.innerHTML = `Searching Complete`;
                    index.innerHTML = `${val} is present at index no. ${ind}`;
                } else {
                    searchText.innerHTML = `Not Found!!`;
                    index.innerHTML = `${val} is not present in the array!!`;
                }
            }
        } else {
            alert('Please put Searching Value first!!😕😕');
        }
        
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

// ===== BINARY SEARCH IMPLEMENTATION =====
async function binarySearch(array, n, val) {
    let count = 0;
    let low = 0, high = n - 1;
    
    while (low <= high) {
        await waitcount(delay);
        let mid = Math.floor((low + high) / 2);
        
        if (array[mid].innerHTML == val) {
            array[mid].style.background = 'green';
            array[mid].style.color = '#fcfcfc';
            findedAudio.play();
            findingAudio.pause();
            count++;
            
            // Update step count
            const step = document.querySelector('#step-count');
            if (step) step.innerHTML = `${count}`;
            
            return mid;
        }
        
        // If val is greater than array[mid], shrink the left part of the array
        if (val > array[mid].innerHTML) {
            array[mid].style.background = 'red';
            array[mid].style.color = 'white';
            findingAudio.play();
            count++;
            low = mid + 1;
        } else {
            high = mid - 1;
            array[mid].style.background = 'red';
            array[mid].style.color = 'white';
            count++;
            findingAudio.play();
        }
    }
    
    findingAudio.pause();
    return -1;
}

// ===== ARRAY SORTING FOR BINARY SEARCH =====
async function sorting(array) {
    array.sort((a, b) => {
        return a.innerHTML - b.innerHTML;
    });
    return array;
}

// ===== ARRAY REARRANGEMENT =====
async function Arrange(Array) {
    const body = document.querySelector('#mainbody');
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    for (let i = 0; i < Array.length; i++) {
        body.appendChild(Array[i]);
    }
}

// ===== EXPOSE ALGORITHM FOR GLOBAL ACCESS =====
window.binarySearch = binarySearch;