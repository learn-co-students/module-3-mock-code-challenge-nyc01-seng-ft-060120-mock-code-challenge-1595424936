document.addEventListener('DOMContentLoaded', () => {

    const dogsUrl = 'http://localhost:3000/dogs'

    const dogsTable = document.getElementById('table-body')

    const dogsForm = document.getElementById('dog-form')

    let dogs;

    const fetchDogs = () => {
        fetch(dogsUrl)
        .then(response => response.json())
        .then(dogsArray => {
            dogs = dogsArray,
            getDog(dogsArray)})
    }

    const getDog = (dogsArray) => {
        dogsArray.forEach(dog => renderDog(dog))
    }

    const renderDog = (dog) => {
        const dogRow = document.createElement('tr')
        dogRow.className = 'dog-row'
        dogRow.dataset.id = dog.id

        const dogName = document.createElement('td')
        dogName.className = 'dog-name'
        dogName.innerText = dog.name

        const dogBreed = document.createElement('td')
        dogBreed.className = 'dog-breed'
        dogBreed.innerText = dog.breed

        const dogSex = document.createElement('td')
        dogSex.className = 'dog-sex'
        dogSex.innerText = dog.sex

        const editDogColumn = document.createElement('td')
        editDogColumn.className = 'edit-dog-column'

        const editDogButton = document.createElement('button')
        editDogButton.className = 'edit-dog-button'
        editDogButton.dataset.id = dog.id
        editDogButton.innerText = 'Edit Dog'

        editDogColumn.append(editDogButton)
        dogRow.append(dogName, dogBreed, dogSex, editDogColumn)
        dogsTable.append(dogRow)

        findDog(editDogButton)

    }

    const findDog = (editDogButton) => {
        editDogButton.addEventListener('click', e => {
            currentDog = e.target.dataset.id
            let dogNow = dogs.find(dog => currentDog == dog.id)
            // let dogNowName = dogNow.name
            // let dogsFormName = dogsForm.name.placeholder
            // dogsFormName = ``
            // dogsFormName = `${dogNowName}`
            // console.log(dogsFormName)
            editDog(dogNow)
            
        })
    }

    const editDog = (dogNow) => {
        //console.log(prePopName)
        dogsForm.addEventListener('submit', (e) => {

            e.preventDefault()

            fetch (`${dogsUrl}/${dogNow.id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accepts": "application/json"
                },
                body: JSON.stringify({
                    name: dogsForm.name.value,
                    breed: dogsForm.breed.value,
                    sex: dogsForm.sex.value
                })
            })
            .then(response => response.json())
            .then(dogObject => updateDog(dogObject))
        })
    }

    const updateDog = (dogObject) => {
        let dogRow = dogs.find(dog => dog.id == dogObject.id)
        dogRow = dogObject
        renderDog(dogRow)
    }

    fetchDogs()

})