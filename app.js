/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];



/**
 * Defaulted each Kitten Card to Tolerant with 5 Affection
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5
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
 * Incorporated an If Statement into the forEach function to dynamically display the .kitten.gone CSS
 * kittensTemplate framework was pulled from the Contacts assignment and modified to fit this project
 */
function drawKittens() {
  let kittensListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    let hidden = '';
    let red = '';
    let green = '';
    let away = 'hidden';
    let win = 'hidden';
    let adopt = 'hidden';
    let release = 'hidden';
    if (kitten.mood == "Gone") {
      hidden = 'hidden'
      red = 'text-red'
      away = ''
      release = ''
    }
    if (kitten.mood == "Happy") {
      hidden = 'hidden'
      green = 'text-green'
      win = ''
      adopt = ''
    }
    kittensTemplate += `
   <div id="kittens" class="p-2 m-1 shadow bg-dark text-light kitten-card ${red} ${green}">
    <img src="https://robohash.org/${kitten.name}?set=set4" class="kitten ${kitten.mood.toLowerCase()}"/>
    <label>
    <p class = ${hidden}> <strong>Name:</strong> ${kitten.name} </p>
    <p class = ${hidden}> <strong>Mood:</strong> ${kitten.mood} </p>
    <p class = ${hidden}> <strong>Affection:</strong> ${kitten.affection} </p>
    <p class = ${away}> <strong> ${kitten.name} has gone to find a new colony!</strong> </p>
    <p class = ${win}> <strong>${kitten.name} has found their forever home!</strong> </p>
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
         <button class= "btn-cancel shadow" id="pet-button" onclick="removeKitten('${kitten.id}')"> <strong> Time to make room for some more kittens! </strong> </button>
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
 * Modify the Kitten's affection using Math.random and If / Else (> .7 Increases Affection, else Decreases)
 * Tied the setKittenMood function to occur in tandem with any changes in Affection
 * Saves the Kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id);
  let affection = kitten.affection;
  if (Math.random() > .7) {
    affection += 1;
  } else {
    affection -= 1;
  }
  kitten.affection = affection;
  setKittenMood(kitten);
  saveKittens();
}



/**
 * Find the kitten in the array of kittens
 * Sets the Kitten's Affection to 5
 * Tied the setKittenMood function to occur in tandem with any changes in Affection
 * Saves the Kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.affection = 5;
  setKittenMood(kitten);
  saveKittens();
}



/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * Used an If / Else chain from least to greatest value
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection <= 0) {
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
 * Removes the Welcome element and removes the .hidden class from the Add Kitten input field
 * Draws the Kittens
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("add-kitten").classList.remove("hidden")
  drawKittens();
}



/**
 * @typedef {{id: string;name: string;mood: string;affection: number;}} NewType
 */

/**
 * Defines the Properties of a Kitten
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
