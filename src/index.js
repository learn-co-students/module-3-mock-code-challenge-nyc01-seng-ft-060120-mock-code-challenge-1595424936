
const URL_BASE = 'http://localhost:3000/dogs/';

const getDogs = () => {
    fetch(URL_BASE)
    .then(response => response.json())
    .then(dogs => {
        console.log(dogs);
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
            
        })
    });
}

const main = () => {
    getDogs();
}
document.addEventListener('DOMContentLoaded', main)