// ************* NAME SECTION *************
// focus name field when page loads
const nameElem = document.getElementById('name')

nameElem.focus()

// ************* JOB ROLE SECTION *************
// get job search and other option elements
const title = document.getElementById('title')
console.log(title)
const otherJob = document.getElementById('other-job-role');
console.log(otherJob)

// hide other job role description
otherJob.style.display = "none"

// event listener to watch for drop down option selected
title.addEventListener("change", (event) => {
    const selected = event.target.value;
    console.log("selected value", selected)

    if(selected === "other"){
        otherJob.style.display = 'block'
    } else {
        otherJob.style.display = "none"
    }
})

// ************* T-SHIRT SECTION *************
const design = document.getElementById('design')
console.log(design)
const color = document.getElementById('color')
console.log(color)

// disable color from being selected
color.disabled = true;


design.addEventListener("change", (event) => {
    color.disabled = false;

    // design selected by user
    const designSelected = event.target.value;
    console.log(event)

    // loop over color children to check theme and hide/display each child
    for(let i=0; i < color.children.length; i++){
        const colorOption = color.children[i];
        const themeOption = colorOption.getAttribute('data-theme')

        if(designSelected === themeOption){
            colorOption.hidden = false;
            colorOption.selected = true;
        } else {
            colorOption.hidden = true;
            colorOption.selected = false;
        }
    }
});

// ************* REGISTER FOR ACTIVITIES SECTION *************
const register = document.getElementById("activities")
console.log(register)
let total = document.getElementById("activities-cost")
console.log(total)
let cost = 0;

register.addEventListener('change', (event)=>{
    // check price and convert to int - add/subtract if checked
    const dataCost = +event.target.getAttribute("data-cost")
    console.log(typeof(dataCost))
    if(event.target.checked){
        cost += dataCost
    } else {
        cost -= dataCost
    }
    // update cost
    total.innerHTML = `Total $${cost}`
})

// ************* PAYMENT SECTION *************
const paymentMethod = document.getElementById('payment')
console.log(paymentMethod)
const creditCard = document.getElementById('credit-card')
console.log(creditCard)
const paypal = document.getElementById('paypal')
paypal.hidden = true;
console.log(paypal)
const bitcoin = document.getElementById('bitcoin')
console.log(bitcoin)
bitcoin.hidden = true;
let selectedPayment = '';

paymentMethod.children[1].setAttribute('selected', 'true')

paymentMethod.addEventListener("change", (event) => {
    selectedPayment = event.target.value;

    switch (selectedPayment){
        case 'credit-card':
            creditCard.style.display = 'block'
            paypal.style.display = 'none'
            bitcoin.style.display = 'none'
            break;
        case 'paypal':
            paypal.style.display = 'block'
            bitcoin.style.display = 'none'
            creditCard.style.display = 'none'
            break;
        case 'bitcoin':
            bitcoin.style.display = 'block'
            creditCard.style.display = 'none'
            paypal.style.display = 'none'
            break;
    }
})


// ************* FORM VALIDATION SECTION *************
const form = document.querySelector("form")
const email = document.getElementById('email')
const cardNumberInput = document.getElementById("cc-num")
const zipCodeInput = document.getElementById("zip")
const cvvInput = document.getElementById("cvv")
const checkedBox = register.querySelectorAll('input[type="checkbox"]')



form.addEventListener("submit", (event) => {
    console.log(selectedPayment)
    // check name field
    if(!(/^[a-z\s]+$/i.test(nameElem.value))){
        alert('Please enter vaild name.')
        event.preventDefault();
    }

    // check email field
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
    }

    // check that one activity has been selected by looping over activities
    let activty = false;
    for(let i = 0; i < checkedBox.length; i++){
        if(checkedBox[i].checked){
            activty = true;
            break;
        }
    }

    // if activity value still false alert user
    if(!activty){
        alert("Please select at least one activity to register for.")
        event.preventDefault();
    }
    console.log(selectedPayment)
    
    // check if payment method credit card to validate extra fields if so
    if (selectedPayment === 'credit-card') {
        console.log("help")
        const cardNumberValue = cardNumberInput.value.trim();
        const zipCodeValue = zipCodeInput.value.trim();
        const cvvValue = cvvInput.value.trim();

        // Validate credit card fields
        if (!/^\d{13,16}$/.test(cardNumberValue)) {
          alert('Please enter valid credit card (number 13-16 digits).');
          event.preventDefault();
          return;
        }

        if(!/^\d{5}$/.test(zipCodeValue)) {
            alert('Please enter valid 5 digit zip code.');
            event.preventDefault();
            return;
        }

        if(!/^\d{3}$/.test(cvvValue)){
            alert('Please enter valid 3 digit CVV.');
            event.preventDefault();
            return;
        }
      }
})

