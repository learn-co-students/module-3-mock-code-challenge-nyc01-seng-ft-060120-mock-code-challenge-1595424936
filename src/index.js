document.addEventListener('DOMContentLoaded', () => {

    // GLOBAL VARIABLES 
    const baseUrl = "http://localhost:3000/dogs/"

    // FUNCTIONS
    
    const getDogs = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogData => renderDogs(dogData))
    }

    const renderDog = dog => {
        const tableBody = document.querySelector("#table-body")
        const dogTableTr = document.createElement("tr")
        const dogNameTd = document.createElement("td")
        const dogBreedTd = document.createElement("td")
        const dogSexTd = document.createElement("td")
        const editDogButtonTd = document.createElement("td")

        dogNameTd.innerHTML = dog.name
        dogBreedTd.innerHTML = dog.breed
        dogSexTd.innerHTML = dog.sex
        editDogButtonTd.innerHTML = "<button>Edit</button>"
        

        dogTableTr.append(dogNameTd, dogBreedTd, dogSexTd, editDogButtonTd)

        tableBody.append(dogTableTr)  
    }

    const renderDogs = dogArray => {
        dogArray.forEach(dog => {
            renderDog(dog) 
        })
    }

    const clickHandler = () => {
        document.addEventListener("click", function(e){
            if(e.target.matches('button')){
                const editButton = e.target
                const dogForm = document.querySelector('#dog-form')

                const dataRow = editButton.parentElement
                const dataTable = dataRow.parentElement
                const dataTableRows = dataTable.querySelectorAll('td')
                const name = dataTableRows[0]
                const breed = dataTableRows[1]
                const sex = dataTableRows[2]

                dogForm.name.value = name.innerHTML
                dogForm.breed.value = breed.innerHTML
                dogForm.sex.value = sex.innerHTML

                console.log(name.innerHTMl)
                
                
            }
            

        })
    }



    // EXECUTIONS 
    getDogs()
    clickHandler()
    

})