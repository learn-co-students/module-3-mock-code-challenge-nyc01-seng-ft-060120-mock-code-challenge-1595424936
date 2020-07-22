
const URL_BASE = 'http://localhost:3000/dogs/';

const getDogs = () => {
    fetch(URL_BASE)
    .then(response => response.json())
    .then(dogs => {
        console.log(dogs);
        //clear the table if anything in it
        document.getElementById('table-body').innerHTML = '';
        dogs.forEach(dog => {
            renderDog(dog);
        });
        editButtonListener();
    })
}

const renderDog = (dog) => {
    //make the elements
    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const breed = document.createElement('td');
    const sex = document.createElement('td');
    const buttonTD = document.createElement('td');
    const button = document.createElement('button');
    //deal with button
    button.innerText = 'Edit';
    button.id = dog.id; //this is for later
    buttonTD.appendChild(button);
    //deal with attributes
    name.innerText = dog.name;
    breed.innerText = dog.breed;
    sex.innerText = dog.sex;
    //give the row its columns
    tr.appendChild(name);
    tr.appendChild(breed);
    tr.appendChild(sex);
    tr.appendChild(buttonTD);
    //append to table body
    document.getElementById('table-body').appendChild(tr);
}
const editButtonListener = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            editDoggo(e.target);
        })
    });
}

const editDoggo = (target) => {
    const id = target.id;
    const form = document.getElementById('dog-form');
    const row = target.parentNode.parentNode;
    console.log(row)
    //get everything but the buttons from the form and the row
    const inputs = form.children;
    const values = row.children;
    for (i = 0; i < inputs.length-1; i++){
        inputs[i].value = values[i].innerText;
    }
    console.log(form.lastElementChild)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        doggo = {
            name: inputs[0].value,
            breed: inputs[1].value,
            sex: inputs[2].value
        }
        submitDoggo(id, doggo)
        //form.reset();
        
    })
}

const submitDoggo = (id, doggo) => {
    const url = URL_BASE+id
    fetch(url, {
        method: 'PATCH',
        headers: { 
            'Content-type':'application/json',
            Accept:'application/json'
        },
        body: JSON.stringify(doggo)
    })
    .then(response => response.json())
    .then(dog => {
        console.log(dog);
        document.getElementById('dog-form').reset();
        getDogs();
    })
}

const main = () => {
    getDogs();
}
document.addEventListener('DOMContentLoaded', main)