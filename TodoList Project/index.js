
document.getElementById('registration-form').addEventListener('submit', function(event) {
  event.preventDefault();

var studentName = document.querySelector("#name").value;
var studentClass = document.querySelector("#class").value;
var studentContactInfo = document.querySelector("#contactno").value;
var studentAddress = document.querySelector(".textArea").value;


const student = {
  studentName,
  studentClass,
  studentAddress,
  studentContactInfo,
};

const Display = document.getElementById('display');
const studentList = JSON.parse(localStorage.getItem('studentList')) || [];
studentList.push(student);
localStorage.setItem('studentList', JSON.stringify(studentList));

Display.innerHTML = '';

  studentList.forEach(student => {
    const studentInfo = document.createElement('div');
    studentInfo.classList.add('student-info');

    const name = document.createElement('p');
    name.textContent = `Name: ${student.studentName}`;
    name.classList.add('para');
    studentInfo.appendChild(name);

    const studentClass = document.createElement('p');
    studentClass.textContent = `Class: ${student.studentClass}`;
    studentClass.classList.add('para');
    studentInfo.appendChild(studentClass);

    const contactInfo = document.createElement('p');
    contactInfo.textContent = `Contact: ${student.studentContactInfo}`;
    contactInfo.classList.add('para');
    studentInfo.appendChild(contactInfo);

    const address = document.createElement('p');
    address.textContent = `Address: ${student.studentAddress}`;
    address.classList.add('para');
    studentInfo.appendChild(address);

    const delebtn = document.createElement('button');
    delebtn.innerHTML= '<i class="fa-sharp fa-solid fa-trash"></i>';
    delebtn.classList.add('delete');
    studentInfo.appendChild(delebtn); 

  const editbtn = document.createElement('button');
    editbtn.innerHTML= '<i class="fa-solid fa-pencil-alt"></i>';
    editbtn.classList.add('edit');
    studentInfo.appendChild(editbtn);
    
    delebtn.addEventListener('click', deleteItem); 

    editbtn.addEventListener('click', function() {
      document.querySelector("#name").value = student.studentName;
      document.querySelector("#class").value = student.studentClass;
      document.querySelector("#contactno").value = student.studentContactInfo;
      document.querySelector(".textArea").value = student.studentAddress;
      
 
      const index = studentList.indexOf(student);
      if (index !== -1) {
        studentList.splice(index, 1);
        localStorage.setItem('studentList', JSON.stringify(studentList));
        studentInfo.remove();
      }
    });
    
    Display.appendChild(studentInfo);
  });

  document.getElementById('registration-form').reset();
});

function deleteItem(e) {
  const studentInfo = e.target.closest('.student-info');
  const index = studentInfo.getAttribute('data-index'); 
  
  if (studentInfo) {
    studentInfo.remove();

    const studentList = JSON.parse(localStorage.getItem('studentList')) || [];
    studentList.splice(index, 1); 
    localStorage.setItem('studentList', JSON.stringify(studentList));
  }
}
