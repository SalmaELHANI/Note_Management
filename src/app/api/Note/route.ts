import startserver from "@/libs/mongodb";
import NoteModel from "@/models/note"


export async function POST(req: any,res:any){
  await startserver()
    const {title, description}= req.body;
    try{
      const newNote = new NoteModel({title, description});
      await newNote.save();
      res.statut(400).json({status:'1 post has been added Successfully!'})
    }catch(error: any){
      console.log(error);
    }
}
