import axios from "axios";


async function doGetRequest() {

  let res = await axios.get('https://character-database.becode.xyz/characters');

  let data = res.data;
  console.log(data);
}
