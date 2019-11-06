/* eslint-disable no-use-before-define */
import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import smash from '../../helpers/data/smash';
import './stocker.scss';
import utilities from '../../helpers/utilities';
import stockCard from '../stockCard/stockCard';
import snackPositionData from '../../helpers/data/snackPositionData';
import snackData from '../../helpers/data/snackData';

import machine from '../machine/machine';

const deleteFromMachine = (e) => {
  e.preventDefault();
  const { uId } = firebase.auth().currentUser;
  snackPositionData.deleteSnackPosition(e.target.id)
    .then(() => {
      // esling-disable
      buildTheStocker(uId);
      machine.buildTheMachine();
    })
    .catch((error) => console.error(error));
};

const addNewSnack = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newSnack = {
    imageUrl: $('#snack-image-url').val(),
    name: $('#snack-name').val(),
    price: $('#snack-price').val() * 1,
    currentStocked: 0,
    lifetimeNum: 0,
    uId: uid,
  };
  snackData.addNewSnack(newSnack)
    .then(() => {
      $('#exampleModal').modal('hide');
      buildTheStocker(uid);
    })
    .catch((error) => console.error(error));
};

const buildTheStocker = (uId) => {
  smash.getSnacksWithPositions(uId)
    .then((snacks) => {
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add Snack
      </button>`;
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDom('stock', domString);
      $('#stock').on('click', '.delete-snack-position', deleteFromMachine);
      $('#stock').on('click', '.add-snack-position', addToMachine);
      $('#add-new-snack').click(addNewSnack);
    })
    .catch((error) => console.error(error));
};

const addToMachine = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const inputText = $(e.target).siblings().val();
  smash.getAvailablePositions()
    .then((positions) => {
      const selectedPosition = positions.find((x) => x.position.toLowerCase() === inputText.toLowerCase());
      if (selectedPosition) {
        const newSnackPosition = {
          positionId: selectedPosition.id,
          snackId: e.target.id,
          machineId: 'machine1',
          uId: uid,
        };
        snackPositionData.createSnackPosition(newSnackPosition).then(() => {
          // esling-disable-next-line no-use-fore-define
          buildTheStocker(uid);
          machine.buildTheMachine();
        });
      }
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
