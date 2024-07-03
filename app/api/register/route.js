import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";


export const POST=async(request,response)=>{

    const {
        firstName,
        lastName,
        email,
        password,
        userRole
      }=await request.json();
    console.log(firstName,lastName,email,password,userRole);

    await dbConnect();

    const hashPassword=await bcryptjs.hash(password,5);

    const newUser={
        firstName,
        lastName,
        email,
        password:hashPassword,
        role:userRole
    }

    console.log(newUser);

    try {

        // const findUser=User.findOne({email:email}).lean();

        // if(findUser){
        //     console.log("user already exits");
        //     return new NextResponse("user already exits",{
        //         status:500
        //     }) 
        // }
        
        await User.create(newUser);
        return new NextResponse("user has been created successfully",{
            status:201
        })
    } catch (error) {
        console.log(error);
        return new NextResponse(error.message,{
            status:500
        })
    }
}