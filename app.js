/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];



/**
 * Defaulted each Kitten Card to Tolerant with 5 Affection
 * Added a nipCount property that is tied to the Catnip function
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
    nipCount: 0,
  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
}



/**
 * Saves Kittens to Local Storage then Draws the Kittens with the latest saved data
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}



/**
 * Loads Kittens from Local Storage
 * Added functionality that modifies the amount of displayed kittens on the Welcome page buttons
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
    document.getElementById("release").classList.remove("hidden")
    if (kittens.length == 1) {
      document.getElementById("release").innerText = "RELEASE YOUR KITTEN";
    } else {
      document.getElementById("release").innerText = "RELEASE YOUR " + kittens.length + " KITTENS";
    }
  }
  if (kittens.length == 0) {
    document.getElementById("get-started").innerText = "START YOUR CAT COLONY";
  } else if (kittens.length == 1) {
    document.getElementById("get-started").innerText = "VISIT YOUR KITTEN";
  } else {
    document.getElementById("get-started").innerText = "VISIT YOUR " + kittens.length + " KITTENS";
  }
}



/**
 * Added a Release Kittens button to the Get Started page, which clears the Local Storage
 * Included a Reload Page function to refresh the Session storage and incorporated the Get Started function On Load
 * This allows the Release Kittens button to function the same as the Start Your Colony button
 */
function releaseKittens() {
  localStorage.clear();
  reloadPage();
}

window.onload = function () {
  let reload = sessionStorage.getItem("reload");
  if (reload) {
    sessionStorage.removeItem("reload");
    getStarted();
  }
}

function reloadPage() {
  sessionStorage.setItem("reload", "true");
  document.location.reload();
}



/**
 * Removes a specific Kitten from Local Storage
 * Framework was pulled from the Contacts assignment and modified to fit this project
 */
function removeKitten(kittenId) {
  let index = kittens.findIndex(kitten => kitten.id == kittenId)
  kittens.splice(index, 1)
  saveKittens()

}



/**
 * Draw all of the Kittens to the Kittens Element
 * Incorporated an If Statement into the forEach function to dynamically display the .kitten.mood CSS
 * Modified the "Happy" game state to "win" the game and incorporated a link to ASPCA's adoption page
 * Modified the "Gone" game state to incorporate the "Remove Kitten" function
 * Incorporated a third game state "Nipped" that incorporates the "Nipped" function
 * kittensTemplate framework was pulled from the Contacts assignment and modified to fit this project
 */
function drawKittens() {
  let kittensListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    let hidden = '';
    let red = '';
    let green = '';
    let purple = '';
    let away = 'hidden';
    let win = 'hidden';
    let adopt = 'hidden';
    let release = 'hidden';
    let nip = 'hidden';
    if (kitten.mood == "Nipped") {
      hidden = 'hidden'
      purple = 'text-purple'
      nip = ''
    } else if (kitten.mood == "Gone") {
      hidden = 'hidden'
      red = 'text-red'
      away = ''
      release = ''
    } else if (kitten.mood == "Happy") {
      hidden = 'hidden'
      green = 'text-green'
      win = ''
      adopt = ''
    }

    kittensTemplate += `
   <div id="kittens" class="p-2 m-1 shadow bg-dark text-light kitten-card ${red} ${green} ${purple}">
    <img src="https://robohash.org/${kitten.name}?set=set4" class="kitten ${kitten.mood.toLowerCase()}"/>
    <label>
    <p class = ${hidden}> <strong>Name:</strong> ${kitten.name} </p>
    <p class = ${hidden}> <strong>Mood:</strong> ${kitten.mood} </p>
    <p class = ${hidden}> <strong>Affection:</strong> ${kitten.affection} </p>
    <p class = ${away}> <strong> ${kitten.name} has gone to find a new colony!</strong> </p>
    <p class = ${win}> <strong>${kitten.name} has found their forever home!</strong> </p>
    <p class = ${nip}> <strong> Looks like ${kitten.name} is taking a nap!</strong> </p>
    </label>
    <div class= "d-flex space-between ${hidden}">
        <button class= "btn-cancel shadow" id="pet-button" onclick="pet('${kitten.id}')"> <strong> PET </strong> </button>
        <button  class = "shadow" id="catnip-button" onclick="catnip('${kitten.id}')"> <strong> CATNIP </strong> </button>
    </div>
    <div class= "d-flex justify-content-center ${adopt}">
         <form action="https://www.aspca.org/adopt-pet/adoptable-cats-your-local-shelter" target="_blank">
         <button class = "shadow" type="submit"> <strong> You're ready to adopt your very own kitten! </strong> </button>
         </form>
    </div>
    <div class= "d-flex justify-content-center ${release}">
         <button class= "btn-cancel shadow" onclick="removeKitten('${kitten.id}')"> <strong> Time to make room for some more kittens! </strong> </button>
    </div>
    <div class= "d-flex justify-content-center ${nip}">
         <button class= "btn-nipped shadow" onclick="nipped('${kitten.id}')"> <strong> You can try to wake them up, but please be gentle! </strong> </button>
    </div>
   </div>
  `
  })
  kittensListElement.innerHTML = kittensTemplate
}



