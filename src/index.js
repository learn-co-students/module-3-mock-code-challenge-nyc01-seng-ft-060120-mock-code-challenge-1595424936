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
        .then(dogs => {renderDog(dogs), allDogs.push(dogs)})
    }


    function renderDog(dogs){
        dogs.forEach(dog =>{
            const dogTr = document.createElement('tr')
            dogTr.dataset.id = dog.id
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
                // console.log(e.target.parentNode.firstChild)

                // let matchDog = allDogs.forEach(dog => dog.id === e.target.dataset.id)

                dogForm.firstElementChild.textContent = e.target.parentNode.firstElementChild.textContent
                dogForm.childNodes[3].textContent = e.target.parentNode.childNodes[2].textContent
                dogForm.childNodes[5].textContent = e.target.parentNode.childNodes[4].textContent


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
            // e.preventDefault()
            updateDog(e, allDogs.find(dog => {dog.name === dogForm.firstElementChild.textContent}))       
            // dogToFind;
            //breeds.filter(breed => {breed.startsWith(letter)})
            // console.log(dogToFind)
            // console.log(dogToFind.id)
        })
    }

    function updateDog(e, dog){
        e.preventDefault()
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({
                name: dog.name,
                breed: dog.breed,
                sex: dog.sex
            })
        })
        .then(res => res.json())
        .then(dog => fetchDogs(dog))


        
    }

    fetchDogs()
    console.log(allDogs)


})