import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import Blog from "@/lib/modals/blog";
import { url } from "inspector";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET=async(req:Request)=>{
    try{
    const {searchParams}=new URL(req.url);
    const userId=searchParams.get('userId');
    const categoryId=searchParams.get('categoryId');
    const searchKeywords=searchParams.get('keywords') as string;
    const startDate=searchParams.get('startDate');
    const endDate=searchParams.get('endDate');
    const page:any= parseInt(searchParams.get('page') || '1');
    const limit: any = parseInt(searchParams.get("limit") || "10");

    if(!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(
            JSON.stringify({ message: "Invalid or missing userId" }),
            { status: 400 }
          );
    }
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing categoryId" }),
          { status: 400 }
        );
    }
    await connect();

    const user=User.findById(userId);
    if(!user){
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
            status: 404,
        }); 
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }
    const filter :any ={
        user:new Types.ObjectId(userId),
        category:new Types.ObjectId(categoryId),
    }
    const blogs=await Blog.find(filter)
    return new NextResponse(JSON.stringify({ blogs }), {
        status: 200,
      });
    } catch (error: any) {
      return new NextResponse("Error in fetching blogs" + error.message, {
        status: 500,
      });
    }
  };

export const POST=async(req:Request)=>{
    try {
        const {searchParams}=new URL(req.url);
        const userId=searchParams.get('userId');
        const categoryId=searchParams.get('categoryId');

        const body=await req.json();
        const {title,description}=body;

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 400 }
              );
        }
        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(
              JSON.stringify({ message: "Invalid or missing categoryId" }),
              { status: 400 }
            );
        }
        await connect();
    
        const user=User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({ message: "User not found" }), {
                status: 404,
            }); 
        }
    
        const category = await Category.findById(categoryId);
        if (!category) {
          return new NextResponse(
            JSON.stringify({ message: "Category not found" }),
            {
              status: 404,
            }
          );
        }

        const newBlog=new Blog({
            title,
            description,
            user:new Types.ObjectId(userId),
            category:new Types.ObjectId(categoryId)
        })

        await newBlog.save();
        return new NextResponse(
            JSON.stringify({ message: "Blog is created", blog: newBlog }),
            { status: 200 }
          );
        } catch (error: any) {
          return new NextResponse("Error in fetching blogs" + error.message, {
            status: 500,
          });
        }
      };