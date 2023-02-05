async function sendNewStudentToServer(objNewStudent) {
  const response = await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(studentAdapter.toServer(objNewStudent) )
  })

  if (response.ok) {
    const eventStudentAdded = new CustomEvent('studentAdded', {bubbles: true});
    document.getElementById('studentTableApp').dispatchEvent(eventStudentAdded);
  }
}

async function deleteStudentFromServer(studentID) {
  const response = await fetch(`http://localhost:3000/api/students/${studentID}`, {
    method:'DELETE'
  })

  if (response.ok) {
    const eventStudentDeleted = new CustomEvent('studentDeleted', {bubbles: true});
    document.getElementById('studentTableApp').dispatchEvent(eventStudentDeleted);
  }
}

async function getArrStudentsFromServer(arrStudents) {
  const respons = await fetch('http://localhost:3000/api/students');
  const serverArrStudents = await respons.json();
  arrStudents = serverArrStudents.map(studentAdapter.toClient);
  return arrStudents;
}
