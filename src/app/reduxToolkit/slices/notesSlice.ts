import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Note {
  _id: string;
  title: string;
  description: string;
}

export const fetchNotes = createAsyncThunk<Note[]>(
  'notes/fetchNotes',
  async () => {
    const response = await axios.get("http://localhost:3001/api/notes");
    return response.data.allNotes;
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: [] as Note[],
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    removeNote: (state, action) => {
      return state.filter(note => note._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;
