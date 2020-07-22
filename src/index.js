document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000/dogs'  

  function fetchDogs(){
      fetch(url)
      .then(resp => resp.json())
      .then(dogs => dogs.forEach(dog => renderDogs(dog)))
      
    }

    function renderDogs(dog){
        const dogTable = document.getElementById('table-body')
        const dogRow = document.createElement('tr')
        dogRow.dataset.id = dog.id
        dogRow.innerHTML = 
        `<td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id='edit'>Edit Dog</button></td>
        `
        dogTable.append(dogRow)

        dogRow.addEventListener('click', dogClick)
        
    }

    // function dogClick(e){
    //     renderSingleDog(e.target.id)
    // }

    function renderSingleDog(id){
        
    }




    fetchDogs()

})