import axios from 'axios';
import apiKeys from '../apiKeys.json';

// Step 2:
const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllPositionsByMachineId = (machineId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/positions.json?orderBy="machineId"&equalTo="${machineId}"`)
    .then((response) => {
      const demPositions = response.data;
      const positions = [];
      Object.keys(demPositions).forEach((fbId) => {
        demPositions[fbId].id = fbId;
        positions.push(demPositions[fbId]);
      });
      resolve(positions); // Hard code to only return one machine that comes back
    })
    .catch((error) => reject(error));
});

export default { getAllPositionsByMachineId };
