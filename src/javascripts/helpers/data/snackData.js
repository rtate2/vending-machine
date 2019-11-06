import axios from 'axios';
import apiKeys from '../apiKeys.json';

// Step 4:
const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSnacksByUid = (uId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks.json?orderBy="uId"&equalTo="${uId}"`)
    .then((response) => {
      const demSnacks = response.data;
      const snacks = [];
      Object.keys(demSnacks).forEach((fbId) => {
        demSnacks[fbId].id = fbId;
        snacks.push(demSnacks[fbId]);
      });
      resolve(snacks); // Hard code to only return one machine that comes back
    })
    .catch((error) => reject(error));
});

const addNewSnack = (newSnack) => axios.post(`${baseUrl}/snacks.json`, newSnack);

export default { getSnacksByUid, addNewSnack };
