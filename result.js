let courseCredits = [];
let courseGrades = [];
const name=document.getElementById("name").value;
function showInputFields() {
	let numCourses = document.getElementById("courses").value;
	let inputFieldsDiv = document.getElementById("inputFields");
	inputFieldsDiv.innerHTML = "";
	for (let i = 0; i < numCourses; i++) {
		inputFieldsDiv.innerHTML += `
			<label for="course${i+1}">Course ${i+1}: </label>
			<input type="text" id="course${i+1}" name="course${i+1}" required>
			<label for="credit${i+1}">Credit Hours: </label>
			<input type="number" id="credit${i+1}" name="credit${i+1}" required>
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
            </select>`
    }}
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
        document.getElementById("result").innerHTML = `Your GPA is ${gpa.toFixed(2)}`;
    }
    
    function calculateCGPA() {
        let numSemesters = parseInt(prompt("Enter the number of semesters completed:"));
        let totalCredits = 0;
        let weightedGPAs = 0;
        for (let i = 1; i <= numSemesters; i++) {
            let semesterCredits = parseFloat(prompt(`Enter the total credits for semester ${i}:`));
            let semesterGPA = parseFloat(prompt(`Enter the GPA for semester ${i}:`));
            totalCredits += semesterCredits;
            weightedGPAs += semesterCredits * semesterGPA;
        }
        let cgpa = weightedGPAs / totalCredits;
        document.getElementById("result").innerHTML = `Your CGPA is ${cgpa.toFixed(2)}`;
    }
    
    function generatePDF() {
        const name=document.getElementById("name").value;
        const doc = new jsPDF();
      
        // Add title to PDF
        doc.setFontSize(22);
        
        doc.text("Mark Sheet", 20, 20);
      
        // Add course information to PDF
        let y = 50;
        for (let i = 0; i < courseCredits.length; i++) {
          doc.setFontSize(16);
          doc.text(`Course ${i+1}: ${document.getElementById("course"+(i+1)).value}`, 14, y);
          doc.setFontSize(12);
          doc.text(`Credit Hours: ${courseCredits[i]}`, 14, y+10);
          doc.text(`Grade: ${courseGrades[i]}`, 70, y+10);
          y += 20;
        }
      
        // Add GPA and CGPA to PDF
        doc.setFontSize(16);
        doc.text(`GPA: ${document.getElementById("result").innerHTML}`, 14, y+10);
        doc.text(`CGPA: ${document.getElementById("result").innerHTML}`, 14, y+20);
      
        // Save PDF
        
        doc.save(name);
      }
      
