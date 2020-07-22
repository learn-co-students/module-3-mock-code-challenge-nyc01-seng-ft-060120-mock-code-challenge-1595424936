document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = "http://localhost:3000/dogs/"
    const tableBody = document.querySelector('#table-body')
    const inputName = document.querySelector('[name="name"]')
    const inputBreed = document.querySelector('[name="breed"]')
    const inputSex = document.querySelector('[name="sex"]')
   


    // console.log(tableBody)
    


    function fetchDogs(){
        fetch(dogUrl)
        .then( resp => resp.json() )
        .then( dogs => renderAllDogs(dogs))
    }

    function renderAllDogs(dogs){
        dogs.forEach(dog => renderDog(dog))
    }

    function renderDog(dog){
        let tableRow = document.createElement('tr')
        tableRow.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td id="buttonTd"><button id="editButton" data-dog-id=${dog.id}>Edit</button></td>
        `
        
        tableBody.append(tableRow)

        tableRow.addEventListener('click', (e) =>{
            if (e.target.id === "editButton"){
                
                inputName.value = dog.name
                inputName.dataset.dogId = dog.id
                inputBreed.value = dog.breed
                inputSex.value = dog.sex
            }
        })

    
    }


    function changeDogInfo(){
        document.addEventListener('submit', (e) =>{
            e.preventDefault()
            console.log(e.target)
            
            // fetch()
        })
    }

    
    //INVOKE

    fetchDogs();
    changeDogInfo();

})