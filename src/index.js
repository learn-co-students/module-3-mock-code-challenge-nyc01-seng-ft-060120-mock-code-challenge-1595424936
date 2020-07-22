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

            
            // console.log(form)
            let formData = {
                name: editButton.name,
                breed: editButton.breed,
                sex: editButton.sex
            }
           
            
            fetch(`${baseURL}/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify (formData)
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(dog) {
                renderForm(dog)
            })

            function renderForm(dog) {
                form.name.value = dog.name
                form.breed.value = dog.breed
                form.sex.value = dog.sex
            }



        } // first if statement
    })
    




    
fetchDogs()
}) // end of DOM content loaded