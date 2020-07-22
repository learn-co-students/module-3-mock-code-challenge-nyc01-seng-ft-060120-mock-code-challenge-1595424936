document.addEventListener('DOMContentLoaded', () => {
    // Create global constant variables
    const baseURL = "http://localhost:3000/dogs/";
    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');

    // Add global evet handlers
    dogForm.addEventListener('submit', updateDog);

    // Render the initial set of dogs
    getDogs();

    function getDogs() {
        tableBody.innerHTML = "";
        fetch(baseURL).then((resp) => {return resp.json()})
        .then(dogs => renderDogs(dogs));
    }

    function renderDogs(dogs) {
        dogs.forEach(dog => {
            // Create a new table data elements and append to table
            const tableRow = document.createElement('tr');
            const dogName = document.createElement('td');
            const dogBreed = document.createElement('td');
            const dogSex = document.createElement('td');
            const editButton = document.createElement('button');

            dogName.textContent = dog.name;
            dogBreed.textContent = dog.breed;
            dogSex.textContent = dog.sex;
            tableRow.dataset.id = dog.id;
            editButton.textContent = "Edit Dog";
            editButton.addEventListener('click', () => setFormValues(dog));
            
            tableRow.append(dogName, dogBreed, dogSex, editButton);
            tableBody.appendChild(tableRow);
        });
    }

    function updateDog(event) {
        event.preventDefault();
        
        // Make patch call to update the target dog properties
        newDogProperties = getFormValues();
        fetch(baseURL + newDogProperties.id, {
            method: 'PATCH',
            headers: {'content-type': 'application/json', accept: 'application/json'},
            body: JSON.stringify(newDogProperties)
        }).then(success => {
            getDogs();
        })
    }

    function getFormValues() {
        return {id: dogForm.dataset.id, name: dogForm.name.value, breed: dogForm.breed.value, sex: dogForm.sex.value}
    }

    function setFormValues(dog) {
        dogForm.dataset.id = dog.id;
        dogForm.name.value = dog.name;
        dogForm.breed.value = dog.breed;
        dogForm.sex.value = dog.sex;
    }
})