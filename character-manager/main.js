import axios from "axios";

const main = document.querySelector('main');

async function getCharacter() {
  let res = await axios.get('https://character-database.becode.xyz/characters');
  let datas = res.data;
  console.log(datas);
  datas.forEach(data => {
    const div = document.createElement('div');
    const heading = document.createElement('h2');
    const subHeading = document.createElement('h3');
    const description = document.createElement('p');
    const image = document.createElement('img');
    div.setAttribute('class', 'flex flex-col p-5 mb-4 bg-slate-200 w-80 rounded-lg h-[500px]');
    heading.setAttribute('class','text-center pt-5 pb-2');
    subHeading.setAttribute('class', 'text-center py-2');
    description.setAttribute('class', 'text-center py-2')
    image.setAttribute('src', `data:image/gif;base64, ${data.image}`);
    image.setAttribute('class', 'py-2 mx-auto');
    image.setAttribute('width', '125');
    heading.textContent = data.name;
    subHeading.textContent = data.shortDescription;
    description.textContent = data.description;
    main.append(div);
    div.append(image, heading, subHeading, description);

    console.log(data.id);
  });
}

getCharacter();