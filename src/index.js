document.addEventListener('DOMContentLoaded', () => {
    const DOG_URL = "http://localhost:3000/dogs"
    const tableBody = document.getElementById('table-body')
    const form = document.getElementById('dog-form')
    const formName = form.firstElementChild
    const formBreed = formName.nextElementSibling
    const formSex = formBreed.nextElementSibling

    function getDogs() {
        fetch(DOG_URL)
            .then(resp => resp.json())
            .then(json => placeDogs(json))
    }

    function placeDogs(obj) {
        for(const dog in obj) {
            const dogRow = document.createElement('tr')
            dogRow.dataset.id = obj[dog]["id"]
            dogRow.innerHTML = `
                <th class='padding center'>${obj[dog]["name"]}</th>
                <th class='padding center'>${obj[dog]["breed"]}</th>
                <th class='padding center'>${obj[dog]["sex"]}</th>
                <th class='padding center'><button>Edit Dog</button></th>
            `
            tableBody.append(dogRow)
        }
    }

    function getDogInfo(id) {
        fetch(`${DOG_URL}/${id}`)
            .then(resp => resp.json())
            .then(json => {
                formName.value = json["name"]
                formBreed.value = json["breed"]
                formSex.value = json["sex"]
                form.dataset.id = json["id"]
            })
    }

    function updateDogInfo(form){
        let formData = {
            name: formName.value,
            breed: formBreed.value,
            sex: formSex.value
        }
        let configObj = {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch(`${DOG_URL}/${form.dataset.id}`, configObj)
            .then(resp => resp.json())
            .then(() => {
                tableBody.innerHTML = ''
                getDogs()
            })
        form.reset()
    }

    getDogs()

    tableBody.addEventListener('click', function(e) {
        if (e.target.tagName === "BUTTON") {
            getDogInfo(e.target.parentElement.parentElement.dataset.id)
        }
    })

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        updateDogInfo(e.target)
    })

})