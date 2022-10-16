// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gallery = document.querySelector(".gallery");
const card = document.getElementsByClassName('card');
let index = '';
const body = document.querySelector("body");
let prevButton;
let nextButton;
let modalClose;
let modalContainer;
let searchInput;

addSearch();

// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

//Function to add employess to display    
function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let state = employee.location.state;
    let picture = employee.picture;
    employeeHTML += `
    <div class="card" data-index="${index}">
        <div class="card-img-container">
        <img class="card-img" src="${picture.large}" />
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state}</p>
        </div>
    </div>
    `
    });
    gallery.innerHTML = employeeHTML;
}

//Add search bar and event listener on search bar 
function addSearch() {
    const search = document.querySelector('.search-container');
    search.innerHTML +=
    `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

    searchInput = document.querySelector('#search-input');
 
}

//Modal functionality
function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                <img class="modal-img" src="${picture.large}" alt="profile picture">
                <div class="text-container">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    `;
    body.insertAdjacentHTML('beforeend', modalHTML);
    modalContainer = document.querySelector(".modal-container");
   
    //Modal Close button
    modalClose = document.querySelector(".modal-close-btn");
    modalClose.addEventListener('click', () => {
        modalContainer.remove();
        });
    
    //Left and right arrow buttons

    prevButton = document.querySelector('.modal-prev');
    nextButton = document.querySelector('.modal-next');
    nextButton.addEventListener("click", e =>{
        if (index != 11) {
        index = Number.parseInt(index, 10) + 1;
        modalContainer.remove();
        displayModal(index);
        } else {
        index = 0;
        modalContainer.remove();   
        displayModal(index);   
        }
    })
    prevButton.addEventListener("click", e =>{
        if (index != 0) {
        index = Number.parseInt(index, 10) - 1;
        modalContainer.remove();
        displayModal(index);
        } else {
        index = 11;
        modalContainer.remove();  
        displayModal(index);
        }
});

}

    gallery.addEventListener('click', e => {
        // make sure the click is not on the gallery itself
        if (e.target !== gallery) {
        // select the card element based on its proximity to actual element clicked
            const card = e.target.closest(".card");
            index = card.getAttribute('data-index');
            displayModal(index);
        }
    });
 
    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
   
        for (i = 0; i < card.length; i++) {
            if (!card[i].innerHTML.toLowerCase().includes(value)) {
                card[i].style.display="none";
            } else {
            card[i].style.display = "";
            }}
   
   
    })

body.style.backgroundColor = "#d6ccc2";