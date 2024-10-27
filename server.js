const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');
const cors = require('cors');

// Initialize Express server
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for the React frontend
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require('./src/codeadept2024-firebase-adminsdk-h3bbl-cf0d74d01c.json'); // Path to your Firebase service account

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://codeadept2024-default-rtdb.firebaseio.com" // Your Firestore database URL
});

const db = admin.firestore();

// Fetch Firestore Data and Save Locally in a JSON File
app.get('/fetch-data', async (req, res) => {
  try {
    const snapshot = await db.collection('registrations').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log('Fetched registrations count:', data.length); // Log the number of records fetched

    // Save data to a JSON file locally
    const filePath = './firestoreData.json';
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ message: 'Data fetched and saved locally', data, count: data.length });
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Serve the locally saved JSON file
app.get('/get-local-data', (req, res) => {
  const filePath = './firestoreData.json';
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(fileData);
    console.log('Returning local data, count:', jsonData.length); // Log the number of records returned
    res.json(jsonData);
  } else {
    res.status(404).json({ error: 'No local data found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
