"use server"

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";
import mongoose from "mongoose";


export async function createCourse(data){

    try {
        const loggedInuser=await getLoggedInUser();
        data["instructor"]=loggedInuser?.id;
        const course=await create(data);
        return course;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateCourse(courseId, dataToUpdate) {
    try {
        await Course.findByIdAndUpdate(courseId, dataToUpdate);
    } catch(e){
        throw new Error(e);
    }
}

export async function changeCoursePublishedState(courseId){

   
    try {
        const course=await Course.findById(courseId).lean();
        const res=await Course.findByIdAndUpdate(courseId,{active:!course?.active},{lean:true});
    
        return res.active;
    
      } catch (error) {
       
        throw new Error(error);
      }

}


export async function deletecourse(courseId){
    try {
        await Course.findByIdAndDelete(courseId);
      } catch (err) {
        throw new Error(err);
      }
}

export async function updateQuizSetForCourse(courseId, dataToUpdate) {
    console.log(courseId, dataToUpdate);
    const data = {};
    data["quizSet"] = new mongoose.Types.ObjectId(dataToUpdate.quizSetId);
    console.log(data);
    try{
      await Course.findByIdAndUpdate(courseId, data);
    } catch(error) {
        throw new Error(error);
    }
  }
