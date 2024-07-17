import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";
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

export async function getModule(moduleId) {
    try {
        const modul = await Module.findById(moduleId).
        populate({
            path: "lessonIds",
            model: Lesson
        }).
        lean();
        return replaceMongoIdInObject(modul);
    } catch (e) {
        throw new Error(e)
    }
}