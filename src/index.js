const dogUrl = "http://localhost:3000/dogs"
const registeredDogsList = document.getElementById('table-body')
const dogTableRow = document.createElement('tr')




document.addEventListener('DOMContentLoaded', () => {
  getDogs()
      
})

function getDogs() {
    fetch(dogUrl)
    .then(response => response.json())
    .then(dogs => renderAllDogs(dogs));
  }

  function renderAllDogs(dogs) {
     dogs.forEach(dog => renderDog(dog) )
  }


  function renderDog(dog) {
      const dogName = document.createElement('td')
      const dogBreed = document.createElement('td')
      const dogSex = document.createElement('td')
      const editButton = document.createElement('td')

      dogName.innerText = `${dog.name}` 
      dogBreed.innerText = `${dog.breed}`
      dogSex.innerText = `${dog.sex}`
      editButton.innerHTML = document.createElement("button")

      dogName.id = "name"
      dogBreed.id = "breed"
      dogSex.id = "sex"
      editButton.id = "edit"

      dogTableRow.append(dogName, dogBreed, dogSex)
  }

  function addRow() {
    registeredDogsList.appendChild(dogTableRow)
  }

//upon load render dogs
//fetch dogs 
//render list of registered dogs 
//dogs will be organized onto a table row 
/* 
<tr>
    <td> Dog *Name </td>
    <td>*Dog Breed</td> 
    <td>*Dog Sex*</td> 
    <td><button>Edit</button></td>
</tr>


*/