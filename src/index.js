document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs"
    let dogsTable = document.getElementById("table-body")
    let dogForm = document.getElementById("dog-form")
    let editButton = document.createElement("button")

    function fetchDogs(url){
        fetch(url)
        .then(resp => resp.json())
        .then(dogsData => renderDogs(dogsData))
    }
    fetchDogs(dogsUrl)

    function renderDog(dogObject){
        let dogRow = document.createElement("tr")

        let dogName = document.createElement("td")
        dogName.innerHTML = `<td>${dogObject.name}</td>`

        let dogBreed = document.createElement("td")
        dogBreed.innerHTML = `<td>${dogObject.breed}</td>`

        let dogSex = document.createElement("td")
        dogSex.innerHTML = `<td>${dogObject.sex}</td>`

       
        editButton.textContent= "Edit"
        editButton.dataset.id = dogObject.id
        
        dogRow.append(dogName)
        dogRow.append(dogBreed)
        dogRow.append(dogSex)
        dogRow.append(editButton)
        dogsTable.append(dogRow)
    }

    function renderDogs(dogsData){
        dogsData.forEach(dog =>{
            renderDog(dog)
        })
    }

    // function editDog(url, dog){

    // }

    dogsTable.addEventListener("click", function(e){
        e.preventDefault()
        if(e.target === editButton){
            
        }
         
    })

    function populateForm(dogInput){
       let name =  dogForm.name.value 
       name = 
       let breed = dogForm.breed.value 
       let sex = dogForm.sex.value 
    }
  

    /*

    - Make a dog editable. Clicking on the edit button next 
    to a dog should populate the top form with that dog's 
    current information.

        .click listener on table body for specific button
        when button is clicked, popuate form w table values
    */
})