const dogsUrl = 'http://localhost:3000/dogs'

const fetchDogs = () => {
    fetch(`${dogsUrl}`)
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(dog => {
            renderDog(dog)
        });
    })
}

const renderDog = (dogObject) =>
 {
    const table = document.querySelector('#table-body')
    const row = document.createElement('tr')
    row.dataset.id = dogObject.id

    const name = document.createElement('td')
    name.innerText = dogObject.name
    name.classList.add('name')

    const breed = document.createElement('td')
    breed.innerText = dogObject.breed
    breed.classList.add('breed')

    const sex = document.createElement('td')
    sex.innerText = dogObject.sex
    sex.classList.add('name')

    const edit = document.createElement('td')
    const button = document.createElement('button')
    button.innerText = 'Edit'
    button.dataset.id = dogObject.id


    edit.append(button)
    row.append(name, breed, sex, button)
    table.append(row)



}
    










document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()

})

// √ get the url
// √ make the fetch request to that url
// create render function
// add it to the dom
