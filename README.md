# School-Management-System
🏫 Full-featured School Management System in TypeScript with student/teacher CRUD operations, grade management, statistical reports, and advanced filtering capabilities

## 📋 Features

### 👨‍🎓 Student Management
- Add new students with personal information
- Search students by name or advanced criteria
- Remove students and associated data
- View all registered students

### 👨‍🏫 Teacher Management
- Add teachers with subject specialization
- View all registered teachers
- Search teachers by name

### 📊 Grade Management
- Record student grades for different subjects
- Update existing grades
- Validate grade ranges (0-100)
- Track grades per student and subject

### 📈 Reports & Analytics
- Individual student reports with grade averages
- School-wide statistics
- Subject-wise performance analytics
- Grade distribution across different levels
- Advanced search with multiple criteria

## 🛠️ TypeScript Features Demonstrated

### Core Types & Interfaces
- **Basic Types**: `string`, `number`, `boolean`
- **Enums**: Grade levels and subjects
- **Interfaces**: Student, Teacher, Person with inheritance
- **Type Aliases**: Tuple types for records
- **Union Types**: Optional parameters and return types

### Advanced Features
- **Classes**: Object-oriented design with private properties
- **Generics**: Flexible data structures
- **Array Methods**: `filter`, `map`, `find`, `reduce`
- **Optional Chaining**: Safe property access
- **Type Guards**: Runtime type checking

### Data Structures
- **Arrays**: Dynamic collections of students, teachers, grades
- **Tuples**: Fixed-length arrays for records
- **Objects**: Complex data structures with nested properties

## 📁 Project Structure

```
├── src/
│   └── school-management.ts    # Main system implementation
├── README.md                   # Project documentation
└── package.json               # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- TypeScript compiler

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Talal8866/school-management-typescript.git
cd school-management-typescript
```

2. Install dependencies:
```bash
npm install
```

3. Compile TypeScript:
```bash
npx tsc school-management.ts
```

4. Run the system:
```bash
node school-management.js
```

## 💡 Usage Examples

### Adding Students
```typescript
const school = new SimpleSchoolSystem();
const student = school.addStudent("محمد أحمد", 16, Grade.FIRST);
```

### Recording Grades
```typescript
school.addGrade(student.id, Subject.MATH, 85);
school.addGrade(student.id, Subject.SCIENCE, 90);
```

### Getting Reports
```typescript
const report = school.getStudentReport(student.id);
const schoolStats = school.getSchoolStats();
```

### Advanced Search
```typescript
const results = school.searchStudents({
    grade: Grade.FIRST,
    minAge: 15,
    maxAge: 17
});
```

## 📊 Sample Output

The system provides comprehensive console output including:
- Student registration confirmations
- Grade recording updates
- Statistical summaries
- Formatted reports with Arabic interface

## 🏗️ Architecture

### Class Design
- **SimpleSchoolSystem**: Main class managing all operations
- **Encapsulation**: Private arrays for data storage
- **Type Safety**: Strong typing throughout the application

### Data Flow
1. **Input Validation**: All user inputs are validated
2. **Data Processing**: CRUD operations with type safety
3. **Report Generation**: Computed statistics and formatted output

## 🔧 Technical Highlights

- **Memory Management**: Efficient array operations and filtering
- **Error Handling**: Comprehensive validation and error messages
- **Code Organization**: Clean separation of concerns
- **Performance**: Optimized search and calculation algorithms

## 📚 Learning Objectives

This project demonstrates:
- TypeScript fundamentals and advanced features
- Object-oriented programming principles
- Data structure manipulation
- Functional programming concepts
- Real-world application development

## 🌟 Key Methods

- `addStudent()` - Register new students
- `addGrade()` - Record and update grades
- `getStudentReport()` - Generate individual reports
- `getSchoolStats()` - Calculate school-wide statistics
- `searchStudents()` - Advanced filtering capabilities

## 📝 Notes

- All console output is in Arabic for educational demonstration
- Grade validation ensures values between 0-100
- Automatic ID generation for students and teachers
- Comprehensive error handling and user feedback


