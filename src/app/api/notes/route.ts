
import startserver from "@/libs/mongodb";
import NoteModel from "@/models/note"
import { NextResponse } from "next/server";


export async function POST(req: Request){
  await startserver()
    const data = await req.json();
    try{
       const newNote = new NoteModel(data);
       await newNote.save();
      return NextResponse.json({newNote},{status:201})
    }catch(error: any){
      console.log(error);
    }
}

export  async function GET(req: Request) {
  await startserver();
  try {
    const allNotes = await NoteModel.find();
   return NextResponse.json({allNotes});
  } catch (error: any) {
    console.error(error);

  }
}