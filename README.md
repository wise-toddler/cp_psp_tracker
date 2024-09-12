# Competitive Programming Student Tracker

## Overview

This project is a web application designed to track the progress of students solving competitive programming problems. It features an admin dashboard for managing students and questions, as well as pages to display student information and questions.

## Features

- Admin dashboard for managing students and questions
- Student leaderboard
- Question list with solved count
- Protected routes for admin access
- Dark theme UI

## Tech Stack

- React
- React Router for navigation
- react-table for data tables
- MongoDB for database (simulated with local operations)
- CSS for styling

## Project Structure

```
.
├── config-overrides.js
├── package.json
├── README.md
└── src
    ├── App.js
    ├── components
    │   ├── Admin
    │   │   ├── AdminLogin.js
    │   │   └── index.js
    │   ├── AdminDashboard
    │   │   ├── AddQuestion.js
    │   │   ├── AddStudent.js
    │   │   └── AdminDashboard.js
    │   ├── DataTable
    │   │   └── DataTable.js
    │   ├── Leaderboard.js
    │   ├── navbar
    │   │   └── Navbar.js
    │   ├── ProtectedRoute
    │   │   └── ProtectedRoute.js
    │   ├── Questions
    │   │   └── Question.js
    │   ├── QuestionsPage.js
    │   ├── Student
    │   │   └── Student.js
    │   └── StudentsPage.js
    ├── index.js
    ├── styles
    │   ├── AdminDashboard.css
    │   ├── AdminLogin.css
    │   ├── App.css
    │   ├── DataTable.css
    │   ├── index.css
    │   ├── navbar.css
    │   ├── Questions.css
    │   ├── QuestionsPage.css
    │   ├── Student.css
    │   └── StudentsPage.css
    └── utils
        └── mongoDbOperations.js
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cp-student-tracker.git
   cd cp-student-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

- Navigate to `/admin-login` to access the admin dashboard. Use the password "admin123" to log in.
- The Students page displays a list of all students and their progress.
- The Questions page shows all available competitive programming questions.
- Admins can add, edit, or delete students and questions from the admin dashboard.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).