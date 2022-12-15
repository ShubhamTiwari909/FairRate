import { nameObj, personalDetailsObj, documentFileObj } from "./fair-rate-data";
const newArray = [nameObj, personalDetailsObj, documentFileObj]
const documentImages = document.querySelector("#document-images")

// Reseting the values of all the objects

const mainContainer = document.querySelector("main");
const newApplicationButton = document.querySelector("#new-application-button")

newApplicationButton.addEventListener("click", (e) => {
    const target = e.target;
    const sectionContainer = target.closest(".section-container");

    /* Hiding the current container and setting the first element of the main container
    to block, going back to the first page of app.
    */
    sectionContainer.classList.add("hidden")
    mainContainer.firstElementChild.classList.add("flex")
    mainContainer.firstElementChild.classList.remove("hidden")


    // Selecting all types of inputs used in the app
    const inputField = document.querySelectorAll("input[type='text']");
    const emailField = document.querySelector("input[type='email']")
    const checkboxField = document.querySelectorAll("input[type='checkbox']")
    const radioButtonField = document.querySelectorAll("input[type='radio']")


    // Reseting all the input types of their default values
    inputField.forEach(input => {
        input.value = ""
        input.classList.add("border-gray-300")
    })
    emailField.value = ""
    email.classList.add("border-gray-300")
    checkboxField.forEach(checkbox => {
        checkbox.checked = false
    })
    radioButtonField.forEach(radio => {
        radio.checked = false
    })


    /* Setting all the object properties to empty values if it stores strings and
    empty array if it stores an array
    */
    newArray.forEach(data => {
        Object.keys(data).forEach(key => {
            if (typeof data[key] == 'object') {
                data[key] = []
            }
            else {
                data[key] = ""
            }
        })
    })

    // Removing all the images or pdfs selected in the document sections
    while (documentImages.lastChild) {
        documentImages.lastChild.remove();//removee the last child of "ele"
    }

})
