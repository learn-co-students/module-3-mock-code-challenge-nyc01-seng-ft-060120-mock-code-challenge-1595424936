document.addEventListener('DOMContentLoaded', () => {
    
    /*
    1. on page load, the dogs should be rendered
    - get table element
    - make fetch request
    
    */
   
   const baseUrl = 'http://localhost:3000/dogs'
   const dogTable = document.getElementById('table-body')
   const dogForm = document.getElementById('dog-form')
    
    function fetchDogs() {
        fetch(baseUrl)
        .then(res => res.json())
        .then(dogs => getIndividualDogs(dogs))
    }
    
    function getIndividualDogs(dogs){
        dogs.forEach(dog => renderDog(dog))
    }
    
    function renderDog(dog){
        
        dogTable.innerHTML += `
        <tr>
            <td>${dog.name}</td> 
            <td>${dog.breed}</td> 
            <td>${dog.sex}</td> 
            <td><button class="edit-button" id=${dog.id}>Edit Dog</button></td>
        </tr>
        `
    }
    
    
    document.addEventListener('click', e => {
        if (e.target.className === "edit-button"){
            console.log(e.target)
        }
    })
        // const editButton = document.getElementsByTagName('button')
    const editButton = document.getElementById('edit-button')
    console.log(editButton)
    
    
    // buttonHandler()
    fetchDogs()
})