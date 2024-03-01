import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const startserver = async () =>{
    try{ 
        await mongoose.connect(process.env.DB_CONNECTION_STRING!);
        console.log("Connection to the database successful");
       
    }catch(error: any){
        console.error(error.message);
    }
}

export default startserver;