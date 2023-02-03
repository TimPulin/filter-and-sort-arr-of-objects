function createObjNewStudentFromForm(formNewStudent) {
  if (validateForm(formNewStudent) ) {
    let objNewStudent = {};
    copyInfoFromForm(formNewStudent, objNewStudent);
    normalazeLetters(objNewStudent);
    concatinateFIO(objNewStudent);
    deleteSeparatedPartsOfFIO(objNewStudent);
    pushObjNewStudentToArrStudents(objNewStudent);
    clearForm(formNewStudent);
  }
}

function validateForm(formNewStudent) {
  cleanUpWarnings(formNewStudent);
  return checkForm(formNewStudent);
}

function checkForm(formNewStudent) {
  const fieldsetForm = formNewStudent.form.querySelector('fieldset');
  const btnForm = formNewStudent.form.querySelector('button');
  let flagMessageSend = false;
  let flagValidated = true;

  for (const obj of formNewStudent.form) {

    if (obj !== fieldsetForm && obj !== btnForm) {

      if (obj.type === 'text') {
        const value = obj.value.trim();

        if (value.length == 0) {
          markErrorInput(obj);
          flagMessageSend ? true : messageErrorForm(formNewStudent, 'empty');
          flagMessageSend = true;
          flagValidated = false;
        } else if (!validateInputText(value) ) {
          messageErrorForm(formNewStudent, obj.name);
          flagValidated = false;
        }

      } else if (obj.type === 'date') {

        if (obj.valueAsDate === null) {
          markErrorInput(obj);
          flagMessageSend ? false : messageErrorForm(formNewStudent, 'empty');
          flagMessageSend = true;
          flagValidated = false;
        } else if (!validateInputDate(obj.valueAsDate, obj.name) ) { //если ставить это условине первым, то и validateInputDate() возвращает true
          messageErrorForm(formNewStudent, obj.name);
          flagValidated = false;
        }

      } else if (obj.type === 'number') {
        const date = new Date(`${obj.value}-09-01`);

        if (obj.value === '') {                //Почемуто если сравнить с null, то переходит к следующему условию сравнения и validateInputDate() возвращает true
          markErrorInput(obj);
          flagMessageSend ? false : messageErrorForm('empty');
          flagMessageSend = true;
          flagValidated = false;
        } else if (!validateInputDate(date, obj.name) ) {
          messageErrorForm(formNewStudent, obj.name);
          flagValidated = false;
        }
      }
    }
  } //for (const obj of formNewStudent.form)
  return flagValidated;
} //checkForm()

function validateInputText(text) {
  return text.length > 1;
}

function validateInputDate(date, dateType) {
  const dateNow = new Date();
  let dateMin;

  switch (dateType) {
    case 'birthday':
      dateMin = new Date('1900-01-01')
      break;
    case 'startEducation':
      dateMin = new Date('2000-01-01')
  }

  if (date >= dateMin && date <= dateNow) {
    return true;
  } else {
    return false;
  }
} //validateInputDate

function markErrorInput(obj) {
  obj.classList.add('form-control--warning');
}

function messageErrorForm(formNewStudent, name) {
  const dateNow = new Date();
  let text;

  switch (name) {
    case 'name':
      text = 'Короткое имя'
      break;
    case 'surname':
      text = 'Короткая фамилия'
    break;
    case 'middlename':
      text = 'Короткое отчество'
      break;
      case 'birthday':
        text = `Дата рождения должна быть не раньше 01.01.1900 и не позже ${dateNow.getFullYear()}`
      break;
      case 'startEducation':
        text = `Обучение может начаться не раньше 2000 и не позже ${dateNow.getFullYear()}`
      break;
      case 'faculty':
        text = 'Нет такого факультета'
      break;
      case 'empty':
        text = 'Поле обязательно для заполнения'
      break;
  }

  const message = createMessageErrorForm(text);

  formNewStudent.wrapMessagesErrorForm.append(message);
}

function cleanUpWarnings(formNewStudent) {
  const inputsForm = formNewStudent.form.querySelectorAll('.form-control');

  inputsForm.forEach(element => {
    element.classList.remove('form-control--warning');
  });

  formNewStudent.wrapMessagesErrorForm.textContent = '';
}

function copyInfoFromForm(formNewStudent, objNewStudent) {


  readForm(formNewStudent, objNewStudent)
}

function readForm(formNewStudent, objNewStudent) {
  const fieldsetForm = formNewStudent.form.querySelector('fieldset');
  const btnForm = formNewStudent.form.querySelector('button');

  for (obj of formNewStudent.form) {
    if (obj !==fieldsetForm && obj !==btnForm) {
      if (obj.type === 'text') {
        objNewStudent[obj.name] = obj.value.trim();
      } else if (obj.type === 'date') {
        objNewStudent[obj.name] = new Date(obj.valueAsDate);
      } else if (obj.type === 'number') {
        const date = new Date(`${obj.value}-09-01`);
        objNewStudent[obj.name] = date;
      }
    }
  }
} //readForm

function normalazeLetters(objNewStudent) {
  const entries = Object.entries(objNewStudent);

  for ([key, value] of entries) {
    if (typeof value === 'string') {
      objNewStudent[key] = value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
    }
  }
} //normalazeLetters

function concatinateFIO(objNewStudent) {
  const fio = `${objNewStudent.surname} ${objNewStudent.name} ${objNewStudent.middlename}`;
  objNewStudent.fio = fio;
}

function deleteSeparatedPartsOfFIO(objNewStudent) {
  delete objNewStudent.surname;
  delete objNewStudent.name;
  delete objNewStudent.middlename;
}

function pushObjNewStudentToArrStudents(objNewStudent) {
  arrStudents.push(objNewStudent);
}

function clearForm(formNewStudent) {
  const fieldsetForm = formNewStudent.form.querySelector('fieldset');
  const btnForm = formNewStudent.form.querySelector('button');

  for (obj of formNewStudent.form) {
    if (obj !==fieldsetForm && obj !==btnForm) {
      obj.value = '';
    }
  }
}
