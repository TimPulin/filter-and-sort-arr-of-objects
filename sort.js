
// function sortStudents(currentBtn) {
  function sortStudents(currentBtn, filtredArrStudents) {
  const sortKey = currentBtn.dataset.sortBy;

  if (typeof filtredArrStudents[0][sortKey] === "object") {
    sortOfTypeDate(filtredArrStudents, sortKey);
} else if (typeof filtredArrStudents[0][sortKey] === "string") {
  sortOfTypeStrings(filtredArrStudents, sortKey);
}

  renderStudents(filtredArrStudents);
}

function sortOfTypeDate(arr, sortKey) {
  arr.sort((a,b) => b[sortKey].getFullYear() - a[sortKey].getFullYear() );
}

function sortOfTypeStrings(arr, sortKey) {
  arr.sort((a,b) => a[sortKey].localeCompare(b[sortKey]) );
}
