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
    mood: "tolerant",
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
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
   <div class="kitten-card card bg-dark text-light wide-boi p-3">
    <img src="https://robohash.org/${kitten.name}?set=set4"/>
    <p> Name: ${kitten.name} </p>
    <p> Mood: ${kitten.mood} </p>
    <p> Affection: ${kitten.affection} </p>
      <div class= "d-flex space-between">
        <button class= "btn-cancel" id="pet-button" onclick="pet()">PET</button>
        <button  id="catnip-button" onclick="catnip()">CATNIP</button>
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

}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {

}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {

}

function getStarted() {
  document.getElementById("welcome").remove();
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