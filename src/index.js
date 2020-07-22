const dogsUrl = 'http://localhost:3000/dogs/'
//- On page load, render a list of already registered dogs in the table. You can fetch //these dogs from http://localhost:3000/dogs.
//- The dog should be put on the table as a table row. The HTML might look something //like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> //<td><button>Edit</button></td></tr>`
//- Make a dog editable. Clicking on the edit button next to a dog should populate the //top form with that dog's current information.
//- On submit of the form, a PATCH request should be made to http://localhost:3000/dogs///:id to update the dog information (including name, breed and sex attributes).
//- Once the form is submitted, the table should reflect the updated dog information. //There are many ways to do this. You could search for the table fields you need to //edit and update each of them in turn, but we suggest making a new get request for all //dogs and rerendering all of them in the table. Make sure this GET happens after the //PATCH so you can get the most up-to-date dog information.

const fetchDogs = () => {
  fetch(dogsUrl)
  .then(resp => resp.json())
  .then(data => {
    loadDogs(data)
  })
}

const loadDogs =(dogs) => {
  clearForm()
  dogs.forEach(dog => renderDog(dog))
}

const clearForm = () => {
  const dogTable = document.querySelector("#table-body");
  dogTable.innerHTML = ''
}

const renderDog = (dog) => {
  const dogTable = document.querySelector('#table-body')
  const dogRow = dogTable.insertRow()
  const nameCell = dogRow.insertCell()
  const breedCell = dogRow.insertCell()
  const sexCell = dogRow.insertCell()
  const editCell = dogRow.insertCell()
  const editBtn = document.createElement('button')
  dogRow.dataset.dogId = dog.id 
  nameCell.innerHTML = `${dog.name}`
  breedCell.innerHTML = `${dog.breed}`
  sexCell.innerHTML = `${dog.sex}`
  editBtn.innerHTML = 'Edit Dog'
  editCell.appendChild(editBtn)
  editBtnHandler(editBtn, dog)
}

const editBtnHandler = (button, dog) => {
  button.addEventListener('click', () => {
    displayDog(dog)
  })
}
const displayDog = (dog) => {
  const dogForm = document.getElementById("dog-form");
  const submitBtn = dogForm.submit
  dogForm.name.value = dog.name
  dogForm.breed.value = dog.breed
  dogForm.sex.value = dog.sex
  submitHandler(submitBtn, dog)
}

const submitHandler = (submitBtn, dog) => {
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    updateDog(dog)
  })
}

const updateDog = (dog) => {
  const dogForm = document.getElementById("dog-form");
  dog.name = dogForm.name.value 
  dog.breed = dogForm.breed.value
  dog.sex = dogForm.sex.value
  submitDog(dog)
  
}

const submitDog = (dog) => {
  fetch(dogsUrl + `${dog.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
    },
    body: JSON.stringify(dog),
  })
  .then((resp) => resp.json())
  fetchDogs();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
})

