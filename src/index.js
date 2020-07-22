document.addEventListener('DOMContentLoaded', () => {

    const baseUrl = 'http://localhost:3000/dogs'
    const tableBody = document.getElementById('table-body')

    editEventListener()

    function fetchDogs(){
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogs => renderDog(dogs))
    }

    function renderDog(dogs){
        dogs.forEach(dog =>{
            const dogTr = document.createElement('tr')
            const editButton = document.createElement('button')
            editButton.innerText = 'Edit'
            editButton.dataset.id = dog.id
            dogTr.innerHTML = `<td>${dog.name}</td> <td>*${dog.breed}*</td> <td>*${dog.sex}*</td>` 
            dogTr.append(editButton)
            tableBody.append(dogTr)
        })

    }

    function editEventListener(){
        document.addEventListener('click', function(e){
            if (e.target.innerText === 'Edit'){
                console.log(e.target)
            }
        })
    }

    fetchDogs()


})