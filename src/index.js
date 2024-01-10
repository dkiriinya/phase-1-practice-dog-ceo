// Function to handle the initialization and console styling
function initialize() {
    document.addEventListener('DOMContentLoaded', () => {
        // Log a styled message to the console when the DOM is fully loaded
        console.log('%c HI', 'color: firebrick');
        // Fetch and display random dog images
        fetchAndDisplayDogImages();
        // Fetch and display dog breeds with filtering
        fetchAndDisplayDogBreeds();
    });
}

// Function to fetch and display random dog images
function fetchAndDisplayDogImages() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            // Get the container to display dog images
            const dogImageContainer = document.getElementById('dog-image-container');
            // Iterate through each fetched dog image and create list items in HTML
            data.message.forEach(dogImage => {
                const dogImageList = createDogImageList(dogImage);
                dogImageContainer.appendChild(dogImageList);
            });
        })
        .catch(error => console.error('Error fetching dog images:', error));
}

// Function to create a list item for a dog image
function createDogImageList(imageUrl) {
    const dogImageList = document.createElement('li');
    // Create an image element with the provided URL and alt text
    dogImageList.innerHTML = `
        <img src="${imageUrl}" alt="${imageUrl}">
    `;
    return dogImageList;
}

// Function to fetch and display dog breeds with filtering
function fetchAndDisplayDogBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
        .then(response => response.json())
        .then(dogs => {
            // Get the container to display dog breeds and the dropdown for filtering
            const dogBreedContainer = document.getElementById('dog-breeds');
            const dropdown = document.getElementById('breed-dropdown');
            
            // Clear existing content in the dog breed container
            dogBreedContainer.innerHTML = '';

            // Iterate through each dog breed and create list items in HTML
            for (const dogBreed in dogs.message) {
                const dogBreedList = createDogBreedList(dogBreed);
                dogBreedContainer.appendChild(dogBreedList);
            }

            // Populate the dropdown with unique starting letters
            populateDropdown(dogs.message, dropdown);

            // Add event listeners to make dog breeds interactive
            addEventListenersToDogBreeds(dogBreedContainer, dropdown);
        })
        .catch(error => console.error('Error fetching dog breeds:', error));
}

// Function to create a list item for a dog breed
function createDogBreedList(breedName) {
    const dogBreedList = document.createElement('li');
    // Create a paragraph element with the dog breed name
    dogBreedList.innerHTML = `<p>${breedName}</p>`;
    // Set a data attribute with the first letter of the breed (lowercase)
    dogBreedList.setAttribute('data-letter', breedName.charAt(0).toLowerCase());
    return dogBreedList;
}

// Function to populate the dropdown with unique starting letters
function populateDropdown(dogBreeds, dropdown) {
    const startingLetters = new Set();
    // Extract unique starting letters from the dog breeds
    for (const dogBreed in dogBreeds) {
        startingLetters.add(dogBreed.charAt(0).toLowerCase());
    }

    // Clear existing options in the dropdown
    dropdown.innerHTML = '';

    // Add unique starting letters as options to the dropdown
    startingLetters.forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.text = letter;
        dropdown.add(option);
    });
}

// Function to add event listeners to make dog breeds interactive
function addEventListenersToDogBreeds(dogBreedContainer, dropdown) {
    // Get all the dog breed list items
    const breedListItems = dogBreedContainer.getElementsByTagName('li');
    // Add click event listeners to toggle font color on breed selection
    Array.from(breedListItems).forEach(breedListItem => {
        breedListItem.addEventListener('click', () => {
            const currentColor = breedListItem.style.color;
            // Toggle font color between blue and the default color// ternary operator
            breedListItem.style.color = currentColor === 'blue' ? '' : 'blue';
        });
    });

    // Add change event listener to the dropdown for breed filtering
    dropdown.addEventListener('change', () => {
        const selectedLetter = dropdown.value.toLowerCase();
        // Show/hide breeds based on the selected letter
        Array.from(breedListItems).forEach(breedListItem => {
            const firstLetter = breedListItem.getAttribute('data-letter');
            breedListItem.style.display = firstLetter === selectedLetter ? 'block' : 'none';
        });
    });
}

// Call the initialize function to start the script
initialize();
