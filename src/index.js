document.addEventListener('DOMContentLoaded', () => {

    const url = "http://localhost:3000/dogs"
    const table = document.getElementById('table-body')
    const edit = document.getElementById('edit')


    function fetchDogs() {
      fetch(url)
      .then (resp => resp.json())  
      .then (dogs => dogs.forEach(dog => renderDogs(dog)))
    }

    function renderDogs(dog) {
        const row = document.createElement('tr')
        row.dataset.id = dog.id
        row.innerHTML = `
        <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id='edit'>Edit</button></td>
        `
        table.append(row)
    }

    function patchDog(id) {
        
    }
    
    fetchDogs()

    //listners

    document.addEventListener("click", function(e){
        e.preventDefault
        e.target.matches(edit)
        patchDog(e.target.dataset.id)
        console.log(e.target.dataset.id)

    })


})