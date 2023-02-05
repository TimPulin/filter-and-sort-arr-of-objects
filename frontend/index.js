(() => {
  let arrStudents = [];

   document.addEventListener('DOMContentLoaded', async () => {
    arrStudents = await getArrStudentsFromServer(arrStudents);
    renderFormNewStudent(arrStudents);
    renderBlockFilters(arrStudents);
    renderTable(arrStudents);
  });

    document.addEventListener('studentAdded', async () => {
      arrStudents = await getArrStudentsFromServer(arrStudents);
      addStudentsinTable(arrStudents);
  })

  document.addEventListener('studentDeleted', async () => {
    arrStudents = await getArrStudentsFromServer(arrStudents);
    addStudentsinTable(arrStudents);
  })
})()
