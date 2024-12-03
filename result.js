let courseCredits = [];
let courseGrades = [];
function showInputFields() {
    let numCourses = document.getElementById("courses").value;
    let inputFieldsDiv = document.getElementById("inputFields");
    inputFieldsDiv.innerHTML = ""; // Clear existing fields
    for (let i = 0; i < numCourses; i++) {
        inputFieldsDiv.innerHTML += `
            <div class="course-input">
                <label for="course${i + 1}">Course ${i + 1}: </label>
                <input type="text" id="course${i + 1}" name="course${i + 1}" placeholder="Course Name" required>
                
                <label for="credit${i + 1}">Credit Hours: </label>
                <input type="number" id="credit${i + 1}" name="credit${i + 1}" placeholder="3" required>
                
                <label for="grade${i + 1}">Grade: </label>
                <select id="grade${i + 1}" name="grade${i + 1}" required>
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
        let credit = parseFloat(document.getElementById(`credit${i + 1}`).value);
        let grade = parseFloat(document.getElementById(`grade${i + 1}`).value);
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
    const studentName = document.getElementById("name").value || "N/A";

    // Prepare table data
    const tableBody = [
        ["Course", "Credit Hours", "Grade"], // Table Header
    ];
    courseCredits.forEach((credit, index) => {
        tableBody.push([
            document.getElementById(`course${index + 1}`).value || "N/A", // Course Name
            credit, // Credit Hours
            courseGrades[index], // Grade
        ]);
    });

    // Add GPA and CGPA details
    const gpaText = document.getElementById("gpa").textContent || "";
    const cgpaText = document.getElementById("cgpa").textContent || "";

    // Define the document structure
    const docDefinition = {
        content: [
            { text: "Mark Sheet", style: "header" },
            { text: `Student Name: ${studentName}`, margin: [0, 10, 0, 10] },
            {
                table: {
                    headerRows: 1,
                    widths: ["*", "auto", "auto"],
                    body: tableBody,
                },
                layout: "lightHorizontalLines",
                margin: [0, 10, 0, 10],
            },
            { text: gpaText, margin: [0, 10, 0, 5] },
            { text: cgpaText, margin: [0, 0, 0, 10] },
        ],
        styles: {
            header: { fontSize: 18, bold: true, alignment: "center" },
        },
    };

    // Generate and download the PDF using pdfMake
    pdfMake.createPdf(docDefinition).download(`${studentName}_MarkSheet.pdf`);
}
