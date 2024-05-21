// Function to display stored data from local storage
function displayStoredData() {
  const Display = document.getElementById('display');
  Display.innerHTML = ''; // Clear the display area

  // Retrieve student list from local storage
  const studentList = JSON.parse(localStorage.getItem('studentList')) || [];

  // Iterate through the stored data and display each student's information
  studentList.forEach(student => {
    const studentInfo = document.createElement('div');
    studentInfo.classList.add('student-info');

    // Create paragraphs to display student information
    const name = document.createElement('p');
    name.textContent = `Name: ${student.studentName}`;
    name.classList.add('para');
    studentInfo.appendChild(name);

    const email = document.createElement('p');
    email.textContent = `Email: ${student.studentEmailId}`;
    email.classList.add('para');
    studentInfo.appendChild(email);

    const id = document.createElement('p');
    id.textContent = `ID: ${student.studentId}`;
    id.classList.add('para');
    studentInfo.appendChild(id);

    const contact = document.createElement('p');
    contact.textContent = `Contact: ${student.studentContactNo}`;
    contact.classList.add('para');
    studentInfo.appendChild(contact);

    // Create delete button for each student entry
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.classList.add('delete');
    studentInfo.appendChild(deleteBtn);

    // Add event listener to delete button to remove the student entry
    deleteBtn.addEventListener('click', function() {
      const index = studentList.indexOf(student);
      studentList.splice(index, 1); // Remove the student from the list
      localStorage.setItem('studentList', JSON.stringify(studentList)); // Update local storage
      Display.removeChild(studentInfo); // Remove the corresponding student entry from display
    });

    // Create edit button for each student entry
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa fa-pencil-alt"></i>';
    editBtn.classList.add('edit');
    studentInfo.appendChild(editBtn);

    // Add event listener to edit button to populate form fields with student information for editing
    editBtn.addEventListener('click', function() {
      // Populate form fields with student information
      document.querySelector("#name").value = student.studentName;
      document.querySelector("#studentid").value = student.studentId;
      document.querySelector("#emailid").value = student.studentEmailId;
      document.querySelector("#contactno").value = student.studentContactNo;

      // Remove the edited student from the list and local storage
      const index = studentList.indexOf(student);
      studentList.splice(index, 1);
      localStorage.setItem('studentList', JSON.stringify(studentList));
      Display.removeChild(studentInfo); // Remove the corresponding student entry from display
    });

    Display.appendChild(studentInfo); // Add the student entry to the display area
  });
}

// Call the function to display stored data when the page loads
window.addEventListener('load', displayStoredData);

// Add event listener for form submission to store new data
document.getElementById('registration-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the default form submission behavior
  
  // Retrieve values from input fields
  var studentName = document.querySelector("#name").value;
  var studentEmailId = document.querySelector("#emailid").value;
  var studentId = document.querySelector("#studentid").value;
  var studentContactNo = document.querySelector("#contactno").value;

  // Create a student object with the input values
  const student = {
    studentName,
    studentEmailId,
    studentId,
    studentContactNo,
  };
  
  const Display = document.getElementById('display'); // Get the display area
  
  // Retrieve existing student list from local storage or initialize an empty array
  const studentList = JSON.parse(localStorage.getItem('studentList')) || [];
  
  // Add the new student to the list
  studentList.push(student);
  
  // Store the updated student list back to local storage
  localStorage.setItem('studentList', JSON.stringify(studentList));
  
  // Call the function to display stored data
  displayStoredData();
  
  document.getElementById('registration-form').reset(); // Reset the form after submission
});
