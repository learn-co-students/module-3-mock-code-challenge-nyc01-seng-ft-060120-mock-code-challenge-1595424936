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
        <td id="name">${dog.name}</td> 
        <td id="breed">${dog.breed}</td> 
        <td id="sex">${dog.sex}</td> 
        <td><button id=${dog.id} class="edit">Edit</button></td></tr>`          
    }
    
        
            document.addEventListener('click', function(e) {
                if (e.target.className === 'edit') {
                    const editButton = e.target
                    // console.log(editButton)
                    let dogId = editButton.id
                    // console.log(dogId)
                    let row = editButton.parentElement.parentElement
                    // console.log(row)
                    let name = row.querySelector('#name')
                    // console.log(name)
                    let breed = row.querySelector('#breed')
                    // console.log(breed)
                    let sex = row.querySelector('#sex')
                    // console.log(sex)
                    form.name.value = name.innerText
                    form.breed.value = breed.innerText
                    form.sex.value = sex.innerText
                    submitForm(dogId)

          
                    
                } // if statement end
            }) // editButton event listener end

            function submitForm(dogId) {

            form.addEventListener('submit', function(e) {
                e.preventDefault()

                let formData = {
                    name: form.name.value,
                    breed: form.breed.value,
                    sex: form.sex.value
                }

                fetch(`${baseURL}/${dogId}`, {
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
                    fetchDogs(dog)
                })
    
                
            }) // end of submit form event listener
        } // end of submit form function

                
submitForm()   
fetchDogs()
}) // end of DOM content loaded