'use client';
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { addNote, deleteNote, fetchNotes, getOneNote, updateNote } from "./noteThunk";


interface Note {
  _id: string;
  title: string;
  description: string;
}
interface NotesState {
  note: Note[];
  error: SerializedError | null;
}
const initialState: NotesState = {
  note: [],
  error: null,
};
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
        state.error = null;
        state.note = action.payload;
    }).addCase(fetchNotes.rejected, (state, action) => {
        state.error = action.error;
    });
    
     builder.addCase(getOneNote.fulfilled, (state, action) => {
        state.error = null;
        state.note = action.payload;
    }).addCase(getOneNote.rejected, (state, action) => {
        state.error = action.error;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
        state.error = null;
        state.note = action.payload;
    }).addCase(addNote.rejected, (state, action) => {
        state.error = action.error;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
        state.error = null;
        state.note = action.payload;
    }).addCase(updateNote.rejected, (state, action) => {
        state.error = action.error;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
        state.error = null;
        state.note = action.payload;
    }).addCase(deleteNote.rejected, (state, action) => {
        state.error = action.error;
    });
}});

export default notesSlice.reducer;
