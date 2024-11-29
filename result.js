let courseCredits = [];
let courseGrades = [];
function showInputFields() {
    let numCourses = document.getElementById("courses").value;
    let inputFieldsDiv = document.getElementById("inputFields");
    inputFieldsDiv.innerHTML = "";
    for (let i = 0; i < numCourses; i++) {
        inputFieldsDiv.innerHTML += `
            <div class="course-input">
                <label for="course${i+1}">Course ${i+1}: </label>
                <input type="text" id="course${i+1}" name="course${i+1}" placeholder="Course Name" required>
                <label for="credit${i+1}">Credit Hours: </label>
                <input type="number" id="credit${i+1}" name="credit${i+1}" placeholder="3" required>
                <label for="grade${i+1}">Grade: </label>
                <select id="grade${i+1}" name="grade${i+1}" required>
                    <option value="">Select...</option>
                    <option value="4.0">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.3">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.3">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.3">D+</option>
                    <option value="1.0">D</option>
                    <option value="0">F</option>
                </select>
            </div>`;
    }
}

function calculateGPA() {
    let numCourses = document.getElementById("courses").value;
    courseCredits = [];
    courseGrades = [];
    for (let i = 0; i < numCourses; i++) {
        let credit = parseFloat(document.getElementById(`credit${i+1}`).value);
        let grade = parseFloat(document.getElementById(`grade${i+1}`).value);
        courseCredits.push(credit);
        courseGrades.push(grade);
    }
    let totalCredits = courseCredits.reduce((a, b) => a + b, 0);
    let weightedGPAs = 0;
    for (let i = 0; i < numCourses; i++) {
        weightedGPAs += courseCredits[i] * courseGrades[i];
    }
    let gpa = weightedGPAs / totalCredits;
    document.getElementById("gpa").innerHTML = `Your GPA for the current semester is <strong>${gpa.toFixed(2)}</strong>`;
    return gpa;
}

function calculateCGPA() {
    let gpa = calculateGPA();
    let numSemesters = parseInt(prompt("Enter the number of completed semesters:"));
    let totalCredits = 0;
    let weightedGPAs = gpa * courseCredits.reduce((a, b) => a + b, 0); // Current semester contribution

    for (let i = 1; i <= numSemesters - 1; i++) {
        let semesterCredits = parseFloat(prompt(`Enter the total credits for semester ${i}:`));
        let semesterGPA = parseFloat(prompt(`Enter the GPA for semester ${i}:`));
        totalCredits += semesterCredits;
        weightedGPAs += semesterCredits * semesterGPA;
    }
    totalCredits += courseCredits.reduce((a, b) => a + b, 0); // Add current semester credits
    let cgpa = weightedGPAs / totalCredits;
    document.getElementById("cgpa").innerHTML = `Your cumulative CGPA is <strong>${cgpa.toFixed(2)}</strong>`;
}

function generatePDF() {
    const name = document.getElementById("name").value || "Student";
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${name}'s Mark Sheet`, 105, 15, { align: 'center' });

    const headers = [["Course", "Credit Hours", "Grade"]];
    const data = courseCredits.map((credit, index) => [
        document.getElementById(`course${index+1}`).value,
        credit,
        courseGrades[index]
    ]);

    // Add GPA and CGPA at the end
    data.push(["GPA", "", document.getElementById("gpa").innerText.split(":")[1].trim()]);
    data.push(["CGPA", "", document.getElementById("cgpa").innerText.split(":")[1].trim()]);

    doc.autoTable({
        head: headers,
        body: data,
        startY: 25,
        styles: { halign: "center" },
    });

    doc.save(`${name}_MarkSheet.pdf`);
}
