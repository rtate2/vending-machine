import machineData from './machineData';
import positionData from './positionData';
import snackPositionData from './snackPositionData';

const getCompleteMachine = () => new Promise((resolve, reject) => {
  // 1. getMachines - returns first machine (hard coding) - DONE
  // 2. use machineId to get all positions for that machine - DONE
  // 3. use machineId to get all snack positions - DONE
  // 4. use uId of snackPositions/positions to get available snacks for that machine
  // 5. SMASH EM' - return an array of postiions (in order A1, A2, A3, B1 ...) so positions
  // should have position.snack if a snack exists at that posiiton
  machineData.getMachine()
  // chaining beginning
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => resolve(snackPositions));
    })
  // chaining ending
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
