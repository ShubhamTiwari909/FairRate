import { lendersData } from './fair-rate-data'
import { prevButtonNavigation, nextButtonNavigation } from './navigations'
const lendersTable = document.getElementById("lenders-table");
let yearFilter = "All";
let priceFilter = "All";
let resultCount = document.querySelector("#result-count");

const mapLendersData = (lendersData) => {

  /* Filtering the data based on the year and price filters. Then it is mapping the data to a new array.
  Then it is joining the array to a string. */
  const data = lendersData.filter(row => {
    if (yearFilter === "All") return row
    return row.timeStamp === yearFilter
  }).filter(row => {
    if (priceFilter === "All") return row
    return row.priceType === priceFilter
  }).map(row => {
    return (
      ` <li class="flex justify-between items-start p-5">
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
            <button class="px-4 py-2 rounded-sm bg-slate-500 text-sm text-slate-200">NEXT</button>
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
  const prevButton = target.closest("#lenders-prev")
  const nextButton = target.closest("#lenders-next")
  const yearFilterValue = target.closest("#years-filter")
  const priceFilterValue = target.closest("#price-filter")
  const filterButton = target.closest("#filter-button")

  /* Checking if the nextButton exists. If it does, it is calling the nextButtonNavigation function and
  passing in the sectionContainer. */
  if (nextButton) {
    nextButtonNavigation(sectionContainer)
  }

  /* Checking if the prevButton exists. If it does, it is calling the prevButtonNavigation function and
  passing in the sectionContainer. */
  if (prevButton) {
    prevButtonNavigation(sectionContainer)
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
})


