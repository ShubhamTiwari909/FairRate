import { nextButtonNavigation } from "./navigations"
import { personalDetailsObj } from './fair-rate-data'
import { validationInputs } from "./validations";

// Accesing the form which contains all the inputs, checkbox and radio buttons
const personalDetails = document.querySelector("#personal-details-form");

// settting time drop down value to default value of 'I don't know'
personalDetailsObj["dateOrTime"] = "I don't Know"

personalDetails.addEventListener("click", (e) => {
    e.stopPropagation()
    const target = e.target
    const sectionContainer = target.closest(".section-container");//current container 

    // if the data-form value has address, then apply the validation to it and change the
    // border color accorindingle,red for empty and green for filled
    if (target.matches('[data-form="address"]')) {
        //keyup event so the validation will be done in realtime on every key-stroke
        /* Adding an event listener to the target element, which is the input field. */
        target.addEventListener("keyup", (e) => {
            const innerTarget = e.target;
            if (innerTarget.value.length <= 0) {
                target.classList.add("border-red-600")
                target.classList.remove("border-green-600")
            }
            else {
                target.classList.add("border-green-600")
                target.classList.remove("border-red-600")
                personalDetailsObj["address"] = target.value
            }
        })
    }

    // If the data-form has an email value, then apply the email validation using regex pattern
    // and change the border accorindingly,red for empty and green for filled
    if (target.matches('[data-form="email"]')) {
        //keyup event so the validation will be done in realtime on every key-stroke
        target.addEventListener("keyup", (e) => {
            const innerTarget = e.target;
            /*checking whether the input field matches the regular expression provided or not
              Checking if the email is valid or not. */
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(innerTarget.value)) {
                target.classList.add("border-green-600")
                target.classList.remove("border-red-600")
                innerTarget.nextElementSibling.classList.add("hidden")
                innerTarget.nextElementSibling.classList.remove("block")

                //setting the email property in the personalDetailsObj object
                personalDetailsObj["email"] = target.value
                return true
            }
            else {
                target.classList.add("border-red-600")
                target.classList.remove("border-green-600")
                innerTarget.nextElementSibling.classList.remove("hidden")
                innerTarget.nextElementSibling.classList.add("block")
                return false;
            }
        })
    }


    // custom dropdown for the time stamp
    if (target.matches("#timestamp-button")) {
        // hidden container which is used for dropdown
        const timestampContainer = document.querySelector("#timestamp-container")
        //toggling the dropdown using toggle method
        timestampContainer.classList.toggle("hidden")
    }

    // Dropdown value will be selected here 
    if (target.matches(".timestamp-text")) {
        const timestampContainer = document.querySelector("#timestamp-container")
        timestampContainer.classList.toggle("hidden")
        const timestampValue = document.querySelector("#timestamp-text")

        // Accessing the dropdown value and setting it's the value choosed
        // from one of the values in the dropdown list
        timestampValue.innerText = target.innerText

        // Setting the dateOrTime property of the personDetailsObj
        personalDetailsObj["dateOrTime"] = timestampValue.innerText

    }


    // accessing All checkboxes
    if (target.matches("[name='house-check']")) {

        // Checking if the value of the checkbox we clicked is present in the 
        // optionals property of the personalDetailsObj,if it is present, delete it
        // and if it is not present , add it in the optionals array
        if (!personalDetailsObj["optionals"].find(item => item === target.value)) {
            personalDetailsObj["optionals"].push(target.value)
        }
        else {
            let delItem = personalDetailsObj["optionals"].indexOf(target.value);
            personalDetailsObj["optionals"].splice(delItem, 1)
        }
    }

    // Accessing the radio buttons which has the alarm options value
    // and setting the alarm property of the  personalDetailsObj using radio button value
    if (target.matches("[name='alarm-check']")) {
        personalDetailsObj["alarm"] = target.value
    }

    // Hiding the current section and making the previos section visible as flex
    if (target.matches(".details-prev-button")) {
        sectionContainer.classList.add("hidden")
        sectionContainer.previousElementSibling.classList.add("flex")
        sectionContainer.previousElementSibling.classList.remove("hidden")
    }

    // Checking if the properties in the personalDetailsObj has some values
    // if it is true, call the nextButtonNavigation function, which wlll hide the 
    // current container and make the next sibling container visible
    if (target.matches(".details-next-button")) {
        if (Object.values(personalDetailsObj).every(x => x.length > 0)) {
            nextButtonNavigation(sectionContainer)
        }
        else {
          validationInputs(sectionContainer,personalDetailsObj)
        }
    }
})
