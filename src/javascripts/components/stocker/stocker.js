import smash from '../../helpers/data/smash';
import './stocker.scss';
import utilities from '../../helpers/utilities';
import stockCard from '../stockCard/stockCard';

const buildTheStocker = (uId) => {
  smash.getSnacksWithPositions(uId)
    .then((snacks) => {
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += '<div class="d-flex flex-wrap>';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDom('stock', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
