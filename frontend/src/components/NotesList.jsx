import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const NotesList = ({ userId, fetchNotesRef }) => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [newText, setNewText] = useState('');

  // Fetch notes from Firestore
  const fetchNotes = async () => {
    const notesCollection = collection(db, 'users', userId, 'notes');
    const notesSnapshot = await getDocs(notesCollection);
    const notesList = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNotes(notesList);
  };

  useEffect(() => {
    fetchNotes();
    fetchNotesRef.current = fetchNotes; // Expose fetchNotes to parent
  }, []);

  // Delete a note
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'notes', noteId));
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Edit a note
  const handleEditNote = async (noteId) => {
    try {
      await updateDoc(doc(db, 'users', userId, 'notes', noteId), {
        text: newText,
      });
      setEditingNoteId(null); // Exit editing mode
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Your Notes</h2>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="p-4 text-white border rounded-lg shadow-sm bg-white flex justify-between items-start">
            {editingNoteId === note.id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditNote(note.id)}
                    className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingNoteId(null)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-between items-center">
                <p className="text-gray-800">{note.text}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingNoteId(note.id)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No notes available.</p>
      )}
    </div>
  );
};

export default NotesList;
