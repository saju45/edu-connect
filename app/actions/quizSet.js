
"use server";

import { getSlug } from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { createQuiz } from "@/queries/quizzes";



export async function updateQuizSet(quizSetId,data){

    try {
        
        await Quizset.findByIdAndUpdate(quizSetId,data);

    } catch (error) {
        throw new Error(error)
    }
}


export async function addQuizToQuizSet(quizSetId,quizData){


    try {
        
        const transformedQuizData = {};

        transformedQuizData["title"] = quizData["title"];
        transformedQuizData["description"] = quizData["description"];
        transformedQuizData["slug"] = getSlug(quizData["title"]);
        transformedQuizData["options"] = [
            {
                text: quizData.optionA.label,
                is_correct: quizData.optionA.isTrue,
            },
            {
                text: quizData.optionB.label,
                is_correct: quizData.optionB.isTrue,
            },
            {
                text: quizData.optionC.label,
                is_correct: quizData.optionC.isTrue,
            },
            {
                text: quizData.optionD.label,
                is_correct: quizData.optionD.isTrue,
            },
        ];

        const createdQuizId=await createQuiz(transformedQuizData);

        const quizSet=await Quizset.findById(quizSetId);
        quizSet.quizIds.push(createdQuizId);
        quizSet.save();


    } catch (error) {
        throw new Error(error)
    }

}


export async function deleteQuizSEt(quizSetId) {
    try {
      await Quizset.findByIdAndDelete(quizSetId);
    } catch (err) {
      throw new Error(err);
    }
  }

export async function doCreateQuizSet(data) {
    try {
        data['slug'] = getSlug(data.title);
        const craetedQuizSet = await Quizset.create(data);
        return craetedQuizSet?._id.toString();
    } catch (e) {
        throw new Error(e);
    }
}

export async function changeQuizesPublishedState(quizesId){

    console.log("changeQuizesPublishedState  : ",quizesId);
    try {
        const quiz=await Quizset.findById(quizesId).lean();
        const res=await Quizset.findByIdAndUpdate(quizesId,{active:!quiz?.active},{lean:true});
    
        return res.active;
    
      } catch (error) {
       
        throw new Error(error);
      }


}