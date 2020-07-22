document.addEventListener('DOMContentLoaded', () => {

    /*
        1. on page load, the dogs should be rendered
            - get table element
            - make fetch request

    */

    const baseUrl = 'http://localhost:3000/dogs'
    const dogTable = document.getElementById('table-body')

    function fetchDogs() {
        fetch(baseUrl)
        .then(res => res.json())
        .then(dogs => getIndividualDogs(dogs))
    }

    function getIndividualDogs(dogs){
        dogs.forEach(dog => renderDog(dog))
    }

    function renderDog(dog){
        const row = dogTable.insertRow(0)
        const nameCell = row.insertCell(0)
        nameCell.innerText = dog.name
        const breedCell = row.insertCell(1)
        breedCell.innerText = dog.breed
        const sexCell = row.insertCell(2)
        sexCell.innerText = dog.sex
        const editCell = row.insertCell(3)
        console.log(dog)
    }

    fetchDogs()
})