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
        <td><button class='edit' id= ${dog.id}>Edit Dog</button></td>
        `
        dogTable.append(dogRow)

        dogRow.addEventListener('click', updateDog)
        
    }

    // function dogClick(e){
    //     renderSingleDog(e.target.id)
    // }

    function updateDog(url, dog){
        fetch (url, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": ''
            })
        })
        
    }




    fetchDogs()

})