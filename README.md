# Competitive Programming Student Tracker

## Overview

I've developed this serverless web application to track the progress of students solving competitive programming problems at Scaler School of Technology. It features an admin dashboard for managing students and questions, as well as pages to display student information and questions.

## Features

- Admin dashboard for managing students and questions
- Student leaderboard
- Question list with solved count
- Protected routes for admin access
- Dark theme UI
- Serverless architecture
- Offline-first approach with pending tasks

## Tech Stack

- React for the frontend
- React Router for navigation
- react-table for data tables
- MongoDB for database (simulated with local operations)
- CSS for styling
- Node.js for the backend script

## Project Structure

```
.
├── config-overrides.js
├── package.json
├── package-lock.json
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
    │   ├── context
    │   │   └── AuthContext.js
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
    │   ├── Question.css
    │   ├── QuestionsPage.css
    │   ├── Student.css
    │   └── StudentsPage.css
    └── utils
        └── mongoDbOperations.js
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/wise-toddler/cp_psp_tracker.git
   cd cp_psp_tracker
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

- Navigate to `/admin-login` to access the admin dashboard.
- The Students page displays a list of all students and their progress.
- The Questions page shows all available competitive programming questions.
- Admins can add, edit, or delete students and questions from the admin dashboard.

## Serverless Architecture and Backend

This project uses a serverless architecture. The backend repository can be found at:
[https://github.com/wise-toddler/cp_psp_backend](https://github.com/wise-toddler/cp_psp_backend)

The application works by keeping pending tasks from the user. When the admin wants to update the database, they can run:

```
npm run initiate
```

This command will process all pending tasks and update the status of questions for the students. The same script also updates the status of questions based on the latest data from competitive programming platforms.

## Contributing

I'm always looking to improve this project and would be thrilled to receive contributions from the community. If you have any ideas for new features, bug fixes, or improvements, please feel free to submit a Pull Request. Your input is valuable and can help make this tool even more useful for students and educators.

## About the Author

This project was created by Shivansh Singh for Scaler School of Technology. You can find more of my work on my GitHub profile: [wise-toddler](https://github.com/wise-toddler).

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

I'd like to express my gratitude to Scaler School of Technology for providing the opportunity to work on this project. Special thanks to all the students and educators who have provided feedback and suggestions to improve this tool.

---

I hope you find this Competitive Programming Student Tracker useful and professional. Your feedback and contributions are always welcome!