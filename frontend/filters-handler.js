
let timeoutID;

function filterStudents(arrStudents) {

    clearTimeout(timeoutID);
    setTimeoutForFiltration(arrStudents);
}

function setTimeoutForFiltration(arrStudents) {
  timeoutID = setTimeout( () => {
    const filtredArrStudents = makeFiltration(arrStudents);
    const currentBtn = null;
    manageClassActiveOfBtnsSort(currentBtn)
    addStudentsinTable(filtredArrStudents);
  }, 1000);


}

function makeFiltration(arrStudents) {

  const $inputsCollection = document.querySelectorAll('.filter__input');
  let filtredArrStudents = arrStudents.slice();

  $inputsCollection.forEach(function (input) {
    if (input.value !== '') {
      let filterKey = input.dataset.filterBy;

      if (input.type === 'number') {
        let requestValue = new Date(input.value);
        filtredArrStudents = filtredArrStudents.filter(obj => obj[filterKey].getFullYear() === requestValue.getFullYear());
      } else {
        if (filterKey === 'fio') {
          filtredArrStudents = filtredArrStudents.filter((obj) => {
              let objPropertyValue = `${obj.surname} ${obj.name} ${obj.lastname}`;
              return filteringByTextFields(objPropertyValue, input);
            })
        } else {
          filtredArrStudents = filtredArrStudents.filter((obj) => {
            return filteringByTextFields(obj[filterKey], input);
          })
        }

      }
    }
  })
  return filtredArrStudents;
} //makeFiltration

function filteringByTextFields(objPropertyValue, input) {

    return objPropertyValue.toLowerCase()
    .includes(
      input.value.toLowerCase()
      .trim()
    )
} //filteringByTextFields
