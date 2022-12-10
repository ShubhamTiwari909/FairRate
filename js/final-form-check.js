import {nextButtonNavigation} from './navigations'

const advertEventButton = document.querySelector("#get-started-button")

/* An event listener that listens for a click event on the advertEventButton. When the event is
triggered, it prevents the default action of the event, gets the target of the event, gets the
closest section-container to the target, and then calls the nextButtonNavigation function with the
sectionContainer as an argument. */
advertEventButton.addEventListener("click",(e) => {
    e.preventDefault()
    const target = e.target
    const sectionContainer = target.closest(".section-container")
    nextButtonNavigation(sectionContainer)
})