import axios from "axios";

// get every elements

const singleCharacterName = document.getElementById('singleCharacterName');
const singleCharacterDescription = document.getElementById('singleCharacterDescription');
const singleCharacterNickname = document.getElementById('singleCharacterNickname');
const singleCharacterImg = document.getElementById('singleCharacterImg');
const btnDelete = document.getElementById('btnDelete');

// get the url and split it to get the id

const url = window.location.href;
const id = url.split('=')[1];


btnDelete.addEventListener('click', () => {
    if (window.confirm("Do you really want to delete this character?")) {
        deleteCharacter();
        setTimeout(() => {
          window.open("index.html");    // need to test that part
        }, 3000);
      } else {
        console.log("This character is still there!");
      }
})


async function getSingleCharacter() {
    try {
  
      // GET method
  
      let res = await axios.get(`https://character-database.becode.xyz/characters/${id}`);
      let data = res.data;
      singleCharacterName.textContent = data.name;
      singleCharacterNickname.textContent = data.shortDescription;
      singleCharacterDescription.textContent = data.description;
        
      singleCharacterImg.setAttribute('src', `data:image/gif;base64, ${data.image}`);
      singleCharacterImg.setAttribute('width', '125');
      singleCharacterImg.setAttribute('class', 'shadow-xl mx-auto rounded-full my-4');

    } catch(err) {
        console.log(err);
    }
}

getSingleCharacter()


    //    function to delete a character

async function deleteCharacter() {
  try {
    let res = await axios.delete(`https://character-database.becode.xyz/characters/${id}`)
    console.log(res.data); // we can redirect to the index page
  } catch(err) {
    console.log(err)
  }
}