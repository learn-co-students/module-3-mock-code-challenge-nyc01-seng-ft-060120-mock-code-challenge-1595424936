document.addEventListener('DOMContentLoaded', () => {

    const url = "http://localhost:3000/dogs"
    const dogform = document.getElementById('dog-form')
    
   
    
//make fetch request to URL to get Dogs Data
    function fetchDogs() {
        fetch(url)
        .then(response => response.json())
        .then(dogs => {
            renderDogs(dogs)
        })
    }

    //render dogs to page
    const renderDogs = (dogs) => {
        dogs.forEach(dog => renderDogList(name, breed, sex))
    }

    function renderDogList(name, breed, sex) {
    const tablerow = document.createElement('tr');
        const dogName = document.createElement('td');
        const dogBreed = document.createElement('td');
        const dogSex = document.createElement('td');
    }
    
 //
   

   

    


    fetchDogs();

})