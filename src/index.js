document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = "http://localhost:3000/dogs/"
    const tableBody = document.querySelector('#table-body')
    const inputName = document.querySelector('[name="name"]')
    const inputBreed = document.querySelector('[name="breed"]')
    const inputSex = document.querySelector('[name="sex"]')
   
    
    function fetchDogs(){
        fetch(dogUrl)
        .then( resp => resp.json() )
        .then( dogs => {
            tableBody.innerHTML = ''
            renderAllDogs(dogs)})
    }

    function renderAllDogs(dogs){
        dogs.forEach(dog => renderDog(dog))
    }

    function renderDog(dog){
        let tableRow = document.createElement('tr')
        tableRow.innerHTML =''
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
          
            const form = e.target
            const inputName = form.children[0]
            const inputBreed = form.children[1]
            const inputSex = form.children[2]
            const dogId = inputName.dataset.dogId
            
            
            if (dogId){

                if (inputName.value === "" || inputBreed.value === "" || inputSex.value === ""   ){
                    alert("Please fill out all fields")
                    return
                } else {

                    ///
                    fetch(dogUrl + dogId, {
                        method: "PATCH",
                        headers: {
                            "content-type" : "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: inputName.value,
                            breed: inputBreed.value,
                            sex: inputSex.value
                        })
                    })
                    
                    fetchDogs();
                    resetForm(form);
                }   
            }else{
                alert("To use this form, please select a dog from the table below first")
            }
        })
    }

    function resetForm(form){
        form.reset()
    }

    
    //INVOKE

    fetchDogs();
    changeDogInfo();

})