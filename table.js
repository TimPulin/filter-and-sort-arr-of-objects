

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

  document.addEventListener('DOMContentLoaded', () => {
    renderTable();
  })

  function renderTable() {
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
        valueSortBy: 'startEducation',
      },
    ]

    container.append(tableElems.table);
    renderTableHead(tableElems.thead, featuresTheadElems);
    renderStudents(arrStudents);
  } //renderTable

  function renderTableHead(thead, featuresTheadElems) {
    const tr = createTr();
    thead.append(tr);

    for (const obj of featuresTheadElems) {
      renderTableHeadElems(obj.btnText, obj.valueSortBy);
    }

    function renderTableHeadElems(btnText, valueSortBy) {
      const theadElems = createTheadElems(btnText, valueSortBy);

      theadElems.btn.addEventListener('click', () => {
        const filtredArrStudents = makeFiltration();
        manageClassActiveOfBtnsSort(theadElems.btn);
        sortStudents(theadElems.btn, filtredArrStudents);
      })

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

  function renderStudents(students) {
    const tbody = document.getElementById('studentsTbody');

    clearTbody(tbody);

    for (const student of students) {
      const tr = renderStudent(student);
      tbody.append(tr);
    }

    function renderStudent(student) {
      const tr = createTr();

      const tdBirthday = createTd();
      const spanBirthday = createSpan(formatBirthday(student.birthday) );
      const spanAge = createSpan(formatAge(student.birthday) );

      const tdEducationDate = createTd();
      const spanYearsOfEducation = createSpan(formatYearsOfEducation(student.startEducation));
      const spanCourse = createSpan(formatCourse(student.startEducation) );

      tdBirthday.append(spanBirthday);
      tdBirthday.append(spanAge);
      tdEducationDate.append(spanYearsOfEducation);
      tdEducationDate.append(spanCourse);

      tr.append(createTd(student.fio) );
      tr.append(createTd(student.faculty) );
      tr.append(tdBirthday);
      tr.append(tdEducationDate);

      return tr;
    }
  } //renderStudenst

  function clearTbody(tbody) {
    tbody.innerHTML = '';
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
      let age = (dateNow.getTime() - date.getTime() ) / 365 / 24 / 60 / 60 / 1000;
      return Math.floor(age) ;
    }
  }

  function formatYearsOfEducation(date) {
    const dateNow = new Date();
    const number = getCourseNumber(date);

    if (number > 4) {
      return `${date.getFullYear()}-${date.getFullYear() + 4}`;
    } else {
     return `${date.getFullYear()}-${dateNow.getFullYear()}`;
    }
  } //formatYearsOfEducation

  function formatCourse(date) {
    const number = getCourseNumber(date);
    if (number > 4) {
      return 'закончил'
    } else {
     return `(${number} курс)`
    }
  } //formatCourse

  function getCourseNumber(date) {
    const dateNow = new Date();
    let number = dateNow.getFullYear() - date.getFullYear();
    return dateNow.getMonth() >= 8 ? number++ : number;
  }

