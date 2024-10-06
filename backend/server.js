const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require(path.resolve(
  process.env.FIREBASE_SERVICE_ACCOUNT
));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://collaborative-notes-3008d.firebaseio.com",
});

const db = admin.firestore();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes here

// Example route to check if server is working
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Create a new note
app.post("/notes", async (req, res) => {
  const { userId, title, content } = req.body;

  try {
    const newNote = {
      userId,
      title,
      content,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection("users").doc(userId).collection("notes").add(newNote);
    res.status(201).send({ id: docRef.id, ...newNote });
  } catch (error) {
    console.error("Error creating note: ", error);
    res.status(500).send("Error creating note.");
  }
});


// Get all notes for a user
app.get("/notes/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const notesSnapshot = await db.collection("users").doc(userId).collection("notes").orderBy("createdAt", "desc").get();
    const notes = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(notes);
  } catch (error) {
    console.error("Error fetching notes: ", error);
    res.status(500).send("Error fetching notes.");
  }
});



// Update a note
app.put("/notes/:userId/:noteId", async (req, res) => {
  const { userId, noteId } = req.params;
  const { title, content } = req.body;

  try {
    const noteRef = db.collection("users").doc(userId).collection("notes").doc(noteId);
    await noteRef.update({
      title,
      content,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).send("Note updated successfully.");
  } catch (error) {
    console.error("Error updating note: ", error);
    res.status(500).send("Error updating note.");
  }
});


// Delete a note
app.delete("/notes/:userId/:noteId", async (req, res) => {
  const { userId, noteId } = req.params;

  try {
    await db.collection("users").doc(userId).collection("notes").doc(noteId).delete();
    res.status(200).send("Note deleted successfully.");
  } catch (error) {
    console.error("Error deleting note: ", error);
    res.status(500).send("Error deleting note.");
  }
});
