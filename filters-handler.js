
let timeoutID;

function filterStudents(currentInput) {

    clearTimeout(timeoutID);
    setTimeoutForFiltration(currentInput);
}

function setTimeoutForFiltration(currentInput) {
  timeoutID = setTimeout( () => {
    const filtredArrStudents = makeFiltration();
    const currentBtn = null;
    manageClassActiveOfBtnsSort(currentBtn)
    renderStudents(filtredArrStudents);
  }, 1000);


}

function makeFiltration() {

  const $inputsCollection = document.querySelectorAll('.filter__input');
  let filtredArrStudents = arrStudents.slice();;

  $inputsCollection.forEach(function (input) {
    if (input.value !== '') {
      let filterKey = input.dataset.filterBy;

      if (input.type === 'number') {
        let requestValue = new Date(input.value);
        filtredArrStudents = filtredArrStudents.filter(obj => obj[filterKey].getFullYear() === requestValue.getFullYear());
      } else {
        filtredArrStudents = filtredArrStudents.filter(function (obj) {
          return obj[filterKey].toLowerCase()
          .includes(
            input.value.toLowerCase()
            .trim()
          )
        })
      }
    }
  })
  return filtredArrStudents;
}
