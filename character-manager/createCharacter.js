import axios from "axios";

// Create character

const userCharacterName = document.getElementById('userCharacterName');
const userCharacterNickname = document.getElementById('userCharacterNickname');
const userCharacterDescription = document.getElementById('userCharacterDescription');
const userCharacterImg = document.getElementById('userCharacterImg');
const btnSaveChanges = document.getElementById('saveChanges');
const btnDelete = document.getElementById('btnDelete')
let dataImg;
let newCharacter;

//  function to add a character
async function addCharacter() {
  try {
    let res = await axios.post('https://character-database.becode.xyz/characters', newCharacter)
    console.log(res.data);
    document.location.href = 'index.html'
  } catch(err) {
    console.log(err)
  }
}

// convert the img in data and display a preview of the image
function encode() {
  const selectedfile = document.getElementById("userCharacterImg").files;    // get the img
  if (selectedfile.length > 0) {      // if there is a file 
    const imageFile = selectedfile[0];    // take the first element of the array
    const fileReader = new FileReader();    // new FileReader method
    fileReader.onload = function(fileLoadedEvent) {   // function onload
      const srcData = fileLoadedEvent.target.result;    
      const newImage = document.createElement('img'); // create a new img
      newImage.setAttribute('width', '125px');
      newImage.setAttribute('class', 'mx-auto shadow-xl')
      newImage.src = srcData;   // set the data as the source of the new img
      document.getElementById("imgPreview").innerHTML = newImage.outerHTML;  // div to display image
      dataImg = srcData.split(",")[1];    // only get the data of the image
      console.log(dataImg); // log the data of the img
    }
    fileReader.readAsDataURL(imageFile);
  }
};

userCharacterImg.addEventListener('change', () => encode());

btnSaveChanges.addEventListener('click', () => {

  // get the users values

  newCharacter = {      // get the value of the input
    description: userCharacterDescription.value,
    shortDescription: userCharacterNickname.value,  
    name: userCharacterName.value,
    image: dataImg
  }

  // add character

  addCharacter()

  console.log(newCharacter)
})

btnDelete.addEventListener('click', () => {
  document.location.href = 'index.html'
})