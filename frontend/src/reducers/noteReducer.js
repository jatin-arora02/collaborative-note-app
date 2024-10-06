const initialState = {
  notes: [],
  loading: true,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NOTES":
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId ? action.payload : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};
