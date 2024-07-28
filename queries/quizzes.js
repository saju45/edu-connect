import { Quiz } from "@/model/quizzes-model";
import { Quizset } from "@/model/quizset-model";

import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";


export async function getAllQuizSets(excludeUnPublished){

    try {
        let quizSets=[];
        if(excludeUnPublished){
            quizSets=await Quizset.find({active:true}).lean();

        }else{
            quizSets=await Quizset.find().lean();

        }
        return replaceMongoIdInArray(quizSets);

    } catch (error) {
        throw new Error(error);
    }
}

export async function getQuizSetById(id){

    try {
        const quizSets=await Quizset.findById(id).
        populate(
            {
                path:"quizIds",
                model:Quiz
            }
        ).lean();

        return replaceMongoIdInObject(quizSets)
    } catch (error) {
        throw new Error(error)
    }
}



export async function createQuiz(quizData){

    try {
        const quiz=await Quiz.create(quizData);
        return quiz?._id.toString();
    } catch (error) {
        throw new Error(error);
    }
}