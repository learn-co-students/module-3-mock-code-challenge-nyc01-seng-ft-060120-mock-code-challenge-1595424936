document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000'
    const dogsUrl = baseUrl + '/dogs'
    const table = document.querySelector('table.margin');
    const editDogForm = document.querySelector('form#dog-form');

    const getDogs = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {displayDogs(data, table)})
        .catch(error => console.log(error))
           
    }
    const displayDogs = (data, table) => {
        data.forEach(dog => {
            const dogRow = document.createElement('tr');
            const name = document.createElement('td');
            const breed = document.createElement('td');
            const sex = document.createElement('td');
            const editDog = document.createElement('td');
            const editDogButton = document.createElement('button');
            dogRow.dataset.id = dog.id
            dogRow.dataset.name = dog.name
            dogRow.dataset.breed = dog.breed
            dogRow.dataset.sex = dog.sex
            name.classList.add('name', 'padding', 'center')
            breed.classList.add('breed', 'padding', 'center')
            sex.classList.add('sex', 'padding', 'center')
            editDogButton.classList.add('edit')
            name.textContent = dog.name
            breed.textContent = dog.breed
            sex.textContent = dog.sex
            editDogButton.textContent = "Edit Dog"
            editDog.append(editDogButton)
            dogRow.append( name, breed, sex, editDog)
            table.append(dogRow)
        });
    }
    
    const editDogs = (area) => {
        area.addEventListener('click', (e) => {
            if (e.target.className === 'edit') {
                const button = e.target
                editDogRow(button)
            }
        })
        
    }
    const editDogRow = (button) => {
        dogInfo =  button.closest('tr').dataset
        fillInForm(dogInfo, editDogForm)
    }

    const fillInForm = (dogObject, form) => {
        form.children.name.value = dogObject.name
        form.children.breed.value = dogObject.breed
        form.children.sex.value = dogObject.sex
        form.dataset.id = dogObject.id


    }

    const submitFormListener = (form) => {
        const button = form.querySelector('input[type="submit"]');
        button.addEventListener('click', (e) => {
            e.preventDefault()
            if (form.dataset.id) {
                submitForm(form)
            }
        })
    }
    const submitForm = (form) => {
        const dogData = {}
        dogData.id = form.dataset.id
        dogData.name = form.children.name.value
        dogData.breed = form.children.breed.value
        dogData.sex = form.children.sex.value
        console.log(JSON.stringify(dogData))
        fetch(`${dogsUrl}/${dogData.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "response": "application/json"
            },
            body: JSON.stringify(dogData)
        })
        .then(response => response.json())
        .then(data => {
            form.children.name.value = ""
            form.children.breed.value = ""
            form.children.sex.value = ""
            table.querySelectorAll('tr[data-id]').forEach(tr => {
                tr.remove()
            })
            getDogs(dogsUrl)
        })
        .catch(error => console.log(error))
        
    }
    
    
    
    

    getDogs(dogsUrl)
    editDogs(table)
    submitFormListener(editDogForm)
})