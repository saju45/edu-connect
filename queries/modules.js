import { Module } from "@/model/module.model";
import { dbConnect } from "@/service/mongo";


export async function create(moduleData){


    try {
        await dbConnect();
        const modules=await Module.create(moduleData);
        return JSON.parse(JSON.stringify(modules));
        
    } catch (error) {
        throw new Error(error);
    }

}