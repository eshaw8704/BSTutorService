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
BSTutors/
├── backend/               # Backend services
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers and controllers
│   ├── databases/         # Database connection and setup
│   ├── models/            # Mongoose models
│   ├── routes/            # API routing definitions
│   ├── server.js          # Entry point for the backend server
│   └── testConnection.js  # Script to test database connectivity
├── frontend/              # Frontend client application
│   ├── public/            # Publicly accessible files
│   ├── src/               # Frontend source code
│   │   ├── assets/        # Images and static assets
│   │   ├── components/    # Reusable UI components
│   │   │   ├── AdminCreation.jsx    # Admin creation page
│   │   │   ├── LoginPage.jsx        # User login page
│   │   │   ├── StudentCreation.jsx  # Student account creation
│   │   │   ├── TutorCreation.jsx    # Tutor account creation
│   │   │   ├── WelcomePage.jsx      # Landing page for the app
│   │   │   └── Header.jsx           # Navigation header
│   ├── App.jsx           # Main application file
│   ├── main.jsx          # Entry point for React application
│   └── index.css         # Global styling
└── package.json          # Project metadata and dependencies
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

