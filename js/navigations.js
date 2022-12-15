/*
 * When the user clicks the previous button, the current section is hidden and the previous section is
 * shown.
 * @param sectionContainer - the section that is currently being displayed
 */
export const prevButtonNavigation = (sectionContainer) => {
    sectionContainer.classList.add("hidden")
    sectionContainer.previousElementSibling.classList.add("block")
    sectionContainer.previousElementSibling.classList.remove("hidden")
}


/*
 * When the next button is clicked, hide the current section and show the next section.
 * @param sectionContainer - the section that is currently being displayed
*/
export const nextButtonNavigation = (sectionContainer) => {
    sectionContainer.classList.add("hidden")
    sectionContainer.nextElementSibling.classList.add("block")
    sectionContainer.nextElementSibling.classList.remove("hidden")
    topFunction()
}

// When the user clicks on the button, scroll to the top of the document
const topFunction = () =>  {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}