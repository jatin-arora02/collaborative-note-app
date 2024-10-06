import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const NoteInput = ({ userId, fetchNotes }) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = async () => {
    if (noteText.trim()) {
      try {
        await addDoc(collection(db, 'users', userId, 'notes'), {
          text: noteText,
          timestamp: new Date(),
        });
        setNoteText(''); // Clear input after adding the note
        fetchNotes.current(); // Call fetchNotes using the ref to update the list
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full"> {/* Container styling */}
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Enter your note"
        className="w-full max-w-lg px-4 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" // Styling input
      />
      <button
        onClick={handleAddNote}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 shadow-md w-full max-w-lg"
      >
        Add Note
      </button>
    </div>
  );
};

export default NoteInput;