/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}



/**
 * Find the kitten in the array of kittens
 * Modify the Kitten's affection and nipCount using Math.random and If / Else
 * 70% chance to lower the kitten's affection by 1, and 30% chance to raise it by 1
 * 10% chance to lower the kitten's nipCount by 1
 * Calls setKittenMood and saveKittens
 * Saves the Kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id)
  let random = Math.random()
  if (random > .7) {
    kitten.affection += 1
  } else {
    kitten.affection -= 1
  }
  if (random > .9) {
    kitten.nipCount -= 1
  }
  setKittenMood(kitten)
  saveKittens()
}



/**
 * Find the kitten in the array of kittens
 * Sets the Kitten's Affection to 5
 * Adds 1 to the nipCount to act as a limiter
 * If nipCount >= 3, the "Nipped" state is invoked
 * Calls setKittenMood and saveKittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.affection = 5;
  kitten.nipCount += 1;
  setKittenMood(kitten);
  saveKittens();
}



/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * Added a mood related to the nipCount variable, Nipped >= 3
 * Incorporated && operators to not override the "Happy" or "Gone" mood states
 * Used an If / Else chain from least to greatest value
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.nipCount >= 3 && kitten.affection > 0 && kitten.affection < 7) {
    kitten.mood = "Nipped";
  } else if (kitten.affection <= 0) {
    kitten.mood = "Gone";
  } else if (kitten.affection <= 3) {
    kitten.mood = "Angry";
  } else if (kitten.affection <= 5) {
    kitten.mood = "Tolerant";
  } else if (kitten.affection > 6) {
    kitten.mood = "Happy";
  }
}



/**
 * Function is tied to a button that appears when the nipCount >=3
 * Has a 50% chance of lowering the nipCount by 1, and a 50% chance of lowering the affection by 1
 * Is meant as a limiter to the number of times the Catnip function can be used
 * Calls setKittenMood and saveKittens
 */
function nipped(id) {
  let kitten = findKittenById(id);
  if (Math.random() >= .5) {
    kitten.nipCount -= 1;
  } else {
    kitten.affection -= 1;
  }
  setKittenMood(kitten);
  saveKittens();
}



/**
 * Removes the Welcome element and removes the .hidden class from the Add Kitten input field
 * Draws the Kittens
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("add-kitten").classList.remove("hidden")
  drawKittens();
}



/**
 * @typedef {{id: string;name: string;mood: string;affection: number;nipCount: number;}} NewType
 */

/**
 * Defines the Properties of a Kitten
 * Added the nipCount property with a value of "number"
 * @typedef {NewType} Kitten
 */



/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}


/**
 * Loads the Kittens from Local Storage, ensuring a default up-to-date Kittens element
 * Also updates the Welcome buttons by default with the approriate number of Kittens
 */
loadKittens()


