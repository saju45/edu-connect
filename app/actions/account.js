"use server"

import { User } from "@/model/user-model";
import { revalidatePath } from "next/cache";
import bcryptjs from "bcryptjs"
import { validatePassword } from "@/queries/users";

export async function updateUserInfo(email,updatedData){

    try {
        const filter={email:email};
       await User.findOneAndUpdate(filter,updatedData);
       revalidatePath("/account")

    } catch (error) {
        
        throw new Error("");
    }

}

export async function changePassword(email,oldPassword,newPassword){

    console.log("change Passowrd : ",email,oldPassword,newPassword);
    const isMatch=await validatePassword(email,oldPassword);

    if(!isMatch){
        throw new Error("Please enter a valid current password");

    }

    const filter={email:email};

    const hashPassword=await bcryptjs.hash(newPassword,5);

    const dataToUpdate={
        password:hashPassword
    }

    try {
        await User.findOneAndUpdate(filter,dataToUpdate);
        revalidatePath("/account");
    } catch (error) {
        throw new error(error);
    }
 
}

