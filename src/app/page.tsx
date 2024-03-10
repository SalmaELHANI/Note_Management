"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { fetchNotes, deleteNote } from "@/app/reduxToolkit/slices/noteThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/reduxToolkit/store";


interface Note {
    _id: string;
    title: string;
    description: string;
}


export default function Home() {
    const data = useSelector((state: any) => state.notes);
    const notes: Note[] = data && data.note ? data.note : [];
    const dispatch = useDispatch<AppDispatch>();
   
    const fetchData = async () => {
        dispatch(fetchNotes());
        console.log(notes);
        
    };

    useEffect(() => {
        console.log(data);
        
        fetchData();
    }, [dispatch]);

    
    const handleDelete = async (id: string) => {
        await dispatch(deleteNote({ id }));
        fetchData();
    }

    return (
        <main className="container mb-32 mt-6 ">
            <div className=" flex  ">
                <h3 className="font-bold text-4xl text-left pl-6 ">Add Note </h3>
                <Link href={"/CreateNote"} className="text-4xl " >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </Link></div>

            <div className="p-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {notes.map((note, id) => (
                    <div key={id} className="md:w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid justify-items-stretch">
                        <div>
                            <h5 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
                        </div>
                        <p className="my-3 font-normal text-gray-700 dark:text-gray-400">{note.description}</p>

                        <div className="justify-self-start flex items-center space-x-3 ">
                            <Link href={`/EditNote/${note._id}`} className="inline-flex items-center justify-center w-10 h-10 mr-2 focus:ring-teal-500 transition-colors duration-150 bg-green-500 rounded-full focus:shadow-outline">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                            </Link>
                            <button onClick={() => handleDelete(note._id)} className="inline-flex items-center justify-center w-10 h-10 ml-3 focus:ring-teal-500 transition-colors duration-150 bg-red-500 rounded-full focus:shadow-outline">
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>

    );
}

