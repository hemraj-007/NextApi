import exp from "constants";
import mongoose from "mongoose";

const MONO_URL=process.env.MONGO_URL;

const connect=async()=>{
    const connectionState=mongoose.connection.readyState;

    if(connectionState===1){
        console.log('Already connected');
        return
    }
    if(connectionState===2){
        console.log('Connecting...');
        return
    }
    try {
        mongoose.connect(MONO_URL!,{
            dbName:'nextApi',
            bufferCommands:true,
        });
        console.log('Connected');
    } catch (error:any) {
        console.log('error',error);
        throw new Error('error',error)
    }
};

export default connect