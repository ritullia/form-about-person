console.log('veikia')

let url = 'https://httpdump.app/dumps/a6427228-822d-4bed-bcf2-2222e3c5413d'
let data;

// 1. Paspaudziam ant mygtuko paleidziam formos funkcija.

async function formSubmit(event) {

    event.preventDefault()

    // sukuriu kintamaji inputu grupei paimti. 
    let infoCards = document.querySelectorAll('.infos')

    // console.log(infoCards)

    // susikuriu tuscia masyva kuris bus panaudotas objekto kurimui for loop vuduje

    let cardArr = [];

    // infocrads inputu for loop (gauta sarasa isimetam i for loop arba i forEach) 
    for (let i = 0; i < infoCards.length; i++) {
        // console.log(infoCards[i].querySelectorAll('.info'))

        let cardInp = infoCards[i].querySelectorAll('input');
        // console.log('Prasideda korteles inputai')

        let cardObj = {};

        cardInp.forEach(input => {
            // console.log(input)
            const typeInp = input.getAttribute('name');
            const valInp = input.value;
            // console.log(typeInp, valInp)

            cardObj[typeInp] = valInp;

        })

        cardArr.push(cardObj);

        // 4. Issiunciam i serveri info objekto
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(cardArr),
        }).then(function (response) {
            return response.json();
        }).catch(error => console.error('Error:', error));
    }
    createDataCard(cardArr);
    // console.log(cardArr)  
}

// sukuriam funkcija kortelei
function createDataCard(cardArr) {
    document.getElementById('card-wrapper').innerHtml = '';

    cardArr.forEach((data) => {
        let cardWrapper = document.createElement('div');
        cardWrapper.classList.add('data-card-wrapp');

        let seconDiv = document.createElement('div');
        seconDiv.classList.add('data-card');

        let textDiv = document.createElement('div');
        textDiv.classList.add('data-text-card');

        let name = document.createElement('h3');
        name.textContent = 'Name:';

        let person = document.createElement('p');
        person.textContent = data.name;
        person.classList.add('data-text');
       
        let city = document.createElement('h3')
        city.textContent = 'City:';

        let cityName = document.createElement('p');
        cityName.textContent = data.city;
        cityName.classList.add('data-text');

        let profession = document.createElement('h3')
        profession.textContent = 'Profession:';

        let prof = document.createElement('p');
        prof.textContent = data.profession;
        prof.classList.add('data-text');

        let experience = document.createElement('h3')
        experience.textContent = 'Job experience:';

        let exp = document.createElement('p');
        exp.textContent = data.experience;
        exp.classList.add('data-text');

        let hobby = document.createElement('h3');
        hobby.textContent = 'Hobby:';

        let hobbyMine = document.createElement('p');
        hobbyMine.textContent = data.hobby;
        hobbyMine.classList.add('data-text');

        let age = document.createElement('h3');
        age.textContent = 'Age:';
        
        let getAge = document.createElement('p');
        getAge.textContent = data.age;
        getAge.classList.add('data-text');

        seconDiv.append(name, city, profession, experience, hobby, age,);
        textDiv.append(person, cityName,  prof, exp, hobbyMine, getAge);
        cardWrapper.append(seconDiv, textDiv);
        document.getElementById('card-wrapper').append(cardWrapper);
    })
    
    // console.log(cardArr)
    // return data
}

// formos paleidimas, turi buti submit formoai paleisti
let btn = document.querySelector('#my-form');
btn.addEventListener('submit', formSubmit)