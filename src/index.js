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

const renderDog = (dogObject) => {
    const row = document.createElement('trow')
    row.id = dogObject.id
    row.innerHTML = `

      <td>${dogObject.name}</td> 
      <td>${dogObject.breed}</td> 
      <td>${dogObject.sex}</td> 
      <td>
      <button>Edit</button>
      </td>

    `

    // const td1 = document.createElement('td')
    // const td2 = document.createElement('td')
    // const td3 = document.createElement('td')
    // td1.innerText = `${dogObject.name}`
    // td2.innerText = `${dogObject.breed}`
    // td3.innerText = `${dogObject.sex}`

    // row.appendChild(td1)
    // row.appendChild(td2)
    // row.appendChild(td3)

    document.getElementById('table-body').appendChild(row)
}

// const renderDogs = 










document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()

})

// √ get the url
// √ make the fetch request to that url
// create render function
// add it to the dom
