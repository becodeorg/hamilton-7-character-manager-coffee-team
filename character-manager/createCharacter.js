// Create character

const userCharacterName = document.getElementById('userCharacterName');
const userCharacterNickname = document.getElementById('userCharacterNickname');
const userCharacterDescription = document.getElementById('userCharacterDescription');
const userCharacterImg = document.getElementById('userCharacterImg');
const btnCreateCharacter = document.getElementById('createCharacter');
const btnCancel = document.getElementById('cancel')
let dataImg;
let newCharacter;

//  function to add a character
async function addCharacter() {
  try {
    const res = await fetch('https://character-database.becode.xyz/characters/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCharacter)
    });
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
    }
    fileReader.readAsDataURL(imageFile);
  }
};

userCharacterImg.addEventListener('change', () => encode());

btnCreateCharacter.addEventListener('click', () => {

  // get the users values
  newCharacter = {
    description: userCharacterDescription.value,
    shortDescription: userCharacterNickname.value,  
    name: userCharacterName.value,
    image: dataImg
  }
  addCharacter()
})

btnCancel.addEventListener('click', () => {
  document.location.href = 'index.html'
})