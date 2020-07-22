document.addEventListener('DOMContentLoaded', () => {

const table = document.getElementById("table-body")
// const button = document.getElementsByTagName("button")
// console.log(button)


    function fetchDogs(){
        fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => renderDog(dog)))
    }



    function renderDog(dog){
        const dogTr = document.createElement("tr")
        dogTr.dataset.id = dog.id
        dogTr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button class=editbutton id=${dog.id}>Edit</button></td></tr>`
        table.append(dogTr)
   }

   
   

        editbutton.addEventListener("click",function(e){







     })


    //  function patchDog(http://localhost:3000/dogs/'${id}', newDogobj){
    //     fetch ({
    //             method: "PATCH",
    //             headers: {"Content-Type": "application/json",
    //             Accept: "application/json"
    //           },
    //           body: JSON.stringify({
    //             name: `${newDogobj.name}
    //             breed: ${newDogobj.breed}
    //             sex: ${newDogobj.sex}`
    //           })
    //           .then(resp => resp.json())
    //           .then(newDogobj => renderDog(newDogobj))
    //           })
        



   






   fetchDogs()



})