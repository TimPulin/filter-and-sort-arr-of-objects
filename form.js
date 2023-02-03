
let State = [];
let arrStudents = [
  {
    fio: 'Великанов Мадест Игоревич',
    birthday: new Date('1993-03-08'),
    faculty: 'Математика',
    startEducation: new Date('2013-09-01'),
  },
  {
    fio: 'Веселов Андрей Викторович',
    birthday: new Date('2000-08-17'),
    faculty: 'Физика',
    startEducation: new Date('2016-09-01'),
  },
  {
    fio: 'Джигарханян Акоп Ментандилович',
    birthday: new Date('1980-03-25'),
    faculty: 'Химия',
    startEducation: new Date('2019-09-01'),
  },
  {
    fio: 'Коркин Валерий Петрович',
    birthday: new Date('2004-01-31'),
    faculty: 'История',
    startEducation: new Date('2022-09-01'),
  },
  {
    fio: 'Церетели Зураб Сулейманович',
    birthday: new Date('1999-04-22'),
    faculty: 'Физика',
    startEducation: new Date('2020-09-01'),
  },
];
State[0] = arrStudents;



function createFormNewStudent() {
  const wrapForm = document.createElement('div');
  const wrapInputs = document.createElement('div');
  const wrapMessagesErrorForm = document.createElement('div');

  const form = document.createElement('form');
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  const btn = document.createElement('button');

  wrapForm.classList.add('wrap-form');
  wrapInputs.classList.add('wrap-inputs');
  wrapMessagesErrorForm.classList.add('wrap-messages-error');
  form.classList.add('form', 'form--new-student');
  legend.textContent = 'Новый студент';
  btn.classList.add('btn', 'btn-primary', 'btn-form--new-student');
  btn.textContent = 'Добавить студента';

  wrapForm.append(form);
  form.append(fieldset);
  fieldset.append(legend);
  fieldset.append(wrapInputs);
  fieldset.append(wrapMessagesErrorForm);
  fieldset.append(btn);

  return {
    wrapForm,
    wrapInputs,
    wrapMessagesErrorForm,
    form,
    btn,
  }
}

function createItemsFormNewStudent(inputType, inputName, text) {
  const label = document.createElement('label');
  const span = document.createElement('span');
  const input = document.createElement('input');

  input.classList.add('form-control', 'form-control-sm', `form__input--${inputName}`);
  input.type = inputType;
  input.placeholder = text;
  input.name = inputName;
  span.textContent = text;
  label.append(span);
  label.append(input);

  return {
    label,
    span,
    input,
  }
}

function createMessageErrorForm(textError) {
  const message = document.createElement('p');
  message.classList.add('wrap-messages-error__text');
  message.textContent = textError;
  return message;
}

document.addEventListener('DOMContentLoaded', () => {
  renderFormNewStudent();
});

function renderFormNewStudent() {
  const container = document.getElementById('studentTableApp');
  const formNewStudent = createFormNewStudent();
  const wrapInputs = formNewStudent.wrapInputs;

  const featuresForm = [
    {
      inputType: 'text',
      inputName: 'surname',
      text: 'Фамилия',
    },
    {
      inputType: 'text',
      inputName: 'name',
      text: 'Имя',
    },
    {
      inputType: 'text',
      inputName: 'middlename',
      text: 'Отчество',
    },
    {
      inputType: 'date',
      inputName: 'birthday',
      text: 'Дата рождения',
    },
    {
      inputType: 'number',
      inputName: 'startEducation',
      text: 'Год начала обучения',
    },
    {
      inputType: 'text',
      inputName: 'faculty',
      text: 'Факультет',
    },
  ]

  formNewStudent.form.addEventListener('submit', function(e) {
    e.preventDefault();
    createObjNewStudentFromForm(formNewStudent);
    renderStudents(arrStudents);
  })

  container.append(formNewStudent.wrapForm);

  for (const obj of featuresForm) {
    renderItemsFormNewStudent(obj.inputType, obj.inputName, obj.text);
  }

  function renderItemsFormNewStudent(inputType, inputName, text) {
    const items = createItemsFormNewStudent(inputType, inputName, text);
    const label = items.label;

    wrapInputs.append(label);
  }
} //renderFormNewStudent


