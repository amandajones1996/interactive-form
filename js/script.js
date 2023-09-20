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

paymentMethod.children[1].setAttribute('selected', 'true')

paymentMethod.addEventListener("change", (event) => {
    const selectedPayment = event.target.value;

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
const nameInput = nameElem.value

form.addEventListener("submit", (event) => {
    
    // check name field
    if(!/^[a-zA-Z\s]+$/.test(nameInput)){
        alert('Please enter vaild name.')
        event.preventDefault
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

    // check if payment method credit card to validate extra fields if so
    if (paymentMethod === 'credit-card') {
        // Validate credit card fields
        if (!/^\d{13,16}$/.test(cardNumberInput.value) || !/^\d{5}$/.test(zipCodeInput.value) || !/^\d{3}$/.test(cvvInput.value)) {
          alert('Please enter valid credit card information.');
          event.preventDefault();
        }
      }
})

// ************* ACCESsIBILITY SECTION *************
const nameHint = document.getElementById('name-hint')
const emailHint = document.getElementById('email-hint')
const activitiesHint = document.getElementById("activities-hint")
const cc = document.getElementById("cc-num")
const creditCardNumHint = document.getElementById("cc-hint")
const zip = document.getElementById("zip")
const zipHint = document.getElementById("zip-hint")
const cvv = document.getElementById("cvv")
const cvvHint = document.getElementById("cvv-hint")
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
    if (nameElem.value.trim() === '') {
        // name field is invalid
        nameElem.classList.add('not-valid');
        nameElem.classList.remove('valid');
        nameHint.style.display = 'block'; 
      } else {
        // name field is valid
        nameElem.classList.remove('not-valid'); 
        nameElem.classList.add('valid');
        nameHint.style.display = 'none'; 
      }
    });

email.addEventListener('blur', () => {
    if (email.value.trim() === '') {
        // email field is invalid
        email.classList.add('not-valid');
        email.classList.remove('valid');
        emailHint.style.display = 'block'; 
        } else {
        // email field is valid
        email.classList.remove('not-valid'); 
        email.classList.add('valid');
        emailHint.style.display = 'none'; 
        }
    });

register.addEventListener('blur', () => {
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

cc.addEventListener('blur', () => {
    if (cc.value.trim() === '') {
        // cc field is invalid
        cc.classList.add('not-valid');
        cc.classList.remove('valid');
       creditCardNumHint.style.display = 'block'; 
        } else {
        // cc field is valid
        cc.classList.remove('not-valid'); 
        cc.classList.add('valid');
        creditCardNumHint.style.display = 'none'; 
        }
    });

zip.addEventListener('blur', () => {
    if (zip.value.trim() === '') {
        // zip field is invalid
        zip.classList.add('not-valid');
        zip.classList.remove('valid');
        zipHint.style.display = 'block'; 
        } else {
        // zip field is valid
        zip.classList.remove('not-valid'); 
        zip.classList.add('valid');
        zipHint.style.display = 'none'; 
        }
    });

cvv.addEventListener('blur', () => {
    if (cvv.value.trim() === '') {
        // cvv field is invalid
        cvv.classList.add('not-valid');
        cvv.classList.remove('valid');
        cvvHint.style.display = 'block'; 
        } else {
        // cvv field is valid
        cvv.classList.remove('not-valid'); 
        cvv.classList.add('valid');
        cvvHint.style.display = 'none'; 
        }
    });