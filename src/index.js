document.addEventListener('DOMContentLoaded', () => {
    let allDogs = []

    const baseUrl = 'http://localhost:3000/dogs'
    const tableBody = document.getElementById('table-body')
    const dogForm = document.getElementById('dog-form')



    editEventListener()
    dogFormListener()

    function fetchDogs(){
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogs => {renderDogs(dogs), allDogs = dogs })
    }


    function renderDogs(dogs){
        dogs.forEach(dog =>{
            renderDog(dog)
        })

    }

    function renderDog(dog){
            const dogTr = document.createElement('tr')
            dogTr.dataset.id = dog.id
            const editButton = document.createElement('button')
            editButton.innerText = 'Edit'
            editButton.dataset.id = dog.id
            dogTr.innerHTML = `<td>${dog.name}</td> <td>*${dog.breed}*</td> <td>*${dog.sex}*</td>` 
            dogTr.append(editButton)
            tableBody.append(dogTr)
    }

    function editEventListener(){
        document.addEventListener('click', function(e){
            if (e.target.innerText === 'Edit'){
                // console.log(e.target.parentNode.firstChild)

                // let matchDog = allDogs.forEach(dog => dog.id === e.target.dataset.id)

                dogForm.name.value = e.target.parentNode.children[0].textContent
                dogForm.breed.value = e.target.parentNode.children[1].textContent
                dogForm.sex.value = e.target.parentNode.children[2].textContent
                
                dogForm.dataset.id = e.target.dataset.id


                // dogForm.secondChild.name = e.target.parentNode.secondElementChild.innerText
                // dogForm.thirdElementChild.name = e.target.parentNode.thirdElementChild.innerText

                // dogForm.innerHTML = `
                // <input type="text" name='${e.target.parentNode.firstChild.innerText}' value>
                // <input type="text" name='${e.target.parentNode.childNodes[1].innerText}' value>
                // <input type="text" name='${e.target.parentNode.thirdChild}' value>
                // <input type="submit" value="Submit">
                // `
                // dogForm.name.textFeild = e.target.parentNode.firstChild.innerText
                
                
                // dogForm.name = matchDog.name
                

                
            }
        })
    }

    function dogFormListener(){
        dogForm.addEventListener("submit", function(e){
            e.preventDefault()
            const name = dogForm.name.value
            const breed = dogForm.breed.value
            const sex = dogForm.sex.value

            const body = {name, breed, sex}
            const id = dogForm.dataset.id
            console.log(dogForm.dataset.id)
            updateDog(id, body)
    
            
            // dogToFind;
            //breeds.filter(breed => {breed.startsWith(letter)})
            // console.log(dogToFind)
            // console.log(dogToFind.id)
        })
    }

    function updateDog(id, body){
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(dog => fetchDogs(dog))


        
    }

    fetchDogs()
    


})