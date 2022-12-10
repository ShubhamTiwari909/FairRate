import { fairestResultsData } from './fair-rate-data'
import { prevButtonNavigation, nextButtonNavigation } from './navigations'

const fairestResults = document.querySelector("#fairest-results")
const monthlySlider = document.querySelector("#max-per-month-slider")
const pointsSlider = document.querySelector("#max-points-slider")
let monthlySliderValue = document.querySelector("#max-per-month-value")
let pointsSliderValue = document.querySelector("#max-points-value")

let monthlyFilter = ""
let pointsFilter = ""
let fairTypeFilter = []
let fairTimeFilter = []
let fairLevelFilter = []

/* Setting the initial value of the slider. */
monthlySliderValue.innerText = monthlySlider.value
pointsSliderValue.innerText = pointsSlider.value



const mapFareResults = (fairestResultsData) => {
  /**
   * It takes a string as an argument and returns a string that is the value of a key in an object.
   * @param value - The value of the label
   * @returns The value of the key in the object.
   * It returns the value based on the input, this value is the tailwing background class
   */
  const labelColors = (value) => {
    const colorPallete = {
      Fixed_15: "bg-light-green",
      Fixed_20: "bg-sky-blue",
      Fixed_30: "bg-dark-blue",
      Adjustable_10: "bg-light-violet",
      Adjustable_7: "bg-light-purple",
      Adjustable_5: "bg-dark-pink",
    }
    return colorPallete[value]
  }


  /*Filtering the result based on 5 filters monthly-filter,points/credits 
   * andfilter,type filter - fixed or adjustable
   * time or year filter, level filter 10/1,7/1 or 5/1 and 
   * returning the filtered data and mapping it to the list.
   * Labelcolor function uses the value of label value of fixed or adjustable 
   * and time or level like 15 or 20 or 10/1 or 7/1 and returning the background
   * class according to the object key value
   */
  let resultData = fairestResultsData.filter(row => {
    if (monthlyFilter === "") return row
    return row.perMonth <= monthlyFilter
  }).filter(row => {
    if (pointsFilter === "") return row
    return row.pointsCredits <= pointsFilter
  }).filter(row => {
    if (fairTypeFilter.length === 0) return row
    return fairTypeFilter.includes(row.fairType)
  }).filter(row => {
    if (fairTimeFilter.length === 0) return row
    return fairTimeFilter.includes(row.timeStamp)
  }).filter(row => {
    if (fairLevelFilter.length === 0) return row
    return fairLevelFilter.includes(row.timeStamp)
  }).map(row => {
    const { timeStamp, fairType, fairRate, apr, pointsCredits, pointsCreditsBar, perMonth, perMonthBar } = row;
    return (
      `
            <li class="grid grid-cols-4 border-b-2 border-slate-200 pb-3">
            <p class="text-sm">
              <span
                class="inline-block px-2 py-1 text-white rounded-2xl ${labelColors(`${fairType}_${timeStamp}`)}"
                >${timeStamp} ${timeStamp > 10 ? "years" : "/1"}</span
              >
              <span class="inline-block px-2 py-1 rounded-2xl bg-gray-100 ml-2"
                >${fairType}</span
              >
            </p>
            <p class="text-slate-800 text-lg font-thin">
              ${fairRate}% <span class="text-gray-400">/ ${apr}%</span>
            </p>
            <div class="flex gap-2 items-center">
              <p class="text-slate-800 text-lg font-thin underline">-$${pointsCredits}</p>

              <div
                class="w-24 bg-gray-200 rounded-full h-2 bg-gray-100"
              >
                <div
                  class="h-2 rounded-full ${labelColors(`${fairType}_${timeStamp}`)}"
                  style="width: ${pointsCreditsBar}%"
                ></div>
              </div>
            </div>
            <div class="flex gap-2 items-center justify-self-end">
              <p class="text-slate-800 text-lg font-thin">$${perMonth}</p>

              <div
                class="w-24 bg-gray-200 rounded-full h-2 bg-gray-100"
              >
                <div
                  class="h-2 rounded-full ${labelColors(`${fairType}_${timeStamp}`)}"
                  style="width: ${perMonthBar}%"
                ></div>
              </div>
            </div>
          </li>
            `
    )
  }).join('');

  /* Setting the innerHTML of the fairestResults element to the resultData. */
  fairestResults.innerHTML = resultData;
}


/* Mapping the data to the list. */
mapFareResults(fairestResultsData)


// Changing the slider input
monthlySlider.addEventListener("input", (e) => {
  monthlySliderValue.innerText = e.target.value
})

pointsSlider.addEventListener("input", (e) => {
  pointsSliderValue.innerText = e.target.value
})


// Applying the filter
/* Setting the value of the monthlyFilter variable to the value of the slider. */
monthlySlider.addEventListener("change", (e) => {
  monthlyFilter = e.target.value
  mapFareResults(fairestResultsData)
})


document.querySelector("body").addEventListener("click", (e) => {
  const target = e.target;
 /* Checking if the target is the closest to the element with the name attribute of fairtype-check,
 fairtime-check or fairlevel-check. */
  const fairType = target.closest("[name='fairtype-check']")
  const fairTime = target.closest("[name='fairtime-check']")
  const fairLevel = target.closest("[name='fairlevel-check']")

  /* Checking if the target is the closest to the element with the class of section-container,
  prev-button or next-button. */
  const sectionContainer = target.closest(".section-container")
  const prevButton = target.closest(".prev-button")
  const nextButton = target.closest(".next-button")

 
  if (fairType) {
    filterSetting(target.value, fairTypeFilter)
  }
  if (fairTime) {
    filterSetting(Number.parseInt(target.value), fairTimeFilter)
  }
  if (fairLevel) {
    filterSetting(Number.parseInt(target.value), fairLevelFilter)
  }
  /* 
    Checking if the target is the closest to the element with the class of section-container,
    prev-button or next-button. If it is, it is calling the nextButtonNavigation or
    prevButtonNavigation function.
    The nextButtonNavigation function is checking if the sectionContainer is the closest to the
    element with the class of section-container. If it is, it is checking if the sectionContainer has
    the class of active. If it does, it is removing the class of active from the sectionContainer and
    adding the class of active to the next sibling of the sectionContainer.
    The prevButtonNavigation function is checking if the sectionContainer is the closest to the
    element with the class of section-container. If it is, it is checking if the sectionContainer has
    the class of active. If it does, it is removing the class of active from the sectionContainer and
    adding the class of active to the previous sibling of the sectionContainer. 
  */

  if (nextButton) {
    nextButtonNavigation(sectionContainer)
  }

  if (prevButton) {
    prevButtonNavigation(sectionContainer)
  }
})


/**
 * If the target is not undefined, check if the filterArray includes the target. If it does, remove the
 * target from the filterArray. If it doesn't, add the target to the filterArray.
 * @param target - the value of the checkbox that was clicked
 * @param filterArray - this is an array that contains the filter settings.
 */
const filterSetting = (target, filterArray) => {
  if (target !== undefined) {
    if (filterArray.includes(target)) {
      let index = filterArray.indexOf(target)
      filterArray.splice(index, 1)
    }
    else {
      filterArray.push(target)
    }
    mapFareResults(fairestResultsData)
  }
}