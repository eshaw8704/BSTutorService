// utils/localDB.js
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('localUsersDB.json');

// ✅ Write user data to local file
export const saveUserLocally = async (userData) => {
  try {
    // Step 1: Read the file (or create empty array if file doesn’t exist)
    const fileExists = fs.existsSync(dbPath);
    const users = fileExists
      ? JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
      : [];

    // Step 2: Add the new user to the array
    users.push(userData);

    // Step 3: Save the updated array back to the file
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('❌ Error saving to local DB:', error);
  }
};

// ✅ Find a user by email in the local file
export const findUserLocally = async (email) => {
  try {
    const users = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return users.find((user) => user.email === email);
  } catch (error) {
    console.error('❌ Error reading local DB:', error);
    return null;
  }
};
