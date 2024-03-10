'use client';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchNotes = createAsyncThunk('notes/getAllNotes',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes");
      return response.data.allNotes;
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  });

export const getOneNote = createAsyncThunk('notes/getOneNote',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
      return response.data.note;
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  });

export const addNote = createAsyncThunk('notes/addNote',
  async (credentials: {
    title: string, description: string
  }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/notes', credentials);
      return response.data.allNotes; 
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  });

export const updateNote = createAsyncThunk('notes/updateNote',
  async (credentials: {
    id: string,
    title: string, description: string
  }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/notes/${credentials.id}`, {
        title: credentials.title,
        description: credentials.description
      });
      return response.data.allNotes; 
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  });

export const deleteNote = createAsyncThunk('notes/deleteNote',
  async (credentials: {
    id: string,
  }, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/notes/${credentials.id}`);
      return response.data.allNotes; 
    } catch (error) {
      const message = (error as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  });
