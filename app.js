/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
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

/* cat 
{id: string, name: string, mood: string, affection: number}} Kitten
*/

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}
/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
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
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    let hidden = '';
    let red = '';
    let away = 'hidden';
    if (kitten.mood == "Gone") {
      hidden = 'hidden'
      red = 'red-text'
      away = ''
    }
    kittensTemplate += `
   <div id="kittens" class="p-2 m-1 shadow bg-dark text-light kitten-card ${red}">
    <img src="https://robohash.org/${kitten.name}?set=set4" class="kitten ${kitten.mood.toLowerCase()}"/>
    <label>
    <p> <strong>Name:</strong> ${kitten.name} </p>
    <p class = ${hidden}> <strong>Mood:</strong> ${kitten.mood} </p>
    <p class = ${hidden}> <strong>Affection:</strong> ${kitten.affection} </p>
    <p class = ${away}> <strong>Left your colony!</strong> </p>
    </label>
    <div class= "d-flex space-between ${hidden}">
        <button class= "btn-cancel" id="pet-button" onclick="pet('${kitten.id}')">PET</button>
        <button  id="catnip-button" onclick="catnip('${kitten.id}')">CATNIP</button>
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
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
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
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
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

loadKittens()

/** DELETE BEFORE LAUNCH *

getStarted()

/** DELETE BEFORE LAUNCH */