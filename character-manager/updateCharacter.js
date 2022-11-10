import axios from "axios";

// get every elements

const userCharacterName = document.getElementById('userCharacterName');
const userCharacterDescription = document.getElementById('userCharacterDescription');
const userCharacterNickname = document.getElementById('userCharacterNickname');
const userCharacterImg = document.getElementById('userCharacterImg');
const btnCancel = document.getElementById('btnCancel');
const btnSaveChanges = document.getElementById('saveChanges');
const imgPreview = document.getElementById('imgPreview');
let dataImg;
let updatedCharacter;

// get the url and split it to get the id

const url = window.location.href;
const id = url.split('=')[1];

console.log(id)


//    function to edit a character



// function to get the data of the character

async function getSingleCharacter() {
    try {
  
      // GET method
  
      let res = await axios.get(`https://character-database.becode.xyz/characters/${id}`);
      let data = res.data;
      // display all the datas
      userCharacterName.value = data.name;
      userCharacterNickname.value = data.shortDescription;
      userCharacterDescription.textContent = data.description;
      const userCurrentCharacterImg = document.createElement('img'); // create a new img
      userCurrentCharacterImg.setAttribute('src', `data:image/gif;base64, ${data.image}`);
      userCurrentCharacterImg.setAttribute('width', '125px');
      userCurrentCharacterImg.setAttribute('class', 'mx-auto shadow-xl rounded-full');
      imgPreview.append(userCurrentCharacterImg);
    } catch(err) {
        console.log(err);
    }
}
getSingleCharacter()

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
      imgPreview.innerHTML = newImage.outerHTML;  // div to display image
      dataImg = srcData.split(",")[1];    // only get the data of the image
      console.log(dataImg); // log the data of the img
    }
    fileReader.readAsDataURL(imageFile);
  }
};

userCharacterImg.addEventListener('change', () => encode());

btnSaveChanges.addEventListener('click', () => {

  // get the users values

  updatedCharacter = {      // get the value of the input
    description: userCharacterDescription.value,
    shortDescription: userCharacterNickname.value,  
    name: userCharacterName.value,
    image: dataImg
  }

  // update the character

  updateCharacter()
})

async function updateCharacter() {
  try {
    let res = await axios.put(`https://character-database.becode.xyz/characters/${id}`, updatedCharacter)   //    add the id
    document.location.href = 'index.html'
  } catch(err) {
    console.log(err)
  }
}

btnCancel.addEventListener('click', () => {
  document.location.href = 'index.html'
})


// if the image isn't change image = data.image
// if the image change = dataImg