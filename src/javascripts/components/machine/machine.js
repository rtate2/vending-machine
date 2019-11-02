import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import snacks from '../snacks/snacks';

import './machine.scss';

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then((positions) => {
      let domString = '<h2>VENDING MACHINE</h2>';
      domString += '<div id="snack-section" class="d-flex flex-wrap">';
      positions.forEach((position) => {
        domString += snacks.makeASnack(position);
      });
      domString += '</div>';
      utilities.printToDom('stock', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildTheMachine };

// build a domString
// h2 that says VENDING MACHINE
// div with an id = snack-section, class=d-flex flex-wrap
// forEach over positions - call a component called snacks
// snacks componenet should return a bootstrap card
// printToDom('stock', domString)
