console.log('%c HI', 'color: firebrick');

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';

fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        const dogImageContainer = document.getElementById('dog-image-container');

        data.message.forEach(dogImage => {
            const dogImageList = document.createElement('li');
            dogImageList.innerHTML = `
                <img src="${dogImage}" alt="${dogImage}">
            `;
            dogImageContainer.appendChild(dogImageList);
        });
    })
    .catch(error => console.error('Error fetching dog images:', error));

const breedUrl = 'https://dog.ceo/api/breeds/list/all';
fetch(breedUrl)
    .then(response => response.json())
    .then(dogs => {
        const dogBreedContainer = document.getElementById('dog-breeds');
        const dropdown = document.getElementById('breed-dropdown'); // Corrected id

        // Populate the dog breed list
        for (const dogBreed in dogs.message) {
            const dogBreedList = document.createElement('li');
            dogBreedList.innerHTML = `<p>${dogBreed}</p>`;
            dogBreedList.setAttribute('data-letter', dogBreed.charAt(0).toLowerCase()); // Add data-letter attribute
            dogBreedContainer.appendChild(dogBreedList);
        }

        // Add event listener to the dropdown for breed filtering
        dropdown.addEventListener('change', () => {
            const selectedLetter = dropdown.value.toLowerCase();

            // Show breeds that start with the selected letter and hide the others
            const breedListItems = dogBreedContainer.getElementsByTagName('li');
            for (const breedListItem of breedListItems) {
                const firstLetter = breedListItem.getAttribute('data-letter');
                breedListItem.style.display = firstLetter === selectedLetter ? 'block' : 'none';
            }
        });
    })
    .catch(error => console.error('Error fetching dog breeds:', error));
