// ===== LINEAR SEARCH ALGORITHM =====

// Audio effects
var findingAudio = new Audio('Finding.mp3');
var findedAudio = new Audio('Finded.mp3');
var mouseclick = new Audio('Mouseclick.mp3');

// Get the linear search button
const linearSearchBtn = document.querySelector('#linear_Search');

// Add event listener for linear search
if (linearSearchBtn) {
    linearSearchBtn.addEventListener('click', async () => {
        console.log('Linear Search');
        mouseclick.play();
        
        // Show description section
        const description = document.querySelector('#documentation-section');
        if (description) {
            description.style.display = 'block';
        }
        
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        
        const array1 = document.querySelectorAll('.bars');
        let Array = [];
        array1.forEach((element) => {
            Array.push(element);
        });
        
        const val = document.querySelector('#searchingVal').value;
        if (val != '') {
            searchText.innerHTML = `Linear Searching..`;
            
            var ind = await linearSearch(Array, Array.length, parseInt(val));
            
            const index = document.querySelector('#element-index');
            if (index) {
                if (ind != -1) {
                    searchText.innerHTML = `Searching Complete`;
                    index.innerHTML = `${val} is present at index no. ${ind}`;
                } else {
                    searchText.innerHTML = `Not Found!!`;
                    index.innerHTML = `${val} is not present in the Array!!`;
                    findingAudio.pause();
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

// ===== LINEAR SEARCH IMPLEMENTATION =====
async function linearSearch(array, n, val) {
    var count = 0;
    
    for (let i = 0; i < n; i++) {
        await waitcount(delay);
        
        if (array[i].innerHTML == val) {
            count++;
            findingAudio.pause();
            findedAudio.play();
            array[i].style.background = 'green';
            array[i].style.color = '#fcfcfc';
            
            // Update step count
            const step = document.querySelector('#step-count');
            if (step) step.innerHTML = `${count}`;
            
            return i;
        }
        
        findingAudio.play();
        array[i].style.background = 'red';
        array[i].style.color = 'white';
        count++;
    }
    
    return -1;
}

// ===== EXPOSE ALGORITHM FOR GLOBAL ACCESS =====
window.linearSearch = linearSearch;