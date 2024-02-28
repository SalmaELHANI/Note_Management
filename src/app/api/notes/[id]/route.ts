import startserver from "@/libs/mongodb";
import NoteModel from "@/models/note"
import { NextResponse } from "next/server";



export  async function GET(req: Request) {
    await startserver();
    const id = req.url.split("notes/")[1];
    
    try {
      const note = await NoteModel.findById(id);
      
      if (!note) {
        return NextResponse.json({message: "not found" });
      }
      
      return NextResponse.json({note });
    } catch (error: any) {
      console.error(error);
    }
  }


  export  async function DELETE(req: Request) {
    await startserver();
    const id = req.url.split("notes/")[1];
  
    try {
      const deletedNote = await NoteModel.findByIdAndDelete(id);
  
      if (!deletedNote) {
        return NextResponse.json({ error: 'Note not found' });
      }
  
      return NextResponse.json({ deletedNote });
    } catch (error: any) {
      console.error(error);
     NextResponse.json({ error: 'Internal Server Error' });
    }
  }



  
  export  async function PUT(req: Request) {
    await startserver();
    const id = req.url.split("notes/")[1];
    
    const data  = req.body;
  
    try {
      const updatedNote = await NoteModel.findByIdAndUpdate(
        id,
        {data },
        { new: true }
      );
  
      if (!updatedNote) {
        return NextResponse.json({ error: 'Note not found' });
      }
  
     return NextResponse.json({updatedNote });
    } catch (error: any) {
      console.error(error);
    }
  }