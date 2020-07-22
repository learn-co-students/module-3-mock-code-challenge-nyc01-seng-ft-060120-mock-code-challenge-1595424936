document.addEventListener('DOMContentLoaded', () => {
    const baseURL = "http://localhost:3000/dogs"
    const table = document.getElementById('table-body')
   

    function fetchDogs () {
        fetch(baseURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            json.forEach(dog => {
                renderDog(dog)
            })
        })
    }

    function renderDog(dog) {
        let dogRow = table.insertRow()
        dogRow.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td></tr>`
              
    }

    
fetchDogs()
}) // end of DOM content loaded