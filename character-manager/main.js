import axios from "axios";

const cardWrapper = document.getElementById('cardWrapper');
const searchBar = document.getElementById('searchBar');

const updateNewCharacter = {
  description: 'This is a description',
  shortDescription: 'This is a short description',  
  name: 'Name',
  image: `iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAEp1JREFUeF7tnHewFcUSxr82YlZUzAqKEQxYBoxYmANiTogYUMAyYPaZURTxGR4mDJgxh1LECCZUVMyYEBQxJ0RURIzz6jfscvfu3XN29oSrf9hVp9B7Zmdnv9PT4eueNf0rVSFgVV1dp4udc3NIml/SXJJmk/SHpGlmNqNOt6x42r8VQOdcK0kbSFpXUjtJbSUtK6llBBzgxfKXpOmSvpI0SdJ4SW9KGiPpbTMD5GaXZgXQOQcgG0vqKmk7SWtEQFX74FMlPS3pIUn3m9nkaicMvb5ZAHTOtZZ0qKT9JS0furgKx/0m6XFJ10kaXm/NrCuAzjm25n8k7SIJu9bcwla/SNKQetnPugDonFtF0oAIuKQdqxuA33//vRZeeGGZZT7SF5LOlHRjrTWypgA65+aVdLqkYyMPWhfAPvvsM3399deaMWOGFltsMa266qq65pprdMEFF+iggw7SMccco3nnZSlN5A1JfczsxVotrGYAOudwDjdFnrTi9QHMt99+K+ecWrRooZYtW2qRRRbRbLM1KPLw4cN144036vnnn/dADh48WIcddpj/9/TTT1eHDh00YsSIUtqIt/4fP3QttnXVAEae9WRJ/Wph5x555BGNHDlSb7/9tv98+eWXHsjllltOK664otq2bauVVlpJrVu31lJLLeW18Mgjj9Shhx7q//3mm2/UpUsXPfnkk5pvvvnK/ZBo495mRjhUsVQFoHOOYPdWSTtXvAJJP/30k6699lrNOeecWnrppWd90D6263777ac33uB5Z0qsjX/9RWg4U7B9AwcO1AknnKBnn31Wm2yySSOtLbE+wp9uZvZwpeuvGEDn3JJR3IWnrVgmTZqkffbZR4suuqi3WwD2+eef648//vDbk63MJylzzTWXrr76am233Xbi+pdffln33nuvRo8erXfeeUdt2rTRHHMEO3229JFmdlUlD1ERgFFcN6JaezdmzBh17drVa8vKK6/sNQYNXGGFFTRgwAAPSClh7IUXXugdRixsW7b0DjvsILSTMXjnc845RxdffHEePv8xs/PzBqW/Lwygc45U6xlJKxa9WXL8sGHD/Nb8+eefg6dp1aqV2rdvr9VXX11rrLGG/2y22WaaffbZG82BE+IHiEHb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`
}

async function getCharacter() {
  try {

    // GET method

    let res = await axios.get('https://character-database.becode.xyz/characters/');
    let datas = res.data;
    console.log(datas);

    // loop through all the datas 

    datas.forEach(data => {

      // create the elements 

      const div = document.createElement('div');
      const heading = document.createElement('h2');
      const subHeading = document.createElement('h3');
      const description = document.createElement('p');
      const image = document.createElement('img');
      const btnSeeMore = document.createElement('button');

      // set the styles

      div.setAttribute('class', 'flex flex-col m-auto rounded-2xl bg-white bg-opacity-20 shadow-xl w-3/4 md:w-2/5 xl:w-1/5')
      heading.setAttribute('class', 'text-white opacity-100 m-auto my-4 text-x')
      subHeading.setAttribute('class', 'text-white opacity-100 m-auto my-4 text-lg')
      description.setAttribute('class', 'm-4 p-2 text-white h-[250px] overflow-hidden text-justify')
      btnSeeMore.setAttribute('class', 'font-sans bg-purple-900 hover:bg-purple-500 text-white py-2 px-4 rounded-full w-1/2 mx-auto my-5')
      image.setAttribute('src', `data:image/gif;base64, ${data.image}`);      // transform the URI in img 
      image.setAttribute('class', 'shadow-xl mx-auto rounded-full my-4');
      image.setAttribute('width', '125');

      // button see more

      btnSeeMore.textContent = 'See more'
      btnSeeMore.addEventListener('click', () => {

        // get the element of the single page 

        // display the data on the single page 


        document.location.href = `https://character-database.becode.xyz/characters/${data.id}`;
      })

      // put the data in the tag

      heading.textContent = data.name;
      subHeading.textContent = data.shortDescription;
      description.textContent = data.description;
      cardWrapper.append(div);
      div.append(image, heading, subHeading, description, btnSeeMore);


      // search bar

      searchBar.addEventListener('keyup', () => {
        let filter = searchBar.value;     // get the value input in the search bar
        let txtValue = data.name;         
        filter = filter.toUpperCase();
        txtValue = txtValue.toUpperCase();    // not case sensitive

        if (txtValue.indexOf(filter) > -1) {  // idk but it works
          div.style.display = "";
        } else {
          div.style.display = "none";
        }
      })

      console.log(data.name)
      console.log(data.id);
    })
  
  } catch (err) {
    console.log(err)
  }
}

getCharacter();

//    function to add a character

// async function addCharacter() {
//   try {
// let res = await axios.post('https://character-database.becode.xyz/characters', newCharacter)
//     console.log(res.data);
//   } catch(err) {
//     console.log(err)
//   }
// }

// addCharacter()   


//    function to edit a character

// async function updateCharacter() {
//   try {
// let res = await axios.put('https://character-database.becode.xyz/characters/eb4d61c9-4e65-476d-a65e-dbcc6fa1a6d5', updateNewCharacter)   //    add the id
//     console.log(res.data); // we can redirect to the index page
//   } catch(err) {
//     console.log(err)
//   }
// }

// updateCharacter()


//    function to delete a character

// async function deleteCharacter() {
//   try {
// let res = await axios.delete('https://character-database.becode.xyz/characters/e3951391-e7d6-4f0e-902c-ea0186d90067')
//     console.log(res.data); // we can redirect to the index page
//   } catch(err) {
//     console.log(err)
//   }
// }

// deleteCharacter()



// function encode() {
//   const selectedfile = document.getElementById("myinput").files;    // get the img
//   if (selectedfile.length > 0) {      // if there is a file 
//     const imageFile = selectedfile[0];    // take the first element of the array
//     const fileReader = new FileReader();    // new FileReader method
//     fileReader.onload = function(fileLoadedEvent) {   // function onload
//       const srcData = fileLoadedEvent.target.result;    
//       const newImage = document.createElement('img'); // create a new img
//       newImage.src = srcData;   // set the data as the source of the new img
//       document.getElementById("dummy").innerHTML = newImage.outerHTML;  // dummy = div to display image
//       document.getElementById("txt").value = document.getElementById("dummy").innerHTML;    // display in a text box the data of the img
//     }
//     fileReader.readAsDataURL(imageFile);
//   }
// }