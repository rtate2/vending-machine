import './snacks.scss';

const makeASnack = (position) => {
  let domString = '';
  if (position.snack.name) {
    domString += `
    <div></div>
      <div class="card col-4">
        <img src="${position.snack.imageUrl}" class="card-img-top" alt="${position.snack.name}">
        <div class="card-body">
          <h5 class="card-title snackName">${position.snack.name}</h5>
          <p class="card-text">${position.snack.price}</p>
          <p class="card-text">${position.position}</p>
        </div>
      </div>
    `;
  } else {
    domString += `
    <div class="card col-4">
        <div class="card-body">
          <h5 class="card-title snackName">${position.snack.name}</h5>
          <p class="card-text">${position.snack.price}</p>
          <p class="card-text">${position.position}</p>
        </div>
      </div>
      `;
  }
  return domString;
};

export default { makeASnack };
