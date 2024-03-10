"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function EditNote({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

   const fetchData = async () => {
     try {
      console.log(params.id);
         const response = await axios.get(`http://localhost:3000/api/notes/${params.id}`);
         setTitle(response.data.note.title);
         setDescription(response.data.note.description);
         console.log(response.data.note);

     } catch (error) {
         console.error("Error fetching data:", error);
     }
 };

 useEffect(() => {
     fetchData();
 }, []);
     

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      

      try {
          await axios.put(`http://localhost:3000/api/notes/${params.id}`, { title, description });
          router.push('/');
      } catch (error) {
          console.error('Error updating note:', error);
      }
  };

  return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="container p-6 bg-white shadow-xl rounded-xl w-full max-w-md">
              <h1 className="text-4xl font-bold mb-6 text-teal-500">Edit Note</h1>

              <form  className="max-w-md mx-auto">
                  <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-600 ">
                          Title:
                      </label>
                      <input
                          type="text"
                          id="title"
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-teal-300"
                      />
                  </div>

                  <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                          Description:
                      </label>
                      <textarea
                          id="description"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-teal-300"
                          rows={4}
                      />
                  </div>

                  <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
                      onClick={handleSubmit}
                  >
                      Update Note
                  </button>
              </form>

              <Link href="/" className="block text-center mt-4 text-teal-500 hover:underline">
                  Go to Notes Page
              </Link>
          </div>
      </div>
  );
}

export default EditNote