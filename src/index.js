document.addEventListener('DOMContentLoaded', () => {
    const baseURL = "http://localhost:3000/dogs"
    const table = document.getElementById('table-body')
    const form = document.getElementById('dog-form')
    
    // form.addEventListener('click', function(e) {
    //     console.log(e.target)
    // })
   

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
        <td><button id=${dog.id} class="edit">Edit</button></td></tr>`
              
    }


    document.addEventListener('click', function(e) {
        if (e.target.className === "edit") {
            const editButton = e.target
            let id = editButton.id
            
            console.log(form)
            let formData = {
                name: form.name.value,
                breed: form.breed.value,
                sex: form.sex.value
            }
            
            fetch(`${baseURL}/${id}`, {
                method: "patch",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify (formData)
            })
            // .then?



        } // first if statement
    })
    




    
fetchDogs()
}) // end of DOM content loaded