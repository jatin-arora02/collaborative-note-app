import axiosInstance from "../services/axiosInstance";

// Action to create a new note
export const createNote = (noteData) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/notes", noteData);
    dispatch({ type: "CREATE_NOTE", payload: data });
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

// Action to fetch all notes for a user
export const fetchNotes = (userId) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(`/notes/${userId}`);
    dispatch({ type: "FETCH_NOTES", payload: data });
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

// Action to update a note
export const updateNote = (userId, noteId, updatedData) => async (dispatch) => {
  try {
    await axiosInstance.put(`/notes/${userId}/${noteId}`, updatedData);
    dispatch({ type: "UPDATE_NOTE", payload: { noteId, ...updatedData } });
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

// Action to delete a note
export const deleteNote = (userId, noteId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/notes/${userId}/${noteId}`);
    dispatch({ type: "DELETE_NOTE", payload: noteId });
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
