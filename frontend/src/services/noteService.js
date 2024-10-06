import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust this path as necessary

// Function to create a note
export const createNote = async (userId, noteContent) => {
  try {
    const noteRef = await addDoc(collection(db, "users", userId, "notes"), {
      content: noteContent,
      timestamp: Timestamp.fromDate(new Date()), // Save current timestamp
    });
    console.log("Note created with ID: ", noteRef.id);
  } catch (error) {
    console.error("Error adding note: ", error);
  }
};

// Function to get notes for a user
export const getNotes = async (userId) => {
  try {
    const notesSnapshot = await getDocs(
      collection(db, "users", userId, "notes")
    );
    const notesList = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notesList; // Returns an array of notes
  } catch (error) {
    console.error("Error getting notes: ", error);
    return [];
  }
};

// Function to edit a note
export const editNote = async (userId, noteId, newContent) => {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteId);
    await updateDoc(noteRef, {
      content: newContent,
    });
    console.log("Note updated successfully");
  } catch (error) {
    console.error("Error updating note: ", error);
  }
};

// Function to delete a note
export const deleteNote = async (userId, noteId) => {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteId);
    await deleteDoc(noteRef);
    console.log("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};
