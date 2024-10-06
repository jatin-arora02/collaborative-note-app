import React, { useRef } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import NoteInput from './NoteInput';
import NotesList from './NotesList';

const Dashboard = () => {
  const auth = getAuth(); 
  const userId = auth.currentUser?.uid || 'user1';
  const fetchNotesRef = useRef(null); // Initialize useRef for fetchNotes

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      window.location.href = '/register';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center w-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Welcome to your Dashboard</h1>

      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 text-black">
        {/* Pass fetchNotesRef to both NoteInput and NotesList */}
        <NoteInput userId={userId} fetchNotes={fetchNotesRef} />
        <NotesList userId={userId} fetchNotesRef={fetchNotesRef} />

        <button 
          onClick={handleLogout} 
          className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
