document.addEventListener('DOMContentLoaded', () => {

  //VARIABLES
  const dogsURL = "http://localhost:3000/dogs"
  const dogsTable = document.getElementById("table-body")
  const dogForm = document.querySelector(`#dog-form`)

  // FETCH REQUESTS
  function fetchDogs(){
    dogsTable.innerHTML = ""
    fetch(dogsURL)
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
  }

  function fetchOneDog(dogId){
    fetch(`${dogsURL}/${dogId}`)
    .then(resp => resp.json())
    .then(dog => renderOneDog(dog))
  }

  function updateDog(dog, id){
    fetch(`${dogsURL}/${id}`,{
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(dog)
    })
    .then(resp => resp.json())
    .then(fetchDogs)
  }

  // EVENT HANDLERS
  function submitEvent(){
    dogForm.addEventListener("submit", function(e){
      e.preventDefault()
      const name = e.target[0].value
      const breed = e.target[1].value
      const sex = e.target[2].value
      const dogId = e.target.dataset.id
      const newDog = {name, breed, sex}
      updateDog(newDog, dogId)
      e.target.reset()
    })
  }


  // FUNCTIONS
  function renderDogs(dogs){
    dogs.forEach(dog => {
      const dogTr = document.createElement('tr')
      dogTr.dataset.id = dog.id
      dogTr.innerHTML = `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button>Edit Dog</button></td>
      `
      dogsTable.append(dogTr)
      dogTr.addEventListener("click", function(e){
        let dogId = e.target.closest('tr').dataset.id
        fetchOneDog(dogId)
      })
    })
  }

  function renderOneDog(dog){
    dogForm.dataset.id = dog.id
    let dogFormName = dogForm[0]
    let dogFormBreed = dogForm[1]
    let dogFormSex = dogForm[2]
    dogFormName.value = dog.name
    dogFormBreed.value = dog.breed
    dogFormSex.value = dog.sex
  }

  // EXECUTIONS
  fetchDogs()
  submitEvent()
})