// ************* ACCESSIBILITY SECTION *************
// add focus to selected activities
checkedBox.forEach(checkbox => {
    checkbox.addEventListener('focus', (event) => {
        event.target.parentElement.classList.add('focus');
    })

    checkbox.addEventListener('blur', (event) => {
        event.target.parentElement.classList.remove('focus');
    })
});

nameElem.addEventListener('blur', () => {
    const nameValue = nameElem.value.trim();
    const nameLabel = nameElem.parentElement;
    const nameHint = document.getElementById('name-hint')

    if (nameValue === '') {
        // name field is invalid
        nameLabel.classList.add('not-valid');
        nameLabel.classList.remove('valid');
        nameHint.style.display = 'block'; 
      } else {
        // name field is valid
        nameLabel.classList.remove('not-valid'); 
        nameLabel.classList.add('valid');
        nameHint.style.display = 'none'; 
      }
    });

email.addEventListener('blur', () => {
    const emailValue = email.value.trim();
    const emailLabel = email.parentElement;
    const emailHint = document.getElementById('email-hint')
    if (emailValue === '') {
        // email field is invalid
        emailLabel.classList.add('not-valid');
        emailLabel.classList.remove('valid');
        emailHint.style.display = 'block'; 
        } else {
        // email field is valid
        emailLabel.classList.remove('not-valid'); 
        emailLabel.classList.add('valid');
        emailHint.style.display = 'none'; 
        }
    });

register.addEventListener('blur', () => {
    const activitesLabel = register.children[1]
    console.log(activitesLabel)
    const activitiesHint = document.getElementById("activities-hint")
    if (register.value.trim() === '') {
        // register field is invalid
        register.classList.add('not-valid');
        register.classList.remove('valid');
        activitiesHint.style.display = 'block'; 
        } else {
        // register field is valid
        register.classList.remove('not-valid'); 
        register.classList.add('valid');
        activitiesHint.style.display = 'none'; 
        }
    });
const cc = document.getElementById("cc-num")
cc.addEventListener('blur', () => {
    const ccLabel = cc.parentElement;
    const creditCardNumHint = document.getElementById("cc-hint")
    if (cc.value.trim() === '') {
        // cc field is invalid
        ccLabel.classList.add('not-valid');
        ccLabel.classList.remove('valid');
       creditCardNumHint.style.display = 'block'; 
        } else {
        // cc field is valid
        ccLabel.classList.remove('not-valid'); 
        ccLabel.classList.add('valid');
        creditCardNumHint.style.display = 'none'; 
        }
    });

const zip = document.getElementById("zip")
zip.addEventListener('blur', () => {
    const zipLabel = zip.parentElement;
    const zipHint = document.getElementById("zip-hint")
    if (zip.value.trim() === '') {
        // zip field is invalid
        zipLabel.classList.add('not-valid');
        zipLabel.classList.remove('valid');
        zipHint.style.display = 'block'; 
        } else {
        // zip field is valid
        zipLabel.classList.remove('not-valid'); 
        zipLabel.classList.add('valid');
        zipHint.style.display = 'none'; 
        }
    });

const cvv = document.getElementById("cvv")
cvv.addEventListener('blur', () => {
    const cvvLabel = cvv.parentElement;
    const cvvHint = document.getElementById("cvv-hint")
    if (cvv.value.trim() === '') {
        // cvv field is invalid
        cvvLabel.classList.add('not-valid');
        cvvLabel.classList.remove('valid');
        cvvHint.style.display = 'block'; 
        } else {
        // cvv field is valid
        cvvLabel.classList.remove('not-valid'); 
        cvvLabel.classList.add('valid');
        cvvHint.style.display = 'none'; 
        }
    });