// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", loadStudents);

// Retrieve student data from localStorage or return empty array if none exists
function getStudentsFromStorage() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

// Save student array to localStorage
function saveStudentsToStorage(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

// Clear all input fields in the form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
}

// Validate user input against specified patterns
function validateInput(name, id, email, contact) {
    // Regular expression patterns for validation
    const namePattern = /^[A-Za-z ]+$/;        // Only letters and spaces
    const idPattern = /^\d+$/;                 // Only numbers
    const contactPattern = /^\d{10}$/;         // Exactly 10 digits
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Standard email format

    // Check if any field is empty
    if (!name || !id || !email || !contact) {
        alert("Please fill in all fields.");
        return false;
    }
    // Validate name format
    if (!namePattern.test(name)) {
        alert("Name should contain only letters.");
        return false;
    }
    // Validate ID format
    if (!idPattern.test(id)) {
        alert("ID should be numeric.");
        return false;
    }
    // Validate email format
    if (!emailPattern.test(email)) {
        alert("Enter a valid email.");
        return false;
    }
    // Validate contact number format
    if (!contactPattern.test(contact)) {
        alert("Contact number should be 10 digits.");
        return false;
    }
    return true;  // All validations passed
}

// Add a new student to the storage
function addStudent() {
    // Get and trim input values
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // Validate inputs before proceeding
    if (!validateInput(name, id, email, contact)) return;

    // Get existing students and add new one
    const students = getStudentsFromStorage();
    students.push({ name, id, email, contact });

    // Save updated list and refresh display
    saveStudentsToStorage(students);
    loadStudents();
    clearForm();
}

// Load and display all students from storage
function loadStudents() {
    const students = getStudentsFromStorage();
    const table = document.getElementById("studentTable");
    table.innerHTML = "";  // Clear existing table content

    // Create a table row for each student
    students.forEach((student, index) => {
        const row = `<tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class='edit' onclick='editStudent(${index})'>Edit</button>
                <button class='delete' onclick='deleteStudent(${index})'>Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;  // Append new row to table
    });
}

// Delete a student from storage by index
function deleteStudent(index) {
    const students = getStudentsFromStorage();
    students.splice(index, 1);  // Remove student at given index
    saveStudentsToStorage(students);
    loadStudents();  // Refresh the display
}

// Edit an existing student by loading their data into the form
function editStudent(index) {
    const students = getStudentsFromStorage();
    const student = students[index];

    // Populate form fields with student data
    document.getElementById("name").value = student.name;
    document.getElementById("id").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    // Remove the student (will be re-added when form is submitted)
    deleteStudent(index);
}