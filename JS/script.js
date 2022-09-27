"use strict"


async function getAllCountries() {
    const responce = await fetch('https://restcountries.com/v2/all');
    const result = await responce.json()

    render(result)
}

getAllCountries()

function render(alldata = []) {

    if (alldata.length === 0) {
        $('#section').innerHTML = `<span class="loader"></span>`
    } else {
        $('#section').innerHTML = ""
        alldata.forEach(item => {
            const card = create('div', 'card', `
            
            <img src="${item.flags.png}" class="card_img" alt="flags">
            <h2>${item.name}</h2>
            <h4>Poytaxti : <span>${item.capital}</span></h4>
            
            `);
            card.dataset.info = item.name
            $('#section').appendChild(card)

            card.addEventListener('click', (e) => {
                if (card.getAttribute('data-info')) {
                    renderModal(card.getAttribute('data-info').trim().toLowerCase())
                } else {
                    console.log("Atribute yoq");
                }

            })
        });
    }

}

render()


// search country

$('#country_text').addEventListener('keyup', (e) => {
    if (e.target.value.trim()) {
        search(e.target.value.toLowerCase().trim())
    } else {
        $('#section').innerHTML = `<h1 class="danger">Please true country name </h1>`
    }

});


async function search(searchText) {
    const responce = await fetch(`https://restcountries.com/v2/name/${searchText}`);
    const result = await responce.json();
    if (responce.status === 404) {
        $('#section').innerHTML = `<h1>Not found</h1>`
    } else if (responce.status === 200) {
        render(result)
    }
}




async function renderModal(searchText) {
    $('.wrapper').innerHTML = ""; 
    const responce = await fetch(`https://restcountries.com/v2/name/${searchText}`);
    const result = await responce.json();
    const data = result[0]

    const contents = create('div', 'contents', `
    
    <img src="${data.flags.png}"  class="modal-img" alt="flags">
    <h2>${data.name}</h2>
    
    `)
    $('.wrapper').appendChild(contents)



    $('.modal-window').classList.remove('hide')

}



$('.close').addEventListener('click', () => {
    $('.modal-window').classList.add('hide')
})