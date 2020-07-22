document.addEventListener('DOMContentLoaded', () => {
    const mainUrl = "http://localhost:3000/dogs"
    const dogTable = document.querySelector('table')
    const nameColumn = document.querySelector('th')
    const tableHtml = document.getElementsByClassName('padding center')
    const breedColumn = tableHtml[1]
    const sexColumn = tableHtml[2]
    const editColumn = tableHtml[3]
    const editForm = document.getElementById('dog-form')
    const nameValue = editForm.name.value
    const breedValue = editForm.breed.value
    const sexValue = editForm.sex.value
    let buttonTd;
    let buttonTr;

    const showDogs = () => {
        fetch(mainUrl)
            .then(response => response.json())
            .then(data => data.forEach(function(dog){
                renderDogs(dog)
            }))
    } //showDogs close

    const renderDogs = (dog) => {
        const dogRow = document.createElement('tr')
        const nameRow = document.createElement('td')
        const breedRow = document.createElement('td')
        const sexRow = document.createElement('td')
        const editRow = document.createElement('td')

        nameRow.innerText = dog.name
        breedRow.innerText = dog.breed
        sexRow.innerText = dog.sex 
        editRow.innerHTML = `<button> Edit Dog</button>`

        dogRow.append(nameRow)
        dogRow.append(breedRow)
        dogRow.append(sexRow)
        dogRow.append(editRow)

        dogTable.append(dogRow)
    } //renderDogs close 

    dogTable.addEventListener("click", function(e){
        if (e.target.innerText === "Edit Dog")
            buttonTd = e.target.parentElement
            buttonTr = buttonTd.parentElement
            nameValue = buttonTr.children[0].innerText //pulls name from row
            breedValue = buttonTr.children[1].innerText
            sexValue = buttonTr.children[2].innerText
            //uncaught typeerror - assignment to constant variable WHY? 
    }) //click event listener close 

    editForm.addEventListener("submit", function(e){
        e.preventDefault()
        fetch(`${mainUrl}/${dog.id}`, { //need to figure out id here
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }, //close headers 
            body: JSON.stringify({name: nameValue, breed: breedValue, sex: sexValue}) //can you do multiple values 
        }) //close fetch patch 
        .then(response => response.json())
        .then(showDogs()) //does this work 
    
    }) //submit event listener close 

    showDogs();

}) //domcontent loaded close