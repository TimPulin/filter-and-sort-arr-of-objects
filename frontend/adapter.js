const studentAdapter = {
  toClient: (student) => {
    return {
      id: student.id,
      fio: `${student.surname} ${student.name} ${student.lastname}`,
      name: student.name,
      surname: student.surname,
      lastname: student.lastname,
      birthday: new Date(student.birthday),
      faculty: student.faculty,
      studyStart: new Date(student.studyStart),
    }
  }, //toClient
  toServer: (student) => {
    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      lastname: student.lastname,
      birthday: student.birthday.toString(),
      faculty: student.faculty,
      studyStart: student.studyStart.getFullYear(),
    }
  }
};
