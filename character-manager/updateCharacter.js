// get every elements



// markdown  
var simplemde = new SimpleMDE({ element: document.getElementById("userCharacterDescription") });

const userCharacterName = document.getElementById('userCharacterName');
const userCharacterDescription = document.getElementById('userCharacterDescription');
const userCharacterNickname = document.getElementById('userCharacterNickname');
const userCharacterImg = document.getElementById('userCharacterImg');
const btnCancel = document.getElementById('btnCancel');
const btnSaveChanges = document.getElementById('saveChanges');
const imgPreview = document.getElementById('imgPreview');
let dataImg;
let updatedCharacter;
let imgUri;

// get the url and split it to get the id
const url = window.location.href;
const id = url.split('=')[1];

// function to get the data of the character

async function getSingleCharacter() {
    try {
      const res = await fetch(`https://character-database.becode.xyz/characters/${id}`);
      const data = await res.json();
      userCharacterName.value = data.name;
      userCharacterNickname.value = data.shortDescription;
      simplemde.value(`${data.description}`);
      const currentCharacterImg = document.createElement('img'); // create a new img
      currentCharacterImg.setAttribute('src', `data:image/gif;base64, ${data.image}`);
      currentCharacterImg.setAttribute('width', '125px');
      currentCharacterImg.setAttribute('class', 'mx-auto shadow-xl rounded-full');
      imgPreview.append(currentCharacterImg);
      imgUri = data.image;
      console.log(data.description)
    } catch(err) {
        console.log(err);
    }
}
getSingleCharacter()


// function to update the character

async function updateCharacter() {
  try {
    const res = await fetch(`https://character-database.becode.xyz/characters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCharacter)
    });
    document.location.href = 'index.html'
  } catch(err) {
    console.log(err)
  }
}


userCharacterImg.onchange = function() {
  if(this.files[0].size > 800000){
     alert("The image is too big!");
     this.value = "";
  };
};

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
    }
    fileReader.readAsDataURL(imageFile);
  }
};

userCharacterImg.addEventListener('change', () => encode());

btnSaveChanges.addEventListener('click', () => {
  if (dataImg == undefined) {
    updatedCharacter = {      // get the value of the input
      description: simplemde.value(),
      shortDescription: userCharacterNickname.value,  
      name: userCharacterName.value,
      image: imgUri    // get the new image
    }
  } else {
    updatedCharacter = {      // get the value of the input
      description: simplemde.value(),
      shortDescription: userCharacterNickname.value,  
      name: userCharacterName.value,
      image: dataImg   // get the current image
    }
  
  }
  updateCharacter()
})

btnCancel.addEventListener('click', () => {
  document.location.href = 'index.html'
})