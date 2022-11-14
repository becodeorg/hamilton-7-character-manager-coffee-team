const cardWrapper = document.getElementById('cardWrapper');
const searchBar = document.getElementById('searchBar');

async function getCharacter() {
  try {

    // GET method

    const res = await fetch('https://character-database.becode.xyz/characters/');
    const datas = await res.json();

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
      heading.setAttribute('class', 'text-white opacity-100 m-auto my-4 text-2xl max-w-[90%] overflow-hidden')
      subHeading.setAttribute('class', 'text-white opacity-100 m-auto my-4 text-xl max-w-[90%] overflow-hidden')
      description.setAttribute('class', 'm-4 p-2 text-white h-[250px] overflow-hidden text-justify')
      btnSeeMore.setAttribute('class', 'font-sans bg-purple-900 hover:bg-purple-500 text-white py-2 px-4 rounded-full w-1/2 mx-auto my-5')
      image.setAttribute('src', `data:image/gif;base64, ${data.image}`);      // transform the URI in img 
      image.setAttribute('class', 'shadow-xl mx-auto rounded-full my-4');
      image.setAttribute('width', '125');

      // button see more

      btnSeeMore.textContent = 'See more'
      btnSeeMore.addEventListener('click', () => {
          // go to another page to display the character
        document.location.href = `./single_character.html?id=${data.id}`;        
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