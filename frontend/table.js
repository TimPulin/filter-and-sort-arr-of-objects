
const YEARINMILSEC = 365 * 24 * 60 * 60 * 1000;

function createTable() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  table.classList.add('table');
  tbody.classList.add('tbody');
  tbody.setAttribute('id', 'studentsTbody')

  table.append(thead);
  table.append(tbody);

  return {
    table,
    thead,
    tbody,
  }
}

function createTr() {
  const tr = document.createElement('tr');
  return tr;
}

function createTheadElems(btnText, valueSortBy) {
  const th = document.createElement('th');
  const btn = document.createElement('button');

  th.classList.add('th');
  btn.classList.add('btn', 'btn-primary', 'btn-sort');
  btn.textContent = btnText;
  btn.setAttribute('data-sort-by', valueSortBy);

  th.append(btn);

  return {
    th,
    btn,
  }
}

function createTd(content = '') {
  const td = document.createElement('td');
  td.classList.add('td');
  td.textContent = content;
  return td;
}

function createSpan(content) {
  const span = document.createElement('span');
  span.classList.add('students__date');
  span.textContent = content;
  return span;
}

function createBtnDelete(tr, studentID, arrStudents) {
  const btn = document.createElement('btn');

  btn.classList.add('btn', 'btn-sm', 'btn-danger');
  btn.textContent = 'Удалить';

  btn.addEventListener('click', () => {
    if (confirm('Удалить?') ) {
      deleteStudentFromServer(studentID);
    //   deleteStudentFromArrStudents(studentID, arrStudents);
    //   deleteStudentFromTable(tr);
    }
  })
  return btn;
}

function deleteStudentFromTable(tr) {
  tr.remove();
}

function deleteStudentFromArrStudents(studentID, arrStudents) {
  const studentIndexInArrStudents = arrStudents.findIndex(item => item.id === studentID);
  arrStudents.splice(studentIndexInArrStudents, 1)
}

function renderTable(arrStudents) {
  const container = document.getElementById('studentTableApp');
  const tableElems = createTable();
  const featuresTheadElems = [
    {
      btnText: 'Ф.И.О.',
      valueSortBy: 'fio',
    },
    {
      btnText: 'Факультет',
      valueSortBy: 'faculty',
    },
    {
      btnText: 'Дата рождения',
      valueSortBy: 'birthday',
    },
    {
      btnText: 'Годы обучения',
      valueSortBy: 'studyStart',
    },
  ]

  container.append(tableElems.table);
  renderTableHead(tableElems.thead, featuresTheadElems, arrStudents);
  addStudentsinTable(arrStudents);
} //renderTable

function renderTableHead(thead, featuresTheadElems, arrStudents) {
  const tr = createTr();
  thead.append(tr);

  for (const obj of featuresTheadElems) {
    renderTableHeadElems(obj.btnText, obj.valueSortBy);
  }
  renderEmptyTh();

  function renderTableHeadElems(btnText, valueSortBy) {
    const theadElems = createTheadElems(btnText, valueSortBy);

    theadElems.btn.addEventListener('click', () => {
      const filtredArrStudents = makeFiltration(arrStudents);
      manageClassActiveOfBtnsSort(theadElems.btn);
      sortStudents(theadElems.btn, filtredArrStudents);
    })

    tr.append(theadElems.th);
  }

  function renderEmptyTh() {
    const theadElems = createTheadElems('', '');
    theadElems.th.innerHTML = '';
    tr.append(theadElems.th);
  }
} //renderTableHead

function manageClassActiveOfBtnsSort(currentBtn) {
  const collectionBtnsSort = document.querySelectorAll('.btn-sort');

  collectionBtnsSort.forEach((btn) => {
    if (btn == currentBtn) {
      btn.classList.toggle('btn-sort--active');
    } else {
      btn.classList.remove('btn-sort--active')
    }
  })
}

function addStudentsinTable(arrStudents) {
  const tbody = document.getElementById('studentsTbody');

  clearTbody(tbody);

  for (const student of arrStudents) {
    const tr = renderStudent(student, arrStudents);
    tbody.append(tr);
  }

  function renderStudent(student, arrStudents) {
    const studentID = rememberStudentID(student).id;
    const tr = createTr();

    const tdBirthday = createTd();
    const spanBirthday = createSpan(formatBirthday(student.birthday) );
    const spanAge = createSpan(formatAge(student.birthday) );

    const tdEducationDate = createTd();
    const spanYearsOfEducation = createSpan(formatYearsOfEducation(student.studyStart));
    const spanCourse = createSpan(formatCourse(student.studyStart) );

    const tdBtnDelete = createTd();
    const BtnDelete = createBtnDelete(tr, studentID, arrStudents);

    tdBirthday.append(spanBirthday);
    tdBirthday.append(spanAge);
    tdEducationDate.append(spanYearsOfEducation);
    tdEducationDate.append(spanCourse);
    tdBtnDelete.append(BtnDelete);

    tr.append(createTd(student.fio));
    tr.append(createTd(student.faculty) );
    tr.append(tdBirthday);
    tr.append(tdEducationDate);
    tr.append(tdBtnDelete);

    return tr;
  }
} //renderStudenst

function clearTbody(tbody) {
  tbody.innerHTML = '';
}

function rememberStudentID(student) {
  const objStudentID = {
    id: student.id,
  }
  return objStudentID;
}

function formatBirthday(date) {
  const day = normalizeDay(date.getDate() );
  const month = normalizeMonth(date.getMonth() );
  return `${day}.${month}.${date.getFullYear()}`

  function normalizeDay(day) {
    return checkLength(day) ? day : `0${day}`
  }

  function normalizeMonth(month) {
    month += 1;
    return checkLength(month) ? month : `0${month}`
  }

  function checkLength(date) {
    return String(date).length > 1;
  }
} //formatBirthday

function formatAge(date) {
  return `(${getAge(date)} лет)`

  function getAge(date) {
    const dateNow = new Date();
    let age = (dateNow.getTime() - date.getTime() ) / YEARINMILSEC;
    return Math.floor(age) ;
  }
}

function formatYearsOfEducation(date) {
  const DURATIONOFSTUDING = 4;
  const dateNow = new Date();
  const courseNumber = getCourseNumber(date);

  if (courseNumber > DURATIONOFSTUDING) {
    return `${date.getFullYear()}-${date.getFullYear() + DURATIONOFSTUDING}`;
  } else {
    return `${date.getFullYear()}-${dateNow.getFullYear()}`;
  }
} //formatYearsOfEducation

function formatCourse(date) {
  const DURATIONOFSTUDING = 4;
  const courseNumber = getCourseNumber(date);
  if (courseNumber > DURATIONOFSTUDING) {
    return 'закончил'
  } else {
    return `(${courseNumber} курс)`
  }
} //formatCourse

function getCourseNumber(date) {
  const dateNow = new Date();
  let number = dateNow.getFullYear() - date.getFullYear();
  return dateNow.getMonth() >= 8 ? number++ : number;
}

