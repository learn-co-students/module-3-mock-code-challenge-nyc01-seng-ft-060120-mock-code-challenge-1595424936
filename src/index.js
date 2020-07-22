document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs"
    let dogsTable = document.getElementById("table-body")
    let dogForm = document.getElementById("dog-form")
    
    function fetchDogs(url){
        fetch(url)
        .then(resp => resp.json())
        .then(dogsData => renderDogs(dogsData))
    }
    fetchDogs(dogsUrl)

    function renderDog(dogObject){
        let dogRow = document.createElement("tr")
        let dogBreed = document.createElement("td")
        let dogSex = document.createElement("td")
        let dogName = document.createElement("td")
        let editButton = document.createElement("button")
        
        dogName.innerHTML = `<td>${dogObject.name}</td>`
        dogBreed.innerHTML = `<td>${dogObject.breed}</td>`
        dogSex.innerHTML = `<td>${dogObject.sex}</td>`

        editButton.textContent= "Edit"
        editButton.className = "edit-button"
        editButton.dataset.id = dogObject.id
        
        dogRow.append(dogName)
        dogRow.append(dogBreed)
        dogRow.append(dogSex)
        dogRow.append(editButton)
        dogsTable.append(dogRow)


        dogsTable.addEventListener("click", function(e){
            e.preventDefault()
            if (e.target.className === "edit-button"){
                dogForm.name.value = dogName.innerHTML
                dogForm.breed.value = dogBreed.innerHTML
                dogForm.sex.value = dogSex.innerHTML
            }    
        })
    }

    function renderDogs(dogsData){
        dogsData.forEach(dog =>{
            renderDog(dog)
        })
    }

    function editDog(url,dog){
        fetch(`${url}/${id}`, {
            method:"PATCH",
            headers: {"Content-type":"application/json",
            "Accept":"appplication/json"},
            body: JSON.stringify({
                dog: "dog"
            })
        })
    }

    dogForm.addEventListener("submit", function(e){
        e.preventDefault()
        const newDog = {
            name: e.target.name.value , 
            breed:  e.target.breed.value , 
            sex: e.target.sex.value 
        }
            // console.log(e.target.name.value)
        editDog(`dogsUrl/${id}`, newDog)  //need to add id depending on the dog clicked
        })
    
  

    /*
        - On submit of the form, a PATCH request should be 
        made to http://localhost:3000/dogs/:id to update 
        the dog information (including name, breed and 
        sex attributes).
    */
})