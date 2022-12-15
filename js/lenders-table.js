import { lendersData } from './fair-rate-data'
import { prevButtonNavigation, nextButtonNavigation } from './navigations'

const lendersTable = document.getElementById("lenders-table");

/* Setting the value of the pageNumberValue to the pageNumber variable. */
const pageNumberValue = document.querySelector("#page-number")

let pageNumber = 0;
pageNumberValue.value = pageNumber

let yearFilter = "All";
let priceFilter = "All";
let resultCount = document.querySelector("#result-count");

// For pagination
let startIndex = 0;
let endIndex = 10;

const mapLendersData = (lendersData) => {

  /* Filtering the data based on the year and price filters. Then it is mapping the data to a new array.
  Then it is joining the array to a string. */
  const data = lendersData.filter(row => {
    if (yearFilter === "All") return row
    return row.timeStamp === yearFilter
  }).filter(row => {
    if (priceFilter === "All") return row
    return row.priceType === priceFilter
  }).slice(startIndex, endIndex).map(row => {
    return (
      ` <li class="flex justify-between items-start p-3.5">
            <div class=" flex-1">
              <img
                src="${row.logo}"
                alt="lender-logo"
                width="100px"
                height="80px"
                loading="lazy"
              />
              <p class="text-xs text-gray-400 mt-3">
                NMLS ID: ${row.nmlsId}
              </p>
            </div>
            <p class="text-xl text-blue-400 flex-1">
              ${row.apr}% APR <span class="block text-gray-400 text-xs">${row.date}</span>
            </p>
            <p class="text-sm text-slate-700 font-bold flex-1">
              ${row.rate}% Rate
              <span class="block text-gray-400 text-xs font-normal mt-1"
                >1 Point</span
              >
              <span class="block text-gray-400 text-xs font-normal mt-1"
                >30 Rate Lock</span
              >
            </p>
            <p class="text-xl text-blue-400 flex-1">
              $${row.estPayment}<span class="text-sm text-gray-400">/mo</span>
              <span class="block text-gray-400 text-xs font-normal mt-1"
                >1 Point</span
              >
              <span class="block text-gray-400 text-xs font-normal mt-1"
                >30 Rate Lock</span
              >
            </p>
            <p class="text-slate-700 text-sm font-bold flex-1">
              ${row.phone}
              <span class="block text-gray-400 text-xs font-normal mt-1"
                >Toll-free, no obligations</span
              >
            </p>
            <button class="px-4 py-2 rounded-sm bg-slate-500 text-sm text-slate-200 next-btn">NEXT</button>
          </li>`
    )
  }).join("")

  /* Setting the innerHTML of the lendersTable to the data variable. Then it is setting the innerHTML of
  the resultCount to the number of children of the lendersTable. */
  lendersTable.innerHTML = data;
  resultCount.innerHTML = `${lendersTable.children.length} Results for ${priceFilter} xied in 64117`
}

mapLendersData(lendersData)


document.querySelector("body").addEventListener("click", (e) => {
  const target = e.target
  const sectionContainer = target.closest(".section-container")
  const paginationPrevious = target.closest("#lenders-prev")
  const paginationNext = target.closest("#lenders-next")
  const yearFilterValue = target.closest("#years-filter")
  const priceFilterValue = target.closest("#price-filter")
  const filterButton = target.closest("#filter-button")


  /* Checking if the nextButton is clicked. If it is, then it is checking if the endIndex is less than
  the length of the lendersData. If it is, then it is incrementing the startIndex and endIndex by 10.
  Then it is calling the mapLendersData function and passing in the lendersData. */
  if (paginationNext) {
    if (endIndex < lendersData.length) {
      startIndex += 10;
      endIndex += 10;
      pageNumber += 1;
    }
    pageNumberValue.value = pageNumber;
    mapLendersData(lendersData)
  }

  /* Checking if the prevButton is clicked. If it is, then it is checking if the endIndex is less than
    20. If it is, then it is setting the startIndex to 0 and the endIndex to 10. If it is not, then
  it is
    decrementing the startIndex and endIndex by 10. Then it is calling the mapLendersData function
  and passing in
    the lendersData. */
  if (paginationPrevious) {
    if (endIndex < 20) {
      startIndex = 0;
      endIndex = 10;
    } else {
      startIndex -= 10;
      endIndex -= 10;
      pageNumber -= 1;
    }
    pageNumberValue.value = pageNumber;
    mapLendersData(lendersData)
  }

  /* Setting the yearFilter and priceFilter variables to the value of the target. */
  if (yearFilterValue) {
    yearFilter = target.value;
  }
  if (priceFilterValue) {
    priceFilter = target.value;
  }

  /* Preventing the default behavior of the filterButton. Then it is calling the mapLendersData
  function and passing in the lendersData. */
  if (filterButton) {
    e.preventDefault()
    mapLendersData(lendersData)
  }

  if (target.matches(".next-btn")) {
    nextButtonNavigation(sectionContainer)
  }
})




pageNumberValue.addEventListener("change", (e) => {
 /* Converting the value of the pageNumberValue to a number. */
  let value = Number.parseInt(e.target.value)

  /* Checking if the value is greater than the length of the lendersData divided by 10. If it is, then it
  is setting the value to the length of the lendersData divided by 10. If it is not, then it is checking
  if the value is less than 0. If it is, then it is setting the value to 0. */
  if (value > Math.floor(lendersData.length / 10)) {
    value = Math.floor(lendersData.length / 10);
    e.target.value = value
  }
  else if (value < 0) {
    value = 0;
    e.target.value = value
  }

  /* start index will be 10 times the page number value 
  bacause the each page has 10 rows, if the page number is 5, 
  then the start index will be 50 and end index will be 60
  */
  startIndex = value * 10;
  endIndex = startIndex + 10
  pageNumber = value
  mapLendersData(lendersData)
})