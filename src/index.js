URL = "http://localhost:3000/dogs/"

let fetchDogs = () => {
    return fetch(URL)
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))
}

let renderDogs = (dogs) => {
    let tableBody = document.querySelector('#table-body')
    tableBody.innerHTML = ''
    dogs.forEach(dog => {
        let tr = document.createElement('tr')
        tr.dataset.id = `${dog.id}`
        tdName = document.createElement('td')
        tdName.innerText = `${dog.name}`
        tdBreed = document.createElement('td')
        tdBreed.innerText = `${dog.breed}`
        tdSex = document.createElement('td')
        tdSex.innerText = `${dog.sex}`
        tdBttn = document.createElement('td')
        editBttn = document.createElement('button')
        editBttn.innerText='Edit Dog'
        tdBttn.appendChild(editBttn)
        tr.append(tdName, tdBreed, tdSex, tdBttn)
        tableBody.appendChild(tr)
        editBttn.addEventListener('click', (e) => {
            fetchDog(e.target.parentNode.parentNode.dataset.id)
        })
    })
}

let fetchDog = (id) => {
    return fetch(URL+id)
    .then(res => res.json())
    .then(dog => fillForm(dog))
}

let fillForm = (dog) => {
    form = document.querySelector('#dog-form')

    form.children[0].value = dog.name
    form.children[1].value = dog.breed
    form.children[2].value = dog.sex
    form.children[3].value = dog.id
}

let patchDog = (form) => {
    dogName = form.children[0].value
    dogBreed = form.children[1].value
    dogSex = form.children[2].value
    dogId = form.children[3].value

    fetch(URL+dogId, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex: dogSex
        })
    })
    .then(res => res.json())
    .then(dog => fetchDogs())
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()

    form = document.querySelector('#dog-form')
    id = document.createElement('input')
    id.setAttribute('type', 'hidden')
    form.children[3].insertAdjacentElement('beforebegin', id)

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.target.children[3].value === "") {
            window.alert('Select a dog to edit first!')
        } else {
            patchDog(e.target)
        }
    })
})