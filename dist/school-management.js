"use strict";
//  School Management System - TypeScript
// ===== Basic Types =====
const schoolName = "Alzihrawi";
let totalStudents = 0;
let totalTeachers = 0;
// ===== Enums =====
var Grade;
(function (Grade) {
    Grade[Grade["FIRST"] = 1] = "FIRST";
    Grade[Grade["SECOND"] = 2] = "SECOND";
    Grade[Grade["THIRD"] = 3] = "THIRD";
})(Grade || (Grade = {}));
var Subject;
(function (Subject) {
    Subject["MATH"] = "Math";
    Subject["SCIENCE"] = "Science";
    Subject["PHYSICS"] = "Physics";
    Subject["ARABIC"] = "Arabic";
})(Subject || (Subject = {}));
// ===== Helper Functions =====
function calculateAverage(grades) {
    if (grades.length === 0)
        return 0;
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return Math.round((total / grades.length) * 100) / 100;
}
function formatGrade(grade) {
    if (grade >= 90)
        return `${grade} Excellent`;
    if (grade >= 80)
        return `${grade} Very Good`;
    if (grade >= 70)
        return `${grade} Good`;
    if (grade >= 60)
        return `${grade} Passed`;
    return `${grade} Failed`;
}
// ===== Main Class =====
class SchoolSystem {
    constructor() {
        this.Students = [];
        this.Teachers = [];
        this.grades = [];
        this.nextStudentId = 1000;
        this.nextTeacherId = 2000;
    }
    // ===== Student Management =====
    addStudent(name, age, grade) {
        const student = {
            name: name,
            age: age,
            id: this.nextStudentId++,
            grade: grade
        };
        this.Students.push(student);
        totalStudents++;
        return student;
    }
    getAllStudents() {
        return this.Students;
    }
    findStudentByName(name) {
        return this.Students.find(param => param.name.includes(name));
    }
    removeStudent(studentId) {
        const removeStudentId = this.Students.findIndex(param => param.id === studentId);
        if (removeStudentId !== -1) {
            this.Students.splice(removeStudentId, 1);
            const student = this.Students[removeStudentId];
            console.log(`The student ${student.name} has been removed`);
            // remove student grades
            this.grades = this.grades.filter(param => param.studentId !== studentId); // if the grade belongs to another student keep it, if not remove it, by filter function
            totalStudents--;
            console.log(`The grades of student ${student.name} have been removed`);
            return true;
        }
        return false;
    }
    // ===== Teacher Management =====
    addTeacher(name, age, subject) {
        const teacher = {
            name: name,
            age: age,
            id: this.nextTeacherId++,
            subject: subject
        };
        this.Teachers.push(teacher);
        totalTeachers++;
        return teacher;
    }
    getAllTeachers() {
        return this.Teachers;
    }
    findTeacherByName(name) {
        return this.Teachers.find(param => param.name.includes(name));
    }
    // ===== Grade Management =====
    addGrade(studentId, subject, grade) {
        const student = this.Students.find(param => param.id === studentId);
        if (!student) {
            console.log(`There is no student with the entered id`);
            return false;
        }
        if (grade < 0) {
            console.log(`Can't enter a negative value`);
            return false;
        }
        const existGrade = this.grades.find(param => param.subject == subject && param.studentId == studentId);
        if (existGrade) {
            existGrade.grade = grade;
        }
        else {
            this.grades.push({ studentId, subject, grade });
        }
        return true;
    }
    getStudentGrades(studentId) {
        return this.grades.filter(param => param.studentId == studentId);
    }
    // ===== Reports =====
    getStudentReport(studentid) {
        const student = this.Students.find(param => param.id === studentid);
        if (!student) {
            console.log(`Student does not exist`);
            return undefined;
        }
        const studentGrades = this.getStudentGrades(studentid);
        const average = calculateAverage(studentGrades.map(param => param.grade));
        const grades = studentGrades.map(param => [param.subject, param.grade]);
        return {
            average,
            studentName: student.name,
            grades // [subject, grade]
        };
    }
    getSchoolStats() {
        const allGrades = this.grades.map(param => param.grade);
        const averageGrades = calculateAverage(allGrades);
        return {
            totalStudents: this.Students.length,
            totalTeachers: this.Teachers.length,
            averageGrades
        };
    }
    // ===== Display Functions =====
    getStudentRecords() {
        return this.Students.map(param => [
            param.name,
            param.age,
            param.grade,
            param.id
        ]);
    }
    getGradeRecords() {
        return this.grades.map(grade => {
            const student = this.Students.find(s => s.id == grade.studentId);
            return [
                (student === null || student === void 0 ? void 0 : student.name) || "Undefined",
                grade.subject,
                grade.grade
            ];
        });
    }
    getTeacherRecords() {
        return this.Teachers.map(param => [
            param.name,
            param.age,
            param.subject,
            param.id
        ]);
    }
    // ===== Advanced Search Function =====
    searchStudents(criteria) {
        return this.Students.filter(student => {
            if (criteria.name && !student.name.includes(criteria.name))
                return false;
            if (criteria.grade && student.grade !== criteria.grade)
                return false;
            if (criteria.minAge && student.age < criteria.minAge)
                return false;
            if (criteria.maxAge && student.age > criteria.maxAge)
                return false;
            return true;
        });
    }
    // ===== Advanced Statistics =====
    getGradeDistribution() {
        const distribution = [];
        for (const grade of [Grade.FIRST, Grade.SECOND, Grade.THIRD]) {
            const count = this.Students.filter(s => s.grade === grade).length;
            distribution.push([grade, count]);
        }
        return distribution;
    }
    getSubjectStatistics() {
        const stats = [];
        for (const subject of [Subject.MATH, Subject.SCIENCE, Subject.ARABIC]) {
            const subjectGrades = this.grades.filter(g => g.subject === subject);
            const average = calculateAverage(subjectGrades.map(g => g.grade));
            const count = subjectGrades.length;
            stats.push([subject, average, count]);
        }
        return stats;
    }
}
// ===== Helper Functions for String Padding =====
function padEnd(str, length, padString = " ") {
    if (str.length >= length)
        return str;
    const padLength = length - str.length;
    return str + padString.repeat(padLength);
}
function padStart(str, length, padString = " ") {
    if (str.length >= length)
        return str;
    const padLength = length - str.length;
    return padString.repeat(padLength) + str;
}
// ===== Output Functions =====
function printHeader(title, emoji = "🎯") {
    const width = 70;
    const border = "█".repeat(width);
    const padding = Math.floor((width - title.length - 4) / 2);
    const titleLine = "█" + " ".repeat(padding) + `${emoji} ${title}` + " ".repeat(padding) + "█";
    console.log(`\n\x1b[36m${border}\x1b[0m`);
    console.log(`\x1b[36m${titleLine}\x1b[0m`);
    console.log(`\x1b[36m${border}\x1b[0m`);
}
function printSectionHeader(title, emoji) {
    console.log(`\n\x1b[33m┌${"─".repeat(50)}┐\x1b[0m`);
    console.log(`\x1b[33m│\x1b[0m  \x1b[1m${emoji} ${title}\x1b[0m${" ".repeat(45 - title.length)}  \x1b[33m│\x1b[0m`);
    console.log(`\x1b[33m└${"─".repeat(50)}┘\x1b[0m`);
}
function printSuccess(message) {
    console.log(`\x1b[32m✅ ${message}\x1b[0m`);
}
function printInfo(message) {
    console.log(`\x1b[34mℹ️  ${message}\x1b[0m`);
}
function printTable(headers, rows, title) {
    if (title) {
        console.log(`\n\x1b[35m📋 ${title}\x1b[0m`);
    }
    const colWidths = headers.map((header, index) => Math.max(header.length, ...rows.map(row => String(row[index]).length)));
    // Top border
    console.log(`\x1b[37m┌${colWidths.map(w => "─".repeat(w + 2)).join("┬")}┐\x1b[0m`);
    // Headers
    const headerRow = headers.map((header, index) => ` \x1b[1m${padEnd(header, colWidths[index])}\x1b[0m `).join("\x1b[37m│\x1b[0m");
    console.log(`\x1b[37m│\x1b[0m${headerRow}\x1b[37m│\x1b[0m`);
    // Separator
    console.log(`\x1b[37m├${colWidths.map(w => "─".repeat(w + 2)).join("┼")}┤\x1b[0m`);
    // Rows
    rows.forEach(row => {
        const rowString = row.map((cell, index) => ` ${padEnd(String(cell), colWidths[index])} `).join("\x1b[37m│\x1b[0m");
        console.log(`\x1b[37m│\x1b[0m${rowString}\x1b[37m│\x1b[0m`);
    });
    // Bottom border
    console.log(`\x1b[37m└${colWidths.map(w => "─".repeat(w + 2)).join("┴")}┘\x1b[0m`);
}
function printStatBox(title, value, icon, color = "36") {
    const content = `${icon} ${title}: ${value}`;
    console.log(`\x1b[${color}m╭─────────────────────────────────╮\x1b[0m`);
    console.log(`\x1b[${color}m│\x1b[0m  \x1b[1m${content}\x1b[0m${" ".repeat(29 - content.length)}  \x1b[${color}m│\x1b[0m`);
    console.log(`\x1b[${color}m╰─────────────────────────────────╯\x1b[0m`);
}
function printGradeChart(grades) {
    console.log(`\n\x1b[35m📊 Grade Distribution Chart\x1b[0m`);
    console.log(`\x1b[37m┌${"─".repeat(40)}┐\x1b[0m`);
    grades.forEach(([subject, grade]) => {
        const barLength = Math.floor(grade / 5); // Scale down for display
        const bar = "█".repeat(barLength) + "░".repeat(20 - barLength);
        const gradeColor = grade >= 90 ? "32" : grade >= 80 ? "33" : grade >= 70 ? "34" : "31";
        console.log(`\x1b[37m│\x1b[0m \x1b[1m${padEnd(subject, 8)}\x1b[0m \x1b[${gradeColor}m${bar}\x1b[0m \x1b[1m${grade}%\x1b[0m \x1b[37m│\x1b[0m`);
    });
    console.log(`\x1b[37m└${"─".repeat(40)}┘\x1b[0m`);
}
function demonstrateSystem() {
    const school = new SchoolSystem();
    // Main header
    printHeader("ALZIHRAWI SCHOOL MANAGEMENT SYSTEM", "🏫");
    console.log(`\x1b[36m🎓 Welcome to the advanced TypeScript School Management Demo\x1b[0m`);
    console.log(`\x1b[36m📅 System initialized on ${new Date().toLocaleDateString()}\x1b[0m`);
    // Adding Students Section
    printSectionHeader("STUDENT REGISTRATION", "👨‍🎓");
    const student1 = school.addStudent("Talal Alsebai", 18, Grade.FIRST);
    printSuccess(`Student ${student1.name} registered with ID: ${student1.id}`);
    const student2 = school.addStudent("Omar", 17, Grade.SECOND);
    printSuccess(`Student ${student2.name} registered with ID: ${student2.id}`);
    const student3 = school.addStudent("Ahmad", 16, Grade.THIRD);
    printSuccess(`Student ${student3.name} registered with ID: ${student3.id}`);
    const student4 = school.addStudent("Abdulrahman", 17, Grade.SECOND);
    printSuccess(`Student ${student4.name} registered with ID: ${student4.id}`);
    const student5 = school.addStudent("Mohammad", 18, Grade.FIRST);
    printSuccess(`Student ${student5.name} registered with ID: ${student5.id}`);
    const student6 = school.addStudent("Ghassan", 18, Grade.FIRST);
    printSuccess(`Student ${student6.name} registered with ID: ${student6.id}`);
    const student7 = school.addStudent("Zaid", 17, Grade.SECOND);
    printSuccess(`Student ${student7.name} registered with ID: ${student7.id}`);
    const student8 = school.addStudent("Ghaith", 16, Grade.THIRD);
    printSuccess(`Student ${student8.name} registered with ID: ${student8.id}`);
    const student9 = school.addStudent("Noor", 16, Grade.THIRD);
    printSuccess(`Student ${student9.name} registered with ID: ${student9.id}`);
    const student10 = school.addStudent("Maria", 18, Grade.FIRST);
    printSuccess(`Student ${student10.name} registered with ID: ${student10.id}`);
    const student11 = school.addStudent("Jelan", 16, Grade.SECOND);
    printSuccess(`Student ${student11.name} registered with ID: ${student11.id}`);
    const student12 = school.addStudent("Nana", 16, Grade.THIRD);
    printSuccess(`Student ${student12.name} registered with ID: ${student12.id}`);
    const student13 = school.addStudent("Ziena", 16, Grade.THIRD);
    printSuccess(`Student ${student13.name} registered with ID: ${student13.id}`);
    const student14 = school.addStudent("Malek", 16, Grade.THIRD);
    printSuccess(`Student ${student14.name} registered with ID: ${student14.id}`);
    const student15 = school.addStudent("Layan", 16, Grade.SECOND);
    printSuccess(`Student ${student15.name} registered with ID: ${student15.id}`);
    const student16 = school.addStudent("Radwan", 16, Grade.FIRST);
    printSuccess(`Student ${student16.name} registered with ID: ${student16.id}`);
    const student17 = school.addStudent("Mobeen", 16, Grade.THIRD);
    printSuccess(`Student ${student17.name} registered with ID: ${student17.id}`);
    // Adding Teachers Section
    printSectionHeader("TEACHER REGISTRATION", "👨‍🏫");
    const teacher1 = school.addTeacher("Ezz Aldeen Sattouf", 40, Subject.MATH);
    printSuccess(`Teacher ${teacher1.name} registered for ${teacher1.subject}`);
    const teacher3 = school.addTeacher("Osama Murad", 45, Subject.PHYSICS);
    printSuccess(`Teacher ${teacher3.name} registered for ${teacher3.subject}`);
    const teacher4 = school.addTeacher("Rana Alfaisal", 50, Subject.ARABIC);
    printSuccess(`Teacher ${teacher4.name} registered for ${teacher4.subject}`);
    const teacher2 = school.addTeacher("Nada Aljundi", 55, Subject.SCIENCE);
    printSuccess(`Teacher ${teacher2.name} registered for ${teacher2.subject}`);
    // Adding Grades Section
    printSectionHeader("GRADE RECORDING", "📊");
    school.addGrade(student1.id, Subject.MATH, 85);
    school.addGrade(student1.id, Subject.SCIENCE, 90);
    school.addGrade(student1.id, Subject.ARABIC, 90);
    school.addGrade(student1.id, Subject.PHYSICS, 90);
    school.addGrade(student2.id, Subject.MATH, 95);
    school.addGrade(student2.id, Subject.SCIENCE, 88);
    school.addGrade(student2.id, Subject.ARABIC, 88);
    school.addGrade(student2.id, Subject.PHYSICS, 88);
    school.addGrade(student3.id, Subject.MATH, 78);
    school.addGrade(student3.id, Subject.SCIENCE, 82);
    school.addGrade(student3.id, Subject.SCIENCE, 82);
    school.addGrade(student3.id, Subject.SCIENCE, 82);
    school.addGrade(student4.id, Subject.MATH, 45);
    school.addGrade(student4.id, Subject.SCIENCE, 75);
    school.addGrade(student4.id, Subject.ARABIC, 85);
    school.addGrade(student4.id, Subject.PHYSICS, 80);
    school.addGrade(student5.id, Subject.MATH, 60);
    school.addGrade(student5.id, Subject.SCIENCE, 74);
    school.addGrade(student5.id, Subject.ARABIC, 95);
    school.addGrade(student5.id, Subject.PHYSICS, 90);
    school.addGrade(student6.id, Subject.MATH, 90);
    school.addGrade(student6.id, Subject.SCIENCE, 85);
    school.addGrade(student6.id, Subject.ARABIC, 59);
    school.addGrade(student6.id, Subject.PHYSICS, 75);
    school.addGrade(student7.id, Subject.MATH, 85);
    school.addGrade(student7.id, Subject.SCIENCE, 73);
    school.addGrade(student7.id, Subject.ARABIC, 95);
    school.addGrade(student7.id, Subject.PHYSICS, 55);
    school.addGrade(student8.id, Subject.MATH, 90);
    school.addGrade(student8.id, Subject.SCIENCE, 90);
    school.addGrade(student8.id, Subject.ARABIC, 90);
    school.addGrade(student8.id, Subject.PHYSICS, 90);
    school.addGrade(student9.id, Subject.MATH, 85);
    school.addGrade(student9.id, Subject.SCIENCE, 80);
    school.addGrade(student9.id, Subject.ARABIC, 75);
    school.addGrade(student9.id, Subject.PHYSICS, 90);
    school.addGrade(student10.id, Subject.MATH, 95);
    school.addGrade(student10.id, Subject.SCIENCE, 80);
    school.addGrade(student10.id, Subject.ARABIC, 75);
    school.addGrade(student10.id, Subject.PHYSICS, 85);
    school.addGrade(student11.id, Subject.MATH, 85);
    school.addGrade(student11.id, Subject.SCIENCE, 90);
    school.addGrade(student11.id, Subject.ARABIC, 90);
    school.addGrade(student11.id, Subject.PHYSICS, 90);
    school.addGrade(student12.id, Subject.MATH, 87);
    school.addGrade(student12.id, Subject.SCIENCE, 77);
    school.addGrade(student12.id, Subject.ARABIC, 98);
    school.addGrade(student12.id, Subject.PHYSICS, 65);
    school.addGrade(student13.id, Subject.MATH, 85);
    school.addGrade(student13.id, Subject.SCIENCE, 95);
    school.addGrade(student13.id, Subject.ARABIC, 65);
    school.addGrade(student13.id, Subject.PHYSICS, 75);
    school.addGrade(student14.id, Subject.MATH, 87);
    school.addGrade(student14.id, Subject.SCIENCE, 98);
    school.addGrade(student14.id, Subject.ARABIC, 89);
    school.addGrade(student14.id, Subject.PHYSICS, 85);
    school.addGrade(student15.id, Subject.MATH, 62);
    school.addGrade(student15.id, Subject.SCIENCE, 96);
    school.addGrade(student15.id, Subject.ARABIC, 76);
    school.addGrade(student15.id, Subject.PHYSICS, 84);
    school.addGrade(student16.id, Subject.MATH, 95);
    school.addGrade(student16.id, Subject.SCIENCE, 75);
    school.addGrade(student16.id, Subject.ARABIC, 82);
    school.addGrade(student16.id, Subject.PHYSICS, 72);
    school.addGrade(student17.id, Subject.MATH, 95);
    school.addGrade(student17.id, Subject.SCIENCE, 75);
    school.addGrade(student17.id, Subject.ARABIC, 77);
    school.addGrade(student17.id, Subject.PHYSICS, 89);
    printSuccess("All grades have been recorded successfully!");
    // School Statistics
    printSectionHeader("SCHOOL STATISTICS", "📈");
    const stats = school.getSchoolStats();
    console.log(`\n\x1b[32m┌─ OVERVIEW ──────────────────────────────────────┐\x1b[0m`);
    printStatBox("Total Students", stats.totalStudents, "👨‍🎓", "32");
    printStatBox("Total Teachers", stats.totalTeachers, "👨‍🏫", "34");
    printStatBox("School Average", `${stats.averageGrades}%`, "📊", "35");
    console.log(`\x1b[32m└─────────────────────────────────────────────────┘\x1b[0m`);
    // Student Records Table
    printSectionHeader("STUDENT RECORDS", "📋");
    const studentRecords = school.getStudentRecords();
    const studentHeaders = ["Name", "Age", "Grade", "Student ID"];
    const studentRows = studentRecords.map(record => [
        record[0],
        record[1].toString(),
        `Grade ${record[2]}`,
        record[3].toString()
    ]);
    printTable(studentHeaders, studentRows);
    // Grade Records Table
    printSectionHeader("GRADE RECORDS", "📝");
    const gradeRecords = school.getGradeRecords();
    const gradeHeaders = ["Student Name", "Subject", "Grade", "Status"];
    const gradeRows = gradeRecords.map(record => [
        record[0],
        record[1],
        `${record[2]}%`,
        record[2] >= 60 ? "✅ PASS" : "❌ FAIL"
    ]);
    printTable(gradeHeaders, gradeRows);
    // Individual Student Report
    printSectionHeader("STUDENT PERFORMANCE REPORT", "📄");
    const report = school.getStudentReport(student1.id);
    if (report) {
        console.log(`\n\x1b[36m🎯 Student: \x1b[1m${report.studentName}\x1b[0m`);
        console.log(`\x1b[36m📊 Overall Average: \x1b[1m${report.average}%\x1b[0m`);
        printGradeChart(report.grades);
        console.log(`\n\x1b[33m📋 Detailed Grades:\x1b[0m`);
        report.grades.forEach(([subject, grade]) => {
            const status = formatGrade(grade);
            const color = grade >= 90 ? "32" : grade >= 80 ? "33" : grade >= 70 ? "34" : "31";
            console.log(`\x1b[${color}m  🔸 ${subject}: ${status}\x1b[0m`);
        });
    }
    // Grade Distribution
    printSectionHeader("GRADE DISTRIBUTION", "📊");
    const gradeDistribution = school.getGradeDistribution();
    gradeDistribution.forEach(([grade, count]) => {
        const percentage = ((count / stats.totalStudents) * 100).toFixed(1);
        const bar = "█".repeat(Math.floor(count * 0)) + "░".repeat(10 - Math.floor(count * 0));
        console.log(`\x1b[36mGrade ${grade}: \x1b[1m${count} students\x1b[0m \x1b[37m(${percentage}%)\x1b[0m \x1b[32m${bar}\x1b[0m`);
    });
    // Subject Statistics
    printSectionHeader("SUBJECT PERFORMANCE", "📈");
    const subjectStats = school.getSubjectStatistics();
    const subjectHeaders = ["Subject", "Average", "Total Grades", "Performance"];
    const subjectRows = subjectStats
        .filter(([, , count]) => count > 0)
        .map(([subject, average, count]) => [
        subject,
        `${average}%`,
        count.toString(),
        average >= 85 ? "🟢 Excellent" : average >= 75 ? "🟡 Good" : "🔴 Needs Improvement"
    ]);
    printTable(subjectHeaders, subjectRows);
    // Search Demonstration
    printSectionHeader("SEARCH FUNCTIONALITY", "🔍");
    const firstGradeStudents = school.searchStudents({ grade: Grade.FIRST });
    console.log(`\x1b[34m🔎 Search Result: First Grade Students\x1b[0m`);
    firstGradeStudents.forEach(student => {
        console.log(`\x1b[32m  ✓ ${student.name} (Age: ${student.age})\x1b[0m`);
    });
    // Footer
    console.log(`\n\x1b[35m${"═".repeat(70)}\x1b[0m`);
    console.log(`\x1b[35m║\x1b[0m  \x1b[1m🎉 DEMONSTRATION COMPLETED SUCCESSFULLY! 🎉\x1b[0m        \x1b[35m║\x1b[0m`);
    console.log(`\x1b[35m║\x1b[0m  \x1b[36m📅 Generated on: ${new Date().toLocaleString()}\x1b[0m               \x1b[35m║\x1b[0m`);
    console.log(`\x1b[35m║\x1b[0m  \x1b[33m🚀 Built with TypeScript & Advanced OOP Concepts\x1b[0m      \x1b[35m║\x1b[0m`);
    console.log(`\x1b[35m${"═".repeat(70)}\x1b[0m`);
}
demonstrateSystem();
