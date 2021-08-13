// Form validation script

// --- Get form element ---
const form = document.querySelector(".intro__form");
form.noValidate = true;  // Disable HTML5 validation

// An object to hold the validation functions
const validations = {
    text: function(el) {  // Text validation
        if (el.value === "") {
            setErrorMode(el);

            let message;
            if (el.id === "first-name") {
                message = "First Name";
            } else if (el.id === "last-name") {
                message = "Last Name";
            } else {
                message = "This Field";
            }

            setErrorMessage(el, message + " cannot be empty");
            return false;
        }

        return true;
    },

    email: function(el) {  // Email validation
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(el.value)) {
            setErrorMode(el);
            setErrorMessage(el, "Looks like this is not and email");
            return false;
        }

        return true;
    },

    password: function(el) {  // Text validation
        if (el.value === "") {
            setErrorMode(el);
            setErrorMessage(el, "Password cannot be empty");
            return false;
        }

        return true;
    }
}

// --- Main validation function ---
form.addEventListener("submit", function(e) {
    let isFormValid = true;
    resetErrorMessages(form);  // Reset error messages

    // Selecting elements that have not passed validation
    for (let i = 0; i < form.elements.length - 1; i++) {
        let currentElement = form.elements[i]
        let isElementValid = validations[currentElement.type](currentElement);
        
        if (!isElementValid) {
            isFormValid = false;
        }
    }

    if (!isFormValid) e.preventDefault();  // Disable form submit
});


// --- Functions ---

// Function reset all inputs
function resetErrorMessages(f) {
    for (let i = 0; i < f.elements.length; i++) {
        let currentElement = f.elements[i];

        if (currentElement.classList.contains("intro__input--error")) {
            currentElement.classList.remove("intro__input--error");
            setErrorMessage(currentElement, "");
        }
    }
}

// Function to set under input error message
function setErrorMessage(el, msg) {
    document.getElementById(el.id + "-error-message").innerHTML = msg;
}

// Function to turn input into error mode
function setErrorMode(el) {
    el.classList.add("intro__input--error");
}
