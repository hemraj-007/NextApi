import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";

export const GET = async (req: NextResponse) => {
  try {
    await connect();
    const users = await User.find(); 
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse('error: ' + error.message, { status: 500 });
  }
};

export const POST=async(req:Request)=>{
    try {
      await connect()
      const body=await req.json();

      const createUser=new User({
        name:body.name,
        email:body.email,
        password:body.password
      });

      await createUser.save();
      return new NextResponse(JSON.stringify({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
      }), { status: 200 });
  
    } catch (error: any) {
      return new NextResponse('error: ' + error.message, { status: 500 });
    }
  };

  export const PUT = async (req: Request) => {
    try {
      await connect();
  
      // Parse the request body
      const body = await req.json();
  
      // Update the user's email based on their ID
      const updatedUser = await User.findByIdAndUpdate(
        body._id,
        { email: body.email },
        { new: true } 
      ).exec(); 
  
      // If the user was not found, return a 404 error
      if (!updatedUser) {
        return new NextResponse('User not found', { status: 404 });
      }
  
      // Respond with the updated user's details
      return new NextResponse(JSON.stringify({
        name: updatedUser.name,
        email: updatedUser.email,
        _id: updatedUser._id
      }), { status: 200 });
  
    } catch (error: any) {
      return new NextResponse('error: ' + error.message, { status: 500 });
    }
  };
  export const DELETE = async (request: Request) => {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get("userId");
  
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing user ID" }),
          { status: 400 }
        );
      }
  
      await connect();
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return new NextResponse(
          JSON.stringify({ message: "User not found" }),
          { status: 404 }
        );
      }
  
      return new NextResponse(
        JSON.stringify({ message: "User deleted successfully", user: deletedUser }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse("Error deleting user: " + error.message, {
        status: 500,
      });
    }
  };