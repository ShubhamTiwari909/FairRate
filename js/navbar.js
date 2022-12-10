const primaryNavigation = document.querySelector("#primary-navigation");

/* Adding an event listener to the primary navigation. */
primaryNavigation.addEventListener("click",(e) => {
    const target = e.target.closest(".nav-item");
    const list = e.target.closest("#primary-navigation").querySelectorAll(".nav-item");

    if(target === null) return;

   /* Removing the class text-slate-800 from all the list items and adding the class text-gray-400 to
   all the list items. Then it is checking if the target is a list item and if it is, it is removing
   the class text-gray-400 from the target and adding the class text-slate-800 to the target. */
   list.forEach(item => {
        item.classList.remove("text-slate-800")
        item.classList.add("text-gray-400")
    })

    if(target.matches(".nav-item")){
        target.classList.remove("text-gray-400")
        target.classList.add("text-slate-800")
    }
    
})