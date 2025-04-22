# BSTutors

## Overview
BSTutors is a web application designed to facilitate booking tutoring sessions. The platform is built using the MERN stack (MongoDB, Express, React, Node.js), leveraging modern web technologies to provide a smooth and user-friendly experience.

## Features
- Intuitive and responsive UI using React and Chakra UI.
- Seamless client-server communication with Express and MongoDB.
- Real-time updates and interactive components.
- Integrated Vite for fast development.
- Styled using CSS for a visually appealing interface.
- SVG-based logo with smooth animation effects.

## Project Structure
```
BSTUTORSERVICE/
├── .vite/                      # Vite cache
│   ├── deps/
│   └── deps_temp_a76d9c3a/
├── .vscode/                    # VSCode workspace settings
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── buttonController.js
│   │   ├── paymentController.js
│   │   ├── payrollController.js
│   │   ├── textInputController.js
│   │   ├── userController.js
│   │   └── webhookController.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Payment.js
│   │   ├── Payroll.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── buttonRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── payrollRoutes.js
│   │   ├── textInputRoutes.js
│   │   ├── userRoutes.js
│   │   └── webhookRoutes.js
│   ├── utils/
│   │   ├── payrollUtils.js
│   │   ├── sendEmail.js
│   │   └── UserDB.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   │   ├── .vite/
│   │   └── .vite-temp/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── BST-logo.svg
│   │   │   ├── greenBS.png
│   │   │   └── yellowBS.png
│   │   ├── components/
│   │   │   ├── AccountCreation/
│   │   │   │   ├── AdminCreation.css
│   │   │   │   ├── AdminCreation.jsx
│   │   │   │   ├── StudentCreation.css
│   │   │   │   ├── StudentCreation.jsx
│   │   │   │   ├── TutorCreation.css
│   │   │   │   └── TutorCreation.jsx
│   │   │   ├── Frames/
│   │   │   │   ├── AdminDashboard.css
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminPayrollList.jsx
│   │   │   │   ├── AdminPayrollReview.jsx
│   │   │   │   ├── AppointmentFrame.css
│   │   │   │   ├── AppointmentFrame.jsx
│   │   │   │   ├── Header.css
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── LoginPage.css
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── Profile.css
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── StudentDashboard.css
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   ├── TutorDashboard.css
│   │   │   │   ├── TutorDashboard.jsx
│   │   │   │   ├── TutorPayrollPage.jsx
│   │   │   │   ├── WelcomePage.css
│   │   │   │   └── WelcomePage.jsx
│   │   │   └── Styles/
│   │   │       └── PayrollPages.css
│   │   ├── BookAppointment.css
│   │   ├── BookAppointment.jsx
│   │   ├── CancelAppointment.jsx
│   │   ├── CheckoutForm.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── DashboardLayout.css
│   │   ├── DashboardLayout.jsx
│   │   ├── DashboardSidebar.css
│   │   ├── DashboardSidebar.jsx
│   │   ├── DateTimeSelector.css
│   │   ├── DateTimeSelector.jsx
│   │   ├── RescheduleAppointment.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── stripe.js
│   │   └── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── README.md
└── vite.config.backup.js
```

## Installation
### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BSTutors.git
   cd BSTutors
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Run the backend server:
   ```bash
   cd backend
   npm start
   ```
4. Run the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Usage
- Access the application at `http://localhost:5173/`.
- Log in or create an account (Admin, Student, Tutor).
- The Welcome Page provides an introduction to the platform.
- Administrative users can manage tutor and student accounts.

## Technologies Used
- React: Frontend UI framework
- Chakra UI: Component library
- Vite: Development environment
- CSS: Styling and layout
- MongoDB: Database
- Express: Backend framework
- Node.js: Server environment

## Contributing
1. Fork the project.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgements
Special thanks to the development team and contributors for their effort in building this project.

