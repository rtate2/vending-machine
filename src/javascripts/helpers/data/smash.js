import machineData from './machineData';
import positionData from './positionData';

const getCompleteMachine = () => new Promise((resolve, reject) => {
  machineData.getMachine()
  // 1. getMachines - returns first machine (hard coding)
  // 2. use machineId to get all positions for that machine
  // 3. use machineId to get all snack positions
  // 4. use uId of snackPositions/positions to get available snacks for that machine
  // 5. SMASH EM' - return an array of postiions (in order A1, A2, A3, B1 ...) so positions
  // should have position.snack if a snack exists at that posiiton
  // chaining beginning
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => resolve(positions))
  // chaining ending
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
