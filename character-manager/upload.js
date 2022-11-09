// Create character

const userCharacterName = document.getElementById('userCharacterName');
const userCharacterNickname = document.getElementById('userCharacterNickname');
const userCharacterDescription = document.getElementById('userCharacterDescription');
const userCharacterImg = document.getElementById('userCharacterImg');
const btnSaveChanges = document.getElementById('saveChanges');

btnSaveChanges.addEventListener('click', () => {
  const newCharacter = {      // get the value of the input
    description: userCharacterDescription.value,
    shortDescription: userCharacterNickname.value,  
    name: userCharacterName.value
  }

  console.log(newCharacter)
})