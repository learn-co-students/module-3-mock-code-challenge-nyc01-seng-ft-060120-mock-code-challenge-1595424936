document.addEventListener('DOMContentLoaded', () => {
    
    /*
    1. on page load, the dogs should be rendered
    - get table element
    - make fetch request
    
    */
   
   const baseUrl = 'http://localhost:3000/dogs/'
   const dogTable = document.getElementById('table-body')
   const dogForm = document.getElementById('dog-form')
    
    function fetchDogs() {
        fetch(baseUrl)
        .then(res => res.json())
        .then(dogs => getIndividualDogs(dogs))
    }
    
    function getIndividualDogs(dogs){
        dogs.forEach(dog => renderDog(dog))
    }
    
    function renderDog(dog){
        
        dogTable.innerHTML += `
        <tr>
            <td>${dog.name}</td> 
            <td>${dog.breed}</td> 
            <td>${dog.sex}</td> 
            <td><button class="edit-button" id=${dog.id}>Edit Dog</button></td>
        </tr>
        `
    } 
    
    document.addEventListener('click', e => {
        if (e.target.className === "edit-button"){
            const dogId = e.target.id
            fetch(baseUrl + e.target.id)
            .then(res => res.json())
            .then(dog => addDataToForm(dog, dogId))
        }
    })

    function addDataToForm(dog, dogId){
        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed 
        dogForm.sex.value = dog.sex
        submitForm(dogId)
    }

    function submitForm(dogId) {
        document.addEventListener("submit", e => {
            e.preventDefault()
            const name = dogForm.name.value
            const breed = dogForm.breed.value
            const sex = dogForm.sex.value
            console.log(name)
            console.log(breed)
            console.log(sex)

            const dogObj = {name, breed, sex}
            
            fetch((baseUrl + dogId), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dogObj)
            })
            .then(res => res.json())
            .then(dog => console.log(dog))
            .then(fetchDogsAgain())
            
        })
    }

    function fetchDogsAgain() {
        dogTable.innerHTML = ""
        fetch(baseUrl)
        .then(res => res.json())
        .then(dogs => getIndividualDogs(dogs))
    }

    fetchDogs()
})